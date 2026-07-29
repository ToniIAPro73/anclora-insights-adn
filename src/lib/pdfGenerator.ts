import jsPDF from "jspdf";
import heroEditorialCropUrl from "../../assets/anclora-insights-hero-editorial-crop.png";
import goldMedalUrl from "../../assets/anclora-insights-medalla-oro-transparente.png";
import inverseMedalUrl from "../../assets/anclora-insights-medalla-inverso-transparente.png";
import lockupLightUrl from "../../assets/anclora-insights-lockup-light-transparente.png";
import lockupGoldUrl from "../../assets/anclora-insights-lockup-oro-transparente.png";
import interRegularUrl from "../../assets/fonts/Inter-Regular.ttf?url";
import interSemiBoldUrl from "../../assets/fonts/Inter-SemiBold.ttf?url";
import interBoldUrl from "../../assets/fonts/Inter-Bold.ttf?url";
import libreRegularUrl from "../../assets/fonts/LibreBaskerville-Regular.ttf?url";
import libreBoldUrl from "../../assets/fonts/LibreBaskerville-Bold.ttf?url";
import libreItalicUrl from "../../assets/fonts/LibreBaskerville-Italic.ttf?url";

/* -------------------------------------------------------------
   Anclora Insights · Manual de Identidad Editorial
   A4 · 210 × 297 mm · 8 páginas · tipografía embebida
   ------------------------------------------------------------- */

const PAGE_W = 210;
const PAGE_H = 297;
const M = 20;
const CONTENT_W = PAGE_W - M * 2;

const colors = {
  ink: [15, 23, 42] as const, // #0F172A Negro Tinta
  inkSoft: [30, 41, 59] as const, // #1E293B
  inkDeep: [10, 15, 28] as const,
  cream: [248, 250, 252] as const, // #F8FAFC Crema Papel
  gold: [245, 158, 11] as const, // #F59E0B Oro Metálico
  mutedGold: [217, 119, 6] as const, // #D97706 Oro Mitigado
  goldSoft: [252, 231, 196] as const,
  line: [226, 232, 240] as const,
  lineDark: [51, 65, 85] as const,
  body: [51, 65, 85] as const,
  muted: [100, 116, 139] as const,
  slateLight: [148, 163, 184] as const,
  white: [255, 255, 255] as const
};

const VERSION = "v3.0";
const EDITION = "Edición 2026";

type Pdf = jsPDF;
type Rgb = readonly [number, number, number];
type FontStyle = "normal" | "bold" | "italic";

interface TextBoxOptions {
  fontSize?: number;
  lineHeight?: number;
  justify?: boolean;
  color?: Rgb;
}

const pdfFonts = [
  { url: interRegularUrl, file: "Inter-Regular.ttf", family: "Inter", style: "normal" as const },
  { url: interSemiBoldUrl, file: "Inter-SemiBold.ttf", family: "Inter", style: "semibold" as const },
  { url: interBoldUrl, file: "Inter-Bold.ttf", family: "Inter", style: "bold" as const },
  { url: libreRegularUrl, file: "LibreBaskerville-Regular.ttf", family: "LibreBaskerville", style: "normal" as const },
  { url: libreBoldUrl, file: "LibreBaskerville-Bold.ttf", family: "LibreBaskerville", style: "bold" as const },
  { url: libreItalicUrl, file: "LibreBaskerville-Italic.ttf", family: "LibreBaskerville", style: "italic" as const }
];

/* ── Contenido ─────────────────────────────────────────────── */

const dnaBlocks = [
  {
    numeral: "I",
    title: "Propósito",
    text: "Transformar complejidad en criterio. Anclora Insights no compite por volumen ni velocidad: filtra, ordena y presenta conocimiento con la profundidad suficiente para que conserve su valor mucho después del primer impacto."
  },
  {
    numeral: "II",
    title: "Promesa",
    text: "Ahorrar tiempo cognitivo al lector exigente. Cada pieza separa la señal del ruido, reduce la fricción interpretativa y entrega una síntesis útil, elegante y verificable que respeta la inteligencia de quien lee."
  },
  {
    numeral: "III",
    title: "Territorio",
    text: "Curaduría editorial, análisis estratégico, economía del conocimiento y desarrollo intelectual aplicado. La marca evita la urgencia artificial y privilegia la permanencia sobre la novedad efímera."
  },
  {
    numeral: "IV",
    title: "Tono",
    text: "Autoridad serena, claridad conceptual y calidez contenida. La voz suena precisa, humana y madura; nunca publicitaria, nunca grandilocuente, siempre al servicio de la comprensión."
  }
];

const voicePrinciples = [
  {
    title: "Precisión antes que brillantez",
    text: "Cada afirmación debe poder sostenerse. Si una frase no aporta criterio, se elimina."
  },
  {
    title: "Calma estructural",
    text: "Frases breves, verbos concretos, conclusiones accionables. La urgencia es ajena a esta casa."
  },
  {
    title: "Respeto por el lector",
    text: "Nunca se explica lo evidente ni se oculta lo esencial. El lector es un igual, no un destinatario."
  }
];

const voiceContrast = {
  yes: [
    "«La evidencia sugiere una conclusión incómoda: menos contenido, mejor seleccionado, rinde más.»",
    "«Tres ideas bastan. El resto es decoración.»"
  ],
  no: [
    "«¡Descubre los 10 secretos que revolucionarán tu productividad hoy mismo!»",
    "«Somos líderes disruptivos en soluciones de knowledge management de vanguardia.»"
  ]
};

const palette = [
  {
    name: "Negro Tinta",
    hex: "#0F172A",
    rgb: "15 · 23 · 42",
    share: "55 %",
    role: "Color de autoridad",
    usage: "Fondos inmersivos, titulares principales y superficies donde la marca habla con toda su presencia."
  },
  {
    name: "Crema Papel",
    hex: "#F8FAFC",
    rgb: "248 · 250 · 252",
    share: "30 %",
    role: "Color de lectura",
    usage: "Base editorial clara y descansada. Sostiene la lectura prolongada sin fatiga visual."
  },
  {
    name: "Oro Metálico",
    hex: "#F59E0B",
    rgb: "245 · 158 · 11",
    share: "10 %",
    role: "Color de jerarquía",
    usage: "Sellos, líneas de honor, llamadas y microdetalles. Marca lo que merece ser mirado dos veces."
  },
  {
    name: "Oro Mitigado",
    hex: "#D97706",
    rgb: "217 · 119 · 6",
    share: "5 %",
    role: "Color de apoyo",
    usage: "Énfasis secundarios y estados de apoyo. Nunca sustituye al Oro Metálico en piezas de honor."
  }
] as const;

const typeScale = [
  { use: "Titular editorial", family: "Libre Baskerville Bold", size: "28 / 34 pt", sample: "El criterio permanece" },
  { use: "Subtítulo", family: "Libre Baskerville Italic", size: "15 / 22 pt", sample: "Una lectura que se queda" },
  { use: "Cuerpo", family: "Inter Regular", size: "10 / 16 pt", sample: "La claridad es una forma de respeto hacia quien dedica su tiempo a leer." },
  { use: "Énfasis", family: "Inter SemiBold", size: "10 / 16 pt", sample: "Señal, no ruido." },
  { use: "Epígrafe", family: "Inter Bold · caps", size: "7.5 / 12 pt", sample: "MANUAL DE IDENTIDAD" }
] as const;

const usageRules = [
  {
    title: "Espacio que respira",
    text: "Márgenes generosos y constantes. El vacío no es ausencia: es el marco que da valor a cada elemento."
  },
  {
    title: "Oro con criterio",
    text: "El oro se reserva para jerarquía real. Usado como relleno decorativo, deja de significar."
  },
  {
    title: "Contraste siempre",
    text: "Tinta sobre papel, papel sobre tinta. Nunca texto sobre fondos con ruido ni fotografías sin veladura."
  },
  {
    title: "La medalla, intacta",
    text: "No deformar, rotar, recortar ni rasterizar a baja resolución la medalla o el lockup. Proporciones originales, siempre."
  },
  {
    title: "Pareja tipográfica fija",
    text: "Titulares en Libre Baskerville, cuerpo en Inter. No se introducen terceras familias."
  },
  {
    title: "Menos, mejor",
    text: "Si una pieza funciona con tres elementos, no lleva cuatro. La edición es la última capa de diseño."
  }
];

/* ── Utilidades ────────────────────────────────────────────── */

async function toDataUrl(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`No se pudo cargar el asset del PDF: ${url}`);

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
  if (!response.ok) throw new Error(`No se pudo cargar la tipografía del PDF: ${url}`);

  const bytes = new Uint8Array(await response.arrayBuffer());
  let binary = "";
  const chunk = 0x8000;

  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
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

function fill(doc: Pdf, color: Rgb) {
  doc.setFillColor(color[0], color[1], color[2]);
}

function draw(doc: Pdf, color: Rgb) {
  doc.setDrawColor(color[0], color[1], color[2]);
}

function textColor(doc: Pdf, color: Rgb) {
  doc.setTextColor(color[0], color[1], color[2]);
}

function sans(doc: Pdf, style: FontStyle | "semibold" = "normal") {
  doc.setFont("Inter", style);
}

function serif(doc: Pdf, style: FontStyle = "normal") {
  doc.setFont("LibreBaskerville", style);
}

function hairline(doc: Pdf, x1: number, y: number, x2: number, color: Rgb, width = 0.2) {
  draw(doc, color);
  doc.setLineWidth(width);
  doc.line(x1, y, x2, y);
}

function eyebrow(doc: Pdf, value: string, x: number, y: number, color: Rgb = colors.mutedGold) {
  sans(doc, "bold");
  doc.setFontSize(6.6);
  doc.setCharSpace(1.1);
  textColor(doc, color);
  doc.text(value.toUpperCase(), x, y);
  doc.setCharSpace(0);
}

function addTextBox(doc: Pdf, value: string, x: number, y: number, width: number, options: TextBoxOptions = {}) {
  const fontSize = options.fontSize ?? 8.5;
  const lineHeight = options.lineHeight ?? 4.8;
  doc.setFontSize(fontSize);
  textColor(doc, options.color ?? colors.body);

  const lines = doc.splitTextToSize(value, width) as string[];

  lines.forEach((line, index) => {
    const words = line.trim().split(/\s+/);
    const isLast = index === lines.length - 1;
    const shouldJustify = options.justify && !isLast && words.length > 3;

    if (!shouldJustify) {
      doc.text(line, x, y + index * lineHeight);
      return;
    }

    const wordsWidth = words.reduce((sum, word) => sum + doc.getTextWidth(word), 0);
    const gap = Math.min(2.6, Math.max(1, (width - wordsWidth) / (words.length - 1)));
    let cursorX = x;

    words.forEach((word) => {
      doc.text(word, cursorX, y + index * lineHeight);
      cursorX += doc.getTextWidth(word) + gap;
    });
  });

  return y + lines.length * lineHeight;
}

/* ── Estructura común ──────────────────────────────────────── */

function addRunningHeader(doc: Pdf, section: string, page: number) {
  hairline(doc, M, 16.5, PAGE_W - M, colors.line, 0.2);

  sans(doc, "bold");
  doc.setFontSize(6.5);
  doc.setCharSpace(1.2);
  textColor(doc, colors.mutedGold);
  doc.text("ANCLORA INSIGHTS", M, 12);
  doc.setCharSpace(0);

  sans(doc);
  doc.setFontSize(6.5);
  textColor(doc, colors.muted);
  doc.text(`${section.toUpperCase()}  ·  ${VERSION.toUpperCase()}`, PAGE_W - M, 12, {
    align: "right"
  });
}

function addFooter(doc: Pdf, page: number, dark = false) {
  hairline(doc, M, PAGE_H - 16, PAGE_W - M, dark ? colors.lineDark : colors.line, 0.2);

  sans(doc);
  doc.setFontSize(6.5);
  textColor(doc, dark ? colors.slateLight : colors.muted);
  doc.text("Sello editorial de alta autoridad de Anclora Group", M, PAGE_H - 10.5);

  serif(doc, "italic");
  textColor(doc, dark ? colors.gold : colors.mutedGold);
  doc.text(String(page).padStart(2, "0"), PAGE_W - M, PAGE_H - 10.5, { align: "right" });
}

function sectionOpener(doc: Pdf, numeral: string, kicker: string, title: string, intro: string) {
  // Numeral romano grande en serif, como capítulo de libro
  serif(doc, "normal");
  doc.setFontSize(46);
  textColor(doc, colors.goldSoft);
  doc.text(numeral, M - 1.5, 44);

  eyebrow(doc, kicker, M, 56);

  serif(doc, "bold");
  doc.setFontSize(21);
  textColor(doc, colors.ink);
  const titleLines = doc.splitTextToSize(title, CONTENT_W) as string[];
  doc.text(titleLines, M, 68);

  const introY = 68 + titleLines.length * 9 + 3;
  hairline(doc, M, introY, M + 24, colors.gold, 0.5);

  sans(doc);
  return addTextBox(doc, intro, M, introY + 7, CONTENT_W, {
    fontSize: 9,
    lineHeight: 5.2,
    justify: true
  });
}

function lightPage(doc: Pdf) {
  doc.addPage();
  fill(doc, colors.cream);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
}

/* ── 01 · Portada ──────────────────────────────────────────── */

function pageCover(doc: Pdf, hero: string, medal: string) {
  fill(doc, colors.inkDeep);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");

  // Imagen editorial enmarcada, con filete dorado (proporción original 980×941)
  const imgX = 88;
  const imgY = 34;
  const imgW = 90;
  const imgH = 86.4;
  draw(doc, colors.gold);
  doc.setLineWidth(0.3);
  doc.rect(imgX - 3, imgY - 3, imgW + 6, imgH + 6);
  doc.addImage(hero, "PNG", imgX, imgY, imgW, imgH);

  // Medalla
  doc.addImage(medal, "PNG", M, 42, 26, 26.5);

  // Epígrafe y título
  eyebrow(doc, `Manual de Identidad Editorial · ${EDITION}`, M, 152, colors.gold);

  serif(doc, "bold");
  doc.setFontSize(34);
  textColor(doc, colors.cream);
  doc.text("Anclora", M, 170);
  doc.text("Insights", M, 183);

  hairline(doc, M, 194, M + 30, colors.gold, 0.6);

  serif(doc, "italic");
  doc.setFontSize(11.5);
  textColor(doc, colors.slateLight);
  doc.text("Sistema visual y verbal para un sello editorial", M, 206);
  doc.text("de alta autoridad.", M, 212);

  sans(doc);
  addTextBox(
    doc,
    "Sobrio, legible y selectivo. Una identidad construida para el conocimiento que permanece y profundamente respetuosa con el tiempo del lector.",
    M,
    226,
    130,
    { fontSize: 8.5, lineHeight: 5, color: colors.slateLight }
  );

  // Línea de honor inferior
  hairline(doc, M, PAGE_H - 34, PAGE_W - M, colors.lineDark, 0.25);
  sans(doc, "semibold");
  doc.setFontSize(7);
  textColor(doc, colors.slateLight);
  doc.text(`Formato A4 · 210 × 297 mm · Tipografía embebida · ${VERSION}`, M, PAGE_H - 27);
  textColor(doc, colors.gold);
  doc.text("ANCLORA GROUP", PAGE_W - M, PAGE_H - 27, { align: "right" });
}

/* ── 02 · Colofón e índice ─────────────────────────────────── */

const toc = [
  { numeral: "I", title: "ADN editorial", detail: "Propósito, promesa, territorio y tono", page: "03" },
  { numeral: "II", title: "Voz de la casa", detail: "Principios verbales y contrastes", page: "04" },
  { numeral: "III", title: "El emblema", detail: "Medalla, lockup y área de respeto", page: "05" },
  { numeral: "IV", title: "Sistema cromático", detail: "Tinta, papel y oro en proporción", page: "06" },
  { numeral: "V", title: "Tipografía", detail: "La pareja editorial y su escala", page: "07" },
  { numeral: "VI", title: "Uso y gobernanza", detail: "Reglas de aplicación y cuidado", page: "08" }
];

function pageColophon(doc: Pdf, medal: string) {
  lightPage(doc);

  doc.addImage(medal, "PNG", M, 30, 18, 18.3);

  serif(doc, "italic");
  doc.setFontSize(11);
  textColor(doc, colors.muted);
  doc.text("Contenido", M + 24, 41.5);

  eyebrow(doc, `Manual de Identidad · ${VERSION}`, M, 62);

  serif(doc, "bold");
  doc.setFontSize(24);
  textColor(doc, colors.ink);
  doc.text("Este manual", M, 76);

  sans(doc);
  let y = addTextBox(
    doc,
    "Este documento reúne el sistema visual y verbal de Anclora Insights. No es un catálogo de piezas: es la constitución de una casa editorial. Cada regla existe para proteger una misma idea — el conocimiento merece una forma a su altura.",
    M,
    88,
    CONTENT_W,
    { fontSize: 9, lineHeight: 5.2, justify: true }
  );

  // Índice
  y += 10;
  toc.forEach((entry) => {
    serif(doc, "normal");
    doc.setFontSize(13);
    textColor(doc, colors.mutedGold);
    doc.text(entry.numeral, M, y);

    sans(doc, "semibold");
    doc.setFontSize(10);
    textColor(doc, colors.ink);
    doc.text(entry.title, M + 14, y);

    sans(doc);
    doc.setFontSize(8);
    textColor(doc, colors.muted);
    doc.text(entry.detail, M + 14, y + 5);

    // Línea de puntos hasta la página
    serif(doc, "italic");
    doc.setFontSize(9);
    textColor(doc, colors.ink);
    doc.text(entry.page, PAGE_W - M, y, { align: "right" });

    hairline(doc, M + 14, y + 9, PAGE_W - M, colors.line, 0.15);
    y += 21;
  });

  // Colofón
  hairline(doc, M, PAGE_H - 44, PAGE_W - M, colors.line, 0.2);
  sans(doc, "bold");
  doc.setFontSize(6.5);
  doc.setCharSpace(1.2);
  textColor(doc, colors.mutedGold);
  doc.text("COLOFÓN", M, PAGE_H - 36);
  doc.setCharSpace(0);

  sans(doc);
  doc.setFontSize(7.5);
  textColor(doc, colors.muted);
  doc.text("Anclora Insights es el sello editorial de alta autoridad de Anclora Group.", M, PAGE_H - 29);
  doc.text(`Manual de Identidad ${VERSION} · ${EDITION} · Documento de uso interno y partners autorizados.`, M, PAGE_H - 24);

  addFooter(doc, 2);
}

/* ── 03 · ADN editorial ────────────────────────────────────── */

function pageDna(doc: Pdf) {
  lightPage(doc);
  addRunningHeader(doc, "I. ADN editorial", 3);

  const introEnd = sectionOpener(
    doc,
    "I",
    "Capítulo primero",
    "Una marca para el conocimiento que permanece.",
    "Anclora Insights transforma complejidad en criterio. No compite por volumen ni velocidad: filtra, ordena y presenta conocimiento con profundidad suficiente para conservar valor después del primer impacto. La marca comunica autoridad sin rigidez, calidez sin informalidad y belleza sin exceso ornamental."
  );

  const colW = (CONTENT_W - 8) / 2;
  const cardH = 58;
  const top = introEnd + 10;

  dnaBlocks.forEach((block, index) => {
    const x = M + (index % 2) * (colW + 8);
    const y = top + Math.floor(index / 2) * (cardH + 8);

    fill(doc, colors.white);
    draw(doc, colors.line);
    doc.setLineWidth(0.2);
    doc.rect(x, y, colW, cardH, "FD");

    // Filete dorado superior
    fill(doc, colors.gold);
    doc.rect(x, y, colW, 0.8, "F");

    serif(doc, "normal");
    doc.setFontSize(12);
    textColor(doc, colors.mutedGold);
    doc.text(block.numeral, x + 6, y + 12);

    sans(doc, "bold");
    doc.setFontSize(9.5);
    textColor(doc, colors.ink);
    doc.text(block.title, x + 16, y + 12);

    sans(doc);
    addTextBox(doc, block.text, x + 6, y + 20, colW - 12, {
      fontSize: 7.4,
      lineHeight: 4.3,
      justify: true
    });
  });

  // Cita de cierre
  const quoteY = top + cardH * 2 + 8 + 14;
  serif(doc, "italic");
  doc.setFontSize(12.5);
  textColor(doc, colors.inkSoft);
  const quote = "«La edición es el arte de decidir qué merece permanecer.»";
  const quoteW = doc.getTextWidth(quote);
  doc.text(quote, (PAGE_W - quoteW) / 2, quoteY);
  hairline(doc, (PAGE_W - quoteW) / 2, quoteY + 5, (PAGE_W + quoteW) / 2, colors.gold, 0.3);

  addFooter(doc, 3);
}

/* ── 04 · Voz de la casa ───────────────────────────────────── */

function pageVoice(doc: Pdf) {
  lightPage(doc);
  addRunningHeader(doc, "II. Voz de la casa", 4);

  const introEnd = sectionOpener(
    doc,
    "II",
    "Capítulo segundo",
    "Autoridad serena, calidez contenida.",
    "La voz de Anclora Insights es su activo más reconocible después del emblema. Escribe como edita: con calma, con precisión y con la convicción de que el lector exigente es la única audiencia que importa."
  );

  // Tres principios
  const colW = (CONTENT_W - 16) / 3;
  const top = introEnd + 10;
  voicePrinciples.forEach((principle, index) => {
    const x = M + index * (colW + 8);
    serif(doc, "bold");
    doc.setFontSize(10);
    textColor(doc, colors.ink);
    doc.text(`0${index + 1}`, x, top);

    hairline(doc, x, top + 3.5, x + colW, colors.gold, 0.35);

    sans(doc, "semibold");
    doc.setFontSize(8.2);
    textColor(doc, colors.ink);
    addTextBox(doc, principle.title, x, top + 10, colW, { fontSize: 8.2, lineHeight: 4.4 });

    sans(doc);
    addTextBox(doc, principle.text, x, top + 24, colW, {
      fontSize: 7.2,
      lineHeight: 4.1,
      color: colors.body
    });
  });

  // Contraste Sí / No
  const half = (CONTENT_W - 8) / 2;
  const panelY = top + 52;
  const panelH = 78;

  // Panel SÍ (claro, oro)
  fill(doc, colors.white);
  draw(doc, colors.line);
  doc.setLineWidth(0.2);
  doc.rect(M, panelY, half, panelH, "FD");
  fill(doc, colors.gold);
  doc.rect(M, panelY, half, 0.8, "F");

  eyebrow(doc, "Así suena Anclora", M + 6, panelY + 10);
  let yy = panelY + 18;
  voiceContrast.yes.forEach((line) => {
    serif(doc, "italic");
    yy = addTextBox(doc, line, M + 6, yy, half - 12, {
      fontSize: 8.6,
      lineHeight: 5,
      color: colors.inkSoft
    }) + 6;
  });

  // Panel NO (oscuro)
  const noX = M + half + 8;
  fill(doc, colors.ink);
  doc.rect(noX, panelY, half, panelH, "F");

  eyebrow(doc, "Así no suena", noX + 6, panelY + 10, colors.gold);
  yy = panelY + 18;
  voiceContrast.no.forEach((line) => {
    sans(doc);
    yy = addTextBox(doc, line, noX + 6, yy, half - 12, {
      fontSize: 8.2,
      lineHeight: 5,
      color: colors.slateLight
    }) + 6;
  });

  sans(doc);
  addTextBox(
    doc,
    "Regla práctica: si una frase podría pertenecer a cualquier marca, no pertenece a esta. La prueba final de cada texto es la permanencia — ¿seguirá siendo cierto, útil y bien dicho dentro de cinco años?",
    M,
    panelY + panelH + 12,
    CONTENT_W,
    { fontSize: 8.5, lineHeight: 4.9, justify: true, color: colors.body }
  );

  addFooter(doc, 4);
}

/* ── 05 · El emblema ───────────────────────────────────────── */

function pageEmblem(
  doc: Pdf,
  medals: { gold: string; inverse: string },
  lockups: { gold: string; light: string }
) {
  lightPage(doc);
  addRunningHeader(doc, "III. El emblema", 5);

  const introEnd = sectionOpener(
    doc,
    "III",
    "Capítulo tercero",
    "La medalla: una estrella sobre el mar del conocimiento.",
    "El emblema de Anclora Insights une una estrella polar y tres olas que forman un libro abierto: la guía sobre el conocimiento. Existe en dos acabados — oro para fondos de tinta, inverso para fondos de papel — y nunca se redibuja ni se reinterpreta."
  );

  const half = (CONTENT_W - 8) / 2;
  const panelY = introEnd + 8;
  const panelH = 56;

  // Medalla oro sobre tinta
  fill(doc, colors.ink);
  doc.rect(M, panelY, half, panelH, "F");
  doc.addImage(medals.gold, "PNG", M + half / 2 - 11.5, panelY + 7, 23, 23.5);
  eyebrow(doc, "Medalla oro · sobre tinta", M + 6, panelY + panelH - 10, colors.gold);
  sans(doc);
  doc.setFontSize(6.8);
  textColor(doc, colors.slateLight);
  doc.text("Aplicaciones de honor y superficies oscuras.", M + 6, panelY + panelH - 4.5);

  // Medalla inversa sobre papel
  const invX = M + half + 8;
  fill(doc, colors.white);
  draw(doc, colors.line);
  doc.setLineWidth(0.2);
  doc.rect(invX, panelY, half, panelH, "FD");
  doc.addImage(medals.inverse, "PNG", invX + half / 2 - 11.5, panelY + 7, 23, 23.5);
  eyebrow(doc, "Medalla inversa · sobre papel", invX + 6, panelY + panelH - 10);
  sans(doc);
  doc.setFontSize(6.8);
  textColor(doc, colors.muted);
  doc.text("Documentos, cartelería clara y soportes impresos.", invX + 6, panelY + panelH - 4.5);

  // Lockups (proporción original 1966×449 ≈ 4.38:1, sin deformar)
  const lockY = panelY + panelH + 7;
  const lockH = 30;
  const lockW = 70;
  const lockImgH = lockW / 4.378;
  const lockImgY = lockY + (lockH - lockImgH) / 2;

  fill(doc, colors.ink);
  doc.rect(M, lockY, half, lockH, "F");
  doc.addImage(lockups.gold, "PNG", M + (half - lockW) / 2, lockImgY, lockW, lockImgH);

  fill(doc, colors.white);
  draw(doc, colors.line);
  doc.rect(invX, lockY, half, lockH, "FD");
  doc.addImage(lockups.light, "PNG", invX + (half - lockW) / 2, lockImgY, lockW, lockImgH);

  // Área de respeto y tamaños mínimos
  const ruleY = lockY + lockH + 11;
  const leftW = CONTENT_W * 0.52;

  eyebrow(doc, "Área de respeto", M, ruleY);
  sans(doc);
  addTextBox(
    doc,
    "Alrededor de la medalla se reserva un área libre equivalente a la altura de la estrella (x). Ningún texto, borde o elemento gráfico entra en ese perímetro.",
    M,
    ruleY + 6,
    leftW,
    { fontSize: 7.6, lineHeight: 4.3, justify: true }
  );

  // Diagrama: medalla con marco de respeto
  const diaX = M + leftW + 16;
  const diaSize = 24;
  draw(doc, colors.mutedGold);
  doc.setLineWidth(0.2);
  doc.setLineDashPattern([1.2, 1.2], 0);
  doc.rect(diaX - 4, ruleY - 4, diaSize + 8, diaSize + 9);
  doc.setLineDashPattern([], 0);
  doc.addImage(medals.inverse, "PNG", diaX, ruleY - 1, diaSize, diaSize + 1);
  sans(doc, "bold");
  doc.setFontSize(6);
  textColor(doc, colors.mutedGold);
  doc.text("x", diaX - 2.8, ruleY + 9);

  const minY = ruleY + 34;
  eyebrow(doc, "Tamaños mínimos", M, minY);
  sans(doc);
  addTextBox(
    doc,
    "Impresión: la medalla nunca por debajo de 12 mm de diámetro; el lockup, de 32 mm de anchura. Pantalla: 44 px y 120 px respectivamente. Por debajo de estos umbrales se usa únicamente la palabra «Anclora Insights» en texto.",
    M,
    minY + 6,
    CONTENT_W,
    { fontSize: 7.6, lineHeight: 4.3, justify: true }
  );

  addFooter(doc, 5);
}

/* ── 06 · Sistema cromático ────────────────────────────────── */

function pageColor(doc: Pdf) {
  lightPage(doc);
  addRunningHeader(doc, "IV. Sistema cromático", 6);

  const introEnd = sectionOpener(
    doc,
    "IV",
    "Capítulo cuarto",
    "Tinta, papel y oro: una paleta corta, deliberada.",
    "Cuatro colores bastan. El negro construye autoridad, el crema sostiene la lectura y el oro — en sus dos registros — marca la jerarquía real. La proporción importa tanto como el tono: la tinta domina, el papel respira, el oro apenas comparece."
  );

  // Barra de proporción
  const barY = introEnd + 10;
  const barH = 7;
  const shares: Array<[Rgb, number]> = [
    [colors.ink, 0.55],
    [colors.cream, 0.3],
    [colors.gold, 0.1],
    [colors.mutedGold, 0.05]
  ];
  let cursor = M;
  shares.forEach(([rgb, share]) => {
    const w = CONTENT_W * share;
    fill(doc, rgb);
    doc.rect(cursor, barY, w, barH, "F");
    cursor += w;
  });
  draw(doc, colors.line);
  doc.setLineWidth(0.15);
  doc.rect(M, barY, CONTENT_W, barH);

  sans(doc);
  doc.setFontSize(6.5);
  textColor(doc, colors.muted);
  doc.text("Proporción de uso recomendada en cualquier pieza: 55 · 30 · 10 · 5", M, barY + barH + 5);

  // Tarjetas de color
  const colW = (CONTENT_W - 8) / 2;
  const cardH = 50;
  const cardsTop = barY + 20;

  palette.forEach((swatch, index) => {
    const x = M + (index % 2) * (colW + 8);
    const y = cardsTop + Math.floor(index / 2) * (cardH + 7);

    fill(doc, colors.white);
    draw(doc, colors.line);
    doc.setLineWidth(0.2);
    doc.rect(x, y, colW, cardH, "FD");

    // Muestra de color
    fill(doc, swatch.hex === "#F8FAFC" ? colors.cream : (swatch.hex === "#0F172A" ? colors.ink : swatch.hex === "#F59E0B" ? colors.gold : colors.mutedGold));
    draw(doc, colors.line);
    doc.rect(x, y, 24, cardH, "FD");

    sans(doc, "bold");
    doc.setFontSize(9);
    textColor(doc, colors.ink);
    doc.text(swatch.name, x + 30, y + 8.5);

    sans(doc);
    doc.setFontSize(6.6);
    textColor(doc, colors.muted);
    doc.text(`${swatch.hex} · RGB ${swatch.rgb}`, x + 30, y + 13.5);

    serif(doc, "italic");
    doc.setFontSize(7.8);
    textColor(doc, colors.mutedGold);
    doc.text(`${swatch.role} · ${swatch.share} de la pieza`, x + 30, y + 20.5);

    sans(doc);
    addTextBox(doc, swatch.usage, x + 30, y + 27, colW - 36, {
      fontSize: 7.2,
      lineHeight: 4,
      justify: true
    });
  });

  // Combinaciones canónicas
  const comboY = cardsTop + cardH * 2 + 14;
  eyebrow(doc, "Combinaciones canónicas", M, comboY);

  const combos: Array<{ bg: Rgb; fg: Rgb; label: string; border?: boolean }> = [
    { bg: colors.ink, fg: colors.cream, label: "Tinta / Papel" },
    { bg: colors.ink, fg: colors.gold, label: "Tinta / Oro" },
    { bg: colors.cream, fg: colors.ink, label: "Papel / Tinta", border: true },
    { bg: colors.cream, fg: colors.mutedGold, label: "Papel / Oro mitigado", border: true }
  ];
  const comboW = (CONTENT_W - 24) / 4;
  combos.forEach((combo, index) => {
    const x = M + index * (comboW + 8);
    const y = comboY + 5;
    fill(doc, combo.bg);
    if (combo.border) draw(doc, colors.line);
    doc.setLineWidth(0.2);
    doc.rect(x, y, comboW, 18, combo.border ? "FD" : "F");

    serif(doc, "bold");
    doc.setFontSize(10);
    textColor(doc, combo.fg);
    doc.text("Aa", x + 4, y + 10);

    sans(doc);
    doc.setFontSize(6);
    doc.text(combo.label, x + 4, y + 15);
  });

  addFooter(doc, 6);
}

/* ── 07 · Tipografía ───────────────────────────────────────── */

function pageType(doc: Pdf) {
  lightPage(doc);
  addRunningHeader(doc, "V. Tipografía", 7);

  const introEnd = sectionOpener(
    doc,
    "V",
    "Capítulo quinto",
    "Una serif para pensar, una sans para trabajar.",
    "Libre Baskerville porta la voz editorial: titulares, citas y todo lo que aspira a permanecer. Inter porta la voz funcional: cuerpo, datos e interfaz. Nunca se intercambian los papeles; nunca entra una tercera familia."
  );

  // Muestras Aa
  const half = (CONTENT_W - 8) / 2;
  const sampleY = introEnd + 8;
  const sampleH = 52;

  fill(doc, colors.ink);
  doc.rect(M, sampleY, half, sampleH, "F");
  serif(doc, "normal");
  doc.setFontSize(38);
  textColor(doc, colors.cream);
  doc.text("Aa", M + 6, sampleY + 26);
  serif(doc, "italic");
  doc.setFontSize(9.5);
  textColor(doc, colors.gold);
  doc.text("Conocimiento", M + 6, sampleY + 36);
  eyebrow(doc, "Libre Baskerville", M + 6, sampleY + sampleH - 10.5, colors.gold);
  sans(doc);
  doc.setFontSize(6.2);
  textColor(doc, colors.slateLight);
  doc.text("Regular · Italic · Bold", M + 6, sampleY + sampleH - 5);

  const sansX = M + half + 8;
  fill(doc, colors.white);
  draw(doc, colors.line);
  doc.setLineWidth(0.2);
  doc.rect(sansX, sampleY, half, sampleH, "FD");
  sans(doc, "semibold");
  doc.setFontSize(36);
  textColor(doc, colors.ink);
  doc.text("Aa", sansX + 6, sampleY + 26);
  sans(doc);
  doc.setFontSize(9.5);
  textColor(doc, colors.mutedGold);
  doc.text("Criterio 0123456789", sansX + 6, sampleY + 36);
  eyebrow(doc, "Inter", sansX + 6, sampleY + sampleH - 10.5);
  sans(doc);
  doc.setFontSize(6.2);
  textColor(doc, colors.muted);
  doc.text("Regular · SemiBold · Bold", sansX + 6, sampleY + sampleH - 5);

  // Escala tipográfica
  const scaleY = sampleY + sampleH + 14;
  eyebrow(doc, "Escala de composición", M, scaleY);

  let rowY = scaleY + 8;
  typeScale.forEach((row) => {
    sans(doc, "bold");
    doc.setFontSize(6.8);
    textColor(doc, colors.muted);
    doc.text(row.use.toUpperCase(), M, rowY);

    if (row.family.startsWith("Libre")) {
      serif(doc, row.family.includes("Italic") ? "italic" : "bold");
    } else {
      sans(doc, row.family.includes("SemiBold") ? "semibold" : row.family.includes("Bold") ? "bold" : "normal");
    }
    doc.setFontSize(row.use === "Titular editorial" ? 15 : row.use === "Subtítulo" ? 11.5 : 8.6);
    textColor(doc, colors.ink);
    doc.text(row.sample, M + 34, rowY);

    sans(doc);
    doc.setFontSize(6.6);
    textColor(doc, colors.muted);
    doc.text(row.family, M + 34, rowY + 4.6);
    doc.text(row.size, PAGE_W - M, rowY + 4.6, { align: "right" });

    hairline(doc, M, rowY + 8, PAGE_W - M, colors.line, 0.15);
    rowY += row.use === "Titular editorial" ? 21 : 15;
  });

  sans(doc);
  addTextBox(
    doc,
    "Interlineado editorial: 150 % del cuerpo en lectura larga, 120 % en titulares. Los epígrafes en mayúsculas llevan tracking generoso (+16 %). Las cursivas de Baskerville se reservan para citas y énfasis de voz, nunca para párrafos completos.",
    M,
    rowY + 6,
    CONTENT_W,
    { fontSize: 8, lineHeight: 4.7, justify: true, color: colors.body }
  );

  addFooter(doc, 7);
}

/* ── 08 · Uso y gobernanza ─────────────────────────────────── */

function pageGovernance(doc: Pdf, lockupGold: string) {
  lightPage(doc);
  addRunningHeader(doc, "VI. Uso y gobernanza", 8);

  const introEnd = sectionOpener(
    doc,
    "VI",
    "Capítulo sexto",
    "Reglas mínimas para una marca que dura.",
    "Seis reglas gobiernan cualquier aplicación de esta identidad. Son pocas y son innegociables: la coherencia acumulada es lo que convierte un logotipo en un sello."
  );

  const colW = (CONTENT_W - 8) / 2;
  const cardH = 30;
  const cardsTop = introEnd + 10;

  usageRules.forEach((rule, index) => {
    const x = M + (index % 2) * (colW + 8);
    const y = cardsTop + Math.floor(index / 2) * (cardH + 7);

    fill(doc, colors.white);
    draw(doc, colors.line);
    doc.setLineWidth(0.2);
    doc.rect(x, y, colW, cardH, "FD");

    serif(doc, "normal");
    doc.setFontSize(11);
    textColor(doc, colors.mutedGold);
    doc.text(String(index + 1).padStart(2, "0"), x + 5, y + 11);

    sans(doc, "bold");
    doc.setFontSize(8);
    textColor(doc, colors.ink);
    doc.text(rule.title, x + 15, y + 8.5);

    sans(doc);
    addTextBox(doc, rule.text, x + 15, y + 14.5, colW - 20, {
      fontSize: 6.9,
      lineHeight: 3.7,
      color: colors.body
    });
  });

  // Cierre oscuro
  const closeY = cardsTop + cardH * 3 + 7 + 12;
  const closeH = PAGE_H - closeY - 24;
  fill(doc, colors.inkDeep);
  doc.rect(0, closeY, PAGE_W, closeH + 24, "F");

  doc.addImage(lockupGold, "PNG", PAGE_W / 2 - 45, closeY + 16, 90, 20.5);

  serif(doc, "italic");
  doc.setFontSize(10);
  textColor(doc, colors.slateLight);
  const closing = "La identidad no se aplica: se habita.";
  const closingW = doc.getTextWidth(closing);
  doc.text(closing, (PAGE_W - closingW) / 2, closeY + 48);

  sans(doc, "bold");
  doc.setFontSize(6.5);
  textColor(doc, colors.gold);
  const closingMeta = `ANCLORA INSIGHTS · MANUAL DE IDENTIDAD ${VERSION} · ${EDITION.toUpperCase()}`;
  const tracking = 1.2;
  const closingMetaW = doc.getTextWidth(closingMeta) + tracking * (closingMeta.length - 1);
  doc.setCharSpace(tracking);
  doc.text(closingMeta, (PAGE_W - closingMetaW) / 2, closeY + 58);
  doc.setCharSpace(0);

  addFooter(doc, 8, true);
}

/* ── Generación ────────────────────────────────────────────── */

export async function buildBrandGuidelinesDoc(): Promise<jsPDF> {
  const [heroCrop, goldMedal, inverseMedal, lockupGold, lockupLight] = await Promise.all([
    toDataUrl(heroEditorialCropUrl),
    toDataUrl(goldMedalUrl),
    toDataUrl(inverseMedalUrl),
    toDataUrl(lockupGoldUrl),
    toDataUrl(lockupLightUrl)
  ]);

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true
  });
  await registerFonts(doc);

  doc.setProperties({
    title: "Anclora Insights — Manual de Identidad Editorial",
    subject: "Sistema visual y verbal del sello editorial de Anclora Group",
    author: "Anclora Group",
    creator: "Anclora Insights",
    keywords: "branding, identidad, editorial, Anclora Insights, manual de marca"
  });

  pageCover(doc, heroCrop, goldMedal);
  pageColophon(doc, goldMedal);
  pageDna(doc);
  pageVoice(doc);
  pageEmblem(doc, { gold: goldMedal, inverse: inverseMedal }, { gold: lockupGold, light: lockupLight });
  pageColor(doc);
  pageType(doc);
  pageGovernance(doc, lockupGold);

  return doc;
}

export async function generateBrandGuidelinesPDF(onProgress?: (text: string) => void) {
  onProgress?.("Preparando tipografías y assets...");

  onProgress?.("Maquetando manual editorial...");
  const doc = await buildBrandGuidelinesDoc();

  onProgress?.("Descargando manual final...");
  doc.save("Anclora_Insights_Manual_de_Identidad.pdf");
}
