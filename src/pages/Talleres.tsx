import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  CheckCircle2, 
  Camera, 
  Eye, 
  Layers, 
  Sparkles, 
  Image as ImageIcon, 
  Users, 
  BookOpen, 
  ShieldCheck, 
  HeartHandshake, 
  Quote, 
  Sliders, 
  ArrowRight,
  Award,
  History
} from 'lucide-react';
import { AnimatedImage } from '../components/ui/AnimatedImage';
import { ImageModal } from '../components/ui/ImageModal';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

interface WorkshopEvent {
  id: string;
  title: string;
  type: string;
  status: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  tag: string;
}

interface RegisterPhoto {
  id: string;
  title: string;
  category: 'jornada' | 'afiche';
  categoryLabel: string;
  imageUrl: string;
  date: string;
  location: string;
  description: string;
  pedagogicalHighlight?: string;
}

interface RestorationCase {
  id: string;
  title: string;
  subtitle: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
  technique: string;
}

interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
  neighborhood: string;
}

const COMPLETED_EVENTS: WorkshopEvent[] = [
  {
    id: 'socializacion-1',
    title: 'Socialización del Proyecto · Manrique Memoria en Movimiento',
    type: 'Jornada Comunitaria',
    status: 'Evento Realizado · Socialización y Resultados',
    date: 'Martes 20 de Octubre, 2026',
    time: '6:00 p. m.',
    location: 'Casa de la Cultura Manrique - La 45 (Carrera 45 # 72-62)',
    description: 'Encuentro de cierre y socialización pública con la comunidad de Manrique. Presentación de resultados, exhibición del archivo fotográfico restaurado, proyección de cápsulas audiovisuales y entrega colectiva de la memoria del territorio.',
    imageUrl: '/img/talleres/socializacion_01.png',
    tag: 'Socialización Comunitaria'
  },
  {
    id: 'taller-1',
    title: 'Memoria, Creatividad e Inteligencia Artificial',
    type: 'Taller Comunitario',
    status: 'Taller Realizado · Etapa Concluida',
    date: 'Viernes 18 y Sábado 26 de Septiembre, 2026',
    time: '2:00 a 4:00 p. m.',
    location: 'Casa de la Cultura Manrique - La 45 (Carrera 45 # 72-62)',
    description: 'Encuentros de formación donde la comunidad de Manrique aprendió y exploró herramientas contemporáneas de Inteligencia Artificial para la restauración fotográfica, el rescate de historias locales y la creación digital colaborativa.',
    imageUrl: '/img/talleres/talleres_ok_01.png',
    tag: 'Proceso Concluido'
  },
  {
    id: 'convocatoria-1',
    title: 'Buscamos las historias que aún viven en los álbumes familiares',
    type: 'Convocatoria Comunitaria',
    status: 'Recolección y Grabación Realizada',
    date: 'Comuna 3, Manrique',
    time: 'Jornadas 2026',
    location: 'Barrio Manrique, Medellín',
    description: 'Búsqueda territorial de fotografías familiares y del barrio de las décadas del 40, 50, 60 y 70, conectando las voces de los adultos mayores para el archivo sonoro y las piezas audiovisuales del proyecto.',
    imageUrl: '/img/talleres/convocatorias_01.png',
    tag: 'Archivo en Custodia'
  }
];

const WORKSHOP_GALLERY: RegisterPhoto[] = [
  {
    id: 'foto-6',
    title: 'Apertura y encuentro comunitario en la Casa de la Cultura Manrique',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 6.JPG',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura - La 45',
    description: 'Inicio del ciclo formativo en la Casa de la Cultura Manrique. Líderes barriales, adultos mayores y jóvenes se reunieron para trazar la ruta de trabajo, reconociendo que los recuerdos del territorio son el activo patrimonial más valioso de la Comuna 3.',
    pedagogicalHighlight: 'Vinculación directa comunitaria'
  },
  {
    id: 'foto-7',
    title: 'Revisión colectiva de fotografías históricas y álbumes familiares',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 7.JPG',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique',
    description: 'Análisis participativo de copias físicas y negativos traídos por vecinos. Cada participante contextualizó las esquinas de La 45, las primeras rutas de buses y las transformaciones arquitectónicas frente al paso de las décadas.',
    pedagogicalHighlight: 'Cotejo de archivo & memoria viva'
  },
  {
    id: 'foto-8',
    title: 'Metodología práctica: herramientas de IA para restauración de imagen',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 8.JPG',
    date: 'Septiembre 2026',
    location: 'Sala de talleres - La 45',
    description: 'Presentación interactiva sobre el funcionamiento de redes neuronales y modelos de superresolución. Se enseñó a remover ruido, recuperar texturas desgastadas y calibrar coloraciones históricas con transparencia y criterio documental.',
    pedagogicalHighlight: 'Apropiación tecnológica accesible'
  },
  {
    id: 'foto-11',
    title: 'Diálogo intergeneracional: abuelos y jóvenes en co-creación',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 11.jpeg',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique',
    description: 'Mesa de trabajo compartida donde los adultos mayores transmitieron detalles sobre el antiguo tranvía, los convites y la vida en las colinas, mientras los jóvenes apoyaron en la operación digital y curaduría en pantalla.',
    pedagogicalHighlight: 'Puente entre saberes barriales y destreza digital'
  },
  {
    id: 'foto-12',
    title: 'Registro sonoro y preservación de testimonios orales',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 12.jpeg',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique',
    description: 'Grabación de testimonios de viva voz en estaciones de audio. Se documentaron anécdotas, canciones y reflexiones locales que complementan las imágenes restauradas, dotando al archivo de una dimensión humana y emotiva.',
    pedagogicalHighlight: 'Documentación oral y archivo sonoro'
  },
  {
    id: 'foto-14',
    title: 'Exploración directa de fuentes de archivo y patrimonio local',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 14.jpeg',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique',
    description: 'Los participantes comparan impresiones de alta calidad procedentes de la Biblioteca Pública Piloto y la Corporación Viztaz, estudiando la traza urbana desde los años 40 hasta la consolidación de la Comuna 3.',
    pedagogicalHighlight: 'Acceso democrático a archivos patrimoniales'
  },
  {
    id: 'foto-15',
    title: 'Vida cotidiana, comercio barrial y vínculos de vecindad',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 15.jpeg',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique',
    description: 'Conversación comunitaria sobre los primeros cafetines de tango en La 45, las boticas tradicionales y las tiendas de esquina que tejieron la identidad y solidaridad en las laderas nororientales de Medellín.',
    pedagogicalHighlight: 'Tejido social y sentido de pertenencia'
  },
  {
    id: 'foto-18',
    title: 'Reflexión ética: IA responsable sin alterar la verdad histórica',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 18.jpeg',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique',
    description: 'Debate grupal sobre la ética de la IA: reconocer la dignidad de las personas fotografiadas, comunicar con claridad cuándo una foto ha sido restaurada o coloreada, y evitar que la tecnología sustituya la memoria humana.',
    pedagogicalHighlight: 'Uso ético, crítico y consciente de la IA'
  },
  {
    id: 'foto-20',
    title: 'Clausura de jornadas y entrega de resultados a la comunidad',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 20.jpeg',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique',
    description: 'Cierre del programa con aplausos y reconocimiento a todos los participantes. Se entregaron copias restauradas y se consolidó el compromiso de los habitantes como guardianes permanentes de su patrimonio cultural.',
    pedagogicalHighlight: 'Apropiación comunitaria y sostenibilidad'
  },
  {
    id: 'afiche-socializacion-1',
    title: 'Afiche Oficial · Socialización del Proyecto Manrique Memoria en Movimiento',
    category: 'afiche',
    categoryLabel: 'Material de Difusión',
    imageUrl: '/img/talleres/socializacion_01.png',
    date: 'Octubre 2026',
    location: 'Casa de la Cultura Manrique - La 45',
    description: 'Pieza gráfica de convocatoria comunitaria para la socialización de resultados, proyección del documental audiovisual, exhibición del archivo restaurado y diálogo con el territorio.',
    pedagogicalHighlight: 'Convocatoria pública barrial'
  },
  {
    id: 'afiche-taller-1',
    title: 'Afiche Oficial · Taller de Memoria, Creatividad e Inteligencia Artificial',
    category: 'afiche',
    categoryLabel: 'Material de Difusión',
    imageUrl: '/img/talleres/talleres_ok_01.png',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique - La 45',
    description: 'Afiche pedagógico que invitó a los residentes de la Comuna 3 a participar en las sesiones prácticas de restauración fotográfica y experimentación visual con IA.',
    pedagogicalHighlight: 'Pieza central de formación'
  },
  {
    id: 'afiche-taller-2',
    title: 'Afiche Secundario · Memoria, Creatividad e IA en la Comuna 3',
    category: 'afiche',
    categoryLabel: 'Material de Difusión',
    imageUrl: '/img/talleres/talleres_ok_02.png',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique - La 45',
    description: 'Diseño complementario distribuido en puntos comunitarios, bibliotecas de proximidad y centros barriales para garantizar una amplia diversidad de participantes.',
    pedagogicalHighlight: 'Difusión territorial'
  },
  {
    id: 'afiche-convocatoria-1',
    title: 'Convocatoria · Buscamos las historias que aún viven en los álbumes familiares',
    category: 'afiche',
    categoryLabel: 'Material de Difusión',
    imageUrl: '/img/talleres/convocatorias_01.png',
    date: '2026',
    location: 'Comuna 3, Manrique',
    description: 'Campaña orientada a motivar a las familias de Manrique a desempolvar fotografías de los años 40, 50, 60 y 70 para ser digitalizadas y preservadas con respeto y cariño.',
    pedagogicalHighlight: 'Rescate de álbumes familiares'
  },
  {
    id: 'afiche-convocatoria-2',
    title: 'Convocatoria · Relatos, Recuerdos y Voces de Manrique',
    category: 'afiche',
    categoryLabel: 'Material de Difusión',
    imageUrl: '/img/talleres/convocatorias_02.png',
    date: '2026',
    location: 'Comuna 3, Manrique',
    description: 'Pieza centrada en la memoria oral: convocar a los adultos mayores que vivieron la transformación del barrio para grabar testimonios sonoros sobre su cotidianidad.',
    pedagogicalHighlight: 'Tradición oral barrial'
  },
  {
    id: 'afiche-convocatoria-3',
    title: 'Convocatoria · Patrimonio Visual y Co-creación Territorial',
    category: 'afiche',
    categoryLabel: 'Material de Difusión',
    imageUrl: '/img/talleres/convocatorias_03.png',
    date: '2026',
    location: 'Comuna 3, Manrique',
    description: 'Afiche de difusión en redes y carteleras comunitarias, promoviendo la democratización de herramientas de IA al servicio del patrimonio cultural barrial.',
    pedagogicalHighlight: 'Divulgación colectiva'
  }
];

const RESTORATION_CASES: RestorationCase[] = [
  {
    id: 'caso-la45',
    title: 'Carrera 45 y el Tranvía Histórico',
    subtitle: 'Archivo Histórico Medellín · Restauración a 2K con colorización y reducción de ruido',
    beforeImage: '/img/ANTES Y DESPUES/LA 45/DAP-F-04-63273.0001.jpg',
    afterImage: '/img/ANTES Y DESPUES/LA 45/DAP-F-04-63273.0001.jpg_2K_202609022240.jpeg',
    beforeLabel: 'ORIGINAL · NEGATIVO',
    afterLabel: 'RESTAURADA CON IA 2K',
    description: 'En el taller se examinó cómo el modelo generativo recupera los cables aéreos del tranvía, los rostros de los peatones y el empedrado de la vía sin alterar las proporciones arquitectónicas originales.',
    technique: 'Superresolución 2K + Inpainting de micro-rasgaduras + Calibración cromática'
  },
  {
    id: 'caso-teatro',
    title: 'Cine Teatro Manrique',
    subtitle: 'Fachada patrimonial de los años 50 · Rescate de texturas y señalética',
    beforeImage: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Captura de pantalla 2026-08-10 212607.png',
    afterImage: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Captura_de_pantalla_2026-08-10_212607.png_202609021941.jpeg',
    beforeLabel: 'ORIGINAL ARCHIVO',
    afterLabel: 'RECONSTRUCCIÓN 2K',
    description: 'Los participantes exploraron la reconstrucción de avisos luminosos y molduras en la emblemática fachada del teatro, centro de encuentro cinematográfico y cultural de varias generaciones.',
    technique: 'Restauración de contraste fotográfico + Corrección geométrica + Realce volumétrico'
  },
  {
    id: 'caso-manrique',
    title: 'Vida Cotidiana y Calle Barrial',
    subtitle: 'Álbum familiar comunitario · De la pérdida de nitidez al detalle vivo',
    beforeImage: '/img/ANTES Y DESPUES/MANRIQUE/487940867_8765039680266381_870091415398008555_n.jpg_2K_202609011914.jpeg',
    afterImage: '/img/ANTES Y DESPUES/MANRIQUE/487940867_8765039680266381_870091415398008555_n.jpg_2K_202609011914.jpeg_2K_202609021145.jpeg',
    beforeLabel: 'IMAGEN BASE',
    afterLabel: 'OPTIMIZADA EN TALLER',
    description: 'Muestra práctica desarrollada en conjunto con los vecinos: cómo estabilizar la iluminación de fotografías domésticas tomadas en exteriores de las colinas de Manrique.',
    technique: 'Balance dinámico de sombras + Recuperación de grano fotográfico tradicional'
  },
  {
    id: 'caso-viztaz-abuela',
    title: 'Cocina y Saberes Tradicionales',
    subtitle: 'Archivo Corporación Cultural Viztaz · Restauración IA (Abuela en cocina)',
    beforeImage: '/img/FOTOS VIZTAZ/2700198-me.jpg',
    afterImage: '/img/FOTOS VIZTAZ/RESTAURADAS/2700198-me-restaurada.png',
    beforeLabel: 'ORIGINAL VIZTAZ',
    afterLabel: 'RESTAURADA CON IA',
    description: 'Registro de la intimidad doméstica barrial: abuela preparando alimentos en estufa clásica con molino tradicional. La restauración recuperó texturas metálicas, iluminación cálida y detalles del espacio cotidiano.',
    technique: 'Reducción de grano oxidado + Inpainting de emulsión + Enfoque de texturas de época'
  },
  {
    id: 'caso-viztaz-esquina',
    title: 'Esquina Comercial de La 45',
    subtitle: 'Archivo Corporación Cultural Viztaz · La Sonora y Unión Total (c. 1955)',
    beforeImage: '/img/FOTOS VIZTAZ/2701047-me.jpg',
    afterImage: '/img/FOTOS VIZTAZ/RESTAURADAS/2701047-me-restaurada.png',
    beforeLabel: 'ORIGINAL VIZTAZ',
    afterLabel: 'RECONSTRUCCIÓN 2K',
    description: 'Esquina comercial de dos niveles sobre La 45. La inteligencia artificial permitió devolver nitidez a la tipografía de los letreros publicitarios, el tejado de barro cocido y los transeúntes.',
    technique: 'Recuperación de contraste dinámico + Nitidez arquitectónica + Corrección de perspectiva'
  },
  {
    id: 'caso-viztaz-patio',
    title: 'Patio Familiar y Generaciones',
    subtitle: 'Archivo Corporación Cultural Viztaz · Retrato en patio ajedrezado (c. 1958)',
    beforeImage: '/img/FOTOS VIZTAZ/2702218.jpg',
    afterImage: '/img/FOTOS VIZTAZ/RESTAURADAS/2702218-restaurada.png',
    beforeLabel: 'ORIGINAL VIZTAZ',
    afterLabel: 'RESTAURADA CON IA',
    description: 'Encuentro familiar en un patio tradicional de Manrique. El proceso recuperó la trama del piso ajedrezado, los rostros de niños y adultos mayores y la vegetación de la casa.',
    technique: 'Restauración facial generativa + Equilibrio de luces y sombras + Texturizado analógico'
  },
  {
    id: 'caso-viztaz-jovenes',
    title: 'Retrato de Juventud y Moda Barrial',
    subtitle: 'Archivo Corporación Cultural Viztaz · Dos jóvenes en residencia (c. 1955)',
    beforeImage: '/img/FOTOS VIZTAZ/2700864.jpg',
    afterImage: '/img/FOTOS VIZTAZ/RESTAURADAS/2700864-restaurada.png',
    beforeLabel: 'ORIGINAL VIZTAZ',
    afterLabel: 'RESTAURADA CON IA',
    description: 'Retrato íntimo de dos hermanas con vestidos de cuadros y lazos clásicos. La restauración clarifica el estampado de los tejidos, la luz ambiental y la expresión afectiva.',
    technique: 'Superresolución de retratos + Reconstrucción de fibras textiles + Limpieza de rayones'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Gloria Inés Montoya',
    role: 'Habitante histórica',
    neighborhood: 'Manrique Oriental (69 años)',
    quote: 'Ver las fotos de cuando abrieron La 45 con la nitidez y los tonos que yo recordaba de niña me conmovió profundamente. La tecnología aquí no vino a reemplazarnos, sino a devolvernos con respeto los rostros de nuestros padres y vecinos.'
  },
  {
    id: 'test-2',
    author: 'Mateo Cárdenas',
    role: 'Joven participante y creador digital',
    neighborhood: 'Comuna 3 (21 años)',
    quote: 'Siempre creí que la inteligencia artificial era algo distante o peligroso para la memoria. En el taller aprendimos a sentarnos con los abuelos, escuchar sus historias y aplicar las herramientas para que sus recuerdos no se desvanezcan en una gaveta.'
  },
  {
    id: 'test-3',
    author: 'Hernando Patiño',
    role: 'Líder comunitario',
    neighborhood: 'Sector Las Esmeraldas (74 años)',
    quote: 'Lo que más me gustó fue la honestidad: nos dijeron con claridad qué hace la máquina y qué ponemos nosotros. La máquina limpia la foto, pero el alma y la verdad de cómo construimos este barrio en convite la pusimos nosotros.'
  }
];

export function Talleres() {
  const [activeTab, setActiveTab] = useState<'todos' | 'jornada' | 'afiche'>('todos');
  const [selectedPhoto, setSelectedPhoto] = useState<RegisterPhoto | null>(null);
  const [activeCaseId, setActiveCaseId] = useState<string>('caso-la45');

  const filteredPhotos = useMemo(() => {
    if (activeTab === 'todos') return WORKSHOP_GALLERY;
    return WORKSHOP_GALLERY.filter(p => p.category === activeTab);
  }, [activeTab]);

  const selectedCase = useMemo(() => {
    return RESTORATION_CASES.find(c => c.id === activeCaseId) || RESTORATION_CASES[0];
  }, [activeCaseId]);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="w-[min(calc(100%-40px),1380px)] mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-14 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-end"
        >
          <div>
            <div className="flex items-center gap-2.5 text-[0.75rem] uppercase tracking-[0.2em] font-extrabold text-orange mb-3">
              <span>06 · Comunidad, Memoria & IA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange/60" />
              <span className="text-forest font-bold">Ciclo Concluido</span>
            </div>
            <h1 className="text-[clamp(3.2rem,6.5vw,7rem)] leading-[0.88] my-2">
              Aprender<br />
              <span className="text-blue">haciendo.</span>
            </h1>
          </div>
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-800 border border-emerald-500/30 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Dos talleres presenciales completados exitosamente</span>
            </div>
            <p className="text-muted text-[1.1rem] leading-relaxed max-w-[640px]">
              Los espacios de formación comunitaria y rescate testimonial en la Casa de la Cultura Manrique fueron ejecutados con gran acogida. A continuación presentamos el programa formativo completo, las restauraciones prácticas, los testimonios de los participantes y el registro visual del proceso.
            </p>
          </div>
        </motion.div>

        {/* Informative Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {COMPLETED_EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="bg-paper border-[3px] border-[#1112] rounded-[22px] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-7">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-orange/10 text-orange px-3 py-1 rounded-full text-[0.7rem] font-extrabold uppercase tracking-widest">
                    <Sparkles size={12} />
                    {event.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-[#124C65]/10 text-[#124C65] px-3 py-1 rounded-full text-[0.68rem] font-bold uppercase tracking-wider">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    {event.status}
                  </span>
                </div>

                <h3 className="text-[1.5rem] md:text-[1.75rem] leading-[0.98] uppercase font-extrabold font-barlow text-ink mb-4">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-5 text-xs text-ink/85 font-medium font-mono">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={15} className="text-orange shrink-0" />
                    <span>{event.date} {event.time !== 'N/A' && `• ${event.time}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-orange shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                <p className="text-ink/80 text-sm font-dm leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-7 py-4 bg-white/70 border-t border-[#1112] flex items-center justify-between">
                <span className="text-[0.68rem] font-bold text-muted uppercase tracking-wider">
                  {event.tag}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const match = WORKSHOP_GALLERY.find(g => g.imageUrl === event.imageUrl);
                    if (match) setSelectedPhoto(match);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue hover:text-orange transition-colors"
                >
                  <Eye size={14} />
                  <span>Ver afiche</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* =========================================================================
            SECTION: TALLERES COMUNITARIOS DE IA Y MEMORIA (Programa Pedagógico)
           ========================================================================= */}
        <section id="talleres-comunitarios-ia-memoria" className="mb-24">
          <div className="bg-paper border-[4px] border-[#1112] rounded-[32px] p-8 md:p-14 lg:p-16 shadow-[0_20px_60px_#0001] relative overflow-hidden">
            
            {/* Ambient Background Accent */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue/10 rounded-full blur-3xl pointer-events-none" />

            {/* Section Header */}
            <div className="relative z-10 max-w-4xl mb-12">
              <div className="inline-flex items-center gap-2 bg-orange text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[0.2em] mb-4">
                <BookOpen size={14} />
                <span>Programa Pedagógico & Creación Comunitaria</span>
              </div>
              <h2 className="text-[clamp(2.6rem,5vw,5rem)] leading-[0.92] uppercase font-extrabold font-barlow text-ink mb-4">
                Talleres comunitarios de IA y memoria
              </h2>
              <p className="font-editorial text-2xl md:text-3xl text-blue font-bold italic mb-6">
                Talleres de Inteligencia Artificial: la memoria de Manrique cobra vida
              </p>
              
              {/* Highlight quantitative achievement banner */}
              <div className="bg-white/80 border-2 border-orange/40 rounded-[20px] p-6 md:p-8 backdrop-blur-sm shadow-sm space-y-4 text-ink font-dm leading-relaxed text-base md:text-[1.08rem]">
                <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-orange">
                  <Award size={16} />
                  <span>Principales Logros Cuantitativos y Cualitativos</span>
                </div>
                <p>
                  <strong>Entre los principales logros cuantitativos se destaca la realización de dos talleres de inteligencia artificial con habitantes de Manrique</strong>, en los cuales la comunidad tuvo un acercamiento práctico a herramientas contemporáneas de creación de imágenes y producción audiovisual. Estos espacios permitieron vincular directamente a pobladores del territorio al proceso de creación y reflexión alrededor de la memoria barrial.
                </p>
                <p>
                  La realización de los dos talleres de inteligencia artificial con habitantes de Manrique amplió además el alcance de la propuesta. Estos espacios permitieron que la comunidad no fuera solamente espectadora del proyecto, sino que tuviera contacto directo con algunas de las herramientas utilizadas en su realización. Esto generó un intercambio entre saberes tecnológicos contemporáneos y conocimientos construidos desde la experiencia y la memoria local.
                </p>
              </div>
            </div>

            {/* The 4 Thematic Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative z-10">
              
              {/* Pillar 1 */}
              <div className="bg-white/90 border-2 border-[#1112] rounded-[24px] p-8 flex flex-col justify-between hover:border-orange transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange/15 text-orange flex items-center justify-center font-barlow font-extrabold text-xl mb-6">
                    01
                  </div>
                  <h3 className="text-xl md:text-2xl font-barlow uppercase font-extrabold text-ink mb-4">
                    La tecnología al servicio de nuestros recuerdos
                  </h3>
                  <div className="space-y-3 text-ink/80 text-sm md:text-base font-dm leading-relaxed">
                    <p>
                      En <strong>Manrique Memoria en Movimiento</strong>, creemos que la memoria de un territorio vive en sus fotografías, en las historias de sus habitantes y en los recuerdos que pasan de generación en generación. Cada imagen antigua guarda una parte de nuestra historia: las calles que recorrimos, las casas que levantamos, los lugares que nos reunieron y las personas que hicieron de Manrique el barrio que conocemos hoy.
                    </p>
                    <p>
                      Con el propósito de preservar ese patrimonio y acercarlo a las nuevas generaciones, desarrollamos talleres comunitarios de inteligencia artificial (IA) en los que los habitantes de la Comuna 3 de Medellín pueden aprender a restaurar, recuperar y animar fotografías históricas y familiares mediante herramientas tecnológicas accesibles.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1112]/20 flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider">
                  <HeartHandshake size={15} className="text-orange" />
                  <span>Patrimonio y memoria viva barrial</span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white/90 border-2 border-[#1112] rounded-[24px] p-8 flex flex-col justify-between hover:border-blue transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue/15 text-blue flex items-center justify-center font-barlow font-extrabold text-xl mb-6">
                    02
                  </div>
                  <h3 className="text-xl md:text-2xl font-barlow uppercase font-extrabold text-ink mb-4">
                    Restaurar una fotografía es recuperar una historia
                  </h3>
                  <div className="space-y-3 text-ink/80 text-sm md:text-base font-dm leading-relaxed">
                    <p>
                      El paso del tiempo deja huellas en las fotografías: manchas, rasgaduras, pérdida de color y detalles que poco a poco desaparecen. A través de la inteligencia artificial, es posible mejorar estas imágenes, reconstruir detalles deteriorados, recuperar sus tonalidades y darles movimiento de manera sutil.
                    </p>
                    <p>
                      Pero restaurar una fotografía es mucho más que mejorar su apariencia. Es reencontrarnos con nuestros seres queridos, reconocer los espacios que habitamos y descubrir cómo ha cambiado nuestro territorio. Es convertir una imagen guardada durante décadas en una oportunidad para conversar, recordar y compartir historias que merecen permanecer vivas.
                    </p>
                    <p className="font-semibold text-ink">
                      Cada fotografía recuperada es una puerta al pasado y una oportunidad para fortalecer los vínculos entre las personas y el lugar al que pertenecen.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1112]/20 flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider">
                  <History size={15} className="text-blue" />
                  <span>Reencuentro afectivo y territorial</span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-white/90 border-2 border-[#1112] rounded-[24px] p-8 flex flex-col justify-between hover:border-forest transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-800 flex items-center justify-center font-barlow font-extrabold text-xl mb-6">
                    03
                  </div>
                  <h3 className="text-xl md:text-2xl font-barlow uppercase font-extrabold text-ink mb-4">
                    Aprender, crear y compartir en comunidad
                  </h3>
                  <div className="space-y-3 text-ink/80 text-sm md:text-base font-dm leading-relaxed">
                    <p>
                      Los talleres de Manrique Memoria en Movimiento buscan acercar la inteligencia artificial a la comunidad de una manera práctica, participativa y accesible. A través de ejercicios creativos, los participantes exploran herramientas que permiten restaurar y animar fotografías desde sus propios recuerdos y archivos familiares.
                    </p>
                    <p>
                      Este proceso también propicia el encuentro entre generaciones. Los adultos mayores aportan sus experiencias, sus relatos y el conocimiento de la historia barrial, mientras que los más jóvenes pueden compartir sus habilidades digitales y descubrir nuevas formas de narrar el pasado.
                    </p>
                    <p className="font-semibold text-ink">
                      Así, la tecnología se convierte en un puente entre generaciones: un espacio donde las experiencias de quienes vivieron la transformación de Manrique se encuentran con la creatividad de quienes construirán su futuro.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1112]/20 flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider">
                  <Users size={15} className="text-emerald-700" />
                  <span>Encuentro intergeneracional</span>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="bg-white/90 border-2 border-[#1112] rounded-[24px] p-8 flex flex-col justify-between hover:border-amber-600 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-900 flex items-center justify-center font-barlow font-extrabold text-xl mb-6">
                    04
                  </div>
                  <h3 className="text-xl md:text-2xl font-barlow uppercase font-extrabold text-ink mb-4">
                    Una IA consciente y responsable
                  </h3>
                  <div className="space-y-3 text-ink/80 text-sm md:text-base font-dm leading-relaxed">
                    <p>
                      Creemos que la inteligencia artificial debe estar al servicio de las personas, la cultura y la memoria colectiva. Por eso, nuestro propósito no es solamente enseñar a utilizar herramientas tecnológicas, sino también promover una reflexión sobre su uso ético, crítico y responsable.
                    </p>
                    <p>
                      Trabajar con fotografías históricas implica reconocer que detrás de cada imagen existen personas, familias, experiencias y realidades que merecen respeto. Por ello, es fundamental contar con las autorizaciones correspondientes, proteger la dignidad de quienes aparecen en las fotografías y comunicar con transparencia cuándo una imagen ha sido restaurada, coloreada o animada mediante inteligencia artificial.
                    </p>
                    <p>
                      También es importante comprender que una imagen intervenida con IA puede incorporar detalles reconstruidos o elementos interpretados por la herramienta, por lo que no debe considerarse un documento histórico original inalterado, sino una <em>recreación visual orientada a preservar la memoria y facilitar su divulgación</em>.
                    </p>
                    <p className="font-semibold text-ink">
                      Nuestra propuesta promueve un uso consciente de la tecnología: una IA que no sustituye la memoria humana ni la verdad histórica, sino que ayuda a protegerla, revitalizarla y compartirla con respeto hacia la comunidad y su patrimonio.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1112]/20 flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider">
                  <ShieldCheck size={15} className="text-amber-800" />
                  <span>Ética, dignidad y rigor documental</span>
                </div>
              </div>

            </div>

            {/* =========================================================================
                INTERACTIVE RESTORATION WORKBENCH (Imágenes originales vs restauradas)
               ========================================================================= */}
            <div className="bg-white rounded-[26px] border-[3px] border-[#1112] p-8 md:p-12 mb-16 shadow-md relative z-10">
              <div className="max-w-3xl mb-8">
                <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-blue mb-2">
                  <Sliders size={16} />
                  <span>Prácticas de Restauración en Taller</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-barlow uppercase font-extrabold text-ink mb-2">
                  Imágenes originales junto a sus versiones restauradas
                </h3>
                <p className="text-muted text-sm md:text-base font-dm">
                  Durante las sesiones en la Casa de la Cultura Manrique, se realizaron ejercicios prácticos con imágenes históricas y fotografías de álbumes barriales. Selecciona un caso para interactuar con el comparador de antes y después:
                </p>
              </div>

              {/* Selector Tabs for Cases */}
              <div className="flex flex-wrap gap-2 mb-8">
                {RESTORATION_CASES.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveCaseId(item.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 ${
                      activeCaseId === item.id
                        ? 'bg-blue text-white shadow-sm'
                        : 'bg-paper text-ink/75 border border-[#1112] hover:bg-black/5 hover:text-ink'
                    }`}
                  >
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>

              {/* Active BeforeAfterSlider Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-center">
                <div className="rounded-[20px] overflow-hidden border-2 border-[#1112] bg-[#1a1a1a] shadow-inner">
                  <BeforeAfterSlider
                    beforeImage={selectedCase.beforeImage}
                    afterImage={selectedCase.afterImage}
                    beforeLabel={selectedCase.beforeLabel}
                    afterLabel={selectedCase.afterLabel}
                    aspectRatio="aspect-[4/3] md:aspect-[16/10]"
                  />
                </div>

                <div className="space-y-5">
                  <div>
                    <span className="text-[0.7rem] uppercase font-bold text-orange tracking-widest">
                      Caso de Estudio en Formación
                    </span>
                    <h4 className="text-2xl font-editorial font-bold text-ink mt-1">
                      {selectedCase.title}
                    </h4>
                    <p className="text-xs text-muted font-mono mt-1">
                      {selectedCase.subtitle}
                    </p>
                  </div>

                  <p className="text-ink/80 text-sm md:text-base font-dm leading-relaxed">
                    {selectedCase.description}
                  </p>

                  <div className="p-4 rounded-xl bg-paper border border-[#1112] text-xs font-dm space-y-1">
                    <span className="font-extrabold uppercase tracking-wider text-ink block text-[0.68rem]">
                      Herramientas y algoritmos utilizados:
                    </span>
                    <span className="text-ink/75 block">
                      {selectedCase.technique}
                    </span>
                  </div>

                  <p className="text-[0.75rem] text-muted font-mono">
                    * Desliza el controlador central o usa los botones de la barra superior para alternar vistas completas.
                  </p>
                </div>
              </div>
            </div>

            {/* =========================================================================
                TESTIMONIALS OF PARTICIPANTS (Voces de la Comunidad)
               ========================================================================= */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-orange mb-2">
                <Quote size={16} />
                <span>Apropiación Social de la Tecnología</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-barlow uppercase font-extrabold text-ink mb-3">
                Testimonios de los participantes
              </h3>
              <p className="text-muted text-sm md:text-base font-dm max-w-2xl mb-8">
                El impacto real de los talleres se evidencia en la voz de los habitantes de Manrique: cómo las personas mayores y jóvenes encontraron en la inteligencia artificial un canal para proteger su dignidad y sus vivencias.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map(t => (
                  <div 
                    key={t.id} 
                    className="bg-white/90 border-2 border-[#1112] rounded-[22px] p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative"
                  >
                    <div className="mb-6">
                      <div className="text-orange/30 mb-3">
                        <Quote size={32} />
                      </div>
                      <p className="text-ink/90 font-editorial text-lg italic leading-snug">
                        "{t.quote}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#1112]/15">
                      <h5 className="font-barlow font-extrabold uppercase text-base text-ink">
                        {t.author}
                      </h5>
                      <p className="text-xs text-blue font-bold">
                        {t.role}
                      </p>
                      <p className="text-[0.72rem] text-muted font-mono mt-0.5">
                        {t.neighborhood}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION: REGISTRO FOTOGRÁFICO (Memoria Visual del Proceso)
           ========================================================================= */}
        <section id="registro-fotografico" className="pt-8">
          <div className="border-t-2 border-[#1112] pt-12 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-extrabold text-orange mb-2">
                <Camera size={16} />
                <span>Memoria Visual del Proceso Comunitario</span>
              </div>
              <h2 className="text-[clamp(2.4rem,4.5vw,4.5rem)] leading-[0.9] uppercase font-extrabold font-barlow text-ink">
                Registro Fotográfico
              </h2>
              <p className="text-ink/80 text-base max-w-2xl mt-3 font-dm leading-relaxed">
                Fotografías de las jornadas comunitarias en la Casa de la Cultura Manrique, el trabajo práctico con los álbumes familiares y las piezas gráficas de difusión barrial. Cada imagen da testimonio de un territorio que se apropia de la tecnología para preservar su historia.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-paper p-1.5 rounded-full border-2 border-[#1112]">
              <button
                type="button"
                onClick={() => setActiveTab('todos')}
                className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                  activeTab === 'todos' 
                    ? 'bg-ink text-white shadow-sm' 
                    : 'text-ink/70 hover:text-ink hover:bg-black/5'
                }`}
              >
                Todos ({WORKSHOP_GALLERY.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('jornada')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                  activeTab === 'jornada' 
                    ? 'bg-blue text-white shadow-sm' 
                    : 'text-ink/70 hover:text-ink hover:bg-black/5'
                }`}
              >
                <Camera size={13} />
                Jornadas en vivo ({WORKSHOP_GALLERY.filter(p => p.category === 'jornada').length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('afiche')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                  activeTab === 'afiche' 
                    ? 'bg-orange text-white shadow-sm' 
                    : 'text-ink/70 hover:text-ink hover:bg-black/5'
                }`}
              >
                <ImageIcon size={13} />
                Afiches y Difusión ({WORKSHOP_GALLERY.filter(p => p.category === 'afiche').length})
              </button>
            </div>
          </div>

          {/* Photo Grid with Enhanced Descriptions & Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="bg-paper border-[3px] border-[#1112] rounded-[20px] overflow-hidden group cursor-pointer flex flex-col hover:border-ink hover:shadow-xl transition-all"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  {/* Photo Preview Container */}
                  <div className="relative aspect-[4/3] bg-black/5 overflow-hidden flex items-center justify-center border-b border-[#1112]">
                    <AnimatedImage
                      src={photo.imageUrl}
                      alt={photo.title}
                      wrapperClassName="w-full h-full"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Category Pill */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`px-3 py-1 rounded-full text-[0.68rem] font-extrabold uppercase tracking-widest shadow-md ${
                        photo.category === 'jornada' 
                          ? 'bg-blue text-white' 
                          : 'bg-orange text-white'
                      }`}>
                        {photo.categoryLabel}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye size={20} />
                      </div>
                      <span className="text-xs font-extrabold uppercase tracking-widest drop-shadow">
                        Ver en detalle
                      </span>
                    </div>
                  </div>

                  {/* Photo Meta & Enriched Description */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {photo.pedagogicalHighlight && (
                        <div className="text-[0.68rem] font-extrabold uppercase tracking-widest text-orange mb-1.5">
                          {photo.pedagogicalHighlight}
                        </div>
                      )}
                      <h4 className="font-editorial text-lg text-ink font-bold leading-snug line-clamp-2 mb-2 group-hover:text-blue transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-ink/80 font-dm line-clamp-3 leading-relaxed">
                        {photo.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-[#1112] flex items-center justify-between text-[0.72rem] text-muted font-mono">
                      <span>{photo.location}</span>
                      <span>{photo.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

      </div>

      {/* High-Resolution Image Viewer Modal with Full Enriched Details */}
      <ImageModal
        src={selectedPhoto?.imageUrl || null}
        alt={selectedPhoto?.title}
        title={selectedPhoto?.title}
        author={`${selectedPhoto?.categoryLabel} · ${selectedPhoto?.pedagogicalHighlight || 'Manrique Memoria en Movimiento'}`}
        year={`${selectedPhoto?.location || ''} • ${selectedPhoto?.date || ''}`}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}
