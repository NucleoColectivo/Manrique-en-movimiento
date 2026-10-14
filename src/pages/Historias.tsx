import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Play, 
  Pause, 
  FileText, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Download, 
  SkipBack, 
  SkipForward, 
  X, 
  Radio, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { AnimatedImage } from '../components/ui/AnimatedImage';
import { ImageModal } from '../components/ui/ImageModal';
import { useFirestoreCollection } from '../lib/db';

export interface Story {
  id: string;
  authorId: string;
  tags: string[];
  title: string;
  audioUrl: string;
  content: string;
  imageUrl?: string;
  duration?: string;
}

export const FALLBACK_STORIES: Story[] = [
  {
    id: 'etel-memoria-barrio',
    authorId: 'Doña Etel',
    title: 'La memoria viva de las esquinas',
    audioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/ETEL.mp3',
    duration: '09:30',
    tags: ['Familia', 'Convivencia', 'Tradición oral', 'Años 60'],
    content: 'Doña Etel revive los primeros años en Manrique, la crianza de los hijos, la unión entre familias vecinas y cómo los patios y aceras se convertían en espacios donde se compartía el sancocho, la música y las conversaciones de la tarde.',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20211238.png',
  },
  {
    id: 'gustavo-transporte-45',
    authorId: 'Don Gustavo',
    title: 'La 45 y los oficios del barrio',
    audioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/GUSTAVO.mp3',
    duration: '09:34',
    tags: ['Transporte', 'La 45', 'Oficios', 'Años 70'],
    content: 'Don Gustavo relata la transformación del transporte en la Carrera 45, la llegada de los primeros colectivos y buses de escalera, y la evolución del comercio y los talleres que le dieron vida a las calles de Manrique.',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20210743.png',
  },
  {
    id: 'marta-convites-comunidad',
    authorId: 'Doña Marta',
    title: 'La construcción comunitaria y los convites',
    audioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/MARTA.mp3',
    duration: '07:12',
    tags: ['Convites', 'Agua', 'Solidaridad', 'Fundación'],
    content: 'Doña Marta recuerda con emoción las jornadas de convite cuando los vecinos se organizaban en cuadrillas para subir materiales a lomo y a brazo, trayendo el agua y levantando juntos los cimientos de sus propios hogares.',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20212607.png',
  },
  {
    id: 'oscar-tango-bohemia',
    authorId: 'Don Óscar',
    title: 'Tango, bohemia y juventud en Manrique',
    audioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/OSCAR.mp3',
    duration: '08:39',
    tags: ['Tango', 'Cultura', 'Juventud', 'Bohemia'],
    content: 'Don Óscar recorre los cafés y billares de la época dorada del tango en Manrique, las anécdotas de juventud, la llegada de los fonógrafos y la identidad apasionada y musical que definió para siempre al barrio.',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20210542.png',
  }
];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function Historias() {
  const [playingStoryId, setPlayingStoryId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string>('todos');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data: firestoreStories, loading } = useFirestoreCollection<Story>('stories');

  // Use Firestore if valid stories with audios exist, otherwise fallback cleanly
  const activeStories: Story[] = (firestoreStories && firestoreStories.length > 0 && firestoreStories.some(s => s.audioUrl))
    ? firestoreStories.map(s => {
        // Fallback default duration / image if missing in firestore
        const fallback = FALLBACK_STORIES.find(f => f.authorId.toLowerCase().includes(s.authorId.toLowerCase()) || f.id === s.id);
        return {
          ...s,
          duration: s.duration || fallback?.duration || '08:00',
          imageUrl: s.imageUrl || fallback?.imageUrl || FALLBACK_STORIES[0].imageUrl
        };
      })
    : FALLBACK_STORIES;

  const currentStory = activeStories.find(s => s.id === playingStoryId) || null;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Audio Playback Handlers
  const handleTogglePlay = (story: Story) => {
    if (!audioRef.current) return;

    if (playingStoryId === story.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    } else {
      setPlayingStoryId(story.id);
      setIsLoadingAudio(true);
      setCurrentTime(0);
      audioRef.current.src = story.audioUrl;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.muted = isMuted;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoadingAudio(false);
        })
        .catch(err => {
          console.error('Audio play error:', err);
          setIsLoadingAudio(false);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoadingAudio(false);
    }
  };

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(newTime, duration || 0));
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSkip = (seconds: number) => {
    if (audioRef.current) {
      const nextTime = audioRef.current.currentTime + seconds;
      handleSeek(nextTime);
    }
  };

  const handleToggleSpeed = () => {
    const speeds = [1, 1.25, 1.5];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackRate(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const handleToggleMute = () => {
    if (audioRef.current) {
      const nextMuted = !isMuted;
      audioRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleNextStory = () => {
    if (!currentStory) return;
    const currentIndex = activeStories.findIndex(s => s.id === currentStory.id);
    const nextStory = activeStories[(currentIndex + 1) % activeStories.length];
    handleTogglePlay(nextStory);
  };

  const handlePrevStory = () => {
    if (!currentStory) return;
    const currentIndex = activeStories.findIndex(s => s.id === currentStory.id);
    const prevStory = activeStories[(currentIndex - 1 + activeStories.length) % activeStories.length];
    handleTogglePlay(prevStory);
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setPlayingStoryId(null);
  };

  // Keyboard shortcut: Spacebar to pause/play active audio when focused or playing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space' && playingStoryId) {
        e.preventDefault();
        if (currentStory) handleTogglePlay(currentStory);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playingStoryId, isPlaying, currentStory]);

  const filteredStories = selectedTag === 'todos'
    ? activeStories
    : activeStories.filter(s => s.authorId.toLowerCase().includes(selectedTag.toLowerCase()) || s.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase()));

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-orange origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Hidden global HTML5 audio engine */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNextStory}
        onWaiting={() => setIsLoadingAudio(true)}
        onCanPlay={() => setIsLoadingAudio(false)}
        onError={() => setIsLoadingAudio(false)}
        preload="metadata"
      />

      <div className="min-h-screen pt-32 pb-36 bg-background">
        <div className="w-[min(calc(100%-40px),1380px)] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-8 items-end"
          >
            <div>
              <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange mb-2">
                <Radio size={14} className="animate-pulse text-orange" />
                02 · Archivo Sonoro & Historias Orales
              </div>
              <h1 className="text-[clamp(3rem,6.5vw,7rem)] leading-[0.9] my-2 font-barlow uppercase font-black">
                Voces que <br />
                <span className="text-blue">permanecen.</span>
              </h1>
            </div>
            <div>
              <p className="text-muted text-[1.1rem] leading-relaxed mb-4">
                La fotografía se completa cuando alguien la recuerda. Cuatro testimonios orales originales de los habitantes de Manrique: relatos sobre la construcción comunitaria, el transporte en La 45, las esquinas de encuentro y la historia musical del barrio.
              </p>
              
              {/* Filter pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={() => setSelectedTag('todos')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer border ${
                    selectedTag === 'todos' 
                      ? 'bg-blue text-white border-blue' 
                      : 'bg-white text-ink/70 border-ink/15 hover:border-blue/50'
                  }`}
                >
                  Todos ({activeStories.length})
                </button>
                {activeStories.map(story => (
                  <button
                    key={story.id}
                    onClick={() => setSelectedTag(story.authorId)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer border ${
                      selectedTag === story.authorId 
                        ? 'bg-orange text-white border-orange' 
                        : 'bg-white text-ink/70 border-ink/15 hover:border-orange/50'
                    }`}
                  >
                    {story.authorId}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stories Grid */}
          {loading && activeStories.length === 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-[460px] rounded-[24px] skeleton-shimmer" />
              <div className="h-[460px] rounded-[24px] skeleton-shimmer" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-stretch">
              {filteredStories.map((testimonio, index) => {
                const isThisPlaying = playingStoryId === testimonio.id && isPlaying;
                const isThisActive = playingStoryId === testimonio.id;

                return (
                  <motion.article
                    key={testimonio.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.8, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative rounded-[24px] overflow-hidden bg-ink text-white group flex flex-col justify-end min-h-[460px] border-2 transition-all duration-300 shadow-lg ${
                      isThisActive ? 'border-orange ring-4 ring-orange/20' : 'border-transparent hover:border-white/20'
                    }`}
                  >
                    {/* Background Historical Photo */}
                    <div className="absolute inset-0 z-0">
                      <AnimatedImage 
                        src={testimonio.imageUrl || FALLBACK_STORIES[index % FALLBACK_STORIES.length].imageUrl!} 
                        alt={testimonio.authorId}
                        wrapperClassName="w-full h-full absolute inset-0 bg-black/60"
                        className="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-105 opacity-65" 
                        referrerPolicy="no-referrer"
                      />
                      {/* Dark gradient for legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent z-10" />
                    </div>

                    {/* Top action: View full image */}
                    <button
                      onClick={() => setSelectedImage(testimonio.imageUrl || FALLBACK_STORIES[index % FALLBACK_STORIES.length].imageUrl!)}
                      className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/80 text-white/80 hover:text-white p-2 rounded-full backdrop-blur-md transition-all cursor-pointer border border-white/10"
                      title="Ver fotografía en pantalla completa"
                      aria-label="Ver fotografía"
                    >
                      <Maximize2 size={16} />
                    </button>

                    {/* Content Section */}
                    <div className="relative z-20 p-7 flex flex-col justify-end">
                      {/* Tag & Duration badge */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] font-extrabold text-gold">
                          <span>Relato Oral</span>
                          <span>•</span>
                          <span>{testimonio.authorId}</span>
                        </div>
                        <div className="text-[0.75rem] font-bold text-white/70 bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                          ⏱ {testimonio.duration || '08:00'}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] leading-[0.95] uppercase font-black font-barlow my-2 text-white">
                        "{testimonio.title}"
                      </h3>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 my-3">
                        {testimonio.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="text-[0.68rem] font-bold uppercase tracking-wider bg-white/15 text-white/90 px-2.5 py-0.5 rounded-md backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* In-Card Audio Bar if Active */}
                      {isThisActive && (
                        <div className="mt-2 mb-4 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/15">
                          <div className="flex items-center justify-between text-xs text-white/80 mb-1.5 font-mono">
                            <div className="flex items-center gap-2">
                              {/* Pulsing visualizer */}
                              <div className="flex items-end gap-0.5 h-3">
                                <span className={`w-1 bg-orange rounded-full ${isThisPlaying ? 'animate-bounce h-full' : 'h-1.5'}`} />
                                <span className={`w-1 bg-orange rounded-full ${isThisPlaying ? 'animate-bounce [animation-delay:150ms] h-full' : 'h-2'}`} />
                                <span className={`w-1 bg-orange rounded-full ${isThisPlaying ? 'animate-bounce [animation-delay:300ms] h-full' : 'h-1'}`} />
                                <span className={`w-1 bg-orange rounded-full ${isThisPlaying ? 'animate-bounce [animation-delay:75ms] h-full' : 'h-2.5'}`} />
                              </div>
                              <span className="font-bold text-orange">Reproduciendo</span>
                            </div>
                            <span>
                              {formatTime(currentTime)} / {formatTime(duration || 0)}
                            </span>
                          </div>

                          {/* Progress Scrubber */}
                          <div 
                            className="relative w-full h-2.5 bg-white/20 rounded-full cursor-pointer group py-1"
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const clickPos = (e.clientX - rect.left) / rect.width;
                              handleSeek(clickPos * (duration || 0));
                            }}
                          >
                            <div 
                              className="h-1.5 bg-orange rounded-full transition-all relative group-hover:bg-gold"
                              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                            >
                              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Controls Buttons */}
                      <div className="mt-3 flex flex-wrap items-center gap-2.5">
                        <button 
                          onClick={() => handleTogglePlay(testimonio)}
                          className={`inline-flex items-center gap-2 border-0 rounded-full py-[10px] px-[18px] font-extrabold cursor-pointer transition-all duration-200 text-sm shadow-md ${
                            isThisPlaying 
                              ? 'bg-orange hover:bg-orange/90 text-white' 
                              : 'bg-blue hover:bg-teal text-white'
                          }`}
                        >
                          {isLoadingAudio && isThisActive ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Cargando...
                            </>
                          ) : isThisPlaying ? (
                            <>
                              <Pause size={17} /> Pausar
                            </>
                          ) : (
                            <>
                              <Play size={17} fill="currentColor" /> Escuchar audio
                            </>
                          )}
                        </button>

                        {/* Quick +/- 15s if active */}
                        {isThisActive && (
                          <div className="flex items-center gap-1 bg-white/10 rounded-full p-1 border border-white/10 backdrop-blur-sm">
                            <button
                              onClick={() => handleSkip(-15)}
                              className="p-1.5 rounded-full hover:bg-white/20 text-white text-xs cursor-pointer transition-colors"
                              title="Retroceder 15 segundos"
                              aria-label="Retroceder 15 segundos"
                            >
                              <RotateCcw size={15} />
                            </button>
                            <button
                              onClick={() => handleSkip(15)}
                              className="p-1.5 rounded-full hover:bg-white/20 text-white text-xs cursor-pointer transition-colors"
                              title="Adelantar 15 segundos"
                              aria-label="Adelantar 15 segundos"
                            >
                              <RotateCw size={15} />
                            </button>
                          </div>
                        )}

                        {/* Transcript toggle */}
                        <button 
                          onClick={() => setShowTranscript(showTranscript === testimonio.id ? null : testimonio.id)}
                          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full py-[10px] px-[16px] font-extrabold cursor-pointer transition-colors text-sm backdrop-blur-sm"
                        >
                          <FileText size={16} /> 
                          {showTranscript === testimonio.id ? 'Ocultar texto' : 'Leer relato'}
                        </button>

                        {/* Download audio */}
                        <a
                          href={testimonio.audioUrl}
                          download={`${testimonio.authorId}.mp3`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer border border-white/15 backdrop-blur-sm"
                          title={`Descargar audio original (${testimonio.authorId})`}
                          aria-label="Descargar audio"
                        >
                          <Download size={16} />
                        </a>
                      </div>

                      {/* Expandable Transcript Drawer */}
                      <AnimatePresence>
                        {showTranscript === testimonio.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="overflow-hidden mt-4"
                          >
                            <div className="p-5 bg-black/75 backdrop-blur-lg border border-white/20 rounded-[16px] text-white/95 text-[0.98rem] font-medium leading-relaxed relative">
                              <span className="text-4xl text-gold/60 font-serif leading-none absolute top-2 left-3">“</span>
                              <div className="pl-6 pt-1">
                                {testimonio.content}
                              </div>
                              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                                <span>Archivo Sonoro · Núcleo Colectivo</span>
                                <span className="font-semibold text-gold">Comuna 3 - Manrique</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Floating Sticky Audio Player Dock (Fixed Bottom) */}
      <AnimatePresence>
        {currentStory && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-4 left-0 right-0 z-50 px-4 pointer-events-none"
          >
            <div className="w-[min(calc(100%-20px),1100px)] mx-auto bg-ink/95 border border-white/20 rounded-[20px] p-3.5 shadow-2xl backdrop-blur-xl text-white pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
              
              {/* Left: Track Information */}
              <div className="flex items-center gap-3 w-full md:w-auto min-w-[220px]">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-white/10 border border-white/20">
                  <img 
                    src={currentStory.imageUrl || FALLBACK_STORIES[0].imageUrl} 
                    alt={currentStory.authorId} 
                    className="w-full h-full object-cover" 
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="flex items-end gap-0.5 h-3">
                        <span className="w-1 bg-gold rounded-full animate-bounce h-full" />
                        <span className="w-1 bg-gold rounded-full animate-bounce [animation-delay:150ms] h-2/3" />
                        <span className="w-1 bg-gold rounded-full animate-bounce [animation-delay:300ms] h-full" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.68rem] font-extrabold uppercase tracking-wider text-orange">
                      {currentStory.authorId}
                    </span>
                    <span className="text-[0.65rem] text-white/50">Audio original</span>
                  </div>
                  <h4 className="text-sm font-bold truncate text-white">
                    {currentStory.title}
                  </h4>
                </div>
              </div>

              {/* Center: Playback Controls & Progress Scrubber */}
              <div className="flex-1 w-full max-w-[560px] flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrevStory}
                    className="p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Audio anterior"
                    aria-label="Audio anterior"
                  >
                    <SkipBack size={18} />
                  </button>

                  <button
                    onClick={() => handleSkip(-15)}
                    className="p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Retroceder 15s"
                    aria-label="Retroceder 15s"
                  >
                    <RotateCcw size={17} />
                  </button>

                  <button
                    onClick={() => handleTogglePlay(currentStory)}
                    className="w-10 h-10 rounded-full bg-orange hover:bg-orange/90 text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-lg"
                    title={isPlaying ? 'Pausar' : 'Reproducir'}
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
                  </button>

                  <button
                    onClick={() => handleSkip(15)}
                    className="p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Adelantar 15s"
                    aria-label="Adelantar 15s"
                  >
                    <RotateCw size={17} />
                  </button>

                  <button
                    onClick={handleNextStory}
                    className="p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Siguiente audio"
                    aria-label="Siguiente audio"
                  >
                    <SkipForward size={18} />
                  </button>
                </div>

                {/* Scrubber timeline */}
                <div className="w-full flex items-center gap-2 text-xs font-mono text-white/70">
                  <span className="min-w-[40px] text-right">{formatTime(currentTime)}</span>
                  <div
                    className="relative flex-1 h-3 flex items-center cursor-pointer group"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickPos = (e.clientX - rect.left) / rect.width;
                      handleSeek(clickPos * (duration || 0));
                    }}
                  >
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange group-hover:bg-gold transition-all"
                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                  <span className="min-w-[40px]">{formatTime(duration || 0)}</span>
                </div>
              </div>

              {/* Right: Tools & Close */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                {/* Speed toggle button */}
                <button
                  onClick={handleToggleSpeed}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Cambiar velocidad de reproducción"
                >
                  {playbackRate}x
                </button>

                {/* Volume / Mute button */}
                <button
                  onClick={handleToggleMute}
                  className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title={isMuted ? 'Activar sonido' : 'Silenciar'}
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted ? <VolumeX size={18} className="text-orange" /> : <Volume2 size={18} />}
                </button>

                {/* Download audio */}
                <a
                  href={currentStory.audioUrl}
                  download={`${currentStory.authorId}.mp3`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Descargar archivo MP3"
                  aria-label="Descargar archivo MP3"
                >
                  <Download size={18} />
                </a>

                {/* Close/Stop button */}
                <button
                  onClick={handleStop}
                  className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1"
                  title="Detener y cerrar reproductor"
                  aria-label="Cerrar reproductor"
                >
                  <X size={18} />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Photo Lightbox Modal */}
      <ImageModal 
        src={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </>
  );
}
