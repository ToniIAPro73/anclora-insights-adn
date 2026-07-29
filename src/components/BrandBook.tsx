import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, Type, AlertCircle, Info, ArrowUpRight, Search, ChevronDown, ChevronUp, BookMarked } from "lucide-react";
import { ColorSwatch, LogoVariation, FontSpecimen, EditorialGuideline } from "../types";
import goldLockupUrl from "../../assets/anclora-insights-lockup-oro-transparente.png";
import lightLockupUrl from "../../assets/anclora-insights-lockup-light-transparente.png";
import goldMedalUrl from "../../assets/anclora-insights-medalla-oro-transparente.png";
import inverseMedalUrl from "../../assets/anclora-insights-medalla-inverso-transparente.png";

interface BrandBookProps {
  darkMode: boolean;
}

const colorSwatches: ColorSwatch[] = [
  {
    name: "Oro Metálico (Metallic Gold)",
    hex: "#F59E0B",
    rgb: "245, 158, 11",
    cmyk: "0, 35, 96, 4",
    usage: "Usado para acentos de alta jerarquía, firmas, llamadas a la acción, líneas decorativas y símbolos destacados.",
    type: "primary"
  },
  {
    name: "Negro Tinta (Ink Black)",
    hex: "#0F172A",
    rgb: "15, 23, 42",
    cmyk: "64, 45, 0, 84",
    usage: "Base estructural, tipografía principal en modo claro y fondo inmersivo en modo oscuro.",
    type: "secondary"
  },
  {
    name: "Crema Papel (Paper Cream)",
    hex: "#F8FAFC",
    rgb: "248, 250, 252",
    cmyk: "2, 1, 0, 1",
    usage: "Color de fondo principal en modo claro. Aporta tactilidad y reduce la fatiga visual digital.",
    type: "neutral"
  },
  {
    name: "Oro Mitigado (Muted Gold)",
    hex: "#D97706",
    rgb: "217, 119, 6",
    cmyk: "0, 45, 97, 15",
    usage: "Sub-acentos, bordes secundarios, etiquetas secundarias o estados de interacción hover.",
    type: "support"
  }
];

const logoVariations: LogoVariation[] = [
  {
    id: "main-lockup",
    name: "Logo Lockup Principal",
    description: "La combinación horizontal de nuestro sello 'Medalla' y la tipografía serif elegante. Perfectamente equilibrado.",
    url: goldLockupUrl,
    recommendedUse: "Cabeceras de sitios web, portadas de informes, material de prensa oficial y papelería corporativa premium.",
    bgColorClass: "dynamic"
  },
  {
    id: "gold-medal",
    name: "Símbolo: La Medalla",
    description: "Sello circular representativo con un ancla heráldica abstracta y la estrella del conocimiento en oro metálico.",
    url: goldMedalUrl,
    recommendedUse: "Perfiles de redes sociales, contraportadas, marcas de agua, y elementos circulares físicos.",
    bgColorClass: "bg-[#0F172A]"
  },
  {
    id: "solid-inverse",
    name: "Símbolo Inverso / Sólido",
    description: "Versión de alto contraste del símbolo principal, optimizada para aplicaciones sobre fondos dorados o de color continuo.",
    url: lightLockupUrl,
    recommendedUse: "Estampados físicos, impresión a un solo color, sellos de lacre, y texturas de fondo.",
    bgColorClass: "bg-[#F59E0B]"
  },
  {
    id: "favicon-app",
    name: "Sello Favicon & App Icon",
    description: "La expresión mínima del logotipo en formato cuadrado de bordes suaves, ideal para interfaces web y móviles.",
    url: inverseMedalUrl,
    recommendedUse: "Pestaña de navegador (favicon), iconos de aplicación móvil, accesos directos de escritorio.",
    bgColorClass: "bg-stone-100 border"
  }
];

const fontSpecimens: FontSpecimen[] = [
  {
    name: "Tipografía de Titulares (Display)",
    family: "Libre Baskerville",
    weight: "400 & Regular Italic",
    size: "40px - 64px",
    lineHeight: "1.2",
    description: "Una tipografía serif con un profundo peso histórico y literario. Sus remates elegantes y alto contraste de trazos transmiten autoridad intelectual e invitan a una lectura reflexiva.",
    exampleText: "La Curaduría del Conocimiento"
  },
  {
    name: "Tipografía de Cuerpo (San Serif)",
    family: "Inter",
    weight: "400 (Regular) & 600 (Semibold)",
    size: "16px - 18px",
    lineHeight: "1.6",
    description: "Una tipografía sans-serif moderna y geométrica con detalles humanistas. Diseñada para mantener una legibilidad absoluta en textos largos en pantallas, reduciendo la fatiga cognitiva del lector.",
    exampleText: "Investigaciones detalladas y análisis estratégicos de alta autoridad intelectual."
  }
];

const editorialGuidelines: EditorialGuideline[] = [
  {
    term: "El nuevo post de nuestro blog corporativo...",
    replacement: "La última entrega de nuestro cuaderno de análisis...",
    why: "Evitamos la terminología genérica y de masas ('post', 'blog') para elevar el formato al de una publicación editorial de prestigio ('entrega', 'cuaderno de análisis').",
    category: "forbidden"
  },
  {
    term: "¡Hacer click aquí ya mismo!",
    replacement: "Explorar el análisis completo.",
    why: "El uso de imperativos agresivos, exclamaciones e inmediatez comercial destruye la calidez y el sosiego intelectual de la marca.",
    category: "forbidden"
  },
  {
    term: "Contenido, información, posts.",
    replacement: "Narrativas, ensayos, insights, curaduría.",
    why: "El 'contenido' se consume; las 'narrativas' se comprenden. Buscamos posicionar cada lectura como una pieza de gran valor intelectual.",
    category: "recommended"
  },
  {
    term: "Rápido, instantáneo, fácil.",
    replacement: "Sintético, estructurado, profundo.",
    why: "No vendemos soluciones milagrosas ni inmediatez. Ofrecemos síntesis brillante y rigor estratégico para ahorrar tiempo real al lector.",
    category: "recommended"
  }
];

interface GlossaryItem {
  term: string;
  definition: string;
  category: string;
}

const glossaryItems: GlossaryItem[] = [
  {
    term: "ADN de Negocio (Business DNA)",
    definition: "El núcleo intelectual, estratégico y de propósito del sello editorial bajo Anclora Group. Rige todas las decisiones de diseño, curaduría y dirección, priorizando la permanencia física de las ideas en soportes digitales y el respeto reverencial por el tiempo de lectura.",
    category: "Filosofía"
  },
  {
    term: "Minimalismo Táctil (Tactile Minimalism)",
    definition: "Estilo estético e interactivo que emula la calidez, textura y quietud de una edición clásica impresa. Se fundamenta en amplios espacios negativos, tipografías refinadas de titulares y micro-interacciones serenas, evitando la fatiga cognitiva del lector digital.",
    category: "Diseño"
  },
  {
    term: "Alta Autoridad Intelectual (High Authority)",
    definition: "El estándar analítico de rigor absoluto aplicado a cada una de nuestras publicaciones. Proclama que todos los análisis estratégicos, datos y reflexiones se asientan sobre fuentes fidedignas primarias y un escrutinio racional imparcial.",
    category: "Rigor"
  },
  {
    term: "Curaduría Extrema (Extreme Curation)",
    definition: "Metodología editorial de filtro drástico que prioriza la profundidad sintética ante la cantidad masiva. Cada entrega del catálogo es sometida a un riguroso análisis donde se descarta el ruido transitorio en pos de la relevancia conceptual.",
    category: "Proceso"
  },
  {
    term: "Prestigio Sobrio (Sober Prestige)",
    definition: "Filosofía expresiva de nuestro tono de voz que prescinde de la hipérbole publicitaria, los imperativos estridentes, exclamaciones o clichés comerciales, utilizando en su lugar un tono conversacional sofisticado, maduro y certero.",
    category: "Voz"
  },
  {
    term: "Gobernanza de Identidad (Identity Governance)",
    definition: "Conjunto de directrices formales, ortotipográficas y cromáticas diseñadas para vigilar y resguardar la consistencia íntegra del sello editorial Anclora Insights en todas sus manifestaciones impresas, corporativas o digitales.",
    category: "Estructura"
  }
];

export default function BrandBook({ darkMode }: BrandBookProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [customText, setCustomText] = useState<string>("");
  const [selectedLogo, setSelectedLogo] = useState<string>("main-lockup");
  const [glossarySearch, setGlossarySearch] = useState("");
  const [expandedGlossaryItems, setExpandedGlossaryItems] = useState<Record<string, boolean>>({});
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState<string>("all");

  const toggleGlossaryItem = (term: string) => {
    setExpandedGlossaryItems(prev => ({
      ...prev,
      [term]: !prev[term]
    }));
  };

  const glossaryCategories = ["all", ...Array.from(new Set(glossaryItems.map(item => item.category)))];

  const filteredGlossaryItems = glossaryItems.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(glossarySearch.toLowerCase()) || 
                          item.definition.toLowerCase().includes(glossarySearch.toLowerCase());
    const matchesCategory = selectedGlossaryCategory === "all" || item.category === selectedGlossaryCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const activeLogoData = logoVariations.find(v => v.id === selectedLogo) || logoVariations[0];

  return (
    <div className="space-y-24">
      {/* Logos & Variations */}
      <div className="space-y-12">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-metallic-gold font-semibold block">
            Identidad Visual
          </span>
          <h3 className={`font-serif text-3xl md:text-4xl ${darkMode ? "text-paper-cream" : "text-ink-black"}`}>
            Arquitectura de Logotipos
          </h3>
          <p className={`max-w-2xl text-sm md:text-base ${darkMode ? "text-paper-cream/70" : "text-on-surface-variant"}`}>
            Nuestro logotipo encarna la dualidad entre la tradición de la imprenta clásica y la agilidad estratégica contemporánea. 
            Utiliza una abstracción de un ancla integrada en un sello heráldico tradicional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Selector List */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {logoVariations.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedLogo(v.id)}
                className={`p-5 text-left border rounded-lg transition-all duration-300 flex flex-col justify-between ${
                  selectedLogo === v.id
                    ? darkMode
                      ? "bg-[#0F172A] border-metallic-gold text-paper-cream shadow-sm"
                      : "bg-white border-metallic-gold text-ink-black shadow-sm"
                    : darkMode
                      ? "bg-transparent border-metallic-gold/15 text-paper-cream/60 hover:border-metallic-gold/30 hover:text-paper-cream"
                      : "bg-transparent border-metallic-gold/10 text-on-surface-variant/70 hover:border-metallic-gold/25 hover:text-ink-black"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-serif text-base font-semibold">{v.name}</span>
                  <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${
                    selectedLogo === v.id ? "translate-x-0.5 -translate-y-0.5 text-metallic-gold" : "opacity-40"
                  }`} />
                </div>
                <p className="text-xs mt-2 opacity-80 line-clamp-1">{v.description}</p>
              </button>
            ))}
          </div>

          {/* Right Visualizer Frame */}
          <div className="lg:col-span-8 flex flex-col justify-between border rounded-xl overflow-hidden shadow-sm"
               style={{ borderColor: darkMode ? "rgba(224, 176, 100, 0.15)" : "rgba(224, 176, 100, 0.12)" }}>
            
            {/* Visual Canvas */}
            <div className={`flex-1 p-12 md:p-16 flex items-center justify-center transition-colors duration-500 relative overflow-hidden ${
              activeLogoData.bgColorClass === "dynamic"
                ? darkMode
                  ? "bg-gradient-to-br from-ink-black via-ink-black to-ink-black/70"
                  : "bg-gradient-to-br from-paper-cream via-paper-cream to-[#f5f3f0]"
                : activeLogoData.bgColorClass
            }`}>
              {/* Decorative elements for dynamic backgrounds */}
              {activeLogoData.bgColorClass === "dynamic" && (
                <div className={`absolute inset-0 opacity-20 pointer-events-none ${
                  darkMode ? "bg-radial-gold" : "bg-radial-subtle"
                }`} style={{
                  background: darkMode 
                    ? "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 70%)"
                    : "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 70%)"
                }} />
              )}
              
              <motion.img
                key={activeLogoData.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                alt={activeLogoData.name}
                src={
                  activeLogoData.id === "main-lockup" && !darkMode
                    ? lightLockupUrl
                    : activeLogoData.url
                }
                className={`max-h-40 md:max-h-48 object-contain select-none relative z-10 transition-all duration-500 ${
                  activeLogoData.bgColorClass === "dynamic"
                    ? darkMode
                      ? "drop-shadow-[0_10px_30px_rgba(245,158,11,0.15)]"
                      : "drop-shadow-[0_5px_15px_rgba(15,23,42,0.08)]"
                    : "drop-shadow-md"
                }`}
              />
            </div>
            <div className={`p-6 md:p-8 border-t ${
              darkMode ? "bg-[#0F172A] border-metallic-gold/15 text-paper-cream" : "bg-white border-metallic-gold/10 text-ink-black"
            }`}>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-metallic-gold font-semibold">Uso Recomendado</h4>
                  <p className="text-sm mt-1 opacity-95">{activeLogoData.recommendedUse}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-metallic-gold/10 pt-4 text-xs">
                  <div>
                    <span className="opacity-60 block">Área de Seguridad</span>
                    <span className="font-semibold mt-0.5 block">1x Altura de 'A' Mayúscula</span>
                  </div>
                  <div>
                    <span className="opacity-60 block">Tamaño Mínimo Recomendado</span>
                    <span className="font-semibold mt-0.5 block">Impresión: 25mm | Digital: 120px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Palette Bento Swatches */}
      <div className="space-y-12">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-metallic-gold font-semibold block">
            Cromatismo Editorial
          </span>
          <h3 className={`font-serif text-3xl md:text-4xl ${darkMode ? "text-paper-cream" : "text-ink-black"}`}>
            Paleta de Colores Exclusiva
          </h3>
          <p className={`max-w-2xl text-sm md:text-base ${darkMode ? "text-paper-cream/70" : "text-on-surface-variant"}`}>
            La tríada fundamental de Anclora Insights se inspira en el papel premium, la tinta densa y los grabados de metal noble. 
            Haz clic en cualquier color para copiar su código hexadecimal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {colorSwatches.map((color) => {
            const isCopied = copiedColor === color.hex;
            return (
              <motion.div
                key={color.hex}
                whileHover={{ y: -6 }}
                onClick={() => copyToClipboard(color.hex)}
                className={`border rounded-xl overflow-hidden cursor-pointer shadow-sm relative group flex flex-col justify-between h-full ${
                  darkMode ? "bg-[#0F172A] border-metallic-gold/15" : "bg-white border-metallic-gold/10"
                }`}
              >
                <div>
                  {/* Visual Color Block */}
                  <div className="h-40 relative" style={{ backgroundColor: color.hex }}>
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-black/40 text-white text-xs px-3 py-1.5 rounded backdrop-blur-sm flex items-center gap-1">
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {isCopied ? "¡Copiado!" : "Copiar HEX"}
                      </span>
                    </div>
                  </div>

                  {/* Info Card */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-serif text-lg leading-tight font-semibold ${darkMode ? "text-paper-cream" : "text-ink-black"}`}>
                          {color.name}
                        </h4>
                        <span className="text-xs text-metallic-gold font-semibold uppercase tracking-wider block mt-1">
                          {color.type}
                        </span>
                      </div>
                    </div>
                    <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? "text-paper-cream/75" : "text-on-surface-variant"}`}>
                      {color.usage}
                    </p>
                  </div>
                </div>

                {/* Values Footer */}
                <div className={`p-4 border-t ${
                  darkMode ? "bg-black/20 border-metallic-gold/10 text-paper-cream/80" : "bg-stone-50 border-metallic-gold/10 text-ink-black/80"
                } text-xs font-mono grid grid-cols-2 gap-2`}>
                  <div>
                    <span className="opacity-50 text-[10px] block">HEX</span>
                    <span className="font-semibold block">{color.hex}</span>
                  </div>
                  <div>
                    <span className="opacity-50 text-[10px] block">RGB</span>
                    <span className="font-semibold block">{color.rgb}</span>
                  </div>
                  <div className="col-span-2 border-t border-metallic-gold/10 pt-2">
                    <span className="opacity-50 text-[10px] block">CMYK</span>
                    <span className="font-semibold block">{color.cmyk}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Typography Specimens & Dynamic Testing */}
      <div className="space-y-12">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-metallic-gold font-semibold block">
            Tipografías de la Edición
          </span>
          <h3 className={`font-serif text-3xl md:text-4xl ${darkMode ? "text-paper-cream" : "text-ink-black"}`}>
            Sistemas Tipográficos Alta Jerarquía
          </h3>
          <p className={`max-w-2xl text-sm md:text-base ${darkMode ? "text-paper-cream/70" : "text-on-surface-variant"}`}>
            Nuestra jerarquía visual se basa en una dualidad clásica-contemporánea: Libre Caslon Text para una voz literaria 
            y Manrope para una interfaz fluida e impecablemente legible.
          </p>
        </div>

        {/* Specimens cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {fontSpecimens.map((specimen, idx) => (
            <div
              key={idx}
              className={`p-8 md:p-10 border rounded-xl flex flex-col justify-between ${
                darkMode ? "bg-[#0F172A] border-metallic-gold/15 text-paper-cream" : "bg-white border-metallic-gold/10 text-ink-black"
              } shadow-sm`}
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-metallic-gold/10 pb-4">
                  <span className="text-xs uppercase tracking-widest text-metallic-gold font-semibold">
                    {specimen.name}
                  </span>
                  <span className="text-xs font-mono opacity-60">
                    {specimen.weight}
                  </span>
                </div>

                <div className="py-6">
                  {/* Styled Render based on font family */}
                  <p 
                    style={{ fontFamily: specimen.family }}
                    className={`${specimen.family === "Libre Caslon Text" ? "font-serif text-3xl md:text-4xl italic" : "font-sans text-xl md:text-2xl font-normal"} leading-snug`}
                  >
                    {customText || specimen.exampleText}
                  </p>
                </div>

                <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? "text-paper-cream/80" : "text-on-surface-variant"}`}>
                  {specimen.description}
                </p>
              </div>

              <div className="mt-8 border-t border-metallic-gold/10 pt-4 grid grid-cols-2 gap-4 text-xs font-mono opacity-80">
                <div>
                  <span className="opacity-60 block">Familia</span>
                  <span className="font-semibold block">{specimen.family}</span>
                </div>
                <div>
                  <span className="opacity-60 block">Interlineado</span>
                  <span className="font-semibold block">{specimen.lineHeight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic testing input */}
        <div className={`p-6 border rounded-lg ${
          darkMode ? "bg-slate-950/40 border-metallic-gold/20" : "bg-white border-metallic-gold/15"
        }`}>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-metallic-gold/10 flex items-center justify-center shrink-0">
              <Type className="w-5 h-5 text-metallic-gold" />
            </div>
            <div className="flex-1 w-full">
              <label htmlFor="font-tester" className={`text-xs font-semibold block mb-1 ${darkMode ? "text-paper-cream/70" : "text-ink-black/70"}`}>
                Banco de Pruebas Tipográfico
              </label>
              <input
                id="font-tester"
                type="text"
                placeholder="Escribe tus propias palabras aquí para ver cómo se renderizan..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className={`w-full bg-transparent border-b outline-none text-base py-1 ${
                  darkMode 
                    ? "border-metallic-gold/30 text-paper-cream focus:border-metallic-gold" 
                    : "border-metallic-gold/20 text-ink-black focus:border-metallic-gold"
                } transition-colors`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Guidelines & Copywriting Rules */}
      <div className="space-y-12">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-metallic-gold font-semibold block">
            Guía de Redacción
          </span>
          <h3 className={`font-serif text-3xl md:text-4xl ${darkMode ? "text-paper-cream" : "text-ink-black"}`}>
            Directrices de Voz Editorial
          </h3>
          <p className={`max-w-2xl text-sm md:text-base ${darkMode ? "text-paper-cream/70" : "text-on-surface-variant"}`}>
            Nuestra voz es el embajador intelectual de Anclora Insights. Elevamos el tono, eliminamos el sensacionalismo corporativo 
            y adoptamos la sobriedad como sinónimo de prestigio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Forbidden terms */}
          <div className={`p-8 border rounded-xl space-y-6 ${
            darkMode ? "bg-[#0F172A]/80 border-red-900/20" : "bg-white border-red-100"
          }`}>
            <div className="flex items-center gap-3 border-b border-red-500/10 pb-4">
              <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-red-500" />
              </div>
              <h4 className={`font-serif text-xl ${darkMode ? "text-paper-cream" : "text-ink-black"}`}>
                Usos no Recomendados
              </h4>
            </div>

            <div className="space-y-6">
              {editorialGuidelines.filter(g => g.category === "forbidden").map((g, i) => (
                <div key={i} className="space-y-2 text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="line-through text-red-400 font-mono bg-red-500/5 px-2 py-0.5 rounded">
                      {g.term}
                    </span>
                    <span className="text-xs opacity-50 hidden sm:block">Reemplazar por:</span>
                    <span className="text-emerald-400 font-mono font-semibold bg-emerald-500/5 px-2 py-0.5 rounded">
                      {g.replacement}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed opacity-80 ${darkMode ? "text-paper-cream/80" : "text-on-surface-variant"}`}>
                    {g.why}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended terms */}
          <div className={`p-8 border rounded-xl space-y-6 ${
            darkMode ? "bg-[#0F172A]/80 border-emerald-900/20" : "bg-white border-emerald-100"
          }`}>
            <div className="flex items-center gap-3 border-b border-emerald-500/10 pb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Info className="w-4 h-4 text-emerald-500" />
              </div>
              <h4 className={`font-serif text-xl ${darkMode ? "text-paper-cream" : "text-ink-black"}`}>
                Expresiones Recomendadas
              </h4>
            </div>

            <div className="space-y-6">
              {editorialGuidelines.filter(g => g.category === "recommended").map((g, i) => (
                <div key={i} className="space-y-2 text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="line-through text-stone-400 font-mono opacity-50 bg-stone-500/5 px-2 py-0.5 rounded">
                      {g.term}
                    </span>
                    <span className="text-xs opacity-50 hidden sm:block">Reemplazar por:</span>
                    <span className="text-emerald-400 font-mono font-semibold bg-emerald-500/5 px-2 py-0.5 rounded">
                      {g.replacement}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed opacity-80 ${darkMode ? "text-paper-cream/80" : "text-on-surface-variant"}`}>
                    {g.why}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Glossary Section */}
      <div id="brand-glossary-section" className="space-y-12 mt-24 pt-16 border-t border-metallic-gold/10">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-metallic-gold font-semibold block">
            Glosario de Marca
          </span>
          <h3 className={`font-serif text-3xl md:text-4xl ${darkMode ? "text-paper-cream" : "text-ink-black"}`}>
            Términos y Conceptos Clave
          </h3>
          <p className={`max-w-2xl text-sm md:text-base ${darkMode ? "text-paper-cream/70" : "text-on-surface-variant"}`}>
            Definiciones y directrices conceptuales para comprender la profundidad lingüística, el rigor estratégico y la identidad filosófica de Anclora Insights.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="w-4 h-4 text-metallic-gold/60" />
            </span>
            <input
              type="text"
              placeholder="Buscar término o definición..."
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-xs font-sans border outline-none transition-all duration-300 ${
                darkMode
                  ? "bg-[#0F172A] border-metallic-gold/20 text-paper-cream focus:border-metallic-gold/60 placeholder:text-stone-500"
                  : "bg-white border-metallic-gold/25 text-ink-black focus:border-metallic-gold placeholder:text-stone-400"
              }`}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {glossaryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedGlossaryCategory(category)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-sans font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  selectedGlossaryCategory === category
                    ? darkMode
                      ? "bg-metallic-gold text-ink-black border-metallic-gold"
                      : "bg-ink-black text-metallic-gold border-metallic-gold/40"
                    : darkMode
                      ? "bg-transparent border-metallic-gold/15 text-stone-400 hover:border-metallic-gold/30 hover:text-stone-300"
                      : "bg-white border-metallic-gold/15 text-stone-500 hover:border-metallic-gold/30 hover:text-stone-700"
                }`}
              >
                {category === "all" ? "Todos" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Grid / List */}
        <div className="space-y-4 max-w-4xl">
          <AnimatePresence mode="popLayout">
            {filteredGlossaryItems.length > 0 ? (
              filteredGlossaryItems.map((item) => {
                const isExpanded = !!expandedGlossaryItems[item.term];
                return (
                  <motion.div
                    key={item.term}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                      isExpanded
                        ? darkMode
                          ? "border-metallic-gold bg-slate-950/30"
                          : "border-metallic-gold bg-amber-500/5"
                        : darkMode
                          ? "border-metallic-gold/15 bg-[#0F172A]/40 hover:border-metallic-gold/35"
                          : "border-metallic-gold/10 bg-white hover:border-metallic-gold/25"
                    }`}
                  >
                    {/* Trigger Bar */}
                    <button
                      onClick={() => toggleGlossaryItem(item.term)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-md ${
                          isExpanded
                            ? "bg-metallic-gold/10 text-metallic-gold"
                            : "bg-stone-500/5 text-stone-400"
                        }`}>
                          <BookMarked className="w-4 h-4" />
                        </div>
                        <div>
                          <span className={`font-serif text-base font-semibold block transition-colors duration-300 ${
                            isExpanded ? "text-metallic-gold" : darkMode ? "text-paper-cream" : "text-ink-black"
                          }`}>
                            {item.term}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                          darkMode
                            ? "border-metallic-gold/15 bg-metallic-gold/5 text-metallic-gold/80"
                            : "border-metallic-gold/20 bg-amber-500/5 text-muted-gold"
                        }`}>
                          {item.category}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-metallic-gold shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                        )}
                      </div>
                    </button>

                    {/* Collapsible Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className={`px-6 pb-5 pt-1 border-t ${
                            darkMode ? "border-metallic-gold/10" : "border-metallic-gold/5"
                          }`}>
                            <p className={`font-sans text-xs md:text-sm leading-relaxed pl-8 border-l-2 border-metallic-gold/40 py-1 ${
                              darkMode ? "text-paper-cream/80" : "text-stone-700"
                            }`}>
                              {item.definition}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-12 border border-dashed rounded-xl text-center space-y-3 ${
                  darkMode ? "border-metallic-gold/20 text-stone-500" : "border-stone-200 text-stone-400"
                }`}
              >
                <BookMarked className="w-8 h-8 mx-auto opacity-40 text-metallic-gold" />
                <p className="font-serif text-sm italic">"Ningún término coincide con su búsqueda en nuestros registros."</p>
                <button
                  onClick={() => { setGlossarySearch(""); setSelectedGlossaryCategory("all"); }}
                  className="text-xs text-metallic-gold font-sans font-bold uppercase tracking-wider hover:underline"
                >
                  Restablecer Filtros
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
