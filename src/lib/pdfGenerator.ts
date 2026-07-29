import jsPDF from "jspdf";
import heroEditorialCropUrl from "../../assets/anclora-insights-hero-editorial-crop.png";
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
const GAP = 9;
const CONTENT_W = PAGE_W - M * 2;
const COL_W = (PAGE_W - M * 2 - GAP) / 2;

const colors = {
  ink: [15, 23, 42] as const,
  cream: [248, 250, 252] as const,
  gold: [245, 158, 11] as const,
  mutedGold: [217, 119, 6] as const,
  line: [218, 225, 235] as const,
  body: [45, 55, 72] as const,
  muted: [100, 116, 139] as const,
  white: [255, 255, 255] as const
};

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

const dnaBlocks = [
  {
    title: "Propósito",
    text: "Transformar complejidad en criterio. Anclora Insights no compite por volumen ni velocidad: filtra, ordena y presenta conocimiento con profundidad suficiente para que conserve valor después del primer impacto."
  },
  {
    title: "Promesa",
    text: "Ahorrar tiempo cognitivo al lector exigente. Cada pieza debe separar señal de ruido, reducir fricción interpretativa y entregar una síntesis útil, elegante y verificable."
  },
  {
    title: "Territorio",
    text: "Curaduría editorial, análisis estratégico, economía del conocimiento y desarrollo intelectual aplicado. La marca evita la urgencia artificial y privilegia la permanencia."
  },
  {
    title: "Tono",
    text: "Autoridad serena, claridad conceptual y calidez contenida. La voz debe sonar precisa, humana y madura, nunca publicitaria ni grandilocuente."
  }
];

const visualRules = [
  ["Negro Tinta", "#0F172A", colors.ink, "Fondos inmersivos, titulares principales y superficies de autoridad."],
  ["Crema Papel", "#F8FAFC", colors.cream, "Base editorial clara, descansada y legible para lectura prolongada."],
  ["Oro Metálico", "#F59E0B", colors.gold, "Acentos de jerarquía: sellos, líneas, llamadas y microdetalles."],
  ["Oro Mitigado", "#D97706", colors.mutedGold, "Estados secundarios, énfasis suaves y variaciones de apoyo."]
] as const;

const usageGuidelines = [
  "Usar espacios amplios, márgenes consistentes y contraste alto.",
  "Reservar el oro para jerarquía real; nunca como relleno decorativo.",
  "Evitar fondos con ruido excesivo detrás de textos o logotipos.",
  "No deformar, recortar ni rasterizar la medalla o el lockup.",
  "Mantener titulares en Libre Baskerville y cuerpo en Inter.",
  "Priorizar frases breves, verbos concretos y conclusiones accionables."
];

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

function addHeader(doc: Pdf, page: number) {
  draw(doc, colors.line);
  doc.setLineWidth(0.25);
  doc.line(M, 17, PAGE_W - M, 17);

  sans(doc, "bold");
  doc.setFontSize(7.5);
  textColor(doc, colors.mutedGold);
  doc.text("ANCLORA INSIGHTS", M, 12.5);

  sans(doc);
  textColor(doc, colors.muted);
  doc.text(`Manual de Identidad v2.2 · A4 · Página ${page}`, PAGE_W - M, 12.5, { align: "right" });
}

function addFooter(doc: Pdf, page: number, dark = false) {
  draw(doc, dark ? colors.gold : colors.line);
  doc.setLineWidth(0.25);
  doc.line(M, PAGE_H - 17, PAGE_W - M, PAGE_H - 17);

  sans(doc);
  doc.setFontSize(7);
  textColor(doc, dark ? [203, 213, 225] : colors.muted);
  doc.text("Sello editorial de alta autoridad de Anclora Group", M, PAGE_H - 11.5);
  doc.text(String(page).padStart(2, "0"), PAGE_W - M, PAGE_H - 11.5, { align: "right" });
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
    const gap = Math.min(2.8, Math.max(1, (width - wordsWidth) / (words.length - 1)));
    let cursorX = x;

    words.forEach((word) => {
      doc.text(word, cursorX, y + index * lineHeight);
      cursorX += doc.getTextWidth(word) + gap;
    });
  });

  return y + lines.length * lineHeight;
}

function sectionTitle(doc: Pdf, eyebrow: string, title: string, x: number, y: number, width: number) {
  sans(doc, "bold");
  doc.setFontSize(7.2);
  textColor(doc, colors.gold);
  doc.text(eyebrow.toUpperCase(), x, y);

  serif(doc, "bold");
  doc.setFontSize(15.5);
  textColor(doc, colors.ink);
  const lines = doc.splitTextToSize(title, width) as string[];
  doc.text(lines, x, y + 9);

  return y + 9 + lines.length * 7.5;
}

function card(doc: Pdf, x: number, y: number, w: number, h: number, title: string, body: string) {
  fill(doc, colors.white);
  draw(doc, colors.line);
  doc.setLineWidth(0.25);
  doc.roundedRect(x, y, w, h, 2, 2, "FD");

  sans(doc, "bold");
  doc.setFontSize(8);
  textColor(doc, colors.ink);
  doc.text(title, x + 5, y + 8);

  sans(doc);
  addTextBox(doc, body, x + 5, y + 16, w - 10, {
    fontSize: 7.4,
    lineHeight: 4.4,
    justify: true
  });
}

function pageCover(doc: Pdf, hero: string, medal: string) {
  fill(doc, colors.ink);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");

  draw(doc, [31, 41, 58]);
  doc.setLineWidth(0.35);
  doc.roundedRect(104, 42, 76, 73, 4, 4, "S");
  doc.addImage(hero, "PNG", 101, 39, 82, 79);

  doc.addImage(medal, "PNG", M, 56, 22, 22);
  draw(doc, colors.gold);
  doc.setLineWidth(0.3);
  doc.line(M + 31, 58, M + 31, 77);
  serif(doc);
  doc.setFontSize(14);
  textColor(doc, colors.cream);
  doc.text("Anclora Insights", M + 39, 70);

  sans(doc, "bold");
  doc.setFontSize(8);
  textColor(doc, colors.gold);
  doc.text("MANUAL DE IDENTIDAD EDITORIAL", M, 147);

  serif(doc, "bold");
  doc.setFontSize(31);
  textColor(doc, colors.cream);
  doc.text("Anclora Insights", M, 166);

  sans(doc);
  addTextBox(
    doc,
    "Sistema visual y verbal para un sello editorial de alta autoridad: sobrio, legible, selectivo y profundamente respetuoso con el tiempo del lector.",
    M,
    185,
    142,
    { fontSize: 9, lineHeight: 5.1, color: [226, 232, 240] }
  );

  draw(doc, colors.gold);
  doc.setLineWidth(0.35);
  doc.line(M, 225, PAGE_W - M, 225);

  sans(doc);
  doc.setFontSize(8);
  textColor(doc, [203, 213, 225]);
  doc.text("Formato A4 · 210 x 297 mm · Tipografía embebida", M, 239);

  addFooter(doc, 1, true);
}

function pageIdentity(doc: Pdf, medal: string) {
  doc.addPage();
  fill(doc, colors.cream);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  addHeader(doc, 2);

  const leftX = M;
  const rightX = M + COL_W + GAP;

  let y = sectionTitle(doc, "I. ADN editorial", "Una marca para conocimiento que permanece.", leftX, 36, CONTENT_W);

  sans(doc);
  y = addTextBox(
    doc,
    "Anclora Insights transforma complejidad en criterio. No compite por volumen ni velocidad: filtra, ordena y presenta conocimiento con profundidad suficiente para conservar valor después del primer impacto. La marca debe comunicar autoridad sin rigidez, calidez sin informalidad y belleza sin exceso ornamental.",
    leftX,
    y + 6,
    CONTENT_W,
    { fontSize: 8.7, lineHeight: 5, justify: true }
  );

  const cardTop = y + 9;
  card(doc, leftX, cardTop, COL_W, 48, dnaBlocks[0].title, dnaBlocks[0].text);
  card(doc, rightX, cardTop, COL_W, 48, dnaBlocks[1].title, dnaBlocks[1].text);
  card(doc, leftX, cardTop + 56, COL_W, 48, dnaBlocks[2].title, dnaBlocks[2].text);
  card(doc, rightX, cardTop + 56, COL_W, 48, dnaBlocks[3].title, dnaBlocks[3].text);

  const logoY = cardTop + 120;
  fill(doc, colors.ink);
  doc.roundedRect(leftX, logoY, CONTENT_W, 45, 3, 3, "F");
  doc.addImage(medal, "PNG", leftX + 12, logoY + 10, 23, 23);
  draw(doc, colors.gold);
  doc.line(leftX + 43, logoY + 13, leftX + 43, logoY + 32);
  serif(doc);
  doc.setFontSize(15);
  textColor(doc, colors.cream);
  doc.text("Anclora Insights", leftX + 51, logoY + 27);

  addFooter(doc, 2);
}

function pageSystem(doc: Pdf) {
  doc.addPage();
  fill(doc, colors.cream);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  addHeader(doc, 3);

  const leftX = M;
  const rightX = M + COL_W + GAP;

  let y = sectionTitle(doc, "II. Sistema visual", "Tinta, papel y oro como estructura de prestigio sobrio.", leftX, 36, CONTENT_W);

  sans(doc);
  y = addTextBox(
    doc,
    "El sistema visual se apoya en una paleta corta, tipografía editorial y márgenes constantes. El oro marca jerarquía real; el negro construye autoridad; el crema aporta tactilidad y descanso visual.",
    leftX,
    y + 6,
    CONTENT_W,
    { fontSize: 8.7, lineHeight: 5, justify: true }
  );

  visualRules.forEach(([name, hex, rgb, description], index) => {
    const x = index % 2 === 0 ? leftX : rightX;
    const yy = y + 10 + Math.floor(index / 2) * 40;
    fill(doc, rgb);
    draw(doc, colors.line);
    doc.roundedRect(x, yy, 27, 24, 2, 2, "FD");

    sans(doc, "bold");
    doc.setFontSize(8);
    textColor(doc, colors.ink);
    doc.text(name, x + 32, yy + 7);
    sans(doc);
    doc.setFontSize(7.2);
    textColor(doc, colors.muted);
    doc.text(hex, x + 32, yy + 13);
    addTextBox(doc, description, x + 32, yy + 20, COL_W - 34, { fontSize: 6.8, lineHeight: 3.8 });
  });

  const rulesY = y + 100;
  sectionTitle(doc, "III. Uso y gobernanza", "Reglas mínimas de aplicación.", leftX, rulesY, CONTENT_W);

  usageGuidelines.forEach((rule, index) => {
    const x = index % 2 === 0 ? leftX : rightX;
    const yy = rulesY + 38 + Math.floor(index / 2) * 25;
    fill(doc, colors.white);
    draw(doc, colors.line);
    doc.roundedRect(x, yy, COL_W, 18, 2, 2, "FD");
    sans(doc, "bold");
    doc.setFontSize(7);
    textColor(doc, colors.gold);
    doc.text(String(index + 1).padStart(2, "0"), x + 5, yy + 10.5);
    sans(doc);
    addTextBox(doc, rule, x + 17, yy + 8, COL_W - 22, { fontSize: 6.9, lineHeight: 3.7 });
  });

  addFooter(doc, 3);
}

export async function generateBrandGuidelinesPDF(onProgress?: (text: string) => void) {
  onProgress?.("Preparando manual A4...");

  const [heroImage, medalImage] = await Promise.all([toDataUrl(heroEditorialCropUrl), toDataUrl(goldMedalUrl)]);

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true
  });
  await registerFonts(doc);

  doc.setProperties({
    title: "Anclora Insights Brand Guidelines",
    subject: "Manual de identidad editorial A4",
    author: "Anclora Group",
    creator: "Anclora Insights"
  });

  onProgress?.("Maquetando portada...");
  pageCover(doc, heroImage, medalImage);
  onProgress?.("Maquetando identidad...");
  pageIdentity(doc, medalImage);
  onProgress?.("Maquetando sistema visual...");
  pageSystem(doc);

  onProgress?.("Descargando manual final...");
  doc.save("Anclora_Insights_Brand_Guidelines.pdf");
}
