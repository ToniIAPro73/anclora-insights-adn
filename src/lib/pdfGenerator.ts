import jsPDF from "jspdf";
import heroPremiumUrl from "../../assets/anclora-insights-hero-premium-editorial.png";
import goldLockupUrl from "../../assets/anclora-insights-lockup-oro-transparente.png";
import goldMedalUrl from "../../assets/anclora-insights-medalla-oro-transparente.png";
import interRegularUrl from "../../assets/fonts/Inter-Regular.ttf?url";
import interSemiBoldUrl from "../../assets/fonts/Inter-SemiBold.ttf?url";
import interBoldUrl from "../../assets/fonts/Inter-Bold.ttf?url";
import libreRegularUrl from "../../assets/fonts/LibreBaskerville-Regular.ttf?url";
import libreBoldUrl from "../../assets/fonts/LibreBaskerville-Bold.ttf?url";
import libreItalicUrl from "../../assets/fonts/LibreBaskerville-Italic.ttf?url";

const PAGE_W = 210;
const PAGE_H = 297;
const M = 18;
const CONTENT_W = PAGE_W - M * 2;

const colors = {
  ink: [15, 23, 42] as const,
  cream: [248, 250, 252] as const,
  gold: [245, 158, 11] as const,
  mutedGold: [217, 119, 6] as const,
  softLine: [226, 232, 240] as const,
  body: [51, 65, 85] as const
};

type Pdf = jsPDF;
type Rgb = readonly [number, number, number];
type FontStyle = "normal" | "bold" | "italic";

interface PageContext {
  doc: Pdf;
  page: number;
  dark?: boolean;
}

const pdfFonts = [
  { url: interRegularUrl, file: "Inter-Regular.ttf", family: "Inter", style: "normal" as const },
  { url: interSemiBoldUrl, file: "Inter-SemiBold.ttf", family: "Inter", style: "semibold" as const },
  { url: interBoldUrl, file: "Inter-Bold.ttf", family: "Inter", style: "bold" as const },
  { url: libreRegularUrl, file: "LibreBaskerville-Regular.ttf", family: "LibreBaskerville", style: "normal" as const },
  { url: libreBoldUrl, file: "LibreBaskerville-Bold.ttf", family: "LibreBaskerville", style: "bold" as const },
  { url: libreItalicUrl, file: "LibreBaskerville-Italic.ttf", family: "LibreBaskerville", style: "italic" as const }
];

interface SectionBlock {
  eyebrow: string;
  title: string;
  body: string[];
}

const blocks: SectionBlock[] = [
  {
    eyebrow: "I. Esencia Estratégica",
    title: "Un sello editorial para conocimiento que permanece.",
    body: [
      "Anclora Insights existe para transformar complejidad en criterio. No compite por volumen, velocidad o ruido. Su territorio es la curaduría rigurosa: seleccionar, ordenar y presentar ideas con suficiente profundidad para que sigan siendo útiles después del primer impacto.",
      "La marca debe sentirse sobria, precisa y editorial. Cada interfaz, pieza impresa o entrega digital debe comunicar autoridad sin rigidez, calidez sin informalidad y belleza sin exceso ornamental."
    ]
  },
  {
    eyebrow: "II. Sistema Visual",
    title: "Tinta, papel y oro como estructura de prestigio sobrio.",
    body: [
      "La paleta se apoya en Negro Tinta, Crema Papel y Oro Metálico. El negro aporta profundidad y concentración; el crema reduce fatiga visual y evoca soporte editorial; el oro marca jerarquía, no decoración gratuita.",
      "La composición debe reservar espacios amplios, ritmos pausados y contrastes claros. Los acentos dorados funcionan mejor como líneas, sellos, bordes finos y llamadas principales. Nunca deben dominar la página."
    ]
  },
  {
    eyebrow: "III. Gobernanza del Logotipo",
    title: "El símbolo actúa como sello, no como adorno.",
    body: [
      "El lockup completo se reserva para cabeceras, portadas y materiales institucionales. La medalla funciona como firma secundaria, favicon, marca de agua o cierre editorial.",
      "No se debe deformar, rasterizar con fondos falsos ni colocar sobre imágenes sin contraste suficiente. La identidad gana valor cuando aparece con poca frecuencia y máxima nitidez."
    ]
  },
  {
    eyebrow: "IV. Voz Editorial",
    title: "Claridad, criterio y calma intelectual.",
    body: [
      "La voz de Anclora Insights evita urgencias artificiales, exageraciones comerciales y frases genéricas. Prefiere verbos concretos, párrafos breves y conclusiones verificables.",
      "La promesa verbal no es entretener ni impresionar: es ahorrar tiempo cognitivo al lector, separar señal de ruido y convertir información dispersa en una interpretación útil."
    ]
  },
  {
    eyebrow: "V. Aplicación",
    title: "Checklist mínimo antes de publicar.",
    body: [
      "1. La pieza expresa una idea central en menos de dos frases.",
      "2. Los acentos dorados indican jerarquía real.",
      "3. El texto mantiene tono sobrio y no publicitario.",
      "4. La lectura funciona en móvil sin sacrificar respiración visual.",
      "5. El logotipo conserva contraste, margen y nitidez."
    ]
  }
];

async function toDataUrl(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`No se pudo cargar el asset del PDF: ${url}`);
  }

  const blob = await response.blob();

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function toBinaryString(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`No se pudo cargar la tipografía del PDF: ${url}`);
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  let binary = "";
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return binary;
}

async function registerFonts(doc: Pdf) {
  const binaries = await Promise.all(pdfFonts.map((font) => toBinaryString(font.url)));

  pdfFonts.forEach((font, index) => {
    doc.addFileToVFS(font.file, binaries[index]);
    doc.addFont(font.file, font.family, font.style);
  });
}

function setFill(doc: Pdf, color: Rgb) {
  doc.setFillColor(color[0], color[1], color[2]);
}

function setDraw(doc: Pdf, color: Rgb) {
  doc.setDrawColor(color[0], color[1], color[2]);
}

function setText(doc: Pdf, color: Rgb) {
  doc.setTextColor(color[0], color[1], color[2]);
}

function setSans(doc: Pdf, style: FontStyle | "semibold" = "normal") {
  doc.setFont("Inter", style);
}

function setSerif(doc: Pdf, style: FontStyle = "normal") {
  doc.setFont("LibreBaskerville", style);
}

function addHeader({ doc, page, dark = false }: PageContext) {
  setDraw(doc, dark ? colors.gold : colors.softLine);
  doc.setLineWidth(0.25);
  doc.line(M, 18, PAGE_W - M, 18);

  setSans(doc, "bold");
  doc.setFontSize(7.5);
  setText(doc, dark ? colors.gold : colors.mutedGold);
  doc.text("ANCLORA INSIGHTS", M, 13);

  setSans(doc);
  setText(doc, dark ? colors.cream : colors.body);
  doc.text(`Manual de Identidad v2.1 · Página ${page}`, PAGE_W - M, 13, { align: "right" });
}

function addFooter({ doc, page, dark = false }: PageContext) {
  setDraw(doc, dark ? [245, 158, 11] : colors.softLine);
  doc.setLineWidth(0.25);
  doc.line(M, PAGE_H - 18, PAGE_W - M, PAGE_H - 18);

  setSans(doc);
  doc.setFontSize(7);
  setText(doc, dark ? [203, 213, 225] : [100, 116, 139]);
  doc.text("Sello editorial de alta autoridad de Anclora Group", M, PAGE_H - 12);
  doc.text(String(page).padStart(2, "0"), PAGE_W - M, PAGE_H - 12, { align: "right" });
}

function addWrappedText(doc: Pdf, text: string, x: number, y: number, width: number, lineHeight: number) {
  const lines = doc.splitTextToSize(text, width) as string[];
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function addJustifiedText(doc: Pdf, text: string, x: number, y: number, width: number, lineHeight: number) {
  const lines = doc.splitTextToSize(text, width) as string[];

  lines.forEach((line, index) => {
    const words = line.trim().split(/\s+/);
    const isLastLine = index === lines.length - 1;

    if (isLastLine || words.length < 2) {
      doc.text(line, x, y + index * lineHeight);
      return;
    }

    const wordsWidth = words.reduce((sum, word) => sum + doc.getTextWidth(word), 0);
    const gap = Math.max(0, (width - wordsWidth) / (words.length - 1));
    let cursorX = x;

    words.forEach((word) => {
      doc.text(word, cursorX, y + index * lineHeight);
      cursorX += doc.getTextWidth(word) + gap;
    });
  });

  return y + lines.length * lineHeight;
}

function addTitle(doc: Pdf, eyebrow: string, title: string, y: number, dark = false) {
  setSans(doc, "bold");
  doc.setFontSize(8);
  setText(doc, colors.gold);
  doc.text(eyebrow.toUpperCase(), M, y);

  setSerif(doc, "bold");
  doc.setFontSize(22);
  setText(doc, dark ? colors.cream : colors.ink);
  return addWrappedText(doc, title, M, y + 13, CONTENT_W, 10);
}

function addBody(doc: Pdf, paragraphs: string[], y: number, dark = false) {
  setSans(doc);
  doc.setFontSize(9.7);
  setText(doc, dark ? [226, 232, 240] : colors.body);

  return paragraphs.reduce((nextY, paragraph) => {
    return addJustifiedText(doc, paragraph, M, nextY, CONTENT_W, 5.7) + 6.5;
  }, y);
}

function addPalette(doc: Pdf, y: number) {
  const swatches = [
    ["Negro Tinta", "#0F172A", colors.ink],
    ["Crema Papel", "#F8FAFC", colors.cream],
    ["Oro Metálico", "#F59E0B", colors.gold],
    ["Oro Mitigado", "#D97706", colors.mutedGold]
  ] as const;

  swatches.forEach(([name, hex, rgb], index) => {
    const x = M + index * 43;
    setFill(doc, rgb);
    doc.roundedRect(x, y, 34, 22, 2, 2, "F");
    setDraw(doc, colors.softLine);
    doc.roundedRect(x, y, 34, 22, 2, 2, "S");

    setSans(doc, "bold");
    doc.setFontSize(7.2);
    setText(doc, colors.ink);
    doc.text(name, x, y + 31);

    setSans(doc);
    setText(doc, colors.body);
    doc.text(hex, x, y + 36);
  });
}

function addSectionPage(doc: Pdf, block: SectionBlock, page: number, imageData?: string) {
  setFill(doc, colors.cream);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  addHeader({ doc, page });

  let y = addTitle(doc, block.eyebrow, block.title, 42);
  y = addBody(doc, block.body, y + 12);

  if (block.eyebrow.startsWith("II")) {
    addPalette(doc, y + 6);
  }

  if (block.eyebrow.startsWith("III") && imageData) {
    setFill(doc, colors.ink);
    doc.roundedRect(M, y + 8, CONTENT_W, 54, 3, 3, "F");
    doc.addImage(imageData, "PNG", M + 18, y + 23, 82, 18);
  }

  if (block.eyebrow.startsWith("V")) {
    setFill(doc, colors.ink);
    doc.roundedRect(M, y + 2, CONTENT_W, 34, 3, 3, "F");
    setSerif(doc, "italic");
    doc.setFontSize(13);
    setText(doc, colors.cream);
    doc.text("La sofisticación reside en la eliminación de lo innecesario.", PAGE_W / 2, y + 22, {
      align: "center"
    });
  }

  addFooter({ doc, page });
}

export async function generateBrandGuidelinesPDF(onProgress?: (text: string) => void) {
  onProgress?.("Preparando manual vectorial...");

  const [heroImage, lockupImage, medalImage] = await Promise.all([
    toDataUrl(heroPremiumUrl),
    toDataUrl(goldLockupUrl),
    toDataUrl(goldMedalUrl)
  ]);

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true
  });
  await registerFonts(doc);

  doc.setProperties({
    title: "Anclora Insights Brand Guidelines",
    subject: "Manual de identidad editorial",
    author: "Anclora Group",
    creator: "Anclora Insights"
  });

  onProgress?.("Maquetando portada...");
  setFill(doc, colors.ink);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  doc.addImage(heroImage, "PNG", 0, 0, PAGE_W, 118);

  setFill(doc, colors.ink);
  doc.rect(0, 118, PAGE_W, PAGE_H - 118, "F");
  doc.addImage(medalImage, "PNG", M, 144, 24, 24);
  doc.addImage(lockupImage, "PNG", M, 38, 92, 21);

  setSans(doc, "bold");
  doc.setFontSize(8);
  setText(doc, colors.gold);
  doc.text("MANUAL DE IDENTIDAD EDITORIAL", M, 188);

  setSerif(doc, "bold");
  doc.setFontSize(29);
  setText(doc, colors.cream);
  addWrappedText(doc, "Anclora Insights", M, 206, 150, 12);

  setSans(doc);
  doc.setFontSize(9.7);
  setText(doc, [226, 232, 240]);
  addWrappedText(
    doc,
    "Sistema de marca para un sello editorial de alta autoridad: sobrio, legible, selectivo y profundamente respetuoso con el tiempo del lector.",
    M,
    225,
    155,
    5.7
  );

  addFooter({ doc, page: 1, dark: true });

  blocks.forEach((block, index) => {
    doc.addPage();
    onProgress?.(`Maquetando pagina ${index + 2} de ${blocks.length + 1}...`);
    addSectionPage(doc, block, index + 2, lockupImage);
  });

  onProgress?.("Descargando manual final...");
  doc.save("Anclora_Insights_Brand_Guidelines.pdf");
}
