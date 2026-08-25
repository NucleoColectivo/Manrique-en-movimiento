import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Volume2, VolumeX, MapPin, Image as ImageIcon, Navigation, Maximize, Minimize } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import { AnimatedImage } from '../components/ui/AnimatedImage';
import { cn } from '../lib/utils';
import { useFirestoreCollection } from '../lib/db';

// Fix Leaflet's default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icon matching brand colors (SVG)
const customIcon = new L.DivIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b2c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  className: 'custom-leaflet-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

interface LocationData {
  id: string;
  lat: number;
  lng: number;
  title: string;
  year: string;
  description: string;
  imageUrl: string;
}

// Helper to update map theme (tile layer URL)
function MapThemeUpdater({ theme }: { theme: 'dark' | 'light' }) {
  const map = useMap();
  useEffect(() => {
    // Allows reactivity for map tile layer
  }, [theme, map]);
  return null;
}

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

export function Mapa() {
  const { theme } = useTheme();
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([6.2735, -75.5520]);
  const [mapZoom, setMapZoom] = useState(15);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const { data: MAP_LOCATIONS, loading, error } = useFirestoreCollection<LocationData>('locations');

  // Use a different tile layer depending on the theme
  const tileUrl = theme === 'dark' 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' 
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  const handleLocationClick = (loc: typeof MAP_LOCATIONS[0]) => {
    setActiveLocation(loc.id);
    setMapCenter([loc.lat, loc.lng]);
    setMapZoom(17);
    
    // Open popup
    const marker = markerRefs.current[loc.id];
    if (marker) {
      setTimeout(() => marker.openPopup(), 1500);
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
    <div className="min-h-screen pt-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-editorial text-5xl md:text-7xl mb-4">Mapa Interactivo</h1>
        <p className="font-light text-foreground/80 max-w-2xl text-lg mb-12">
          Recorre las calles de Manrique y descubre en qué lugares precisos se capturaron las historias del barrio.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 flex-grow min-h-[600px]">
        {/* Sidebar */}
        <motion.div 
          className="lg:w-1/3 flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {MAP_LOCATIONS.map((loc, index) => (
            <motion.button
              key={loc.id}
              onClick={() => handleLocationClick(loc)}
              className={cn(
                "text-left p-6 border transition-all duration-300 group flex items-start gap-4",
                activeLocation === loc.id 
                  ? "bg-muted/30 border-medellin-orange" 
                  : "bg-muted/10 border-foreground/10 hover:border-foreground/30 hover:bg-muted/20"
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                activeLocation === loc.id ? "bg-medellin-orange text-white" : "bg-muted text-foreground/50 group-hover:text-foreground"
              )}>
                <MapPin size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-editorial text-2xl">{loc.title}</h3>
                  <span className="text-xs font-montserrat px-2 py-0.5 bg-foreground/5 rounded-sm text-foreground/70">
                    {loc.year}
                  </span>
                </div>
                <p className="text-sm text-foreground/60 line-clamp-2">
                  {loc.description}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Map Area */}
        <motion.div 
          ref={mapContainerRef}
          className="lg:w-2/3 min-h-[400px] lg:min-h-full bg-muted/30 border border-foreground/10 relative overflow-hidden rounded-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <MapContainer 
            center={[6.2735, -75.5520]} 
            zoom={15} 
            scrollWheelZoom={false}
            className="absolute inset-0 z-10 w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url={tileUrl}
            />
            <MapThemeUpdater theme={theme} />
            <MapController center={mapCenter} zoom={mapZoom} />
            
            {MAP_LOCATIONS.map((loc) => (
              <Marker 
                key={loc.id} 
                position={[loc.lat, loc.lng]} 
                icon={customIcon}
                ref={(r) => {
                  if (r) markerRefs.current[loc.id] = r;
                }}
                eventHandlers={{
                  click: () => {
                    setActiveLocation(loc.id);
                    setMapCenter([loc.lat, loc.lng]);
                    setMapZoom(17);
                  }
                }}
              >
                <Popup className="custom-popup">
                  <div className="w-64 -m-3 overflow-hidden rounded-t-sm font-inter">
                    <div className="h-32 overflow-hidden relative">
                      <AnimatedImage src={loc.imageUrl} alt={loc.title} wrapperClassName="absolute inset-0 w-full h-full" className="filter sepia-[0.3]" referrerPolicy="no-referrer" />
                      <div className="absolute top-2 right-2 bg-deep-black/70 backdrop-blur-md px-2 py-0.5 text-off-white text-[10px] font-montserrat tracking-widest rounded-sm">
                        {loc.year}
                      </div>
                    </div>
                    <div className="p-4 bg-background text-foreground">
                      <h4 className="font-editorial text-xl mb-2">{loc.title}</h4>
                      <p className="text-xs text-foreground/70 leading-relaxed mb-3">
                        {loc.description}
                      </p>
                      <button className="text-xs font-montserrat text-medellin-orange uppercase tracking-wider hover:text-foreground transition-colors flex items-center gap-1">
                        <ImageIcon size={12} /> Ver historia
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Overlay controls */}
          <div className="absolute bottom-6 left-6 z-20 pointer-events-none flex flex-col gap-2">
            <div className="bg-background/80 backdrop-blur-md px-4 py-3 border border-foreground/10 flex items-center gap-3">
              <Navigation className="text-medellin-orange" size={20} />
              <span className="font-montserrat text-xs uppercase tracking-widest text-foreground font-medium">
                Selecciona un lugar
              </span>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button 
              onClick={toggleSound}
              className="bg-background/80 backdrop-blur-md p-3 border border-foreground/10 text-foreground hover:text-medellin-orange hover:border-medellin-orange/50 transition-colors"
              title={isMuted ? "Activar sonido ambiente" : "Silenciar sonido ambiente"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button 
              onClick={toggleFullscreen}
              className="bg-background/80 backdrop-blur-md p-3 border border-foreground/10 text-foreground hover:text-medellin-orange hover:border-medellin-orange/50 transition-colors"
              title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
          
          <audio 
            ref={audioRef} 
            src="https://audiocdn.epidemicsound.com/lqmp3/01KHP2MZQ5VD0XE17ZE55EQ5H7.mp3" 
            loop 
            preload="auto"
          />
        </motion.div>
      </div>
    </div>
  );
}
