import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Play, 
  Pause, 
  FileText, 
  BookOpen,
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward, 
  X, 
  Radio, 
  Sparkles,
  Maximize2,
  Users,
  Clock,
  Music,
  Share2
} from 'lucide-react';
import { AnimatedImage } from '../components/ui/AnimatedImage';
import { ImageModal } from '../components/ui/ImageModal';
import { useFirestoreCollection } from '../lib/db';

export interface Story {
  id: string;
  number?: string;
  authorId: string;
  fullName?: string;
  title: string;
  subtitle?: string;
  audioUrl: string;
  fallbackAudioUrl?: string;
  duration?: string;
  tags: string[];
  content: string;
  imageUrl?: string;
  fallbackImageUrl?: string;
  isPublished?: boolean;
}

export const FALLBACK_STORIES: Story[] = [
  {
    id: 'etel-memoria-barrio',
    number: '01',
    authorId: 'Don Etel',
    fullName: 'Don Etel (Etelberto Ramírez Echeverri)',
    title: 'Los teatros, las esquinas y la vida en comunidad',
    subtitle: 'Un barrio que se encontraba en la calle',
    audioUrl: '/audio/ETEL.mp3',
    fallbackAudioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/ETEL.mp3',
    duration: '09:30',
    tags: ['Infancia', 'Cine', 'Tango', 'Tradiciones', 'Solidaridad'],
    content: `En los recuerdos de Don Etel, Manrique aparece como un lugar donde la vida cotidiana sucedía también en los andenes. Al terminar la jornada de trabajo, los adultos salían a sentarse frente a sus casas, conversaban y compartían mientras los niños jugaban en la calle al fútbol, al trompo o a la chucha libertad.

La carrera 45, hoy una de las principales arterias del sector, era mucho más estrecha en aquella época. El transporte se organizaba alrededor de rutas de buses que conectaban el barrio con el centro de Medellín y otros sectores de la ciudad. Los desplazamientos, las esquinas y los lugares de encuentro formaban parte de una geografía que sus habitantes aprendían a reconocer desde pequeños.

Diciembre tenía una manera particular de reunir a la gente. Según recuerda Don Etel, durante las celebraciones del 7, 8, 24 y 31, las puertas permanecían abiertas después de las seis de la tarde. Los vecinos visitaban otras casas, los niños compartían con sus mayores y los dulces, los buñuelos y la natilla circulaban entre cuadras. La celebración no terminaba en la puerta de cada vivienda: se extendía por el vecindario.

La música también ocupaba un lugar importante en su vida. Criado en una familia profundamente vinculada al tango, Don Etel recuerda sus escapadas infantiles al bar Alaska para escuchar «Tormenta». En su memoria aparecen los cafés de la carrera 45, entre ellos La Paz y el Café Manrique, y los teatros que marcaron la vida cultural del sector: el Atenas, el Manrique y el San Blas, espacios que durante décadas congregaron a familias y vecinos alrededor del cine y las presentaciones en vivo.`,
    imageUrl: '/img/personas/etelberto.png',
    fallbackImageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/Fotografi%CC%81as%20Personas%20del%20Barrio/Etelberto%20Ramirez%20Echeverri.png'
  },
  {
    id: 'gustavo-transporte-45',
    number: '02',
    authorId: 'Don Gustavo',
    fullName: 'Don Gustavo (Gustavo Rojas Z.)',
    title: 'La 45, los oficios y el transporte del barrio',
    subtitle: 'La transformación de la arteria principal y sus pioneros',
    audioUrl: '/audio/GUSTAVO.mp3',
    fallbackAudioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/GUSTAVO.mp3',
    duration: '09:34',
    tags: ['Transporte', 'La 45', 'Oficios', 'Buses de Escalera', 'Comercio'],
    content: `Don Gustavo relata la profunda transformación urbana y social de la Carrera 45, eje vertebral de Manrique. Recuerda el paso de los caminos de herradura y las primeras líneas a la llegada de los buses de escalera y colectivos que conectaban a la comunidad con el centro de Medellín.

En sus memorias evoca con nitidez a los pioneros mecánicos, herreros, carpinteros y zapateros que montaron sus talleres en las esquinas más transitadas. El crecimiento del transporte no solo trajo movilidad física, sino que detonó la vida comercial: farmacias familiares, graneros de abarrotes, tiendas de esquina y ferreterías donde se fiaba de palabra y el saludo del conductor era el reloj que marcaba los ritmos del vecindario.

A través de su testimonio, Don Gustavo explica cómo los habitantes defendieron las rutas populares, cómo los choferes y mecánicos conformaron un gremio solidario y cómo cada cambio en el trazado de la vía reflejó los anhelos de progreso de una comunidad obrera que nunca dejó de abrirse paso en la montaña.`,
    imageUrl: '/img/personas/gustavo.png',
    fallbackImageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/Fotografi%CC%81as%20Personas%20del%20Barrio/Gustavo%20Rojas%20Z.png'
  },
  {
    id: 'marta-convites-comunidad',
    number: '03',
    authorId: 'Doña Marta',
    fullName: 'Doña Marta (Marta Julia González)',
    title: 'La construcción comunitaria, el agua y los convites',
    subtitle: 'El esfuerzo colectivo y las manos que levantaron el barrio',
    audioUrl: '/audio/MARTA.mp3',
    fallbackAudioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/MARTA.mp3',
    duration: '07:12',
    tags: ['Convites', 'Agua', 'Solidaridad', 'Autoconstrucción', 'Mujeres'],
    content: `Doña Marta recuerda con emoción las épicas jornadas de convite en las que los vecinos de Manrique se organizaban los fines de semana para levantar sus propias casas, abrir zanjas y nivelar caminos de herradura. En aquellos años no existían acueductos modernos; el agua debía traerse a pulso en ollas, latas y mangueras provisionales desde nacimientos y quebradas de la parte alta.

El papel de las mujeres fue el corazón de esa gesta: mientras los hombres picaban tierra y pegaban adobes, las madres y abuelas preparaban enormes sancochos de leña comunitarios, cuidaban a los niños y organizaban bazares para comprar cemento y tejas de zinc. Cada casa terminada era una victoria compartida por toda la cuadra.

Para Marta, la memoria de Manrique no se resume en planos arquitectónicos, sino en el sudor fraterno, en la generosidad de prestar la pala o el balde y en la certeza de que nadie se quedaba sin techo si la comunidad entera sumaba sus brazos. Ese tejido humano sigue vivo en la dignidad de sus familias fundadoras.`,
    imageUrl: '/img/personas/marta.png',
    fallbackImageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/Fotografi%CC%81as%20Personas%20del%20Barrio/Marta%20Julia%20Gonza%CC%81lez.png'
  },
  {
    id: 'oscar-tango-bohemia',
    number: '04',
    authorId: 'Don Óscar',
    fullName: 'Don Óscar (Óscar Zapata)',
    title: 'Tango, bohemia y juventud en Manrique',
    subtitle: 'La época dorada de los cafés, serenatas y fonógrafos',
    audioUrl: '/audio/OSCAR.mp3',
    fallbackAudioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/OSCAR.mp3',
    duration: '08:39',
    tags: ['Tango', 'Cultura', 'Juventud', 'Bohemia', 'Gardel'],
    content: `Don Óscar recorre con vibrante lucidez la época de oro del tango y la bohemia en Manrique. Para él y sus contemporáneos, el barrio no dormía: los bares y cantinas de la Carrera 45 y los alrededores de la Casa Gardeliana eran santuarios donde resonaban las grabaciones de Carlos Gardel, Agustín Magaldi, Julio Sosa y Libertad Lamarque desde fonógrafos de bocina y radiolas de mueble de madera.

En su relato, la juventud de aquellos años encontraba en las mesas de billar, las tangovías de los domingos y los corrillos de esquina una escuela de elegancia arrabalera, poesía popular y camaradería. Los muchachos vestían sus mejores camisas y zapatos lustrados para cortejar a las muchachas en el parque o en las funciones vespertinas de los cines barriales.

Don Óscar demuestra que el tango en Manrique no fue una moda foránea importada del Río de la Plata, sino un sentimiento visceral que echó raíces hondas en la ladera andina, acompañando las penas, las alegrías amorosas y la profunda identidad artística de los medellinenses.`,
    imageUrl: '/img/personas/oscar.png',
    fallbackImageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/Fotografi%CC%81as%20Personas%20del%20Barrio/Oscar%20Zapata.png'
  },
  {
    id: 'olga-educacion-comunidad',
    number: '05',
    authorId: 'Doña Olga',
    fullName: 'Doña Olga (Olga Lucía Muñoz)',
    title: 'Memoria barrial, educación y tejido social',
    subtitle: 'Las maestras, la escuela y el cuidado comunitario',
    audioUrl: '/audio/Olga_Lucia_Munoz.mp3',
    fallbackAudioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/Olga%20Lucia%20Mun%CC%83oz.mp3',
    duration: '03:33',
    tags: ['Memoria Barrial', 'Educación', 'Comunidad', 'Mujeres', 'Territorio'],
    content: `Olga Lucía Muñoz aporta un relato sensible y fundamental sobre las redes cotidianas de afecto, enseñanza y resistencia comunitaria en Manrique. Su voz evoca los primeros salones de clase improvisados en zaguanes y casas familiares, donde maestras y líderes barriales alfabetizaban a niños y adultos obreros con una vocación inquebrantable.

Destaca cómo las madres y abuelas del sector no solo administraban el hogar, sino que tejían verdaderas redes de cuidado mutuo: el intercambio de remedios caseros, la custodia colectiva de los hijos mientras los padres laboraban en fábricas textiles de Medellín y la defensa de los espacios recreativos y culturales.

Para Olga, recordar a los mayores y sus enseñanzas es un acto de justicia histórica y pedagógica. Invita a las nuevas generaciones a valorar las raíces del barrio, a no perder el sentido de vecindad y a reconocer que el verdadero progreso de Manrique ha nacido del corazón y la sabiduría de sus mujeres.`,
    imageUrl: '/img/personas/olga.png',
    fallbackImageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/Fotografi%CC%81as%20Personas%20del%20Barrio/Olga%20Lucia%20Mun%CC%83oz.png'
  },
  {
    id: 'ruben-tango-tangovia',
    number: '06',
    authorId: 'Don Rubén',
    fullName: 'Don Rubén (Rubén Aristizábal)',
    title: 'El tango vivo, la lírica y la tradición gardeliana',
    subtitle: 'El canto gardeliano y la mística de la Tangovía',
    audioUrl: '/audio/Ruben_Aristizabal.mp3',
    fallbackAudioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/Ruben%20Aristizabal.mp3',
    duration: '02:01',
    tags: ['Tango Vivo', 'Gardel', 'Canto', 'Tradición', 'Tangovía'],
    content: `Rubén Aristizábal es portador de una de las voces y memorias más apasionadas del tango en la Comuna 3. En su crónica, rememora la inauguración de la legendaria Tangovía en la Carrera 45, un acontecimiento popular sin precedentes donde la calle entera se cerraba al tráfico vehicular para convertirse en una pista gigante de baile, poesía y canto al aire libre bajo el cielo de Medellín.

Con respeto y maestría, Don Rubén describe cómo cantar un tango requiere entender el peso de cada palabra, el dolor del desamor, el valor de la madre y la devoción eterna por Gardel. Rememora a los cantores locales que se disputaban amistosamente los aplausos de los vecinos en los tablados y serenatas nocturnas.

Su testimonio recuerda que la música es el alma intangible del patrimonio de Manrique: una llama viva que no se apaga mientras haya un vecino que entone sus estrofas y mantenga encendida la memoria de los viejos tiempos.`,
    imageUrl: '/img/personas/ruben.png',
    fallbackImageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/Fotografi%CC%81as%20Personas%20del%20Barrio/Ruben%20Aristizabal.png'
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
  const [selectedChronicle, setSelectedChronicle] = useState<Story | null>(null);
  const [showTranscript, setShowTranscript] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data: firestoreStories, loading } = useFirestoreCollection<Story>('stories');

  // Merge Firestore stories with complete fallback data to ensure all 6 characters always have valid data
  const activeStories: Story[] = (firestoreStories && firestoreStories.length >= 6)
    ? firestoreStories.map(s => {
        const fallback = FALLBACK_STORIES.find(f => f.id === s.id || f.authorId.toLowerCase().includes(s.authorId.toLowerCase()) || s.authorId.toLowerCase().includes(f.authorId.toLowerCase()));
        const isEtel = s.authorId.includes('Etel') || s.id.includes('etel');
        return {
          ...fallback,
          ...s,
          authorId: isEtel ? 'Don Etel' : s.authorId,
          fullName: isEtel ? 'Don Etel (Etelberto Ramírez Echeverri)' : (s.fullName || fallback?.fullName),
          content: isEtel ? (fallback?.content || s.content) : (s.content || fallback?.content || ''),
          duration: s.duration || fallback?.duration || '08:00',
          imageUrl: s.imageUrl || fallback?.imageUrl || FALLBACK_STORIES[0].imageUrl,
          audioUrl: s.audioUrl || fallback?.audioUrl || '',
          fallbackAudioUrl: fallback?.fallbackAudioUrl,
          fallbackImageUrl: fallback?.fallbackImageUrl
        };
      })
    : FALLBACK_STORIES;

  const currentStory = activeStories.find(s => s.id === playingStoryId) || null;

  // Handle escape key and lock body scroll when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedChronicle) setSelectedChronicle(null);
        if (selectedImage) setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedChronicle, selectedImage]);

  useEffect(() => {
    if (selectedChronicle || selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedChronicle, selectedImage]);

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
          console.warn('Audio play error, trying fallback URL if available:', err);
          if (story.fallbackAudioUrl && audioRef.current) {
            audioRef.current.src = story.fallbackAudioUrl;
            audioRef.current.play()
              .then(() => {
                setIsPlaying(true);
                setIsLoadingAudio(false);
              })
              .catch(fallbackErr => {
                console.error('Playback failed on both primary and fallback URLs:', fallbackErr);
                setIsLoadingAudio(false);
              });
          } else {
            setIsLoadingAudio(false);
          }
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

  // Keyboard shortcut: Spacebar to pause/play active audio
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

  const [copiedStoryId, setCopiedStoryId] = useState<string | null>(null);

  const handleShareStory = async (story: Story, e?: MouseEvent) => {
    if (e) e.stopPropagation();
    const shareData = {
      title: `${story.authorId}: ${story.title} · Manrique en Movimiento`,
      text: `Escucha el testimonio de ${story.fullName || story.authorId} en Manrique, Memoria en Movimiento: "${story.subtitle || story.title}"`,
      url: `${window.location.origin}/historias#${story.id}`
    };

    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.url}`);
        setCopiedStoryId(story.id);
        setTimeout(() => setCopiedStoryId(null), 2500);
      }
    } catch (err) {
      console.warn('Share error:', err);
    }
  };

  const filteredStories = selectedTag === 'todos'
    ? activeStories
    : activeStories.filter(s => 
        s.authorId.toLowerCase().includes(selectedTag.toLowerCase()) || 
        s.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())
      );

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-orange origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Hidden global HTML5 audio engine (en línea sin descarga directa) */}
      <audio
        ref={audioRef}
        controlsList="nodownload"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNextStory}
        onWaiting={() => setIsLoadingAudio(true)}
        onCanPlay={() => setIsLoadingAudio(false)}
        onError={() => {
          if (currentStory?.fallbackAudioUrl && audioRef.current && audioRef.current.src !== currentStory.fallbackAudioUrl) {
            audioRef.current.src = currentStory.fallbackAudioUrl;
            audioRef.current.play().catch(() => setIsLoadingAudio(false));
          } else {
            setIsLoadingAudio(false);
          }
        }}
        preload="metadata"
      />

      <div className="min-h-screen pt-32 pb-40 bg-[#f8f6f2] text-ink">
        <div className="w-[min(calc(100%-40px),1380px)] mx-auto">
          
          {/* Editorial Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-orange/10 border border-orange/20 text-xs uppercase tracking-[0.22em] font-extrabold text-orange mb-4">
              <Radio size={14} className="animate-pulse text-orange" />
              <span>VOCES QUE PERMANECEN · Archivo de memoria oral · Núcleo Colectivo</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-end">
              <div>
                <h1 className="text-[clamp(3.2rem,7vw,7.5rem)] leading-[0.88] my-3 font-barlow uppercase font-black tracking-tight text-ink">
                  Voces que <br />
                  <span className="text-blue">permanecen.</span>
                </h1>
                <p className="text-xl md:text-2xl font-serif italic text-muted font-normal mt-2">
                  El barrio contado por quienes lo vivieron.
                </p>
              </div>

              {/* Poetic & Historical Description */}
              <div className="bg-white/80 backdrop-blur-sm p-6 md:p-7 rounded-[22px] border border-ink/10 shadow-sm">
                <p className="text-ink/80 text-[1.02rem] leading-relaxed mb-4">
                  Manrique no nació de un día para otro. Creció entre caminos de tierra, casas levantadas con esfuerzo, teatros llenos, cafés donde sonaba el tango y vecinos que convertían las necesidades en tareas compartidas.
                </p>
                <p className="text-ink/75 text-[0.98rem] leading-relaxed">
                  En este archivo, <strong>seis voces</strong> nos llevan por diferentes momentos de la historia de Manrique: desde los potreros y las primeras construcciones hasta los teatros, los convites, las tangovías y las formas de encontrarse que dieron identidad al barrio. <em>La memoria no está quieta: sigue caminando con quienes la recuerdan.</em>
                </p>

                {/* Metadata highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-5 border-t border-ink/10 text-center">
                  <div className="p-2 bg-paper rounded-xl">
                    <span className="block text-2xl font-black font-barlow text-orange leading-tight">6</span>
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-muted">Crónicas orales</span>
                  </div>
                  <div className="p-2 bg-paper rounded-xl">
                    <span className="block text-2xl font-black font-barlow text-blue leading-tight">41m</span>
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-muted">Testimonios MP3</span>
                  </div>
                  <div className="p-2 bg-paper rounded-xl">
                    <span className="block text-2xl font-black font-barlow text-terracotta leading-tight">100%</span>
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-muted">Voces barriales</span>
                  </div>
                  <div className="p-2 bg-paper rounded-xl">
                    <span className="block text-2xl font-black font-barlow text-ink leading-tight">C3</span>
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-muted">Comuna 3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="mt-8 pt-4 flex flex-wrap items-center gap-2 border-t border-ink/10">
              <span className="text-xs font-bold uppercase tracking-wider text-muted mr-2 flex items-center gap-1.5">
                <Users size={14} /> Filtrar personaje:
              </span>
              <button
                onClick={() => setSelectedTag('todos')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border shadow-sm ${
                  selectedTag === 'todos' 
                    ? 'bg-blue text-white border-blue shadow-md' 
                    : 'bg-white text-ink/75 border-ink/15 hover:border-blue hover:text-blue'
                }`}
              >
                Todos ({activeStories.length})
              </button>
              {activeStories.map(story => (
                <button
                  key={story.id}
                  onClick={() => setSelectedTag(story.authorId)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border shadow-sm ${
                    selectedTag === story.authorId 
                      ? 'bg-orange text-white border-orange shadow-md' 
                      : 'bg-white text-ink/75 border-ink/15 hover:border-orange hover:text-orange'
                  }`}
                >
                  {story.number && <span className="opacity-70 mr-1.5 font-mono">{story.number}</span>}
                  {story.authorId}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Stories Grid: 6 Persons with Portraits and Audios */}
          {loading && activeStories.length === 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-[520px] rounded-[28px] skeleton-shimmer" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {filteredStories.map((testimonio, index) => {
                const isThisPlaying = playingStoryId === testimonio.id && isPlaying;
                const isThisActive = playingStoryId === testimonio.id;

                return (
                  <motion.article
                    key={testimonio.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.7, delay: 0.06 * index, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative rounded-[28px] overflow-hidden bg-white text-ink group flex flex-col justify-between border-2 transition-all duration-300 shadow-xl hover:shadow-2xl ${
                      isThisActive ? 'border-orange ring-4 ring-orange/20 scale-[1.01]' : 'border-ink/10 hover:border-orange/40'
                    }`}
                  >
                    {/* Top: Portrait Area (Expanded height and fine-tuned framing to reveal the full face) */}
                    <div className="relative h-[390px] sm:h-[420px] overflow-hidden bg-ink/95">
                      <AnimatedImage 
                        src={testimonio.imageUrl || FALLBACK_STORIES[index % FALLBACK_STORIES.length].imageUrl!} 
                        alt={testimonio.fullName || testimonio.authorId}
                        wrapperClassName="w-full h-full absolute inset-0 bg-ink"
                        className="w-full h-full object-cover object-[center_8%] transition-transform duration-[2.2s] ease-out group-hover:scale-105" 
                        referrerPolicy="no-referrer"
                      />

                      {/* Top subtle vignette for badge legibility */}
                      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 via-black/20 to-transparent z-10 pointer-events-none" />

                      {/* Bottom localized vignette over chest/shoulders, leaving the full face 100% visible */}
                      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ink via-ink/75 to-transparent z-10 pointer-events-none" />

                      {/* Number & Duration Badge (Top Left) */}
                      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-orange text-white text-xs font-black font-mono shadow-md">
                          {testimonio.number || `0${index + 1}`}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/95 text-xs font-bold border border-white/15 flex items-center gap-1 shadow-md">
                          <Clock size={12} className="text-gold" />
                          {testimonio.duration || '08:00'}
                        </span>
                      </div>

                      {/* View Portrait Lightbox Button (Top Right) */}
                      <button
                        onClick={() => setSelectedImage(testimonio.imageUrl || FALLBACK_STORIES[index % FALLBACK_STORIES.length].imageUrl!)}
                        className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-orange text-white p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer border border-white/20 shadow-lg"
                        title={`Ver fotografía en alta resolución de ${testimonio.authorId}`}
                        aria-label="Ver fotografía ampliada"
                      >
                        <Maximize2 size={16} />
                      </button>

                      {/* Character Name Ribbon at Bottom of Portrait (over chest area, below the face) */}
                      <div className="absolute bottom-3.5 left-5 right-5 z-20 text-white">
                        <div className="text-[0.68rem] uppercase tracking-[0.2em] font-extrabold text-gold flex items-center gap-1.5 mb-0.5 drop-shadow">
                          <Music size={12} /> Testimonio Barrial
                        </div>
                        <h2 className="text-2xl sm:text-[1.75rem] font-black font-barlow uppercase tracking-tight text-white drop-shadow-md leading-none mb-1">
                          {testimonio.authorId}
                        </h2>
                        {testimonio.fullName && testimonio.fullName !== testimonio.authorId && (
                          <div className="text-xs text-white/80 font-medium truncate drop-shadow">
                            {testimonio.fullName}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom: Chronicle Content & Player Controls */}
                    <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        {/* Title & Subtitle */}
                        <div className="mb-3">
                          <h3 className="text-xl font-black font-barlow uppercase text-ink leading-tight group-hover:text-blue transition-colors">
                            "{testimonio.title}"
                          </h3>
                          {testimonio.subtitle && (
                            <p className="text-xs font-serif italic text-muted mt-1 leading-snug">
                              {testimonio.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 my-3">
                          {testimonio.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="text-[0.66rem] font-bold uppercase tracking-wider bg-sand/60 text-ink/75 px-2.5 py-0.5 rounded-md border border-ink/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Summary preview (Clickable to open full chronicle modal) */}
                        <p 
                          onClick={() => setSelectedChronicle(testimonio)}
                          className="text-ink/80 text-[0.88rem] leading-relaxed line-clamp-3 mb-4 font-sans cursor-pointer hover:text-orange transition-colors"
                          title="Haz clic para leer la crónica completa en modal"
                        >
                          {testimonio.content.split('\n\n')[0]}
                        </p>
                      </div>

                      {/* In-Card Audio Bar if Active */}
                      {isThisActive && (
                        <div className="my-3 p-3.5 bg-paper rounded-2xl border border-orange/30 shadow-inner">
                          <div className="flex items-center justify-between text-xs text-ink/80 mb-2 font-mono">
                            <div className="flex items-center gap-2">
                              {/* Pulsing Visualizer Bars */}
                              <div className="flex items-end gap-1 h-3.5">
                                <span className={`w-1 bg-orange rounded-full ${isThisPlaying ? 'animate-bounce h-full' : 'h-1.5'}`} />
                                <span className={`w-1 bg-orange rounded-full ${isThisPlaying ? 'animate-bounce [animation-delay:150ms] h-full' : 'h-2'}`} />
                                <span className={`w-1 bg-orange rounded-full ${isThisPlaying ? 'animate-bounce [animation-delay:300ms] h-full' : 'h-1'}`} />
                                <span className={`w-1 bg-orange rounded-full ${isThisPlaying ? 'animate-bounce [animation-delay:75ms] h-full' : 'h-2.5'}`} />
                              </div>
                              <span className="font-extrabold text-orange text-[0.75rem] uppercase tracking-wider">
                                {isThisPlaying ? 'Reproduciendo' : 'En pausa'}
                              </span>
                            </div>
                            <span className="font-bold">
                              {formatTime(currentTime)} / {formatTime(duration || 0)}
                            </span>
                          </div>

                          {/* Progress Scrubber */}
                          <div 
                            className="relative w-full h-3 bg-ink/10 rounded-full cursor-pointer group py-1 flex items-center"
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const clickPos = (e.clientX - rect.left) / rect.width;
                              handleSeek(clickPos * (duration || 0));
                            }}
                          >
                            <div 
                              className="h-2 bg-orange rounded-full transition-all relative group-hover:bg-gold"
                              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                            >
                              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md border-2 border-orange scale-100 transition-transform" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons Row */}
                      <div className="pt-2 border-t border-ink/10 flex flex-wrap items-center gap-2">
                        {/* Play/Pause Button */}
                        <button 
                          onClick={() => handleTogglePlay(testimonio)}
                          className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full py-2.5 px-4 font-black cursor-pointer transition-all duration-200 text-xs uppercase tracking-wider shadow-md ${
                            isThisPlaying 
                              ? 'bg-orange hover:bg-orange/90 text-white ring-2 ring-orange/30' 
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
                              <Pause size={15} /> Pausar
                            </>
                          ) : (
                            <>
                              <Play size={15} fill="currentColor" /> Escuchar
                            </>
                          )}
                        </button>

                        {/* Quick +/- 15s if active */}
                        {isThisActive && (
                          <div className="flex items-center gap-0.5 bg-paper rounded-full p-1 border border-ink/10">
                            <button
                              onClick={() => handleSkip(-15)}
                              className="p-1.5 rounded-full hover:bg-orange/15 text-ink/75 hover:text-orange text-xs cursor-pointer transition-colors"
                              title="Retroceder 15 segundos"
                              aria-label="Retroceder 15 segundos"
                            >
                              <RotateCcw size={14} />
                            </button>
                            <button
                              onClick={() => handleSkip(15)}
                              className="p-1.5 rounded-full hover:bg-orange/15 text-ink/75 hover:text-orange text-xs cursor-pointer transition-colors"
                              title="Adelantar 15 segundos"
                              aria-label="Adelantar 15 segundos"
                            >
                              <RotateCw size={14} />
                            </button>
                          </div>
                        )}

                        {/* Open Chronicle in Modal */}
                        <button 
                          onClick={() => setSelectedChronicle(testimonio)}
                          className="inline-flex items-center justify-center gap-1.5 border rounded-full py-2.5 px-4 font-bold cursor-pointer transition-all duration-200 text-xs bg-ink/5 hover:bg-orange hover:text-white hover:border-orange text-ink/80 border-ink/20 shadow-sm"
                          title={`Abrir crónica completa de ${testimonio.authorId} en modal`}
                        >
                          <BookOpen size={15} />
                          Crónica
                        </button>

                        {/* Compartir historia */}
                        <button
                          type="button"
                          onClick={(e) => handleShareStory(testimonio, e)}
                          className={`p-2.5 rounded-full transition-all cursor-pointer border shadow-sm ${
                            copiedStoryId === testimonio.id
                              ? 'bg-orange text-white border-orange'
                              : 'bg-paper hover:bg-orange/10 hover:text-orange text-ink/70 border-ink/15'
                          }`}
                          title={copiedStoryId === testimonio.id ? '¡Enlace copiado!' : `Compartir relato de ${testimonio.authorId}`}
                          aria-label="Compartir relato"
                        >
                          <Share2 size={15} />
                        </button>
                      </div>
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
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-4 left-0 right-0 z-50 px-4 pointer-events-none"
          >
            <div className="w-[min(calc(100%-20px),1180px)] mx-auto bg-ink/95 border border-white/20 rounded-[24px] p-4 shadow-2xl backdrop-blur-xl text-white pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
              
              {/* Left: Track Information & Portrait Thumbnail */}
              <div className="flex items-center gap-3.5 w-full md:w-auto min-w-[260px]">
                <div 
                  className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-white/10 border border-white/25 cursor-pointer shadow-md group"
                  onClick={() => setSelectedImage(currentStory.imageUrl || FALLBACK_STORIES[0].imageUrl!)}
                  title="Ver retrato en pantalla completa"
                >
                  <img 
                    src={currentStory.imageUrl || FALLBACK_STORIES[0].imageUrl} 
                    alt={currentStory.authorId} 
                    className="w-full h-full object-cover object-top transition-transform group-hover:scale-110" 
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="flex items-end gap-0.5 h-3.5">
                        <span className="w-1 bg-gold rounded-full animate-bounce h-full" />
                        <span className="w-1 bg-gold rounded-full animate-bounce [animation-delay:150ms] h-2/3" />
                        <span className="w-1 bg-gold rounded-full animate-bounce [animation-delay:300ms] h-full" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {currentStory.number && (
                      <span className="px-1.5 py-0.2 bg-orange text-white text-[0.62rem] font-black rounded font-mono">
                        {currentStory.number}
                      </span>
                    )}
                    <span className="text-[0.72rem] font-extrabold uppercase tracking-wider text-gold">
                      {currentStory.authorId}
                    </span>
                    <span className="text-[0.65rem] text-white/50">· Audio original</span>
                  </div>
                  <h4 className="text-sm font-bold truncate text-white mt-0.5">
                    {currentStory.title}
                  </h4>
                  <div className="text-[0.7rem] text-white/60 truncate font-serif italic">
                    {currentStory.subtitle}
                  </div>
                </div>
              </div>

              {/* Center: Playback Controls & Progress Scrubber */}
              <div className="flex-1 w-full max-w-[580px] flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrevStory}
                    className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Audio anterior"
                    aria-label="Audio anterior"
                  >
                    <SkipBack size={19} />
                  </button>

                  <button
                    onClick={() => handleSkip(-15)}
                    className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Retroceder 15s"
                    aria-label="Retroceder 15s"
                  >
                    <RotateCcw size={18} />
                  </button>

                  <button
                    onClick={() => handleTogglePlay(currentStory)}
                    className="w-11 h-11 rounded-full bg-orange hover:bg-orange/90 text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-lg"
                    title={isPlaying ? 'Pausar' : 'Reproducir'}
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isLoadingAudio ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isPlaying ? (
                      <Pause size={21} />
                    ) : (
                      <Play size={21} fill="currentColor" />
                    )}
                  </button>

                  <button
                    onClick={() => handleSkip(15)}
                    className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Adelantar 15s"
                    aria-label="Adelantar 15s"
                  >
                    <RotateCw size={18} />
                  </button>

                  <button
                    onClick={handleNextStory}
                    className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Siguiente audio"
                    aria-label="Siguiente audio"
                  >
                    <SkipForward size={19} />
                  </button>
                </div>

                {/* Scrubber timeline */}
                <div className="w-full flex items-center gap-2.5 text-xs font-mono text-white/70">
                  <span className="min-w-[42px] text-right">{formatTime(currentTime)}</span>
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
                  <span className="min-w-[42px]">{formatTime(duration || 0)}</span>
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

                {/* Compartir audio/relato */}
                <button
                  type="button"
                  onClick={() => handleShareStory(currentStory)}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    copiedStoryId === currentStory.id
                      ? 'text-orange bg-white/20'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  title={copiedStoryId === currentStory.id ? '¡Enlace copiado!' : 'Compartir relato'}
                  aria-label="Compartir relato"
                >
                  <Share2 size={18} />
                </button>

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

      {/* Full Chronicle Modal Overlay on Screen */}
      <AnimatePresence>
        {selectedChronicle && (
          <div 
            className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedChronicle(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chronicle-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative w-full max-w-3xl max-h-[92vh] my-auto bg-paper rounded-[28px] border border-ink/20 shadow-2xl flex flex-col overflow-hidden text-ink"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="p-4 sm:p-6 bg-white border-b border-ink/10 flex items-center justify-between gap-4 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Portrait Thumbnail */}
                  <div 
                    className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-sand/60 border-2 border-orange/40 shadow-md cursor-pointer group"
                    onClick={() => {
                      if (selectedChronicle.imageUrl) {
                        setSelectedImage(selectedChronicle.imageUrl);
                      }
                    }}
                    title={`Ver retrato en alta resolución de ${selectedChronicle.authorId}`}
                  >
                    <img 
                      src={selectedChronicle.imageUrl || FALLBACK_STORIES[0].imageUrl} 
                      alt={selectedChronicle.authorId}
                      className="w-full h-full object-cover object-top transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Maximize2 size={14} className="text-white drop-shadow" />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-orange text-white text-[0.65rem] font-black uppercase tracking-wider rounded-md font-mono">
                        Crónica {selectedChronicle.number || '01'}
                      </span>
                      <span className="text-[0.72rem] uppercase tracking-wider font-extrabold text-gold flex items-center gap-1">
                        <Music size={12} /> Memoria Oral
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-barlow uppercase text-ink truncate mt-0.5">
                      {selectedChronicle.authorId}
                    </h3>
                    {selectedChronicle.fullName && (
                      <p className="text-xs text-ink/60 truncate font-medium">
                        {selectedChronicle.fullName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedChronicle(null)}
                  className="p-2.5 rounded-full bg-ink/5 hover:bg-orange hover:text-white text-ink/70 transition-colors cursor-pointer flex-shrink-0"
                  title="Cerrar crónica (Esc)"
                  aria-label="Cerrar modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Audio Player Quick Bar Inside Modal */}
              <div className="px-5 sm:px-6 py-3.5 bg-sand/40 border-b border-ink/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleTogglePlay(selectedChronicle)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-black uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer ${
                      playingStoryId === selectedChronicle.id && isPlaying
                        ? 'bg-orange text-white ring-2 ring-orange/30'
                        : 'bg-blue hover:bg-teal text-white'
                    }`}
                  >
                    {playingStoryId === selectedChronicle.id && isPlaying ? (
                      <>
                        <Pause size={14} /> Pausar Audio
                      </>
                    ) : (
                      <>
                        <Play size={14} fill="currentColor" /> Escuchar Relato ({selectedChronicle.duration || '08:00'})
                      </>
                    )}
                  </button>

                  {playingStoryId === selectedChronicle.id && (
                    <div className="flex items-center gap-2 font-mono text-ink/80 text-xs">
                      <div className="flex items-end gap-0.5 h-3">
                        <span className="w-1 bg-orange rounded-full animate-bounce h-full" />
                        <span className="w-1 bg-orange rounded-full animate-bounce [animation-delay:150ms] h-2/3" />
                        <span className="w-1 bg-orange rounded-full animate-bounce [animation-delay:300ms] h-full" />
                      </div>
                      <span>{formatTime(currentTime)} / {formatTime(duration || 0)}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleShareStory(selectedChronicle)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-orange/10 hover:text-orange text-ink/75 border border-ink/15 transition-colors font-medium text-xs shadow-sm cursor-pointer"
                    title={`Compartir crónica de ${selectedChronicle.authorId}`}
                  >
                    <Share2 size={13} />
                    <span>{copiedStoryId === selectedChronicle.id ? '¡Enlace copiado!' : 'Compartir crónica'}</span>
                  </button>
                </div>
              </div>

              {/* Scrollable Story Content */}
              <div className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-6">
                <div>
                  <h2 id="chronicle-modal-title" className="text-2xl sm:text-3xl font-black font-barlow uppercase text-ink leading-tight">
                    "{selectedChronicle.title}"
                  </h2>
                  {selectedChronicle.subtitle && (
                    <p className="text-base sm:text-lg font-serif italic text-muted mt-2 leading-relaxed">
                      {selectedChronicle.subtitle}
                    </p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {selectedChronicle.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="text-xs font-bold uppercase tracking-wider bg-white/80 text-ink/80 px-3 py-1 rounded-full border border-ink/10 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pull Quote Decorative Banner */}
                <div className="relative p-5 sm:p-6 bg-white rounded-2xl border-l-4 border-orange shadow-sm text-ink/85 italic font-serif text-base sm:text-lg leading-relaxed">
                  <span className="absolute -top-3 left-4 text-4xl text-orange/30 font-serif leading-none">“</span>
                  <div className="pl-3">
                    {selectedChronicle.content.split('\n\n')[0]}
                  </div>
                </div>

                {/* Full Body Paragraphs */}
                <div className="space-y-4 pt-2 text-ink/90 font-sans text-base sm:text-lg leading-relaxed">
                  {selectedChronicle.content.split('\n\n').slice(1).map((paragraph, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Story Credits */}
                <div className="mt-8 pt-6 border-t border-ink/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted">
                  <div className="space-y-0.5">
                    <span className="font-bold text-ink/80 block">Archivo de Memoria Oral · Núcleo Colectivo</span>
                    <span>Investigación, recopilación comunitaria y preservación sonora barrial.</span>
                  </div>
                  <span className="font-extrabold text-orange uppercase tracking-wider">
                    Comuna 3 · Manrique, Medellín
                  </span>
                </div>
              </div>

              {/* Modal Bottom Actions */}
              <div className="p-4 sm:p-5 bg-white border-t border-ink/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    if (selectedChronicle.imageUrl) {
                      setSelectedImage(selectedChronicle.imageUrl);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-ink/20 hover:border-orange hover:text-orange text-xs font-bold transition-colors cursor-pointer"
                >
                  <Maximize2 size={14} /> Ver Retrato Completo
                </button>

                <button
                  onClick={() => setSelectedChronicle(null)}
                  className="px-6 py-2.5 rounded-full bg-ink hover:bg-orange text-white font-black text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  Cerrar Crónica
                </button>
              </div>
            </motion.div>
          </div>
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
