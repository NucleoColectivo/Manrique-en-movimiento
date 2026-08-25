import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Play, Pause, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import { AnimatedImage } from '../components/ui/AnimatedImage';
import { useFirestoreCollection } from '../lib/db';

interface Story {
  id: string;
  authorId: string;
  tags: string[];
  title: string;
  audioUrl: string;
  content: string;
  imageUrl?: string;
}

const FALLBACK_IMAGES = [
  "https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20211238.png",
  "https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20210743.png",
  "https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20212607.png",
  "https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20210542.png",
];

export function Historias() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState<string | null>(null);
  
  const { data: STORIES, loading } = useFirestoreCollection<Story>('stories');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

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
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-12 items-end"
        >
          <div>
            <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange">02 · Historias</div>
            <h1 className="text-[clamp(3.5rem,7vw,7.5rem)] my-2">Voces que<br/><span className="text-blue">permanecen.</span></h1>
          </div>
          <p className="text-muted text-[1.1rem] max-w-[680px]">
            La fotografía se completa cuando alguien la recuerda. Aquí cada imagen podrá convivir con audio, transcripción, subtítulos y contexto.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-[18px]">
             <div className="h-[400px] rounded-[24px] skeleton-shimmer"></div>
             <div className="h-[400px] rounded-[24px] skeleton-shimmer"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-[18px] items-stretch">
            {STORIES.map((testimonio, index) => (
              <motion.article
                key={testimonio.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[24px] overflow-hidden bg-white group min-h-[400px] flex flex-col"
              >
                <div className="absolute inset-0 z-0">
                  <AnimatedImage 
                    src={testimonio.imageUrl || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]} 
                    alt={testimonio.authorId}
                    wrapperClassName="w-full h-full absolute inset-0"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Gradient Overlay for Text Legibility */}
                <div className="absolute left-0 right-0 bottom-0 pt-[100px] px-7 pb-7 text-white bg-gradient-to-t from-black/80 to-transparent z-10">
                  <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-gold">Relato · {testimonio.authorId}</div>
                  <h3 className="text-[3.2rem] leading-[0.8] uppercase font-extrabold font-barlow my-2">"{testimonio.title}"</h3>
                  
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button 
                      onClick={() => togglePlay(testimonio.id)}
                      className="inline-flex items-center gap-2.5 bg-blue text-white border-0 rounded-full py-[10px] px-[16px] font-extrabold cursor-pointer hover:bg-teal transition-colors"
                    >
                      {playingId === testimonio.id ? <><Pause size={18} /> Pausar</> : <><Play size={18} /> Escuchar</>}
                    </button>
                    <button 
                      onClick={() => setShowTranscript(showTranscript === testimonio.id ? null : testimonio.id)}
                      className="inline-flex items-center gap-2.5 bg-transparent text-white border border-white/30 rounded-full py-[10px] px-[16px] font-extrabold cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <FileText size={18} /> Leer
                    </button>
                  </div>

                  <AnimatePresence>
                    {showTranscript === testimonio.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-4"
                      >
                        <div className="p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-[12px] text-white/90 text-[0.95rem] font-medium leading-relaxed">
                          "{testimonio.content}"
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
