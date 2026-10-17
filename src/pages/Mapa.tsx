import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Volume2, 
  VolumeX, 
  MapPin, 
  Navigation, 
  Maximize, 
  Minimize, 
  ExternalLink, 
  Calendar,
  Layers,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { AnimatedImage } from '../components/ui/AnimatedImage';
import { cn } from '../lib/utils';
import { useFirestoreCollection } from '../lib/db';

// Leaflet default icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icon factory
function createCustomPin(isActive: boolean) {
  return new L.DivIcon({
    html: `
      <div class="relative flex items-center justify-center">
        ${isActive ? '<span class="absolute -inset-1 rounded-full bg-orange/40 animate-ping"></span>' : ''}
        <div class="w-8 h-8 rounded-full ${isActive ? 'bg-orange shadow-lg shadow-orange/50 scale-110' : 'bg-zinc-900 border-2 border-orange'} flex items-center justify-center text-white transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
      </div>
    `,
    className: 'custom-leaflet-marker-pin',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

export interface LocationData {
  id: string;
  lat: number;
  lng: number;
  title: string;
  category?: string;
  year: string;
  description: string;
  imageUrl: string;
  address?: string;
}

export const MANRIQUE_LOCATIONS: LocationData[] = [
  {
    id: 'teatro-manrique',
    title: 'Cine Teatro Manrique',
    category: 'Cultura y Cine',
    year: '1955',
    lat: 6.2735,
    lng: -75.5522,
    imageUrl: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Captura_de_pantalla_2026-08-10_212607.png_202609021941.jpeg',
    description: 'Emblemático templo cinematográfico y cultural de la Comuna 3. Espacio donde generaciones de familias de Manrique compartieron matinés, cine mexicano y noches de tango sobre La 45.',
    address: 'Carrera 45 con Calle 72, Manrique Central'
  },
  {
    id: 'senor-misericordias',
    title: 'Templo Señor de las Misericordias',
    category: 'Patrimonio Arquitectónico',
    year: '1940',
    lat: 6.2690,
    lng: -75.5542,
    imageUrl: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/Iglesia gótica bajo la montaña.png',
    description: 'Monumento neogótico y epicentro espiritual del barrio. Su esbelta aguja y rosetones se recortan con fuerza frente al paisaje andino de la ladera nororiental.',
    address: 'Calle 67 con Carrera 44, Manrique'
  },
  {
    id: 'la45-tranvia',
    title: 'Carrera 45 y el Tranvía Histórico',
    category: 'Transporte y Memoria',
    year: '1948',
    lat: 6.2710,
    lng: -75.5535,
    imageUrl: '/img/ANTES Y DESPUES/LA 45/DAP-F-04-63273.0001.jpg_2K_202609022240.jpeg',
    description: 'La gran arteria urbana de Manrique. Vía por donde subía el histórico tranvía eléctrico municipal conectando a la comunidad obrera con el centro de Medellín.',
    address: 'Carrera 45 con Calle 69'
  },
  {
    id: 'esquina-sonora',
    title: 'Esquina Comercial La Sonora y Unión Total',
    category: 'Comercio Tradicional',
    year: '1955',
    lat: 6.2725,
    lng: -75.5530,
    imageUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2701047-me-restaurada.png',
    description: 'Edificación patrimonial de dos pisos en esquina con techumbre de barro, toldo de Unión Total y aviso de La Sonora. Archivo histórico Corporación Cultural Viztaz.',
    address: 'Carrera 45 con Calle 71, Manrique'
  },
  {
    id: 'casa-gardeliana',
    title: 'Casa Gardeliana y Ruta del Tango',
    category: 'Música y Tango',
    year: '1972',
    lat: 6.2748,
    lng: -75.5518,
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 211821.png',
    description: 'Fundada por Leonardo Nieto en la Carrera 45; monumento vivo a Carlos Gardel y sede de la gran tradición tanguera que define la identidad sonora de Manrique.',
    address: 'Carrera 45 # 73-27, Manrique Central'
  },
  {
    id: 'casa-cultura-talleres',
    title: 'Casa de la Cultura de Manrique',
    category: 'Proceso Comunitario',
    year: '2026',
    lat: 6.2715,
    lng: -75.5510,
    imageUrl: '/img/talleres/C537-004 FOTO 11.jpeg',
    description: 'Sede comunitaria de los Talleres de Memoria, Creatividad e Inteligencia Artificial. Espacio de co-creación intergeneracional donde vecinos y jóvenes restauraron sus archivos familiares.',
    address: 'Calle 69 # 44-30, Manrique'
  },
  {
    id: 'palos-verdes-esso',
    title: 'Estación Esso Palos Verdes',
    category: 'Transporte y Territorio',
    year: '1958',
    lat: 6.2665,
    lng: -75.5558,
    imageUrl: '/img/ANTES Y DESPUES/PALOS VERDES/Estación Esso entre colinas mediterráneas.png',
    description: 'Punto neurálgico en el sector de Palos Verdes donde confluían los buses de escalera, taxis y las primeras rutas que ascendían hacia las partes altas de la comuna.',
    address: 'Carrera 45 con Calle 66, Sector Palos Verdes'
  },
  {
    id: 'cocina-tradicional-abuela',
    title: 'Cocina Tradicional y Saberes de las Abuelas',
    category: 'Vida Cotidiana',
    year: '1950',
    lat: 6.2760,
    lng: -75.5485,
    imageUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2700198-me-restaurada.png',
    description: 'Registro doméstico de la cotidianidad barrial: mujer mayor moliendo maíz en fogón tradicional. Homenaje a la gastronomía familiar y a las pioneras del barrio.',
    address: 'Sector Manrique Oriental'
  },
  {
    id: 'patio-ajedrezado',
    title: 'Patio Familiar y Encuentro Generacional',
    category: 'Arquitectura Doméstica',
    year: '1958',
    lat: 6.2700,
    lng: -75.5492,
    imageUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2702218-restaurada.png',
    description: 'Arquitectura doméstica clásica con piso en ajedrez. Lugar de encuentro donde abuelos, hijos y nietos compartían historias y organizaban los convites barriales.',
    address: 'Sector Las Esmeraldas / Manrique'
  },
  {
    id: 'comfama-manrique',
    title: 'Comfama Manrique y Vida Barrial',
    category: 'Encuentro Vecinal',
    year: '1965',
    lat: 6.2785,
    lng: -75.5502,
    imageUrl: '/img/ANTES Y DESPUES/COMFAMA/Escena urbana vintage frente a Comfama.png',
    description: 'Espacio de recreación, encuentro deportivo y formación que dinamizó el tejido social en la zona alta de la comuna durante décadas.',
    address: 'Carrera 45 con Calle 79, Manrique'
  }
];

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
}

export function Mapa() {
  const { theme } = useTheme();
  const [activeLocationId, setActiveLocationId] = useState<string>('teatro-manrique');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [mapCenter, setMapCenter] = useState<[number, number]>([6.2735, -75.5522]);
  const [mapZoom, setMapZoom] = useState(16);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { data: firestoreLocations } = useFirestoreCollection<LocationData>('locations');

  // Merge Firestore with local authentic fallback
  const allLocations: LocationData[] = (firestoreLocations && firestoreLocations.length >= 5)
    ? firestoreLocations.map(fl => {
        const fallback = MANRIQUE_LOCATIONS.find(f => f.id === fl.id);
        return {
          ...fallback,
          ...fl,
          imageUrl: fl.imageUrl && !fl.imageUrl.includes('unsplash') ? fl.imageUrl : (fallback?.imageUrl || MANRIQUE_LOCATIONS[0].imageUrl),
          title: fl.title || fallback?.title || '',
          description: fl.description || fallback?.description || '',
          year: fl.year || fallback?.year || '1950',
          category: fl.category || fallback?.category || 'Memoria Viva'
        };
      })
    : MANRIQUE_LOCATIONS;

  const filteredLocations = activeCategory === 'todos' 
    ? allLocations 
    : allLocations.filter(l => l.category?.toLowerCase() === activeCategory.toLowerCase());

  const selectedLocation = allLocations.find(l => l.id === activeLocationId) || allLocations[0];

  const categories = ['todos', 'Cultura y Cine', 'Patrimonio Arquitectónico', 'Transporte y Memoria', 'Comercio Tradicional', 'Música y Tango'];

  const handleLocationClick = (loc: LocationData) => {
    setActiveLocationId(loc.id);
    setMapCenter([loc.lat, loc.lng]);
    setMapZoom(17);
    
    const marker = markerRefs.current[loc.id];
    if (marker) {
      setTimeout(() => marker.openPopup(), 400);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapContainerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const toggleSound = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1440px] mx-auto flex flex-col pb-24">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange/10 border border-orange/20 text-orange rounded-full text-xs font-mono uppercase tracking-widest font-bold mb-3">
          <Compass size={14} />
          <span>Cartografía Comunitaria de la Comuna 3</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-ink leading-tight mb-3">
          Mapa Interactivo del <span className="text-orange">Patrimonio.</span>
        </h1>
        <p className="font-light text-muted max-w-3xl text-base sm:text-lg leading-relaxed">
          Recorre las calles, laderas y esquinas de Manrique donde tuvieron lugar los hitos del tranvía, los teatros de barrio, el tango y los relatos orales de nuestra comunidad.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all cursor-pointer border",
                activeCategory === cat
                  ? "bg-orange text-white border-orange shadow-sm"
                  : "bg-paper text-ink/75 border-ink/15 hover:bg-black/5 hover:text-ink"
              )}
            >
              {cat === 'todos' ? 'Todos los lugares' : cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Map + Sidebar Grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] gap-6 flex-grow min-h-[640px]">
        
        {/* Sidebar with authentic locations */}
        <motion.div 
          className="flex flex-col gap-3.5 overflow-y-auto max-h-[640px] pr-2 custom-scrollbar order-2 lg:order-1"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {filteredLocations.map((loc) => {
            const isSelected = activeLocationId === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => handleLocationClick(loc)}
                className={cn(
                  "p-3.5 sm:p-4 rounded-xl border transition-all duration-300 group flex items-start gap-3.5 cursor-pointer text-left shadow-sm",
                  isSelected 
                    ? "bg-white border-orange shadow-md ring-1 ring-orange/30" 
                    : "bg-white hover:bg-[#faf8f5] border-ink/10 hover:border-ink/25"
                )}
              >
                {/* Photo Thumbnail */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-zinc-900 border border-black/10">
                  <AnimatedImage 
                    src={loc.imageUrl} 
                    alt={loc.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1 left-1 bg-black/80 backdrop-blur-sm px-1.5 py-0.5 text-[9px] font-mono text-white rounded">
                    {loc.year}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  {loc.category && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange block mb-0.5 truncate">
                      {loc.category}
                    </span>
                  )}
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-ink leading-tight group-hover:text-orange transition-colors truncate">
                    {loc.title}
                  </h3>
                  <p className="text-xs text-muted font-sans line-clamp-2 mt-1 leading-snug">
                    {loc.description}
                  </p>
                  {loc.address && (
                    <span className="text-[11px] font-mono text-ink/50 mt-1.5 flex items-center gap-1 truncate">
                      <MapPin size={11} className="text-orange shrink-0" />
                      {loc.address}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Map Container */}
        <motion.div 
          ref={mapContainerRef}
          className={cn(
            "order-1 lg:order-2 min-h-[460px] lg:min-h-[640px] bg-zinc-100 dark:bg-zinc-900 border border-ink/10 relative overflow-hidden rounded-2xl shadow-inner",
            theme === 'dark' ? 'map-dark-tiles' : 'map-light-tiles'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <MapContainer 
            center={[6.2735, -75.5522]} 
            zoom={15} 
            scrollWheelZoom={true}
            className="absolute inset-0 z-10 w-full h-full"
          >
            {/* OpenStreetMap 100% Free & Fast Tile Layer - Zero API Keys, Zero Watermarks */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
            
            <MapController center={mapCenter} zoom={mapZoom} />
            
            {allLocations.map((loc) => {
              const isSelected = activeLocationId === loc.id;
              return (
                <Marker 
                  key={loc.id} 
                  position={[loc.lat, loc.lng]} 
                  icon={createCustomPin(isSelected)}
                  ref={(r) => {
                    if (r) markerRefs.current[loc.id] = r;
                  }}
                  eventHandlers={{
                    click: () => {
                      setActiveLocationId(loc.id);
                      setMapCenter([loc.lat, loc.lng]);
                      setMapZoom(17);
                    }
                  }}
                >
                  <Popup className="manrique-custom-popup">
                    <div className="w-72 -m-3 overflow-hidden rounded-xl bg-white shadow-xl text-left border border-black/10">
                      {/* Photo preview in popup */}
                      <div className="h-36 overflow-hidden relative bg-zinc-900">
                        <AnimatedImage 
                          src={loc.imageUrl} 
                          alt={loc.title} 
                          wrapperClassName="w-full h-full"
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer" 
                        />
                        <div className="absolute top-2.5 left-2.5 bg-black/85 backdrop-blur-md px-2 py-0.5 text-white text-[10px] font-mono tracking-wider rounded font-bold">
                          {loc.year}
                        </div>
                        {loc.category && (
                          <div className="absolute top-2.5 right-2.5 bg-orange/90 backdrop-blur-md px-2 py-0.5 text-white text-[10px] font-mono tracking-wider rounded font-bold">
                            {loc.category}
                          </div>
                        )}
                      </div>

                      {/* Info body */}
                      <div className="p-4 bg-white text-ink">
                        <h4 className="font-editorial text-lg font-bold text-ink leading-tight mb-1">
                          {loc.title}
                        </h4>
                        {loc.address && (
                          <p className="text-[11px] font-mono text-muted mb-2 flex items-center gap-1">
                            <MapPin size={11} className="text-orange shrink-0" />
                            {loc.address}
                          </p>
                        )}
                        <p className="text-xs text-ink/75 leading-relaxed line-clamp-3 mb-3">
                          {loc.description}
                        </p>
                        <Link 
                          to="/archivo" 
                          className="inline-flex items-center gap-1.5 text-xs font-montserrat uppercase font-bold text-orange hover:text-ink transition-colors"
                        >
                          <span>Explorar en Archivo</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
          
          {/* Overlay Guide Badge */}
          <div className="absolute bottom-5 left-5 z-20 pointer-events-none flex flex-col gap-2">
            <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3.5 py-2.5 border border-black/10 rounded-xl shadow-lg flex items-center gap-2.5">
              <Navigation className="text-orange" size={18} />
              <div className="text-left">
                <span className="font-montserrat text-[11px] uppercase tracking-wider font-bold text-ink block leading-none">
                  {selectedLocation.title}
                </span>
                <span className="font-mono text-[9px] text-muted block mt-0.5">
                  {selectedLocation.address || 'Comuna 3 Manrique, Medellín'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Top-Right Control Buttons */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button 
              onClick={toggleSound}
              className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-2.5 sm:p-3 border border-black/10 rounded-xl text-ink hover:text-orange hover:border-orange/50 transition-colors shadow-md cursor-pointer"
              title={isMuted ? "Activar sonido ambiente del barrio" : "Silenciar sonido ambiente"}
              aria-label="Alternar sonido"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-orange" />}
            </button>
            <button 
              onClick={toggleFullscreen}
              className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-2.5 sm:p-3 border border-black/10 rounded-xl text-ink hover:text-orange hover:border-orange/50 transition-colors shadow-md cursor-pointer"
              title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
              aria-label="Alternar pantalla completa"
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
          
          {/* Ambient sound */}
          <audio 
            ref={audioRef} 
            src="https://audiocdn.epidemicsound.com/lqmp3/01KHP2MZQ5VD0XE17ZE55EQ5H7.mp3" 
            loop 
            preload="none"
          />
        </motion.div>
      </div>

      {/* Cartographic styling overrides */}
      <style>{`
        .custom-leaflet-marker-pin {
          background: transparent !important;
          border: none !important;
        }
        .manrique-custom-popup .leaflet-popup-content-wrapper {
          padding: 0 !important;
          overflow: hidden !important;
          border-radius: 12px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }
        .manrique-custom-popup .leaflet-popup-content {
          margin: 0 !important;
          line-height: normal !important;
        }
        .manrique-custom-popup .leaflet-popup-tip {
          background: white !important;
        }
        .map-dark-tiles .leaflet-tile-pane {
          filter: brightness(0.68) invert(1) contrast(2.6) hue-rotate(200deg) saturate(0.28);
        }
        .map-light-tiles .leaflet-tile-pane {
          filter: saturate(0.9) contrast(1.04);
        }
      `}</style>
    </div>
  );
}

export default Mapa;
