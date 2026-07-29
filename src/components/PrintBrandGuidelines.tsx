import { BookOpen, Compass, Award, Feather, Eye } from "lucide-react";
import goldMedalUrl from "../../assets/anclora-insights-medalla-oro-transparente.png";
import lightLockupUrl from "../../assets/anclora-insights-lockup-light-transparente.png";

interface PrintBrandGuidelinesProps {
  idPrefix?: string;
}

export default function PrintBrandGuidelines({ idPrefix = "print-page" }: PrintBrandGuidelinesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen": return <BookOpen className="w-6 h-6 text-[#F59E0B]" />;
      case "Compass": return <Compass className="w-6 h-6 text-[#F59E0B]" />;
      case "Feather": return <Feather className="w-6 h-6 text-[#F59E0B]" />;
      case "Award": return <Award className="w-6 h-6 text-[#F59E0B]" />;
      default: return <BookOpen className="w-6 h-6 text-[#F59E0B]" />;
    }
  };

  const colors = [
    { name: "Oro Metálico", hex: "#F59E0B", rgb: "245, 158, 11", cmyk: "0, 35, 96, 4", usage: "Acentos de alta jerarquía, firmas, llamadas a la acción." },
    { name: "Negro Tinta", hex: "#0F172A", rgb: "15, 23, 42", cmyk: "64, 45, 0, 84", usage: "Base estructural, tipografía principal y fondo inmersivo." },
    { name: "Crema Papel", hex: "#F8FAFC", rgb: "248, 250, 252", cmyk: "2, 1, 0, 1", usage: "Color de fondo principal. Aporta tactilidad y reduce la fatiga." },
    { name: "Oro Mitigado", hex: "#D97706", rgb: "217, 119, 6", cmyk: "0, 45, 97, 15", usage: "Sub-acentos, bordes secundarios, hover de botones." }
  ];

  return (
    <div 
      style={{ 
        position: "fixed",
        left: 0,
        top: 0,
        width: "800px",
        height: "1131px",
        overflow: "hidden",
        zIndex: -1,
        pointerEvents: "none"
      }}
      aria-hidden="true"
    >
      {/* PAGE 1: COVER PAGE (Elegant Dark Slate) */}
      <div 
        id={`${idPrefix}-1`}
        className="w-[800px] h-[1131px] bg-[#0F172A] text-[#F8FAFC] flex flex-col justify-between p-16 relative overflow-hidden select-none border border-stone-800"
      >
        {/* Background geometry */}
        <div className="absolute right-[-100px] top-[-100px] w-[400px] h-[400px] rounded-full border border-[#F59E0B]/5 pointer-events-none" />
        <div className="absolute left-[-50px] bottom-[-50px] w-[300px] h-[300px] rounded-full border border-[#F59E0B]/5 pointer-events-none" />
        
        {/* Top bar */}
        <div className="flex justify-between items-center border-b border-[#F59E0B]/20 pb-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#F59E0B] uppercase">
            Anclora Insights • Sello Editorial
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#F8FAFC]/50">
            GRUPO ANCLORA
          </span>
        </div>

        {/* Center Title Content */}
        <div className="my-auto space-y-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[#F59E0B]/10 flex items-center justify-center border border-[#F59E0B]/20 mb-4">
            <BookOpen className="w-10 h-10 text-[#F59E0B]" />
          </div>
          
          <h1 className="font-serif text-5xl tracking-tight leading-tight text-[#F8FAFC] max-w-xl mx-auto">
            Manual de Identidad & Directrices de Marca
          </h1>
          
          <div className="w-16 h-px bg-[#F59E0B] my-6" />
          
          <p className="font-sans text-sm tracking-[0.15em] uppercase text-[#F59E0B] font-semibold">
            Código Editorial & Sistema de Diseño Visual
          </p>
          
          <p className="font-serif text-base italic text-[#F8FAFC]/70 max-w-md mx-auto">
            "La sofisticación consiste en un viaje continuo hacia lo esencial."
          </p>
        </div>

        {/* Bottom Metadata */}
        <div className="border-t border-[#F59E0B]/20 pt-6 flex justify-between items-end text-[11px] font-mono text-[#F8FAFC]/60">
          <div>
            <p>Sello Editorial Autorizado</p>
            <p className="text-[#F59E0B]">Anclora Insights © {new Date().getFullYear()}</p>
          </div>
          <div className="text-right">
            <p>Versión 1.2 • Documentación Oficial</p>
            <p>Clasificación: Confidencial Corporativo</p>
          </div>
        </div>
      </div>

      {/* PAGE 2: BUSINESS DNA (Editorial Declaration, Mission & Vision) */}
      <div 
        id={`${idPrefix}-2`}
        className="w-[800px] h-[1131px] bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between p-16 relative overflow-hidden border border-stone-300"
      >
        {/* Top bar */}
        <div className="flex justify-between items-center border-b border-[#F59E0B]/30 pb-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#D97706] uppercase">
            Sección I: ADN de Negocio
          </span>
          <span className="text-[10px] font-mono text-stone-500">
            ANCLORA INSIGHTS
          </span>
        </div>

        {/* Page Content */}
        <div className="flex-grow my-auto space-y-12">
          {/* Declaration */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D97706] font-semibold block">
              Declaración Editorial
            </span>
            <h2 className="font-serif text-3xl italic leading-snug text-[#0F172A]">
              "La curaduría como acto de resistencia en la era de la sobreinformación."
            </h2>
            <p className="font-sans text-sm leading-relaxed text-stone-700">
              En un ecosistema digital saturado de contenido efímero y ruido algorítmico, 
              <strong> Anclora Insights</strong> se erige como un puerto de estabilidad intelectual. 
              Bajo la dirección de Anclora Group, nuestro sello editorial no busca la inmediatez, 
              sino la trascendencia de los datos analizados, devolviéndole al lector el recurso más valioso de todos: el tiempo.
            </p>
          </div>

          <div className="w-full h-px bg-stone-200" />

          {/* Bento Mission & Vision */}
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 border border-[#F59E0B]/20 bg-white rounded-lg flex flex-col justify-between h-full space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-[#D97706]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0F172A]">
                  Nuestra Misión
                </h3>
                <p className="font-sans text-xs leading-relaxed text-stone-600">
                  Destilar la complejidad del mundo globalizado en conocimiento analítico y conceptual de alto valor, 
                  proporcionando lecturas rigurosas que equipen a las mentes influyentes para anticipar el futuro.
                </p>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-stone-400 block pt-2 border-t border-stone-100">
                Propósito Fundamental
              </span>
            </div>

            <div className="p-6 border border-[#F59E0B]/20 bg-white rounded-lg flex flex-col justify-between h-full space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#D97706]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0F172A]">
                  Nuestra Visión
                </h3>
                <p className="font-sans text-xs leading-relaxed text-stone-600">
                  Establecer a Anclora Insights como el sello editorial de referencia absoluto en el análisis estratégico, 
                  siendo reconocidos por nuestra impecable curaduría y formato de minimalismo digital táctil.
                </p>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-stone-400 block pt-2 border-t border-stone-100">
                Destino Estratégico
              </span>
            </div>
          </div>

          {/* Quote Block */}
          <div className="p-6 border-l-4 border-[#F59E0B] bg-[#0F172A]/5 rounded-r-lg">
            <p className="font-serif text-sm italic leading-relaxed text-[#0F172A]/90">
              "No publicamos para llenar estantes, sino para anclar certezas en un océano de incertidumbre."
            </p>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#D97706] font-semibold block mt-2">
              — El Manifiesto de Anclora
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 pt-4 flex justify-between items-center text-[10px] font-mono text-stone-500">
          <span>Manual de Identidad Visual • Anclora Insights</span>
          <span>Página 2</span>
        </div>
      </div>

      {/* PAGE 3: BRAND PILLARS (The Four Pillars) */}
      <div 
        id={`${idPrefix}-3`}
        className="w-[800px] h-[1131px] bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between p-16 relative overflow-hidden border border-stone-300"
      >
        {/* Top bar */}
        <div className="flex justify-between items-center border-b border-[#F59E0B]/30 pb-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#D97706] uppercase">
            Sección I: ADN (Continuación)
          </span>
          <span className="text-[10px] font-mono text-stone-500">
            ANCLORA INSIGHTS
          </span>
        </div>

        {/* Content */}
        <div className="flex-grow my-auto space-y-8">
          <div className="text-center space-y-2 mb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D97706] font-semibold block">
              Directrices de Marca
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0F172A]">
              Los Cuatro Pilares Fundacionales
            </h2>
            <div className="w-12 h-0.5 bg-[#F59E0B] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 border border-stone-200 bg-white rounded-lg flex flex-col justify-between h-[360px]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#F59E0B]/10 flex items-center justify-center">
                    {getIcon("BookOpen")}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#0F172A]">Curaduría Extrema</h4>
                </div>
                <p className="font-sans text-xs leading-relaxed text-stone-600">
                  No acumulamos información; destilamos la esencia. Cada libro, cada ensayo, cada párrafo que lleva nuestro sello ha superado un riguroso filtro de relevancia conceptual y elegancia narrativa.
                </p>
              </div>
              <p className="text-[11px] italic text-[#D97706] border-t border-dashed border-stone-100 pt-3 mt-4">
                "La curaduría es un acto de resistencia contra el caos informativo."
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 border border-stone-200 bg-white rounded-lg flex flex-col justify-between h-[360px]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#F59E0B]/10 flex items-center justify-center">
                    {getIcon("Compass")}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#0F172A]">Rigor Intelectual</h4>
                </div>
                <p className="font-sans text-xs leading-relaxed text-stone-600">
                  Nuestros análisis de insights se fundamentan en fuentes primarias, datos contrastados y el pensamiento crítico de líderes globales. Evitamos la superficialidad del titular rápido.
                </p>
              </div>
              <p className="text-[11px] italic text-[#D97706] border-t border-dashed border-stone-100 pt-3 mt-4">
                "La autoridad intelectual se gana con profundidad, paciencia y verdad."
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 border border-stone-200 bg-white rounded-lg flex flex-col justify-between h-[360px]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#F59E0B]/10 flex items-center justify-center">
                    {getIcon("Feather")}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#0F172A]">Tactilidad Digital</h4>
                </div>
                <p className="font-sans text-xs leading-relaxed text-stone-600">
                  Traducimos la calidez y permanencia del libro físico al entorno digital. Espaciados amplios, tipografía de alta legibilidad, texturas sutiles y transiciones pausadas.
                </p>
              </div>
              <p className="text-[11px] italic text-[#D97706] border-t border-dashed border-stone-100 pt-3 mt-4">
                "Queremos que el lector sienta el peso de las ideas en la pantalla."
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 border border-stone-200 bg-white rounded-lg flex flex-col justify-between h-[360px]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#F59E0B]/10 flex items-center justify-center">
                    {getIcon("Award")}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#0F172A]">Exclusividad Premium</h4>
                </div>
                <p className="font-sans text-xs leading-relaxed text-stone-600">
                  Pertenecemos a Anclora Group, lo que nos sitúa en una esfera de distinción y compromiso absoluto con la excelencia. Diseñamos experiencias intelectuales para mentes exigentes.
                </p>
              </div>
              <p className="text-[11px] italic text-[#D97706] border-t border-dashed border-stone-100 pt-3 mt-4">
                "El conocimiento de alto nivel exige una presentación a su altura."
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 pt-4 flex justify-between items-center text-[10px] font-mono text-stone-500">
          <span>Manual de Identidad Visual • Anclora Insights</span>
          <span>Página 3</span>
        </div>
      </div>

      {/* PAGE 4: VISUAL SYSTEM (Colors & Typography) */}
      <div 
        id={`${idPrefix}-4`}
        className="w-[800px] h-[1131px] bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between p-16 relative overflow-hidden border border-stone-300"
      >
        {/* Top bar */}
        <div className="flex justify-between items-center border-b border-[#F59E0B]/30 pb-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#D97706] uppercase">
            Sección II: Sistema Visual
          </span>
          <span className="text-[10px] font-mono text-stone-500">
            ANCLORA INSIGHTS
          </span>
        </div>

        {/* Content */}
        <div className="flex-grow my-auto space-y-10">
          {/* Colors */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D97706] font-semibold block">
              Paleta Cromática Oficial
            </span>
            <div className="grid grid-cols-4 gap-4">
              {colors.map((c, idx) => (
                <div key={idx} className="border border-stone-200 rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="h-16 w-full" style={{ backgroundColor: c.hex }} />
                  <div className="p-3 space-y-1">
                    <span className="text-xs font-bold block truncate">{c.name}</span>
                    <span className="text-[10px] font-mono text-stone-500 block">{c.hex}</span>
                    <span className="text-[9px] font-mono text-stone-400 block">RGB: {c.rgb}</span>
                    <span className="text-[9px] font-mono text-stone-400 block">CMYK: {c.cmyk}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-stone-200" />

          {/* Typography */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D97706] font-semibold block">
              Sistema Tipográfico
            </span>
            
            <div className="space-y-6">
              {/* Serif font specimen */}
              <div className="p-5 border border-stone-200 bg-white rounded-lg space-y-3">
                <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                  <span className="font-serif text-sm font-bold text-[#0F172A]">Tipografía de Titulares (Serif)</span>
                  <span className="font-mono text-[9px] bg-stone-100 px-2 py-0.5 rounded text-stone-600">Libre Baskerville</span>
                </div>
                <div className="space-y-2">
                  <p className="font-serif text-2xl text-[#0F172A]">
                    La curaduría como arte y ciencia.
                  </p>
                  <p className="font-serif text-lg italic text-[#D97706]">
                    Abc Def Ghi Jkl Mno Pqr Stu Vwx Yz
                  </p>
                  <p className="font-mono text-[10px] text-stone-500 leading-relaxed">
                    Uso: Titulares principales, subtitulares, citas célebres, lemas y firmas de marca. Aporta herencia intelectual y autoridad literaria.
                  </p>
                </div>
              </div>

              {/* Sans font specimen */}
              <div className="p-5 border border-stone-200 bg-white rounded-lg space-y-3">
                <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                  <span className="font-sans text-sm font-semibold text-[#0F172A]">Tipografía de Cuerpo (Sans Serif)</span>
                  <span className="font-mono text-[9px] bg-stone-100 px-2 py-0.5 rounded text-stone-600">Inter</span>
                </div>
                <div className="space-y-2">
                  <p className="font-sans text-sm font-semibold text-stone-800">
                    DISEÑO INTELIGENTE • REDUCCIÓN DE FATIGA VISUAL
                  </p>
                  <p className="font-sans text-xs text-stone-600 leading-relaxed">
                    Nuestros análisis de insights se fundamentan en fuentes primarias, datos contrastados y pensamiento crítico de líderes globales. Evitamos la inmediatez del titular rápido.
                  </p>
                  <p className="font-mono text-[10px] text-stone-500 leading-relaxed">
                    Uso: Cuerpo de texto, datos analíticos, tablas, interfaces interactivas, metadatos y etiquetas. Ofrece legibilidad absoluta en pantallas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 pt-4 flex justify-between items-center text-[10px] font-mono text-stone-500">
          <span>Manual de Identidad Visual • Anclora Insights</span>
          <span>Página 4</span>
        </div>
      </div>

      {/* PAGE 5: BRAND SYMBOLS & EDITORIAL RULES */}
      <div 
        id={`${idPrefix}-5`}
        className="w-[800px] h-[1131px] bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between p-16 relative overflow-hidden border border-stone-300"
      >
        {/* Top bar */}
        <div className="flex justify-between items-center border-b border-[#F59E0B]/30 pb-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#D97706] uppercase">
            Sección III: Aplicaciones & Directrices
          </span>
          <span className="text-[10px] font-mono text-stone-500">
            ANCLORA INSIGHTS
          </span>
        </div>

        {/* Content */}
        <div className="flex-grow my-auto space-y-8">
          {/* Símbolos e Iconografía */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D97706] font-semibold block">
              Símbolos del Sello Editorial
            </span>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 border border-stone-200 bg-white rounded-lg flex items-center gap-4">
                <div className="w-16 h-16 shrink-0 bg-[#0F172A] rounded-full flex items-center justify-center p-2">
                  <img 
                    src={goldMedalUrl}
                    alt="Sello Circular" 
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-contain rounded-full"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold block">Sello Circular Principal</span>
                  <p className="text-[10px] text-stone-500 leading-normal mt-1">
                    Ancla heráldica abstracta y estrella en oro. Para redes, marcas de agua, perfiles y contraportadas.
                  </p>
                </div>
              </div>

              <div className="p-4 border border-stone-200 bg-white rounded-lg flex items-center gap-4">
                <div className="w-16 h-16 shrink-0 bg-[#F59E0B] rounded-lg flex items-center justify-center p-2">
                  <img 
                    src={lightLockupUrl}
                    alt="Sello Inverso" 
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-contain rounded-full"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold block">Sólido Inverso</span>
                  <p className="text-[10px] text-stone-500 leading-normal mt-1">
                    Optimizado para impresión de tinta única, estampados en relieve o sellos de lacre físicos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-stone-200" />

          {/* Reglas de Escritura / Redacción */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D97706] font-semibold block">
              Gobernanza de Identidad Editorial
            </span>
            
            <div className="p-5 border border-stone-200 bg-white rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-stone-800 uppercase tracking-wider block border-l-2 border-[#F59E0B] pl-2">
                    Tono y Voz Permitidos
                  </span>
                  <ul className="text-[10px] text-stone-600 space-y-1.5 list-disc pl-4 leading-normal">
                    <li>Rigor racional fundamentado en hechos.</li>
                    <li>Minimalismo verbal: brevedad elegante.</li>
                    <li>Neutralidad de alta autoridad intelectual.</li>
                    <li>Sutileza poética sin caer en adjetivación excesiva.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-stone-800 uppercase tracking-wider block border-l-2 border-stone-400 pl-2">
                    Expresiones Prohibidas
                  </span>
                  <ul className="text-[10px] text-stone-600 space-y-1.5 list-disc pl-4 leading-normal font-sans">
                    <li>Léxico apresurado o hiperbólico (ej. "¡Increíble!").</li>
                    <li>Clickbait sensacionalista o titulares vacíos.</li>
                    <li>Slang digital informal u optimizaciones SEO burdas.</li>
                    <li>Uso masivo de signos de exclamación o emojis.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Colophon */}
          <div className="text-[10px] bg-[#0F172A]/5 p-4 rounded border border-[#F59E0B]/10 text-stone-600 text-center italic">
            "Este manual rige la producción editorial física y digital de Anclora Insights. Su aplicación es obligatoria para todos los redactores, diseñadores y colaboradores bajo el aval de Anclora Group."
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 pt-4 flex justify-between items-center text-[10px] font-mono text-stone-500">
          <span>Manual de Identidad Visual • Anclora Insights</span>
          <span>Página 5</span>
        </div>
      </div>
    </div>
  );
}
