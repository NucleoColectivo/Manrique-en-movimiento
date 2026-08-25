import { motion } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, Users, ArrowRight } from 'lucide-react';
import { AnimatedImage } from '../components/ui/AnimatedImage';
import { useFirestoreCollection } from '../lib/db';

interface Workshop {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  materials?: string[];
  imageUrl?: string;
}

export function Talleres() {
  const { data: TALLERES, loading } = useFirestoreCollection<Workshop>('workshops');

  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="w-[min(calc(100%-40px),1380px)] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-12 items-end"
        >
          <div>
            <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange">06 · Talleres + IA</div>
            <h1 className="text-[clamp(3.5rem,7vw,7.5rem)] my-2">Aprender<br/><span className="text-blue">haciendo.</span></h1>
          </div>
          <p className="text-muted text-[1.1rem] max-w-[680px]">
            La memoria es de todos. Participa en nuestros espacios de formación y aprende a utilizar la Inteligencia Artificial para preservar la historia de tu familia y tu barrio.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            <div className="h-[400px] rounded-[18px] skeleton-shimmer"></div>
            <div className="h-[400px] rounded-[18px] skeleton-shimmer"></div>
            <div className="h-[400px] rounded-[18px] skeleton-shimmer"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {TALLERES.map((taller, i) => (
              <motion.div
                key={taller.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-white border-t-[5px] border-orange p-[25px] rounded-b-[18px] border-x border-b border-[#1112] flex flex-col min-h-[400px]"
              >
                <div className="text-[3rem] font-extrabold font-barlow text-blue leading-none mb-4">0{i + 1}</div>
                <h3 className="text-[2rem] leading-[0.85] uppercase font-extrabold font-barlow text-ink mb-4">{taller.title}</h3>
                
                <div className="space-y-2 mb-6 text-sm text-muted">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={14} className="text-orange" />
                    <span>{taller.date} | {taller.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-orange" />
                    <span>{taller.location}</span>
                  </div>
                </div>
                
                <p className="text-ink mb-6 flex-grow text-sm font-dm leading-relaxed">
                  {taller.description}
                </p>
                
                <div className="relative h-48 rounded-[12px] overflow-hidden mt-4">
                  <AnimatedImage 
                    src={taller.imageUrl || 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20212544.png'} 
                    alt={taller.title} 
                    wrapperClassName="absolute inset-0 w-full h-full"
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <button className="mt-8 flex items-center justify-between w-full font-barlow uppercase text-lg font-extrabold text-ink hover:text-orange transition-colors group">
                  <span>Inscribirse al taller</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="rounded-[26px] overflow-hidden bg-blue text-white p-[55px] grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center"
        >
          <div>
            <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-gold">Convocatoria permanente</div>
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] leading-[0.8] font-barlow uppercase font-extrabold m-0 my-4 text-white">
              Tu álbum también hace parte de la historia.
            </h2>
            <p className="text-white/90 mt-4 text-lg font-dm">
              No requieres conocimientos previos en diseño o tecnología. Solo necesitas traer fotografías antiguas (impresas o digitales) y tu celular. Nosotros proveemos el resto.
            </p>
          </div>
          
          <div>
            <div className="font-extrabold uppercase text-sm mb-2 text-white/70">Inscripciones por WhatsApp</div>
            <div className="text-[clamp(2.5rem,5vw,5rem)] leading-[0.8] font-barlow uppercase font-extrabold text-gold mb-6">
              +57 319 624 2779
            </div>
            <a 
              href="https://wa.me/573196242779"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 bg-transparent text-white border border-white rounded-full py-[13px] px-[19px] font-extrabold cursor-pointer hover:bg-white hover:text-blue transition-colors"
            >
              Participar →
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
