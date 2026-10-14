import { useState, useMemo, useEffect, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  MapPin, 
  Calendar, 
  Camera, 
  Download, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  MoveHorizontal,
  SlidersHorizontal,
  Info,
  Archive,
  FolderOpen
} from 'lucide-react';
import { cn } from '../lib/utils';
import { AnimatedImage } from '../components/ui/AnimatedImage';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { useFirestoreCollection } from '../lib/db';

export interface Photograph {
  id: string;
  title: string;
  location: string;
  year: string;
  imageUrl: string;
  originalUrl?: string;
  restoredUrl?: string;
  author: string;
  collectionName?: string;
  description?: string;
  tags: string[];
  isBeforeAfter?: boolean;
}

export const ARCHIVE_PHOTOS: Photograph[] = [
  // =========================================================================
  // --- COLECCIÓN 1: ANTES Y DESPUÉS (Restauración e Inteligencia Artificial) ---
  // =========================================================================
  {
    id: 'ad-comfama',
    title: 'Comfama Manrique y vida cotidiana',
    location: 'Carrera 45 con Calle 71, Manrique',
    year: 'c. 1960',
    imageUrl: '/img/ANTES Y DESPUES/COMFAMA/Escena urbana vintage frente a Comfama.png',
    originalUrl: '/img/ANTES Y DESPUES/COMFAMA/DAP-F-04-63280.0001.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/COMFAMA/Escena urbana vintage frente a Comfama.png',
    author: 'Archivo DAP / Recreación Artística IA',
    collectionName: 'Antes y Después',
    description: 'Contraste entre la fotografía patrimonial del Departamento Administrativo de Planeación (DAP-F-04-63280) y la recreación visual restaurada con inteligencia artificial del edificio Comfama y su entorno barrial.',
    tags: ['comfama', 'patrimonio', 'arquitectura', 'restauración ia', 'antes y después'],
    isBeforeAfter: true
  },
  {
    id: 'ad-teatro-manrique',
    title: 'Teatro Manrique (Cine Manrique)',
    location: 'Carrera 45, Manrique Central',
    year: 'c. 1955',
    imageUrl: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Captura_de_pantalla_2026-08-10_212607.png_202609021941.jpeg',
    originalUrl: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Captura de pantalla 2026-08-10 212607.png',
    restoredUrl: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Captura_de_pantalla_2026-08-10_212607.png_202609021941.jpeg',
    author: 'Archivo Histórico / Restauración 2K Núcleo Colectivo',
    collectionName: 'Antes y Después',
    description: 'El histórico Teatro Manrique en su esplendor: la fotografía original de época y su restauración digital en alta definición 2K que recupera la marquesina, los letreros y los detalles arquitectónicos del mítico cine barrial.',
    tags: ['teatro', 'cine', 'cultura', 'la 45', 'restauración 2k', 'antes y después'],
    isBeforeAfter: true
  },
  {
    id: 'ad-teatro-vintage',
    title: 'Cine Manrique - Recreación de Época',
    location: 'Carrera 45, Manrique',
    year: 'c. 1952',
    imageUrl: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Cine Manrique en una Calle Vintage.png',
    originalUrl: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/DAP-F-04-63287.0001.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Cine Manrique en una Calle Vintage.png',
    author: 'Archivo DAP / Recreación Artística IA',
    collectionName: 'Antes y Después',
    description: 'Fachada patrimonial del Teatro Manrique registrada por el DAP y reinterpretada mediante modelos generativos que evocan la atmósfera cinematográfica y urbana de mediados del siglo XX.',
    tags: ['teatro', 'recreación ia', 'patrimonio', 'la 45', 'antes y después'],
    isBeforeAfter: true
  },
  {
    id: 'ad-palos-verdes',
    title: 'Estación de Gasolina Esso Palos Verdes',
    location: 'Palos Verdes, Manrique',
    year: 'c. 1965',
    imageUrl: '/img/ANTES Y DESPUES/PALOS VERDES/Estación Esso entre colinas mediterráneas.png',
    originalUrl: '/img/ANTES Y DESPUES/PALOS VERDES/BOMBA PALOS VERDES.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/PALOS VERDES/Estación Esso entre colinas mediterráneas.png',
    author: 'Archivo Popular / Recreación IA',
    collectionName: 'Antes y Después',
    description: 'La icónica estación Esso en el sector de Palos Verdes, punto neurálgico de abastecimiento y ascenso a la ladera nororiental, recreada cromática y paisajísticamente con IA.',
    tags: ['palos verdes', 'transporte', 'gasolina', 'recreación ia', 'antes y después'],
    isBeforeAfter: true
  },
  {
    id: 'ad-la45-tranvia',
    title: 'Carrera 45 y Transporte de Época',
    location: 'Carrera 45, Manrique',
    year: 'c. 1950',
    imageUrl: '/img/ANTES Y DESPUES/LA 45/BPP_FOTOS_ANTIGUAS_MEDELLIN.jpg_2K_202609012055.jpeg',
    originalUrl: '/img/ANTES Y DESPUES/LA 45/BPP FOTOS ANTIGUAS MEDELLIN.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/LA 45/BPP_FOTOS_ANTIGUAS_MEDELLIN.jpg_2K_202609012055.jpeg',
    author: 'Biblioteca Pública Piloto / Restauración 2K',
    collectionName: 'Antes y Después',
    description: 'La arteria principal de Manrique con vehículos de época, tranvía y arquitectura tradicional. La restauración en resolución 2K elimina artefactos visuales y define texturas del pavimento.',
    tags: ['la 45', 'transporte', 'tranvía', 'restauración 2k', 'antes y después'],
    isBeforeAfter: true
  },
  {
    id: 'ad-la45-esquina',
    title: 'La 45 Comercial y Transeúntes (DAP 63273)',
    location: 'Carrera 45, Manrique',
    year: 'c. 1960',
    imageUrl: '/img/ANTES Y DESPUES/LA 45/DAP-F-04-63273.0001.jpg_2K_202609022240.jpeg',
    originalUrl: '/img/ANTES Y DESPUES/LA 45/DAP-F-04-63273.0001.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/LA 45/DAP-F-04-63273.0001.jpg_2K_202609022240.jpeg',
    author: 'Archivo DAP / Restauración 2K',
    collectionName: 'Antes y Después',
    description: 'Registro patrimonial DAP-F-04-63273 del dinamismo comercial de la 45, procesado a 2K con notable recuperación de carteles comerciales, líneas de cables y transeúntes.',
    tags: ['la 45', 'comercio', 'calle', 'restauración 2k', 'antes y después'],
    isBeforeAfter: true
  },
  {
    id: 'ad-la45-pendiente',
    title: 'La 45 y la Pendiente de Manrique',
    location: 'Carrera 45 con Calle 72, Manrique',
    year: 'c. 1958',
    imageUrl: '/img/ANTES Y DESPUES/LA 45/Captura_de_pantalla_2026-08-10_211821.png_202609021037.jpeg',
    originalUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 211821.png',
    restoredUrl: '/img/ANTES Y DESPUES/LA 45/Captura_de_pantalla_2026-08-10_211821.png_202609021037.jpeg',
    author: 'Archivo Comunitario / Restauración 2K',
    collectionName: 'Antes y Después',
    description: 'La pronunciada pendiente topográfica de Manrique a lo largo de la 45, realzada en alta definición 2K para apreciar la hilera de casas y el tendido urbano.',
    tags: ['la 45', 'pendiente', 'urbanismo', 'restauración 2k', 'antes y después'],
    isBeforeAfter: true
  },
  {
    id: 'ad-manrique-panoramica',
    title: 'Panorámica de Manrique y sus Colinas',
    location: 'Comuna 3, Manrique',
    year: 'c. 1955',
    imageUrl: '/img/ANTES Y DESPUES/MANRIQUE/104984791_10157514176532711_8589110590739892379_n.jpg_2K_202609011226.jpeg',
    originalUrl: '/img/ANTES Y DESPUES/MANRIQUE/104984791_10157514176532711_8589110590739892379_n.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/MANRIQUE/104984791_10157514176532711_8589110590739892379_n.jpg_2K_202609011226.jpeg',
    author: 'Archivo Histórico / Restauración 2K',
    collectionName: 'Antes y Después',
    description: 'Vista panorámica del poblamiento inicial sobre las colinas orientales, con reconstrucción digital 2K de cubiertas, senderos y vegetación nativa.',
    tags: ['panorámica', 'colinas', 'ladera', 'restauración 2k', 'antes y después'],
    isBeforeAfter: true
  },
  {
    id: 'ad-manrique-viviendas',
    title: 'Casas Tradicionales y Vida de Barrio',
    location: 'Sector Central, Manrique',
    year: 'c. 1962',
    imageUrl: '/img/ANTES Y DESPUES/MANRIQUE/Captura_de_pantalla_2026-08-10_210824.png_202609012311.jpeg',
    originalUrl: '/img/ANTES Y DESPUES/MANRIQUE/Captura de pantalla 2026-08-10 210824.png',
    restoredUrl: '/img/ANTES Y DESPUES/MANRIQUE/Captura_de_pantalla_2026-08-10_210824.png_202609012311.jpeg',
    author: 'Archivo Comunitario / Restauración 2K',
    collectionName: 'Antes y Después',
    description: 'Las típicas viviendas de bahareque y teja de barro que flanqueaban las calles de Manrique, restauradas con textura nítida de muros y carpintería.',
    tags: ['vivienda', 'barrio', 'arquitectura', 'restauración 2k', 'antes y después'],
    isBeforeAfter: true
  },
  {
    id: 'ad-iglesia-panoramica',
    title: 'Templo del Señor de las Misericordias y Serranía',
    location: 'Parroquia Señor de las Misericordias, Manrique',
    year: 'c. 1948',
    imageUrl: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/Panorámica vintage de iglesia gótica y pueblo serrano.png',
    originalUrl: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/memoria visual de medellin eerr.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/Panorámica vintage de iglesia gótica y pueblo serrano.png',
    author: 'Memoria Visual de Medellín / Recreación Paisajística IA',
    collectionName: 'Antes y Después',
    description: 'La silueta inconfundible del templo neogótico elevándose sobre las faldas verdes de la cordillera oriental de Medellín, reinterpretada en paleta pictórica y cromática fiel a su geografía.',
    tags: ['iglesia', 'misericordias', 'neogótico', 'recreación ia', 'antes y después'],
    isBeforeAfter: true
  },
  {
    id: 'ad-iglesia-gotica',
    title: 'Templo Neogótico bajo la Montaña',
    location: 'Manrique Oriental',
    year: 'c. 1952',
    imageUrl: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/Iglesia gótica bajo la montaña.png',
    originalUrl: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/473777221_10170971042745247_6880941470456618617_n.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/Iglesia gótica bajo la montaña.png',
    author: 'Archivo Comunitario / Recreación IA',
    collectionName: 'Antes y Después',
    description: 'La aguja gótica y los vitrales del templo contrastados con la ladera nororiental, integrando el registro fotográfico original y la versión colorizada.',
    tags: ['iglesia', 'arquitectura', 'patrimonio', 'recreación ia', 'antes y después'],
    isBeforeAfter: true
  },

  // =========================================================================
  // --- COLECCIÓN 2: CORPORACIÓN CULTURAL VIZTAZ (7 Fotografías Patrimoniales) ---
  // =========================================================================
  {
    id: 'viztaz-1',
    title: 'Cocina tradicional y saberes cotidianos',
    location: 'Manrique, Medellín',
    year: 'c. 1950',
    imageUrl: '/img/FOTOS VIZTAZ/2700198-me.jpg',
    author: 'Corporación Cultural Viztaz',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Registro de la cotidianidad doméstica en Manrique: mujer mayor preparando alimentos en estufa clásica de la época, con molino manual para maíz y utensilios de cocina tradicionales.',
    tags: ['cocina', 'cotidiano', 'hogar', 'saberes', 'gastronomía']
  },
  {
    id: 'viztaz-2',
    title: 'Retrato de juventud y vestidos de época',
    location: 'Manrique, Medellín',
    year: 'c. 1955',
    imageUrl: '/img/FOTOS VIZTAZ/2700864.jpg',
    author: 'Corporación Cultural Viztaz',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Retrato de dos jóvenes mujeres vestidas con trajes de cuadros y lazos tradicionales en el interior de una residencia de Manrique.',
    tags: ['juventud', 'moda', 'retrato', 'familia', 'vida cotidiana']
  },
  {
    id: 'viztaz-3',
    title: 'Encuentro en el umbral del barrio',
    location: 'La 45, Manrique',
    year: 'c. 1950',
    imageUrl: '/img/FOTOS VIZTAZ/2700968-me.jpg',
    author: 'Corporación Cultural Viztaz',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Pareja en el acceso de una edificación barrial con rejas metálicas tradicionales; ella en las escalas y él con tirantes de época.',
    tags: ['pareja', 'calle', 'arquitectura', 'vida de barrio', 'moda']
  },
  {
    id: 'viztaz-4',
    title: 'Esquina comercial Unión Total y La Sonora',
    location: 'Carrera 45 con calle comercial, Manrique',
    year: 'c. 1955',
    imageUrl: '/img/FOTOS VIZTAZ/2701047-me.jpg',
    author: 'Corporación Cultural Viztaz',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Esquina comercial de dos pisos con tejado de barro, toldo de Unión Total, letrero de La Sonora, peatones y alumbrado público característico.',
    tags: ['comercio', 'la 45', 'arquitectura', 'esquinas', 'urbanismo']
  },
  {
    id: 'viztaz-5',
    title: 'Hogar, sala y vida cotidiana',
    location: 'Manrique, Medellín',
    year: 'c. 1960',
    imageUrl: '/img/FOTOS VIZTAZ/2702158-me.jpg',
    author: 'Corporación Cultural Viztaz',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Hombre sentado en un sillón clásico en el interior de una vivienda familiar, con radio, teléfono antiguo y decoración hogareña de mediados del siglo XX.',
    tags: ['hogar', 'interior', 'muebles', 'cotidianidad', 'familia']
  },
  {
    id: 'viztaz-6',
    title: 'Patio familiar y retrato generacional',
    location: 'Manrique, Medellín',
    year: 'c. 1958',
    imageUrl: '/img/FOTOS VIZTAZ/2702218.jpg',
    author: 'Corporación Cultural Viztaz',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Retrato de familia reunida en el patio embaldosado de una casa tradicional de Manrique, mostrando varias generaciones y plantas de jardín.',
    tags: ['familia', 'patio', 'generaciones', 'niños', 'tradición']
  },
  {
    id: 'viztaz-7',
    title: 'Infancia y juego en el patio interior',
    location: 'Manrique, Medellín',
    year: 'c. 1962',
    imageUrl: '/img/FOTOS VIZTAZ/2704070.jpg',
    author: 'Corporación Cultural Viztaz',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Grupo de niños y familiares compartiendo una tarde en el patio interior con piso de baldosín decorado y arquitectura doméstica clásica.',
    tags: ['infancia', 'juego', 'patio', 'arquitectura doméstica', 'convivencia']
  },

  // =========================================================================
  // --- COLECCIÓN 3: BIBLIOTECA PÚBLICA PILOTO (11 Fotografías Históricas) ---
  // =========================================================================
  {
    id: 'bpp-1',
    title: 'Construcción y trazado de la Carrera 45',
    location: 'Carrera 45, Manrique',
    year: '1945',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 210431.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Apertura de la vía principal que transformó a Manrique en un eje de conexión fundamental con el centro de Medellín.',
    tags: ['carrera 45', 'infraestructura', 'urbanismo']
  },
  {
    id: 'bpp-2',
    title: 'Primeras viviendas y laderas de Manrique',
    location: 'Manrique Oriental',
    year: '1950',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 210542.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Asentamientos iniciales en la ladera nororiental, caracterizados por la autoconstrucción y los convites comunitarios.',
    tags: ['vivienda', 'convites', 'ladera']
  },
  {
    id: 'bpp-3',
    title: 'El Tranvía en Manrique',
    location: 'Estación Manrique',
    year: '1948',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 210627.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'El histórico tranvía eléctrico que conectaba a los habitantes con la dinámica económica del Valle de Aburrá.',
    tags: ['transporte', 'tranvía', 'movilidad']
  },
  {
    id: 'bpp-4',
    title: 'Comercio tradicional y vida de barrio',
    location: 'Calle central, Manrique',
    year: '1955',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 210709.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Tiendas de abarrotes, sastrerías y cafeterías que consolidaron el tejido económico y social del vecindario.',
    tags: ['comercio', 'oficios', 'cotidianidad']
  },
  {
    id: 'bpp-5',
    title: 'Encuentro vecinal y espacio público',
    location: 'Sector Central',
    year: '1960',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 210743.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Las esquinas y aceras como epicentro de tertulia, música de carrilera y tango en la vida cotidiana de Manrique.',
    tags: ['comunidad', 'espacio público', 'tertulia']
  },
  {
    id: 'bpp-6',
    title: 'Arquitectura de las primeras casas',
    location: 'Manrique Central',
    year: '1952',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 210824.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Fachadas en tapia y teja de barro que dieron identidad a los primeros barrios de la comuna 3.',
    tags: ['arquitectura', 'patrimonio', 'vivienda']
  },
  {
    id: 'bpp-7',
    title: 'Panorámica de la comuna en expansión',
    location: 'Sector Las Granjas',
    year: '1965',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 211238.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Crecimiento demográfico acelerado y ocupación progresiva de las colinas de Medellín a mediados del siglo XX.',
    tags: ['panorámica', 'demografía', 'territorio']
  },
  {
    id: 'bpp-8',
    title: 'Templo Parroquial y plaza',
    location: 'Plaza de Manrique',
    year: '1958',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 211441.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'El templo como núcleo articulador espiritual, comunitario y de las celebraciones patronales del barrio.',
    tags: ['iglesia', 'patrimonio', 'plaza']
  },
  {
    id: 'bpp-9',
    title: 'El bullicio de la Carrera 45',
    location: 'Carrera 45 con Calle 72',
    year: '1962',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 211821.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Buses escalonados, peatones y el ritmo comercial incesante que inmortalizó el espíritu tanguero de Manrique.',
    tags: ['carrera 45', 'transporte', 'comercio']
  },
  {
    id: 'bpp-10',
    title: 'Infancia y juegos en la calle',
    location: 'Manrique Oriental',
    year: '1968',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 212235.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Los niños jugando trompo y fútbol en calles sin pavimentar, testimonio de la vida comunitaria y libre de la época.',
    tags: ['infancia', 'juegos', 'cotidianidad']
  },
  {
    id: 'bpp-11',
    title: 'Transformación del paisaje barrial',
    location: 'Manrique',
    year: '1970',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 212425.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Perspectiva histórica y dinámica de la comunidad organizada construyendo acueductos comunitarios y vías de acceso.',
    tags: ['paisaje', 'comunidad', 'acueducto']
  }
];

export function Archivo() {
  const { data: firestorePhotos } = useFirestoreCollection<Photograph>('photographs');
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | null>(null);
  const [activeCollection, setActiveCollection] = useState<'all' | 'antes_despues' | 'viztaz' | 'bpp'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Combine Firestore with static fallback
  const allPhotos = useMemo(() => {
    if (firestorePhotos && firestorePhotos.length > 0) {
      return firestorePhotos;
    }
    return ARCHIVE_PHOTOS;
  }, [firestorePhotos]);

  // Counts by collection
  const counts = useMemo(() => {
    const total = allPhotos.length;
    const antesDespues = allPhotos.filter(p => p.isBeforeAfter || p.collectionName?.toLowerCase().includes('antes')).length;
    const viztaz = allPhotos.filter(p => p.author?.toLowerCase().includes('viztaz') || p.collectionName?.toLowerCase().includes('viztaz')).length;
    const bpp = allPhotos.filter(p => p.author?.toLowerCase().includes('piloto') || p.collectionName?.toLowerCase().includes('piloto')).length;
    return { total, antesDespues, viztaz, bpp };
  }, [allPhotos]);

  // Unique tags for filter pills
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    allPhotos.forEach(p => {
      (p.tags || []).forEach(t => {
        if (t.toLowerCase() !== 'antes y después') {
          set.add(t.toLowerCase());
        }
      });
    });
    return Array.from(set).slice(0, 10);
  }, [allPhotos]);

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    return allPhotos.filter(photo => {
      // Collection filter
      if (activeCollection === 'antes_despues') {
        const isAD = photo.isBeforeAfter || photo.collectionName?.toLowerCase().includes('antes');
        if (!isAD) return false;
      } else if (activeCollection === 'viztaz') {
        const isViztaz = photo.author?.toLowerCase().includes('viztaz') || photo.collectionName?.toLowerCase().includes('viztaz');
        if (!isViztaz) return false;
      } else if (activeCollection === 'bpp') {
        const isBpp = photo.author?.toLowerCase().includes('piloto') || photo.collectionName?.toLowerCase().includes('piloto');
        if (!isBpp) return false;
      }

      // Tag filter
      if (selectedTag) {
        const hasTag = (photo.tags || []).some(t => t.toLowerCase() === selectedTag.toLowerCase());
        if (!hasTag) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = photo.title.toLowerCase().includes(q);
        const matchDesc = photo.description?.toLowerCase().includes(q);
        const matchLoc = photo.location.toLowerCase().includes(q);
        const matchYear = photo.year.toLowerCase().includes(q);
        const matchAuthor = photo.author.toLowerCase().includes(q);
        const matchTag = (photo.tags || []).some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchLoc && !matchYear && !matchAuthor && !matchTag) {
          return false;
        }
      }

      return true;
    });
  }, [allPhotos, activeCollection, selectedTag, searchQuery]);

  // Keyboard navigation inside modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, filteredPhotos]);

  // Modal navigation (Next / Prev)
  const currentIndex = selectedPhoto ? filteredPhotos.findIndex(p => p.id === selectedPhoto.id) : -1;
  const handlePrev = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1]);
    } else if (filteredPhotos.length > 0) {
      setSelectedPhoto(filteredPhotos[filteredPhotos.length - 1]);
    }
  };

  const handleNext = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1]);
    } else if (filteredPhotos.length > 0) {
      setSelectedPhoto(filteredPhotos[0]);
    }
  };

  // Direct download handler (Guardar en HD)
  const handleDownload = async (url: string, filename: string, e?: MouseEvent) => {
    e?.stopPropagation();
    try {
      setIsDownloading(true);
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download error:', err);
      // Fallback
      window.open(url, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-deep-black pt-28 pb-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-orange" />
            <span className="font-mono text-xs uppercase tracking-widest text-orange font-bold">
              Memoria Fotográfica · Comuna 3
            </span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-black/10">
            <div>
              <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.95]">
                Archivo <span className="italic font-light">Visual</span>
              </h1>
              <p className="mt-3 text-muted text-base sm:text-lg max-w-2xl font-sans leading-relaxed">
                Fotografías patrimoniales de la Biblioteca Pública Piloto y la Corporación Cultural Viztaz, complementadas con el comparador exclusivo de <strong>Antes y Después</strong> mediante modelos generativos y restauración en alta definición.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-4 text-xs font-mono text-muted bg-white p-3.5 rounded-lg border border-black/10 shadow-sm self-start lg:self-end">
              <div className="text-center px-2">
                <span className="block text-lg font-bold text-deep-black">{counts.total}</span>
                <span>TOTAL</span>
              </div>
              <div className="h-6 w-px bg-black/10" />
              <div className="text-center px-2">
                <span className="block text-lg font-bold text-orange">{counts.antesDespues}</span>
                <span>ANTES / DESPUÉS</span>
              </div>
              <div className="h-6 w-px bg-black/10" />
              <div className="text-center px-2">
                <span className="block text-lg font-bold text-blue">{counts.viztaz}</span>
                <span>VIZTAZ</span>
              </div>
              <div className="h-6 w-px bg-black/10" />
              <div className="text-center px-2">
                <span className="block text-lg font-bold text-deep-black">{counts.bpp}</span>
                <span>PILOTO</span>
              </div>
            </div>
          </div>
        </header>

        {/* Collection Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
          <button
            type="button"
            onClick={() => { setActiveCollection('all'); setSelectedTag(null); }}
            className={cn(
              "px-4 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider transition-all flex items-center gap-2 border",
              activeCollection === 'all'
                ? "bg-deep-black text-white border-deep-black shadow-sm"
                : "bg-white text-deep-black border-black/15 hover:border-black/40 hover:bg-black/5"
            )}
          >
            <FolderOpen size={15} />
            <span>Todas ({counts.total})</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveCollection('antes_despues'); setSelectedTag(null); }}
            className={cn(
              "px-4 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider transition-all flex items-center gap-2 border",
              activeCollection === 'antes_despues'
                ? "bg-orange text-white border-orange shadow-md font-bold"
                : "bg-white text-orange border-orange/40 hover:bg-orange/5"
            )}
          >
            <MoveHorizontal size={15} />
            <Sparkles size={14} />
            <span>Antes y Después · Comparador ({counts.antesDespues})</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveCollection('viztaz'); setSelectedTag(null); }}
            className={cn(
              "px-4 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider transition-all flex items-center gap-2 border",
              activeCollection === 'viztaz'
                ? "bg-blue text-white border-blue shadow-sm font-bold"
                : "bg-white text-deep-black border-black/15 hover:border-black/40 hover:bg-black/5"
            )}
          >
            <Archive size={15} />
            <span>Corporación Viztaz ({counts.viztaz})</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveCollection('bpp'); setSelectedTag(null); }}
            className={cn(
              "px-4 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider transition-all flex items-center gap-2 border",
              activeCollection === 'bpp'
                ? "bg-deep-black text-white border-deep-black shadow-sm"
                : "bg-white text-deep-black border-black/15 hover:border-black/40 hover:bg-black/5"
            )}
          >
            <Camera size={15} />
            <span>Biblioteca Pública Piloto ({counts.bpp})</span>
          </button>
        </div>

        {/* Notice for Antes y Después */}
        {activeCollection === 'antes_despues' && (
          <div className="mb-8 p-4 rounded-xl bg-orange/10 border border-orange/30 text-deep-black flex items-start gap-3">
            <Sparkles className="text-orange shrink-0 mt-0.5" size={20} />
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong>Colección con Comparador Interactivo (Antes y Después):</strong> Estas fotografías cuentan con el registro histórico de archivo original contrastado con su restauración digital en alta resolución 2K y recreaciones visuales mediante inteligencia artificial generativa. Haz clic en cualquiera para deslizar y comparar.
            </div>
          </div>
        )}

        {/* Search & Tag Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-black/10 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input 
                type="text"
                placeholder="Buscar por lugar, palabra clave, año, fotógrafo..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-black/[0.03] border border-black/10 rounded-lg text-sm font-sans focus:outline-none focus:border-orange transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-deep-black"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Reset Filters */}
            {(selectedTag || searchQuery || activeCollection !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedTag(null);
                  setSearchQuery('');
                  setActiveCollection('all');
                }}
                className="text-xs font-mono text-orange hover:underline whitespace-nowrap self-end md:self-center"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Tag Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-black/5">
            <span className="text-[11px] font-mono text-muted uppercase tracking-wider flex items-center gap-1 mr-1">
              <SlidersHorizontal size={12} />
              Temas:
            </span>
            {availableTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-sans transition-all",
                  selectedTag === tag
                    ? "bg-orange text-white font-medium"
                    : "bg-black/[0.04] text-muted hover:bg-black/10 hover:text-deep-black"
                )}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs font-mono text-muted">
          <span>
            Mostrando <strong>{filteredPhotos.length}</strong> de <strong>{allPhotos.length}</strong> fotografías
          </span>
          {activeCollection !== 'all' && (
            <span className="text-orange font-bold uppercase tracking-wider">
              {activeCollection === 'antes_despues' ? 'Filtro: Antes y Después' : activeCollection === 'viztaz' ? 'Filtro: Viztaz' : 'Filtro: Piloto'}
            </span>
          )}
        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-black/10 rounded-2xl bg-white p-8">
            <Info size={40} className="mx-auto text-muted mb-3" />
            <h3 className="font-editorial text-2xl text-deep-black mb-1">No se encontraron fotografías</h3>
            <p className="text-muted text-sm max-w-md mx-auto mb-4">
              Prueba cambiando el término de búsqueda o seleccionando otra colección.
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedTag(null); setActiveCollection('all'); }}
              className="px-5 py-2 bg-deep-black text-white rounded-full text-xs font-mono uppercase tracking-wider hover:bg-orange transition-colors"
            >
              Ver todas las fotografías
            </button>
          </div>
        )}

        {/* Photographic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, index) => {
            const isBeforeAfter = photo.isBeforeAfter || photo.collectionName?.toLowerCase().includes('antes');
            return (
              <motion.article
                key={photo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="group relative bg-white border border-black/10 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-black/30 transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Photo Preview */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                  <AnimatedImage 
                    src={photo.imageUrl} 
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Badge: Antes y Después vs Original */}
                  {isBeforeAfter ? (
                    <div className="absolute top-3 left-3 bg-orange/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white font-bold rounded shadow-md flex items-center gap-1.5">
                      <MoveHorizontal size={13} />
                      <Sparkles size={11} />
                      <span>Antes y Después</span>
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white/90 rounded border border-white/20">
                      {photo.author?.includes('Viztaz') ? 'Archivo Viztaz' : 'Archivo Piloto'}
                    </div>
                  )}

                  {/* Year Tag */}
                  <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2 py-0.5 text-[11px] font-mono text-white/90 rounded">
                    {photo.year}
                  </div>

                  {/* Hover Prompt */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="px-4 py-2 bg-white/95 text-deep-black text-xs font-mono uppercase tracking-wider font-bold rounded-full shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      {isBeforeAfter ? (
                        <>
                          <MoveHorizontal size={14} className="text-orange" />
                          <span>Abrir Comparador</span>
                        </>
                      ) : (
                        <>
                          <Maximize2 size={14} className="text-orange" />
                          <span>Ver en Detalle</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-muted font-sans mb-1.5">
                      <MapPin size={13} className="text-orange shrink-0" />
                      <span className="truncate">{photo.location}</span>
                    </div>

                    <h3 className="font-editorial text-xl text-deep-black leading-snug group-hover:text-orange transition-colors">
                      {photo.title}
                    </h3>

                    {photo.description && (
                      <p className="mt-2 text-xs text-muted line-clamp-2 font-light leading-relaxed">
                        {photo.description}
                      </p>
                    )}
                  </div>

                  {/* Footer & Tags */}
                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {photo.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 bg-black/[0.04] text-muted rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-orange font-semibold group-hover:underline">
                      {isBeforeAfter ? 'Comparar →' : 'Explorar →'}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>

      {/* =========================================================================
          DETAILED PHOTOGRAPH / COMPARATOR MODAL
      ========================================================================= */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Top Close / Navigation Bar */}
            <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-105"
                title="Cerrar (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Left / Right Arrow Buttons */}
            {filteredPhotos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 p-3 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg"
                  title="Foto anterior (←)"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 p-3 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg"
                  title="Siguiente foto (→)"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Modal Body */}
            <div 
              className="relative w-full max-w-6xl my-auto flex flex-col lg:flex-row gap-6 items-stretch bg-zinc-950 border border-white/15 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Main Photo or Comparator Area */}
              <div className="relative flex-1 flex flex-col justify-center min-h-[40vh] sm:min-h-[50vh] lg:min-h-[65vh]">
                {selectedPhoto.isBeforeAfter && selectedPhoto.originalUrl && selectedPhoto.restoredUrl ? (
                  /* EXCLUSIVE COMPARATOR FOR ANTES Y DESPUÉS */
                  <div className="w-full flex flex-col">
                    <div className="mb-2 flex items-center justify-between text-xs font-mono text-white/70">
                      <span className="flex items-center gap-1.5 text-orange font-bold">
                        <Sparkles size={14} />
                        Comparador Interactivo: Archivo Original vs. Restauración
                      </span>
                    </div>
                    <BeforeAfterSlider 
                      beforeImage={selectedPhoto.originalUrl}
                      afterImage={selectedPhoto.restoredUrl}
                      beforeLabel="ARCHIVO ORIGINAL"
                      afterLabel="RESTAURADA (IA / 2K)"
                      aspectRatio="aspect-[4/3] md:aspect-[16/10]"
                    />
                  </div>
                ) : (
                  /* PRISTINE HISTORICAL ARCHIVE PHOTO (BPP & VIZTAZ - NO FAKE FILTERS OR TOGGLES) */
                  <div className="relative w-full h-full max-h-[70vh] bg-black/90 flex items-center justify-center overflow-hidden rounded-xl border border-white/10 p-2">
                    <img 
                      src={selectedPhoto.imageUrl} 
                      alt={selectedPhoto.title}
                      className="w-full h-full max-h-[65vh] object-contain"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 font-mono text-[11px] tracking-wider text-white border border-white/20 rounded">
                      FOTOGRAFÍA HISTÓRICA AUTÉNTICA
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar with Metadata */}
              <div className="lg:w-80 xl:w-96 shrink-0 flex flex-col justify-between gap-6 text-left text-white border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-orange font-bold">
                      {selectedPhoto.collectionName || selectedPhoto.author}
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-3xl text-white mt-1 leading-tight">
                      {selectedPhoto.title}
                    </h2>
                  </div>

                  {selectedPhoto.description && (
                    <p className="text-white/80 text-sm font-light leading-relaxed border-t border-white/10 pt-3">
                      {selectedPhoto.description}
                    </p>
                  )}

                  <div className="space-y-2.5 text-xs text-white/70 font-light border-t border-white/10 pt-3">
                    <p className="flex items-center gap-2">
                      <MapPin size={15} className="text-orange shrink-0" />
                      <span><strong>Territorio:</strong> {selectedPhoto.location}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar size={15} className="text-orange shrink-0" />
                      <span><strong>Año estimado:</strong> {selectedPhoto.year}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Camera size={15} className="text-orange shrink-0" />
                      <span><strong>Fuente:</strong> {selectedPhoto.author}</span>
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="border-t border-white/10 pt-3">
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                      Etiquetas
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPhoto.tags.map(t => (
                        <span key={t} className="text-[11px] font-mono px-2 py-0.5 bg-white/10 text-white/80 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions / Download */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  {selectedPhoto.isBeforeAfter && selectedPhoto.originalUrl && selectedPhoto.restoredUrl ? (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleDownload(
                          selectedPhoto.originalUrl!, 
                          `${selectedPhoto.id}-original.jpg`, 
                          e
                        )}
                        disabled={isDownloading}
                        className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-white/15"
                      >
                        <Download size={13} />
                        <span>Original</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDownload(
                          selectedPhoto.restoredUrl!, 
                          `${selectedPhoto.id}-restaurada.jpg`, 
                          e
                        )}
                        disabled={isDownloading}
                        className="w-full py-2.5 px-3 bg-orange hover:bg-orange/90 text-white rounded-lg text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Sparkles size={13} />
                        <span>Restaurada</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleDownload(
                        selectedPhoto.imageUrl, 
                        `${selectedPhoto.id}-patrimonial.jpg`, 
                        e
                      )}
                      disabled={isDownloading}
                      className="w-full py-2.5 px-4 bg-orange hover:bg-orange/90 text-white rounded-lg text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <Download size={14} />
                      <span>{isDownloading ? 'Guardando...' : 'Guardar / Descargar'}</span>
                    </button>
                  )}

                  <p className="text-[10px] text-center text-white/40 font-mono">
                    Uso cultural y pedagógico · Comuna 3 Manrique
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
