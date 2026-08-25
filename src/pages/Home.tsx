import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { AnimatedImage } from '../components/ui/AnimatedImage';

const GALLERY = [
  "https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/DAP-F-04-63270.0001.jpg",
  "https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20210431.png",
  "https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/DAP-F-04-63273.0001.jpg",
  "https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20210542.png",
  "https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/DAP-F-04-63276.0001.jpg",
];

export function Home() {
  return (
    <div className="relative bg-background">
      {/* Hero Section */}
      <section className="bg-white min-h-[calc(100svh-76px)] pt-[20px] md:pt-[40px] pb-12 flex flex-col justify-center items-center relative overflow-hidden" id="inicio">
        
        {/* Logo (Top, subtle overlap with negative margin) */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 w-[85vw] md:w-[55vw] max-w-[750px] mx-auto -mb-[8%] md:-mb-[10%] drop-shadow-sm pointer-events-none"
        >
          <img 
            src="https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/logospng/logo_home.png" 
            alt="Manrique, Memoria en Movimiento" 
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* Main Image with breathing animation */}
        <div className="relative w-full max-w-[1400px] mx-auto px-4 z-0">
          <motion.img 
            animate={{ scale: [1, 1.015], y: [0, -5] }}
            transition={{ duration: 11, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            src="https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/banner_1.png" 
            alt="Composición principal de Manrique en Movimiento" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Text Area (Bottom, subtle overlap with negative margin) */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-20 -mt-[10%] md:-mt-[12%]">
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

      {/* Gallery / Archive preview section matching reference design */}
      <section className="py-[80px] md:py-[115px] bg-background">
        <div className="w-[min(calc(100%-40px),1380px)] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-12 items-end mb-12">
            <div>
              <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange">07 · Galería</div>
              <h2 className="text-[clamp(3.5rem,7vw,7.5rem)] my-2">Fragmentos<br/>del <span className="text-orange">archivo.</span></h2>
            </div>
            <p className="text-muted text-[1.1rem] max-w-[680px]">
              La inteligencia artificial hace posible lo que el tiempo había borrado: devuelve el color a las imágenes en blanco y negro, reconstruye los detalles, y da movimiento sutil a los rostros congelados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-3">
            {GALLERY.map((src, i) => (
              <figure key={i} className={`m-0 overflow-hidden rounded-[18px] bg-white relative group ${i === 0 ? 'md:row-span-2' : ''}`}>
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
             <Link to="/archivo" className="inline-flex items-center gap-2.5 bg-transparent text-ink border border-[#1112] rounded-full py-[13px] px-[19px] font-extrabold cursor-pointer hover:bg-line transition-colors">
              Ver Archivo Completo →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
