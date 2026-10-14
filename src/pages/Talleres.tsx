import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, CheckCircle2, Camera, Eye, Layers, Sparkles, Image as ImageIcon } from 'lucide-react';
import { AnimatedImage } from '../components/ui/AnimatedImage';
import { ImageModal } from '../components/ui/ImageModal';

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
    description: 'Encuentros de formación donde la comunidad de Manrique aprendió y exploró herramientas de Inteligencia Artificial para la restauración fotográfica, el rescate de historias locales y la creación digital colaborativa.',
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
    title: 'Encuentro en la Casa de la Cultura Manrique',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 6.JPG',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura - La 45',
    description: 'Mesa redonda inicial con vecinos y líderes del territorio compartiendo recuerdos, anécdotas y expectativas del taller.'
  },
  {
    id: 'foto-7',
    title: 'Revisión y diálogo sobre fotografías históricas',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 7.JPG',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique',
    description: 'Participantes analizando colectivamente el valor patrimonial de las fotos familiares y los lugares emblemáticos de Manrique.'
  },
  {
    id: 'foto-8',
    title: 'Explicación metodológica y herramientas de IA',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 8.JPG',
    date: 'Septiembre 2026',
    location: 'Sala de talleres',
    description: 'Presentación interactiva de las técnicas de remasterización, restauración de color y rescate de negativos mediante algoritmos generativos.'
  },
  {
    id: 'foto-11',
    title: 'Mesa de trabajo y escucha activa intergeneracional',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 11.jpeg',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique',
    description: 'Diálogo entre jóvenes y adultos mayores para contrastar testimonios sobre el tranvía, los convites y la vida en las colinas.'
  },
  {
    id: 'foto-12',
    title: 'Documentación y registro oral de testimonios',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 12.jpeg',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique',
    description: 'Espacio de grabación y notas de campo para documentar las historias vivas que enriquecen el archivo sonoro del barrio.'
  },
  {
    id: 'foto-14',
    title: 'Exploración directa de copias de archivo',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 14.jpeg',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique',
    description: 'Los participantes examinan impresiones de fotografías patrimoniales de la Biblioteca Pública Piloto y la Corporación Viztaz.'
  },
  {
    id: 'foto-15',
    title: 'Memorias de barrio y vida cotidiana compartida',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 15.jpeg',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique',
    description: 'Conversación comunitaria sobre los primeros comercios, las tiendas de esquina y los vínculos familiares que forjaron la Comuna 3.'
  },
  {
    id: 'foto-18',
    title: 'Co-creación y contraste de memorias territoriales',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 18.jpeg',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique',
    description: 'Puesta en común de ideas sobre cómo la inteligencia artificial puede estar al servicio de la memoria comunitaria y no de la desinformación.'
  },
  {
    id: 'foto-20',
    title: 'Cierre de la jornada de formación comunitaria',
    category: 'jornada',
    categoryLabel: 'Jornada Presencial',
    imageUrl: '/img/talleres/C537-004 FOTO 20.jpeg',
    date: 'Septiembre 2026',
    location: 'Casa de la Cultura Manrique',
    description: 'Agradecimiento a los asistentes por su tiempo, sus recuerdos y su compromiso con la memoria viva de Manrique.'
  },
  {
    id: 'afiche-socializacion-1',
    title: 'Afiche Oficial · Socialización del Proyecto Manrique Memoria en Movimiento',
    category: 'afiche',
    categoryLabel: 'Material de Difusión',
    imageUrl: '/img/talleres/socializacion_01.png',
    date: 'Octubre 2026',
    location: 'Casa de la Cultura Manrique - La 45',
    description: 'Pieza gráfica oficial de convocatoria para la socialización de resultados, proyección audiovisual, galería fotográfica y cierre comunitario en la Casa de la Cultura Manrique.'
  },
  {
    id: 'afiche-taller-1',
    title: 'Afiche Oficial · Taller de Memoria e Inteligencia Artificial',
    category: 'afiche',
    categoryLabel: 'Material de Difusión',
    imageUrl: '/img/talleres/talleres_ok_01.png',
    date: '2026',
    location: 'Casa de la Cultura Manrique - La 45',
    description: 'Pieza gráfica con la programación del taller presencial de reconstrucción fotográfica y narrativa barrial.'
  },
  {
    id: 'afiche-taller-2',
    title: 'Afiche Secundario · Memoria, Creatividad e IA',
    category: 'afiche',
    categoryLabel: 'Material de Difusión',
    imageUrl: '/img/talleres/talleres_ok_02.png',
    date: '2026',
    location: 'Casa de la Cultura Manrique - La 45',
    description: 'Diseño gráfico adaptado para la convocatoria del segundo ciclo de talleres comunitarios.'
  },
  {
    id: 'afiche-convocatoria-1',
    title: 'Convocatoria · Álbumes Familiares de Manrique (01)',
    category: 'afiche',
    categoryLabel: 'Material de Difusión',
    imageUrl: '/img/talleres/convocatorias_01.png',
    date: '2026',
    location: 'Comuna 3, Manrique',
    description: 'Campaña comunitaria convocando a adultos mayores para compartir fotos de los años 40, 50, 60 y 70.'
  },
  {
    id: 'afiche-convocatoria-2',
    title: 'Convocatoria · Relatos y Voces del Barrio (02)',
    category: 'afiche',
    categoryLabel: 'Material de Difusión',
    imageUrl: '/img/talleres/convocatorias_02.png',
    date: '2026',
    location: 'Comuna 3, Manrique',
    description: 'Diseño enfocado en la memoria colectiva y el valor de las anécdotas de juventud en Manrique.'
  },
  {
    id: 'afiche-convocatoria-3',
    title: 'Convocatoria · Memoria Fotográfica Barrial (03)',
    category: 'afiche',
    categoryLabel: 'Material de Difusión',
    imageUrl: '/img/talleres/convocatorias_03.png',
    date: '2026',
    location: 'Comuna 3, Manrique',
    description: 'Pieza gráfica difundida en redes y puntos clave de la Comuna 3 para invitar a la participación comunitaria.'
  }
];

export function Talleres() {
  const [activeTab, setActiveTab] = useState<'todos' | 'jornada' | 'afiche'>('todos');
  const [selectedPhoto, setSelectedPhoto] = useState<RegisterPhoto | null>(null);

  const filteredPhotos = useMemo(() => {
    if (activeTab === 'todos') return WORKSHOP_GALLERY;
    return WORKSHOP_GALLERY.filter(p => p.category === activeTab);
  }, [activeTab]);

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
              <span>06 · Comunidad & Memoria</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange/60" />
              <span className="text-forest">Ciclo Realizado</span>
            </div>
            <h1 className="text-[clamp(3.2rem,6.5vw,7rem)] leading-[0.88] my-2">
              Aprender<br />
              <span className="text-blue">haciendo.</span>
            </h1>
          </div>
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-800 border border-emerald-500/30 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Jornadas y talleres completados exitosamente</span>
            </div>
            <p className="text-muted text-[1.1rem] leading-relaxed max-w-[640px]">
              Los espacios de formación comunitaria y rescate testimonial en la Casa de la Cultura Manrique ya fueron realizados. Presentamos el archivo fotográfico que documenta el diálogo intergeneracional, el aprendizaje compartido y las memorias preservadas.
            </p>
          </div>
        </motion.div>

        {/* Informative Summary Cards (Inscription buttons removed as workshops took place) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {COMPLETED_EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="bg-paper border-[4px] border-[#1112] rounded-[22px] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 bg-orange/10 text-orange px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest">
                    <Sparkles size={13} />
                    {event.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-[#124C65]/10 text-[#124C65] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    {event.status}
                  </span>
                </div>

                <h3 className="text-[1.8rem] md:text-[2.2rem] leading-[0.95] uppercase font-extrabold font-barlow text-ink mb-6">
                  {event.title}
                </h3>

                <div className="space-y-2.5 mb-6 text-sm text-ink/90 font-medium">
                  <div className="flex items-center gap-3">
                    <CalendarIcon size={17} className="text-orange shrink-0" />
                    <span>{event.date} {event.time !== 'N/A' && `• ${event.time}`}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={17} className="text-orange shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-ink/80 text-base font-dm leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-8 py-5 bg-white/60 border-t border-[#1112] flex items-center justify-between">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  {event.tag}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const match = WORKSHOP_GALLERY.find(g => g.imageUrl === event.imageUrl);
                    if (match) setSelectedPhoto(match);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue hover:text-orange transition-colors"
                >
                  <Eye size={15} />
                  <span>Ver afiche en grande</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Photographic Registration Gallery Section */}
        <section id="registro-fotografico" className="pt-8">
          <div className="border-t-2 border-[#1112] pt-12 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-extrabold text-orange mb-2">
                <Camera size={16} />
                <span>Memoria Visual del Proceso</span>
              </div>
              <h2 className="text-[clamp(2.4rem,4.5vw,4.5rem)] leading-[0.9] uppercase font-extrabold font-barlow text-ink">
                Registro Fotográfico
              </h2>
              <p className="text-muted text-base max-w-xl mt-2 font-dm">
                Fotografías de las jornadas comunitarias, el trabajo en sala en la Casa de la Cultura Manrique y las piezas de convocatoria barrial.
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
                Afiches y Convocatorias ({WORKSHOP_GALLERY.filter(p => p.category === 'afiche').length})
              </button>
            </div>
          </div>

          {/* Photo Grid */}
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
                  className="bg-paper border-[3px] border-[#1112] rounded-[18px] overflow-hidden group cursor-pointer flex flex-col hover:border-ink hover:shadow-lg transition-all"
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
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye size={20} />
                      </div>
                      <span className="text-xs font-extrabold uppercase tracking-widest drop-shadow">
                        Ver foto
                      </span>
                    </div>
                  </div>

                  {/* Photo Meta */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-editorial text-lg text-ink font-bold leading-snug line-clamp-2 mb-2 group-hover:text-blue transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-ink/70 font-dm line-clamp-2 leading-relaxed">
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

      {/* High-Resolution Image Viewer Modal */}
      <ImageModal
        src={selectedPhoto?.imageUrl || null}
        alt={selectedPhoto?.title}
        title={selectedPhoto?.title}
        author={selectedPhoto?.categoryLabel}
        year={`${selectedPhoto?.location || ''} • ${selectedPhoto?.date || ''}`}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}
