import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, X, MapPin, Calendar, Camera } from 'lucide-react';
import { cn } from '../lib/utils';
import { AnimatedImage } from '../components/ui/AnimatedImage';
import { useFirestoreCollection } from '../lib/db';

interface Photograph {
  id: string;
  title: string;
  location: string;
  year: string;
  imageUrl: string;
  author: string;
  tags: string[];
}

const DEFAULT_PHOTOS: Photograph[] = [
  {
    id: 'demo-1',
    title: 'Tranvía de Medellín',
    location: 'Manrique Central',
    year: '1970',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/DAP-F-04-63270.0001.jpg',
    author: 'Biblioteca Pública Piloto',
    tags: ['transporte', 'tranvía', 'calles']
  },
  {
    id: 'demo-2',
    title: 'Esquina Comercial',
    location: 'La 45',
    year: '1960',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/DAP-F-04-63273.0001.jpg',
    author: 'Biblioteca Pública Piloto',
    tags: ['comercio', 'arquitectura', 'vecinos']
  },
  {
    id: 'demo-3',
    title: 'Iglesia de Manrique',
    location: 'Plaza Principal',
    year: '1950',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/DAP-F-04-63274.0001.jpg',
    author: 'Biblioteca Pública Piloto',
    tags: ['iglesia', 'arquitectura', 'religión']
  },
  {
    id: 'demo-4',
    title: 'Panorámica del Barrio',
    location: 'Manrique Oriental',
    year: '1980',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20210431.png',
    author: 'Archivo Familiar',
    tags: ['paisaje', 'montaña', 'urbanismo']
  },
  {
    id: 'demo-5',
    title: 'Familia en la puerta',
    location: 'Las Granjas',
    year: '1970',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20210542.png',
    author: 'Archivo Familiar',
    tags: ['familia', 'retrato', 'cotidiano']
  },
  {
    id: 'demo-6',
    title: 'Callejón histórico',
    location: 'Manrique Central',
    year: '1960',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20210743.png',
    author: 'Biblioteca Pública Piloto',
    tags: ['calles', 'niños', 'juego']
  },
  {
    id: 'demo-7',
    title: 'Construcción de viviendas',
    location: 'Manrique Oriental',
    year: '1980',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20211441.png',
    author: 'Archivo Comunitario',
    tags: ['construcción', 'comunidad', 'vivienda']
  },
  {
    id: 'demo-8',
    title: 'Transporte público antiguo',
    location: 'La 45',
    year: '1970',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/DAP-F-04-63278.0001.jpg',
    author: 'Biblioteca Pública Piloto',
    tags: ['transporte', 'buses', 'historia']
  },
  {
    id: 'demo-9',
    title: 'Vecinos conversando',
    location: 'Las Granjas',
    year: '1990',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20212607.png',
    author: 'Archivo Familiar',
    tags: ['vecinos', 'cotidiano', 'comunidad']
  }
];

export function Archivo() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);

  const { data: ARCHIVE_PHOTOS, loading, error } = useFirestoreCollection<Photograph>('photographs');

  const photosToDisplay = ARCHIVE_PHOTOS.length > 0 ? ARCHIVE_PHOTOS : DEFAULT_PHOTOS;

  const filteredPhotos = photosToDisplay.filter(photo => {
    const matchesSearch = photo.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (photo.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesYear = selectedYear ? photo.year === selectedYear : true;
    const matchesLocation = selectedLocation ? photo.location === selectedLocation : true;
    
    return matchesSearch && matchesYear && matchesLocation;
  });

  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-editorial text-5xl md:text-7xl mb-4">Archivo Fotográfico</h1>
        <p className="font-light text-foreground/80 max-w-2xl text-lg mb-12">
          Explora la memoria visual de Manrique. Un archivo vivo construido por la comunidad.
        </p>
      </motion.div>

      {/* Advanced Search Bar */}
      <motion.div 
        className="bg-muted/30 p-4 md:p-6 mb-12 border border-foreground/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por palabra clave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-foreground/20 text-foreground px-12 py-3 focus:outline-none focus:border-medellin-orange transition-colors"
            />
          </div>
          
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              "flex items-center justify-center gap-2 px-6 py-3 border transition-colors md:w-auto w-full",
              isFilterOpen ? "border-medellin-orange bg-medellin-orange/10 text-medellin-orange" : "border-foreground/20 hover:border-foreground/50"
            )}
          >
            <Filter size={20} />
            <span className="font-montserrat uppercase tracking-wider text-sm font-medium">Filtros</span>
          </button>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 font-montserrat text-xs uppercase tracking-widest text-foreground/60 mb-3">
                    <Calendar size={14} /> Década / Año
                  </label>
                  <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full bg-background border border-foreground/20 text-foreground px-4 py-3 focus:outline-none focus:border-medellin-orange transition-colors appearance-none"
                  >
                    <option value="">Todas las épocas</option>
                    <option value="1968">Años 60s</option>
                    <option value="1972">Años 70s</option>
                    <option value="1985">Años 80s</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 font-montserrat text-xs uppercase tracking-widest text-foreground/60 mb-3">
                    <MapPin size={14} /> Ubicación
                  </label>
                  <select 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-background border border-foreground/20 text-foreground px-4 py-3 focus:outline-none focus:border-medellin-orange transition-colors appearance-none"
                  >
                    <option value="">Todos los lugares</option>
                    <option value="Manrique Central">Manrique Central</option>
                    <option value="La 45">La 45</option>
                    <option value="Cancha La González">Cancha La González</option>
                  </select>
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedYear('');
                    setSelectedLocation('');
                  }}
                  className="text-sm font-montserrat uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="group cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-4">
              <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <AnimatedImage 
                src={photo.imageUrl} 
                alt={photo.title}
                className="filter sepia-[0.3] contrast-125 group-hover:sepia-0 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4 bg-deep-black/60 backdrop-blur-sm px-3 py-1 text-off-white text-xs font-montserrat tracking-widest z-20">
                {photo.year}
              </div>
            </div>
            <div>
              <h3 className="font-editorial text-2xl mb-1 group-hover:text-medellin-orange transition-colors">{photo.title}</h3>
              <p className="text-foreground/60 text-sm flex items-center gap-1.5 mb-2">
                <MapPin size={14} /> {photo.location}
              </p>
              <p className="text-foreground/50 text-xs flex items-center gap-1.5">
                <Camera size={14} /> Colección: {photo.author}
              </p>
            </div>
          </motion.div>
        ))}
        {filteredPhotos.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-foreground/60 text-lg">No se encontraron fotografías con esos filtros.</p>
          </div>
        )}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-foreground/70 hover:text-medellin-orange transition-colors z-50 bg-background/50 p-2 rounded-full"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={32} />
            </button>

            <div 
              className="relative w-full max-w-6xl max-h-[85vh] flex flex-col md:flex-row gap-8 items-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative flex-1 w-full h-[50vh] md:h-[80vh] bg-muted/20 flex items-center justify-center overflow-hidden">
                <AnimatedImage 
                  src={selectedPhoto.imageUrl} 
                  alt={selectedPhoto.title}
                  className={cn(
                    "object-contain w-full h-full transition-all duration-700",
                    showOriginal ? "filter grayscale sepia-[0.4] blur-[0.5px] contrast-[0.9]" : ""
                  )}
                  referrerPolicy="no-referrer"
                />
                
                {/* Toggle Original / Restored */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex bg-background/80 backdrop-blur-md p-1 border border-foreground/10 z-20">
                  <button
                    onClick={() => setShowOriginal(true)}
                    className={cn(
                      "px-6 py-2 text-xs font-montserrat uppercase tracking-widest transition-colors",
                      showOriginal ? "bg-foreground text-background" : "text-foreground hover:bg-foreground/10"
                    )}
                  >
                    Original
                  </button>
                  <button
                    onClick={() => setShowOriginal(false)}
                    className={cn(
                      "px-6 py-2 text-xs font-montserrat uppercase tracking-widest transition-colors",
                      !showOriginal ? "bg-medellin-orange text-background" : "text-foreground hover:bg-foreground/10"
                    )}
                  >
                    Restaurada
                  </button>
                </div>
              </div>

              <div className="md:w-80 w-full flex flex-col gap-4 text-left">
                <h2 className="font-editorial text-3xl md:text-4xl text-foreground">{selectedPhoto.title}</h2>
                <div className="space-y-3 text-sm text-foreground/70 font-light border-t border-foreground/10 pt-4 mt-2">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-medellin-orange" /> {selectedPhoto.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={16} className="text-medellin-orange" /> {selectedPhoto.year}
                  </p>
                  <p className="flex items-center gap-2">
                    <Camera size={16} className="text-medellin-orange" /> {selectedPhoto.author}
                  </p>
                </div>
                {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedPhoto.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-montserrat uppercase tracking-widest border border-foreground/20 px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-6 p-4 bg-medellin-orange/5 border border-medellin-orange/20 text-xs text-foreground/60 italic leading-relaxed">
                  Procesado con Inteligencia Artificial. La restauración y colorización son aproximaciones creativas basadas en modelos generativos, respetando la dignidad del documento original.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
