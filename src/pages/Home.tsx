import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { AnimatedImage } from '../components/ui/AnimatedImage';
import { ImageModal } from '../components/ui/ImageModal';

const GALLERY = [
  "https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/DAP-F-04-63270.0001.jpg",
  "https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20210431.png",
  "https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/DAP-F-04-63273.0001.jpg",
  "https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20210542.png",
  "https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/DAP-F-04-63276.0001.jpg",
];

export function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="relative bg-background">
      {/* Hero Section */}
      <section className="bg-white min-h-[calc(100svh-76px)] pt-[100px] md:pt-[120px] pb-12 flex flex-col justify-center items-center relative overflow-hidden" id="inicio">
        
        {/* Logo (Top, subtle overlap with negative margin) */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 w-[85vw] md:w-[55vw] max-w-[750px] mx-auto -mb-[2%] md:-mb-[4%] drop-shadow-sm pointer-events-none"
        >
          <img 
            src="https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/logospng/logo_home.png" 
            alt="Manrique, Memoria en Movimiento" 
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* Main Image with breathing animation */}
        <div className="relative w-full max-w-[1120px] mx-auto px-4 z-0">
          <motion.img 
            animate={{ scale: [1, 1.015], y: [0, -5] }}
            transition={{ duration: 11, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            src="https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/banner_1.png" 
            alt="Composición principal de Manrique en Movimiento" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Text Area (Bottom) */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-20 mt-4 md:mt-2">
          {/* Desktop Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden md:block max-w-[650px] drop-shadow-[0_2px_25px_rgba(255,255,255,0.8)]"
          >
            <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange mb-2">Archivo vivo · Comuna 3 · Medellín</div>
            <h1 className="font-editorial text-[clamp(3.8rem,6vw,7.5rem)] leading-[0.72] tracking-[0.025em] uppercase text-ink my-[10px]">
              La memoria<br/>está en movimiento.
            </h1>
            <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-ink max-w-[560px] font-medium mb-6">
              Fotografías, voces, lugares y nuevas tecnologías se encuentran para contar la memoria de Manrique desde la comunidad.
            </p>
            <Link to="/archivo" className="inline-flex items-center gap-2.5 bg-blue text-white border-0 rounded-full py-[13px] px-[19px] font-extrabold cursor-pointer hover:bg-teal transition-colors drop-shadow-none">
              Explorar el archivo →
            </Link>
          </motion.div>

          {/* Mobile Text */}
          <div className="md:hidden mt-8">
            <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange mb-2">Archivo vivo · Comuna 3 · Medellín</div>
            <h1 className="font-editorial text-[4.2rem] leading-[0.72] tracking-[0.015em] uppercase text-ink my-[10px]">
              La memoria<br/>está en movimiento.
            </h1>
            <p className="text-[1rem] text-ink max-w-[560px] font-medium mb-6">
              Fotografías, voces, lugares y nuevas tecnologías se encuentran para contar la memoria de Manrique desde la comunidad.
            </p>
            <Link to="/archivo" className="inline-flex items-center gap-2.5 bg-blue text-white border-0 rounded-full py-[13px] px-[19px] font-extrabold cursor-pointer hover:bg-teal transition-colors">
              Explorar el archivo →
            </Link>
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
                Taller Presencial
              </div>
              <h2 className="text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.85] font-barlow uppercase font-extrabold mb-6">
                Memoria, Creatividad<br/>e Inteligencia Artificial
              </h2>
              <p className="text-white/90 text-lg md:text-xl font-dm mb-8 max-w-xl">
                Aprende a usar la IA para reconstruir fotografías y contar las historias de Manrique. No necesitas experiencia previa. Entrada gratuita.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                 <Link to="/talleres" className="inline-flex items-center gap-2.5 bg-white text-blue border-0 rounded-full py-[15px] px-[28px] font-extrabold cursor-pointer hover:bg-orange hover:text-white transition-colors">
                  Más Información →
                </Link>
                <a href="https://wa.me/573196242779" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-transparent border border-white/30 text-white rounded-full py-[15px] px-[28px] font-extrabold cursor-pointer hover:bg-white/10 transition-colors">
                  Inscribirse por WhatsApp
                </a>
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
                <a 
                  href="https://wa.me/573196242779"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#124C65] text-white border-0 rounded-full py-[15px] px-[24px] font-extrabold cursor-pointer hover:bg-blue transition-colors"
                >
                  Escríbenos al WhatsApp →
                </a>
                <span className="font-extrabold text-orange uppercase tracking-widest text-sm">
                  Participa
                </span>
              </div>
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

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-3">
            {GALLERY.map((src, i) => (
              <figure 
                key={i} 
                className={`m-0 overflow-hidden rounded-[18px] bg-[#222] relative group cursor-pointer ${i === 0 ? 'md:row-span-2' : ''}`}
                onClick={() => setSelectedImage(src)}
              >
                <AnimatedImage 
                  src={src} 
                  alt={`Galería ${i + 1}`} 
                  wrapperClassName="w-full h-full min-h-[220px]"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  referrerPolicy="no-referrer"
                />
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
    </div>
  );
}
