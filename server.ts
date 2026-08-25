import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local", quiet: true });
dotenv.config({ quiet: true });

interface EditorialAssistantRequest {
  prompt?: string;
  type?: "rewrite" | "generate" | "book-summary";
  textToAdapt?: string;
}

const GEMINI_MODELS = ["gemini-3.5-flash", "gemini-2.0-flash"];

function buildLocalEditorialFallback({ type, prompt, textToAdapt }: Required<EditorialAssistantRequest>) {
  const source = (textToAdapt || prompt).trim();

  if (type === "generate") {
    return [
      `El tema propuesto exige una lectura pausada: ${source}`,
      "",
      "La tesis central debe partir de una idea sencilla: no todo lo visible merece atención, y no toda atención produce criterio. Anclora Insights abordaría este ensayo desde una perspectiva estratégica, separando el ruido operativo de las señales capaces de orientar decisiones duraderas.",
      "",
      "El desarrollo puede estructurarse en tres movimientos: primero, definir el conflicto intelectual; después, aislar los patrones relevantes; por último, traducirlos en una conclusión aplicable, sobria y verificable."
    ].join("\n");
  }

  if (type === "book-summary") {
    return [
      `Resumen ejecutivo: ${source}`,
      "",
      "La obra se plantea como una guía de pensamiento estratégico para lectores exigentes. Su promesa no es ofrecer atajos, sino ordenar una tesis con precisión, profundidad y utilidad práctica.",
      "",
      "Estructura sugerida: apertura conceptual, diagnóstico del problema, principios de interpretación, casos o escenas de aplicación, y cierre con un marco de decisión claro. El tono debe mantenerse sereno, editorial y libre de exageración comercial."
    ].join("\n");
  }

  return [
    "Versión adaptada al tono Anclora Insights:",
    "",
    source
      .replace(/[¡!]/g, "")
      .replace(/\bsúper\b/gi, "especialmente")
      .replace(/\bultra rápido\b/gi, "sintético")
      .replace(/\bclick aquí abajo\b/gi, "explorar el análisis completo")
      .replace(/\bya mismo\b/gi, "cuando corresponda"),
    "",
    "El texto gana autoridad cuando reduce la urgencia artificial y conserva solo aquello que aporta claridad, criterio y permanencia."
  ].join("\n");
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

  app.use(express.json());

  // Initialize Gemini client lazily to avoid crashing on startup if key is missing
  let ai: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is missing. Please configure it in your Secrets panel.");
      }
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return ai;
  }

  // API endpoint for AI brand companion
  app.post("/api/editorial-assistant", async (req, res) => {
    try {
      const { prompt = "", type, textToAdapt = "" } = req.body as EditorialAssistantRequest;

      const systemInstruction = `
You are the AI Editorial Director for Anclora Insights, a premium imprint of Anclora Group.
Anclora Insights focuses on deep, curated knowledge, high intellectual authority, and tactile, timeless aesthetics.

Our style guidelines are:
- VOICE & TONE: Authoritative, intellectual, warm, direct, precise, clear, and unhurried. No corporate fluff or sensational hype. No exclamation marks, no superficial sales pitches. Speak with humble confidence.
- STYLE: Short, direct paragraphs. High-level language that remains accessible. Every word must feel deliberate and valuable.
- FOCUS: Synthesizing complexity into crystal-clear insights. High-end editorial curation.

When responding:
- Keep the language in SPANISH (unless asked otherwise).
- Match the brand manifesto: "La verdadera sofisticación reside en la eliminación de lo innecesario hasta que solo queda lo esencial."
- Align with the theme of "Tactile Minimalism" and "Intellectual Authority".
`;

      let promptText = "";
      if (type === "rewrite") {
        promptText = `Por favor, reescribe el siguiente texto para que se adapte perfectamente al tono y la voz editorial de Anclora Insights (sofisticado, intelectualmente riguroso, directo, cálido pero formal, sin rodeos ni exageraciones publicitarias):\n\n"${textToAdapt}"`;
      } else if (type === "generate") {
        promptText = `Genera una propuesta de artículo o ensayo basada en el siguiente tema, aplicando la voz editorial de Anclora Insights:\n\n"${prompt}"`;
      } else if (type === "book-summary") {
        promptText = `Genera un resumen ejecutivo de libro para el sello Anclora Insights basado en la siguiente idea de libro:\n\n"${prompt}"`;
      } else {
        promptText = prompt;
      }

      let text = "";
      let lastError: unknown;

      try {
        const client = getGeminiClient();

        for (const model of GEMINI_MODELS) {
          try {
            const response = await client.models.generateContent({
              model,
              contents: promptText,
              config: {
                systemInstruction,
                temperature: 0.7,
              },
            });

            text = response.text || "";
            break;
          } catch (error) {
            lastError = error;
          }
        }
      } catch (error) {
        lastError = error;
      }

      if (!text) {
        console.warn("Gemini unavailable, using local editorial fallback:", lastError);
        text = buildLocalEditorialFallback({
          prompt,
          type: type || "rewrite",
          textToAdapt
        });
      }

      res.json({ text });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
