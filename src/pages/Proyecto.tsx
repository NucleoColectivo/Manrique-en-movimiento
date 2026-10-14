import { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { PlayCircle, Image as ImageIcon, Users, ArchiveRestore } from 'lucide-react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { AnimatedImage } from '../components/ui/AnimatedImage';
import { VideoModal } from '../components/ui/VideoModal';

const TEAM = [
  { name: 'Carlos Andrés Londoño Ruiz', role: 'Director Creativo & IA Manager' },
  { name: 'Manuel Palacio', role: 'Diseñador Web y Gráfico' },
  { name: 'Maria Cecilia Castaño', role: 'Gestora de Archivo y Comunicadora' },
];

export function Proyecto() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-orange origin-left z-[100]"
        style={{ scaleX }}
      />
      <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="w-[min(calc(100%-40px),1380px)] mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange">01 · Propósito</div>
            <h1 className="text-[clamp(3.5rem,7vw,7.5rem)] my-2">El <span className="text-orange">Proyecto.</span></h1>
            <p className="text-muted text-[1.1rem] max-w-[680px]">
              Un proyecto colaborativo que recupera, preserva y comparte la memoria fotográfica del barrio Manrique, combinando patrimonio, tecnología y comunidad.
            </p>
          </div>
          <div className="relative aspect-square md:aspect-[4/5] rounded-[24px] overflow-hidden bg-white shadow-[0_25px_80px_#0002]">
            <AnimatedImage 
              src="https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20210824.png" 
              alt="Archivo fotográfico antiguo" 
              wrapperClassName="absolute inset-0 w-full h-full"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.025]"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white border border-[#1112] rounded-[24px] p-[25px]"
          >
            <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange mb-2">Pilar</div>
            <h3 className="text-[2.5rem] leading-[0.85] text-ink uppercase font-extrabold mb-4">Objetivo</h3>
            <p className="text-ink">
              Restaurar, colorizar y animar con herramientas de IA un corpus de fotografías históricas del barrio Manrique para producir un corto documental que circule en espacios comunitarios y plataformas digitales.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white border border-[#1112] rounded-[24px] p-[25px]"
          >
            <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange mb-2">Pilar</div>
            <h3 className="text-[2.5rem] leading-[0.85] text-ink uppercase font-extrabold mb-4">Comunidad</h3>
            <p className="text-ink">
              Recuperar memoria oral de los adultos mayores de la comuna 3. Diseñar e implementar talleres de formación comunitaria en restauración y animación de fotografías, con énfasis en puentes intergeneracionales.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-24"
        >
          <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange">Restauración</div>
          <h2 className="text-[clamp(3.5rem,7vw,7.5rem)] my-2">El poder de la IA en la <span className="text-blue">memoria.</span></h2>
          <p className="text-muted text-[1.1rem] max-w-[680px] mb-8">
            Utilizamos modelos generativos avanzados para reconstruir detalles perdidos por el tiempo, eliminar ruido y devolver el color a la historia, siempre respetando la verdad histórica.
          </p>
          
          <div className="rounded-[24px] overflow-hidden border border-[#1112] bg-[#222]">
            <BeforeAfterSlider 
              beforeImage="https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/DAP-F-04-63270.0001.jpg"
              afterImage="https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/DAP-F-04-63270.0001.jpg" 
            />
          </div>
          <p className="text-[0.82rem] text-muted mt-4 text-center font-bold">Comparador interactivo · mueve la línea central.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={() => setIsVideoOpen(true)}
          className="rounded-[26px] overflow-hidden bg-white shadow-[0_25px_80px_#0002] mb-24 relative group cursor-pointer border-2 border-transparent hover:border-orange/60 transition-all duration-300"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsVideoOpen(true);
            }
          }}
          aria-label="Reproducir cortometraje Manrique, Memoria en Movimiento"
        >
          <div className="absolute inset-0 z-0">
             <AnimatedImage 
                src="https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20211821.png" 
                alt="Manrique" 
                wrapperClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-ink/75 group-hover:bg-ink/65 transition-colors pointer-events-none" />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center p-[60px_20px] md:p-[80px_20px]">
            <div className="inline-block bg-orange/90 text-white px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest mb-6 backdrop-blur-sm shadow-md">
              Disponible en YouTube
            </div>
            <div className="relative mb-6">
              <div className="absolute -inset-3 bg-orange/30 rounded-full blur-xl group-hover:bg-orange/50 transition-all opacity-70 group-hover:scale-125" />
              <PlayCircle size={72} className="relative text-orange group-hover:scale-110 group-hover:text-white transition-all duration-300 drop-shadow-lg" />
            </div>
            <h2 className="text-[clamp(3rem,5vw,5rem)] text-white my-2 group-hover:text-gold transition-colors">Ver Documental</h2>
            <p className="text-white/80 max-w-lg text-[1.05rem] md:text-[1.15rem] leading-relaxed mb-6 font-medium">
              Cortometraje "Manrique, Memoria en Movimiento" (4-5 min) que integra fotografías restauradas con los testimonios de nuestros adultos mayores.
            </p>
            <div className="inline-flex items-center gap-2 bg-orange text-white px-6 py-3 rounded-full font-extrabold text-sm uppercase tracking-wider shadow-lg group-hover:bg-white group-hover:text-ink transition-colors">
              Reproducir ahora →
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange">Personas</div>
          <h2 className="text-[clamp(3.5rem,7vw,7.5rem)] my-2 mb-12 border-b border-[#1112] pb-6">Equipo.</h2>
          <div className="grid gap-4">
            {TEAM.map((member, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between group bg-white border border-[#1112] p-6 rounded-[18px] hover:border-orange transition-colors">
                <span className="font-barlow text-3xl font-extrabold uppercase group-hover:text-orange transition-colors">{member.name}</span>
                <span className="text-[0.75rem] uppercase tracking-[0.12em] font-bold text-muted mt-2 md:mt-0">{member.role}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>

    <VideoModal 
      isOpen={isVideoOpen} 
      onClose={() => setIsVideoOpen(false)} 
      videoId="dJDJZqNPbcE"
      title="Cortometraje: Manrique, Memoria en Movimiento"
    />
    </>
  );
}
