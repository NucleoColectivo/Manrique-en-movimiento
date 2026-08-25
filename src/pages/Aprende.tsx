import { motion } from 'motion/react';
import { BookOpen, Terminal, Wrench, Download, ExternalLink, MessageSquare, Image as ImageIcon, Video, Music } from 'lucide-react';
import { AnimatedImage } from '../components/ui/AnimatedImage';

const HERRAMIENTAS = [
  {
    icon: <ImageIcon size={32} className="text-orange" />,
    title: 'Restauración Visual',
    description: 'Herramientas para limpiar, mejorar la nitidez y recolorizar fotografías antiguas.',
    links: [
      { name: 'Adobe Firefly', url: 'https://firefly.adobe.com/' },
      { name: 'Canva', url: 'https://www.canva.com/' },
      { name: 'Nano Banana', url: '#' },
    ]
  },
  {
    icon: <Video size={32} className="text-blue" />,
    title: 'Animación y Video',
    description: 'Plataformas para dar movimiento a rostros y editar el documental.',
    links: [
      { name: 'CapCut', url: 'https://www.capcut.com/' },
      { name: 'DaVinci Resolve', url: 'https://www.blackmagicdesign.com/products/davinciresolve' },
      { name: 'Freepik (Animación)', url: 'https://www.freepik.com/' }
    ]
  },
  {
    icon: <Music size={32} className="text-gold" />,
    title: 'Narrativa y Sonido',
    description: 'Generación de estructuras narrativas y musicalización evocadora.',
    links: [
      { name: 'Gemini', url: 'https://gemini.google.com/' },
      { name: 'ChatGPT', url: 'https://chat.openai.com/' },
      { name: 'Suno AI', url: 'https://suno.com/' }
    ]
  }
];

const PROMPTS_EJEMPLO = [
  {
    title: 'Prompt de Restauración',
    description: 'Ideal para herramientas de "Inpainting" o Generative Fill (ej. Adobe Firefly, Canva).',
    prompt: 'Restaura esta fotografía antigua, elimina rasguños y manchas de humedad conservando la textura original del papel y el grano de película. No modifiques los rasgos faciales de las personas. Tono sepia natural.'
  },
  {
    title: 'Prompt de Colorización',
    description: 'Para modelos de colorización basados en IA.',
    prompt: 'Añade color realista a esta fotografía de los años 60 en Medellín, Colombia. El cielo debe ser azul claro, la ropa en tonos pasteles típicos de la época, y las fachadas de las casas en tonos tierra y ladrillo tenue. Iluminación de tarde soleada.'
  },
  {
    title: 'Prompt de Banda Sonora',
    description: 'Para generar música ambiental (Suno / Udio).',
    prompt: 'Música ambiental emotiva y nostálgica, instrumentos acústicos, guitarra andina suave, ritmo lento, cinematográfica, documental sobre memoria e historia barrial.'
  }
];

export function Aprende() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="w-[min(calc(100%-40px),1380px)] mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 items-end border-b border-[#1112] pb-12"
        >
          <div>
            <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange">04 · Aprende + IA</div>
            <h1 className="text-[clamp(3.5rem,7vw,7.5rem)] my-2">Herramientas<br/><span className="text-blue">Libres.</span></h1>
          </div>
          <p className="text-muted text-[1.1rem] max-w-[680px]">
            Explora las plataformas de inteligencia artificial, indicaciones clave y metodologías paso a paso que utilizamos para la recuperación de nuestra memoria fotográfica. No requieres conocimientos previos para empezar a experimentar.
          </p>
        </motion.div>

        {/* Herramientas Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {HERRAMIENTAS.map((herramienta, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 * index }}
              className="bg-white border border-[#1112] p-[25px] rounded-[24px] relative overflow-hidden group hover:border-orange transition-colors flex flex-col"
            >
              <div className="mb-6 bg-surface w-16 h-16 flex items-center justify-center rounded-full border border-[#1112]">
                {herramienta.icon}
              </div>
              <h3 className="text-[2.5rem] leading-[0.85] text-ink uppercase font-extrabold mb-4">{herramienta.title}</h3>
              <p className="text-ink font-sans text-sm mb-8 flex-grow">
                {herramienta.description}
              </p>
              <ul className="space-y-3 border-t border-[#1112] pt-6">
                {herramienta.links.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.12em] font-bold hover:text-orange transition-colors"
                    >
                      <span className="truncate">{link.name}</span>
                      <ExternalLink size={14} className="opacity-50 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Prompts Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8 border-b border-[#1112] pb-4">
            <Terminal size={32} className="text-orange" />
            <h2 className="text-[2rem] md:text-[3rem] uppercase font-extrabold text-ink">Ejemplos de Prompts</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PROMPTS_EJEMPLO.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className="bg-[#222] border border-[#1112] rounded-[24px] p-[25px] flex flex-col"
              >
                <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-gold mb-2">{item.title}</div>
                <p className="text-white/60 text-xs mb-6 font-sans">{item.description}</p>
                <div className="bg-ink/50 p-6 rounded-[12px] border-l-4 border-orange text-sm text-white/90 font-sans italic flex-grow shadow-inner">
                  "{item.prompt}"
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* El Proceso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-[clamp(3rem,5vw,5rem)] my-2">El <span className="text-gold">Proceso.</span></h2>
            <p className="text-muted text-[1.1rem] max-w-2xl mx-auto">
              Descubre cómo transformamos los archivos físicos en memoria viva. Un flujo de trabajo que combina el respeto por el documento original con IA.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Digitalización',
                description: 'Escaneo en alta resolución del documento físico. Limpieza cuidadosa del material para evitar añadir polvo.',
              },
              {
                step: '02',
                title: 'Restauración',
                description: 'Uso de IA para reparar grietas y rayones. Herramientas de Inpainting nos permiten rellenar vacíos lógicos.',
              },
              {
                step: '03',
                title: 'Colorización',
                description: 'Modelos entrenados para interpretar y aplicar color realista o estilizado, dotando de nueva vida a la fotografía.',
              },
              {
                step: '04',
                title: 'Animación',
                description: 'Aplicación de micro-movimientos para generar la ilusión de respiración y profundidad en sujetos congelados.',
              }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-[#1112] p-[25px] rounded-[24px] hover:-translate-y-2 transition-transform duration-300">
                <div className="text-[3.5rem] font-extrabold text-blue leading-none mb-4">{item.step}</div>
                <h3 className="text-[1.8rem] uppercase font-extrabold text-ink leading-[0.9] mb-4">{item.title}</h3>
                <p className="text-ink font-sans text-[0.95rem]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Manual Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="rounded-[32px] overflow-hidden bg-orange shadow-[0_25px_80px_#0002] mb-12 relative flex flex-col md:flex-row items-center justify-between gap-8 p-12 md:p-16"
        >
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
             <AnimatedImage 
                 src="https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/DAP-F-04-63287.0001.jpg" 
                 alt="Texture" 
                 wrapperClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover filter grayscale contrast-150"
                referrerPolicy="no-referrer"
              />
          </div>
          
          <div className="relative z-10 md:pr-12">
            <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-ink mb-2">Recurso Abierto</div>
            <h3 className="text-[clamp(2.5rem,4vw,4rem)] text-ink uppercase font-extrabold mb-4 leading-none">Manual de<br/>Restauración.</h3>
            <p className="font-sans text-ink/80 max-w-xl text-[1.1rem]">
              Descarga nuestra guía en formato PDF con todos los pasos, links y recomendaciones para organizar talleres de memoria en tu propia cuadra.
            </p>
          </div>
          
          <button className="relative z-10 flex-shrink-0 px-8 py-5 bg-ink text-white font-bold uppercase tracking-[0.1em] text-sm hover:bg-white hover:text-ink transition-colors rounded-full flex items-center gap-3">
            <Download size={18} />
            Descargar PDF
          </button>
        </motion.div>

      </div>
    </div>
  );
}
