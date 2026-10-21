import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, ExternalLink, Film, Maximize2, Radio, Headphones, ArrowRight } from 'lucide-react';
import { AnimatedImage } from '../components/ui/AnimatedImage';
import { ImageModal } from '../components/ui/ImageModal';
import { VideoModal } from '../components/ui/VideoModal';
import { BRAND_LOGOS, handleImageFallback } from '../constants/logos';
import { FALLBACK_STORIES } from './Historias';

const GALLERY_ITEMS = [
  {
    id: 'teatro-manrique',
    src: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Captura_de_pantalla_2026-08-10_212607.png_202609021941.jpeg',
    title: 'Cine Teatro Manrique',
    subtitle: 'Hito patrimonial y cinematográfico de la Comuna 3 · Década de 1950',
    tag: 'Restauración IA 2K'
  },
  {
    id: 'abuela-cocina',
    src: '/img/FOTOS VIZTAZ/RESTAURADAS/2700198-me-restaurada.png',
    title: 'Cocina Tradicional y Saberes',
    subtitle: 'Intimidad doméstica y recetas transmitidas por generaciones',
    tag: 'Archivo Viztaz'
  },
  {
    id: 'la45-tranvia',
    src: '/img/ANTES Y DESPUES/LA 45/DAP-F-04-63273.0001.jpg_2K_202609022240.jpeg',
    title: 'Carrera 45 y el Tranvía',
    subtitle: 'El pulso de la arteria comercial y la movilidad histórica',
    tag: 'Reconstrucción 2K'
  },
  {
    id: 'iglesia-misericordias',
    src: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/Iglesia gótica bajo la montaña.png',
    title: 'Templo Señor de las Misericordias',
    subtitle: 'Arquitectura neogótica frente a las laderas andinas de Manrique',
    tag: 'Patrimonio Cultural'
  },
  {
    id: 'patio-familiar',
    src: '/img/FOTOS VIZTAZ/RESTAURADAS/2702218-restaurada.png',
    title: 'Patio Familiar y Generaciones',
    subtitle: 'Encuentro barrial en patio ajedrezado tradicional de Manrique',
    tag: 'Memoria Viva'
  }
];

export function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="relative bg-background">
      {/* Hero Section */}
      <section className="bg-white min-h-[calc(100svh-76px)] pt-[100px] md:pt-[120px] pb-12 flex flex-col justify-center items-center relative overflow-hidden" id="inicio">
        
        {/* Logo (Top) */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 w-[85vw] md:w-[50vw] max-w-[680px] mx-auto drop-shadow-sm pointer-events-none mb-4 md:mb-6"
        >
          <img 
            src={BRAND_LOGOS.home.src} 
            alt={BRAND_LOGOS.home.alt} 
            className="w-full h-auto object-contain"
            onError={(e) => handleImageFallback(e, BRAND_LOGOS.home.fallback)}
          />
        </motion.div>

        {/* Documental Oficial - Protagonista Central */}
        <div id="documental" className="w-full max-w-[1220px] mx-auto px-4 sm:px-6 relative z-20 mb-12 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-6 md:mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-orange text-white px-4 py-1.5 rounded-full text-[0.72rem] font-extrabold uppercase tracking-[0.2em] shadow-sm mb-3">
              <Film size={15} />
              <span>Documental Oficial · Estreno Comuna 3</span>
            </div>
            <h1 className="font-editorial text-[clamp(2.6rem,5.5vw,5.8rem)] leading-[0.85] tracking-[0.02em] uppercase text-ink my-2">
              Manrique, Memoria <span className="text-orange">en Movimiento</span>
            </h1>
            <p className="text-[clamp(1rem,1.35vw,1.25rem)] text-ink/80 max-w-[760px] mx-auto font-medium leading-relaxed">
              Voces de adultos mayores, fotografías familiares rescatadas de los álbumes del barrio e inteligencia artificial se encuentran para revivir la memoria de la Comuna 3 de Medellín.
            </p>
          </motion.div>

          {/* Video Player Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-[22px] md:rounded-[32px] overflow-hidden bg-black shadow-[0_30px_90px_rgba(0,0,0,0.35)] border-2 md:border-4 border-ink/10 relative group"
          >
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube-nocookie.com/embed/X9kKGVD0gjE?rel=0&modestbranding=1"
                title="Cortometraje Documental: Manrique, Memoria en Movimiento"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Video Metadata & Actions Bar */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-bold text-ink/75">
              <span className="bg-sand/70 px-3 py-1.5 rounded-full">Comuna 3 · Manrique</span>
              <span className="bg-sand/70 px-3 py-1.5 rounded-full">Archivo Oral y Fotográfico</span>
              <span className="bg-sand/70 px-3 py-1.5 rounded-full">Alcaldía de Medellín · PP Cultura</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center gap-2 text-xs md:text-sm font-extrabold text-ink hover:text-white bg-sand hover:bg-ink px-4 py-2.5 rounded-full transition-colors cursor-pointer"
                title="Abrir en pantalla completa / reproductor emergente"
              >
                <Maximize2 size={15} />
                <span>Modo cine</span>
              </button>

              <a
                href="https://youtu.be/X9kKGVD0gjE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs md:text-sm font-extrabold text-orange hover:text-ink transition-colors py-2 px-3"
              >
                <span>Ver en YouTube</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Archival Showcase Section */}
        <div className="w-full max-w-[1380px] mx-auto px-6 md:px-12 mt-4 md:mt-8 pt-10 border-t border-ink/10 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-14 items-center">
            {/* Left: Text & CTA */}
            <div>
              <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange mb-2">
                Archivo vivo · Comuna 3 · Medellín
              </div>
              <h2 className="font-editorial text-[clamp(3.2rem,5vw,6rem)] leading-[0.75] tracking-[0.025em] uppercase text-ink my-[12px]">
                La memoria<br/>está en movimiento.
              </h2>
              <p className="text-[clamp(1rem,1.35vw,1.25rem)] text-ink/85 max-w-[560px] font-medium my-6 leading-relaxed">
                Fotografías históricas, testimonios, lugares emblemáticos y nuevas tecnologías se encuentran para contar la memoria viva de Manrique desde la propia comunidad.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link 
                  to="/archivo" 
                  className="inline-flex items-center gap-2.5 bg-blue text-white border-0 rounded-full py-[14px] px-[26px] font-extrabold cursor-pointer hover:bg-teal transition-colors shadow-sm text-sm md:text-base"
                >
                  Explorar el archivo fotográfico →
                </Link>
              </div>
            </div>

            {/* Right: Main Image with breathing animation */}
            <div className="relative w-full">
              <motion.img 
                animate={{ scale: [1, 1.015], y: [0, -4] }}
                transition={{ duration: 11, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                src="https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/banner_1.png" 
                alt="Composición principal de Manrique en Movimiento" 
                className="w-full h-auto object-contain rounded-2xl drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white py-[115px] md:py-[115px]">
        <div className="w-[min(calc(100%-40px),1380px)] mx-auto grid grid-cols-1 md:grid-cols-[0.9fr_1.5fr] gap-10 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange">Manifiesto</div>
            <h2 className="text-[clamp(3.5rem,7vw,7.5rem)] my-2">
              Las fotografías<br/>guardan <span className="text-orange">recuerdos.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[clamp(1.7rem,3.4vw,3.6rem)] leading-[0.98] m-0"
          >
            Juntos podemos <em className="text-gold not-italic">devolverles la vida</em> sin borrar sus huellas. La IA es una herramienta; la memoria pertenece a la comunidad.
          </motion.p>
        </div>
      </section>

      {/* Voces que permanecen: Archivo Oral Showcase */}
      <section className="bg-[#f8f6f2] py-20 md:py-28 border-b border-ink/10">
        <div className="w-[min(calc(100%-40px),1380px)] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-orange mb-3">
                <Radio size={14} className="animate-pulse" />
                <span>Archivo de Memoria Oral · Núcleo Colectivo</span>
              </div>
              <h2 className="text-[clamp(2.6rem,5vw,5rem)] font-barlow font-black uppercase tracking-tight text-ink leading-[0.9]">
                Voces que <span className="text-blue">permanecen.</span>
              </h2>
              <p className="text-muted font-serif italic text-lg md:text-xl mt-2 max-w-xl">
                El barrio contado por quienes lo vivieron: seis crónicas orales y retratos de nuestros mayores.
              </p>
            </div>
            <Link
              to="/historias"
              className="inline-flex items-center gap-2.5 bg-ink hover:bg-orange text-white px-6 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md self-start md:self-auto"
            >
              <Headphones size={16} />
              <span>Escuchar las 6 crónicas orales</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Grid of 6 characters */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {FALLBACK_STORIES.map((story) => (
              <Link
                key={story.id}
                to="/historias"
                className="group relative rounded-2xl overflow-hidden bg-ink border border-ink/10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-ink">
                  <AnimatedImage
                    src={story.imageUrl!}
                    alt={story.authorId}
                    wrapperClassName="w-full h-full absolute inset-0 bg-ink"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />

                  <span className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded-full bg-orange text-white text-[0.65rem] font-black font-mono shadow">
                    {story.number}
                  </span>

                  <span className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-full bg-black/60 text-white/90 text-[0.65rem] font-bold border border-white/10 backdrop-blur-sm">
                    {story.duration}
                  </span>

                  <div className="absolute bottom-2.5 left-3 right-3 z-20 text-white">
                    <h3 className="font-barlow font-black uppercase text-sm leading-tight text-white group-hover:text-gold transition-colors">
                      {story.authorId}
                    </h3>
                    <p className="text-[0.68rem] text-white/70 truncate font-serif italic">
                      {story.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Banner */}
      <section className="bg-background py-[80px] md:py-[115px]">
        <div className="w-[min(calc(100%-40px),1380px)] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-blue rounded-[26px] overflow-hidden flex flex-col md:flex-row relative"
          >
            <div className="p-8 md:p-14 lg:p-20 flex-1 flex flex-col justify-center relative z-10 text-white">
              <div className="inline-block bg-orange text-white px-3 py-1 rounded-full text-[0.65rem] font-extrabold uppercase tracking-[0.2em] w-max mb-6">
                Taller Realizado · Registro y Memoria
              </div>
              <h2 className="text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.85] font-barlow uppercase font-extrabold mb-6">
                Memoria, Creatividad<br/>e Inteligencia Artificial
              </h2>
              <p className="text-white/95 text-base md:text-lg font-dm mb-8 max-w-xl leading-relaxed">
                Dos talleres de inteligencia artificial realizados con habitantes de Manrique en la Casa de la Cultura. Un espacio práctico donde la comunidad aprendió a restaurar y preservar fotografías barriales, uniendo saberes tecnológicos contemporáneos y memoria local.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/talleres#talleres-comunitarios-ia-memoria" className="inline-flex items-center gap-2.5 bg-white text-blue border-0 rounded-full py-[15px] px-[28px] font-extrabold cursor-pointer hover:bg-orange hover:text-white transition-colors">
                  Talleres de IA y Memoria →
                </Link>
                <Link to="/talleres#registro-fotografico" className="inline-flex items-center gap-2 border-2 border-white/60 text-white rounded-full py-[13px] px-[24px] font-extrabold cursor-pointer hover:bg-white hover:text-blue transition-colors">
                  Registro Fotográfico
                </Link>
              </div>
            </div>
            
            {/* Banner Image */}
            <div 
              className="md:w-[40%] xl:w-[45%] relative min-h-[400px] md:min-h-full bg-white flex items-center justify-center p-8 md:p-12 cursor-pointer group"
              onClick={() => setSelectedImage("https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/talleres/talleres_ok_01.png")}
            >
              <AnimatedImage 
                src="https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/talleres/talleres_ok_01.png"
                alt="Taller de IA"
                wrapperClassName="relative w-full h-full bg-transparent transition-transform duration-500 group-hover:scale-[1.02]"
                className="w-full h-full object-contain object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Convocatoria Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border-[5px] border-[#1112] rounded-[26px] overflow-hidden flex flex-col lg:flex-row relative mt-12 bg-paper"
          >
            {/* Image side (Poster) */}
            <div 
              className="lg:w-[45%] xl:w-[40%] bg-white relative min-h-[400px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-[#1112] flex items-center justify-center p-8 lg:p-12 cursor-pointer group"
              onClick={() => setSelectedImage("https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/talleres/convocatorias_01.png")}
            >
               <AnimatedImage 
                  src="https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/talleres/convocatorias_01.png" 
                  alt="Convocatoria historias familiares" 
                  wrapperClassName="relative w-full h-full bg-transparent transition-transform duration-500 group-hover:scale-[1.02]"
                  className="w-full h-full object-contain object-center"
                  referrerPolicy="no-referrer"
                />
            </div>

            {/* Content side */}
            <div className="lg:w-[55%] xl:w-[60%] p-8 md:p-14 lg:p-20 flex flex-col justify-center">
              <div className="inline-block bg-orange/10 text-orange px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest w-max mb-6">
                Convocatoria Permanente
              </div>
              
              <h2 className="text-[clamp(2.2rem,4vw,4rem)] leading-[0.9] uppercase font-extrabold font-barlow text-ink mb-6">
                Buscamos las historias que aún viven en los álbumes familiares
              </h2>
              
              <div className="space-y-3 mb-8 text-sm md:text-base text-ink font-medium">
                <div className="flex items-center gap-3">
                  <CalendarIcon size={18} className="text-orange" />
                  <span>Convocatoria Abierta | 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-orange" />
                  <span>Comuna 3, Manrique</span>
                </div>
              </div>
              
              <p className="text-ink/80 mb-10 text-base md:text-lg font-dm leading-relaxed max-w-2xl">
                ¿Conoces a un adulto mayor que haya vivido toda su vida en Manrique, conserve fotografías de su juventud y tenga historias para contar? Buscamos fotografías familiares y del barrio de los años 40, 50, 60 y 70 para un documental.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-auto">
                <Link 
                  to="/talleres"
                  className="inline-flex items-center gap-2.5 bg-[#124C65] text-white border-0 rounded-full py-[15px] px-[24px] font-extrabold cursor-pointer hover:bg-blue transition-colors"
                >
                  Ver Registro de Convocatoria →
                </Link>
                <span className="font-extrabold text-orange uppercase tracking-widest text-sm">
                  Archivo en Custodia
                </span>
              </div>
            </div>
          </motion.div>

          {/* Socialización del Proyecto Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-[#124C65] rounded-[26px] overflow-hidden flex flex-col md:flex-row relative mt-12 text-white"
          >
            <div className="p-8 md:p-14 lg:p-20 flex-1 flex flex-col justify-center relative z-10">
              <div className="inline-block bg-orange text-white px-3 py-1 rounded-full text-[0.65rem] font-extrabold uppercase tracking-[0.2em] w-max mb-6">
                Socialización Comunitaria · Entrega de Resultados
              </div>
              <h2 className="text-[clamp(2.3rem,4.2vw,4.2rem)] leading-[0.88] font-barlow uppercase font-extrabold mb-6">
                Socialización del Proyecto<br/>Manrique Memoria en Movimiento
              </h2>
              <div className="space-y-3 mb-8 text-sm md:text-base text-white/90 font-medium">
                <div className="flex items-center gap-3">
                  <CalendarIcon size={18} className="text-orange" />
                  <span>Martes 20 de Octubre, 2026 • 6:00 p. m.</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-orange" />
                  <span>Casa de la Cultura Manrique - La 45 (Carrera 45 # 72-62)</span>
                </div>
              </div>
              <p className="text-white/90 text-lg font-dm mb-8 max-w-xl">
                Jornada comunitaria de cierre: presentación de resultados, proyección de cápsulas audiovisuales, exposición de fotografías históricas restauradas y diálogo abierto con los habitantes del territorio.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/talleres" className="inline-flex items-center gap-2.5 bg-white text-[#124C65] border-0 rounded-full py-[15px] px-[28px] font-extrabold cursor-pointer hover:bg-orange hover:text-white transition-colors">
                  Ver Afiches y Registro →
                </Link>
              </div>
            </div>
            
            {/* Poster side */}
            <div 
              className="md:w-[40%] xl:w-[45%] relative min-h-[420px] md:min-h-full bg-white flex items-center justify-center p-8 md:p-12 cursor-pointer group"
              onClick={() => setSelectedImage("/img/talleres/socializacion_01.png")}
            >
              <AnimatedImage 
                src="/img/talleres/socializacion_01.png"
                alt="Afiche de Socialización Manrique Memoria en Movimiento"
                wrapperClassName="relative w-full h-full bg-transparent transition-transform duration-500 group-hover:scale-[1.02]"
                className="w-full h-full object-contain object-center"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery / Archive preview section matching reference design */}
      <section className="py-[80px] md:py-[115px] bg-ink">
        <div className="w-[min(calc(100%-40px),1380px)] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-12 items-end mb-12">
            <div>
              <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange">07 · Galería</div>
              <h2 className="text-[clamp(3.5rem,7vw,7.5rem)] my-2 text-white">Fragmentos<br/>del <span className="text-orange">archivo.</span></h2>
            </div>
            <p className="text-white/70 text-[1.1rem] max-w-[680px]">
              La inteligencia artificial hace posible lo que el tiempo había borrado: devuelve el color a las imágenes en blanco y negro, reconstruye los detalles, y da movimiento sutil a los rostros congelados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-3.5">
            {GALLERY_ITEMS.map((item, i) => (
              <figure 
                key={item.id} 
                className={`m-0 overflow-hidden rounded-[18px] bg-zinc-900 border border-white/10 relative group cursor-pointer transition-all duration-300 hover:border-orange/60 shadow-lg ${i === 0 ? 'md:row-span-2 min-h-[360px] md:min-h-[480px]' : 'min-h-[220px] md:min-h-[235px]'}`}
                onClick={() => setSelectedImage(item.src)}
              >
                <AnimatedImage 
                  src={item.src} 
                  alt={item.title} 
                  wrapperClassName="w-full h-full"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-65 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                {/* Badge top-left */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-bold bg-black/80 backdrop-blur-md text-white border border-white/20 rounded shadow">
                    {item.tag}
                  </span>
                </div>

                {/* Info on bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 transition-transform duration-300 transform translate-y-1 group-hover:translate-y-0">
                  <h4 className="font-editorial text-lg sm:text-xl text-white font-bold leading-tight group-hover:text-orange transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-white/75 text-xs font-sans line-clamp-1 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </figure>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <Link to="/archivo" className="inline-flex items-center gap-2.5 bg-transparent text-white border border-white/20 rounded-full py-[13px] px-[19px] font-extrabold cursor-pointer hover:bg-white/10 transition-colors">
              Ver Archivo Completo →
            </Link>
          </div>
        </div>
      </section>

      <ImageModal 
        src={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoId="X9kKGVD0gjE"
        title="Cortometraje: Manrique, Memoria en Movimiento"
      />
    </div>
  );
}
