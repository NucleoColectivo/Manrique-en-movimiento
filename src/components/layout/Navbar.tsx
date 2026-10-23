import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { InstitutionalTopRightLogo } from './InstitutionalCredits';
import { BRAND_LOGOS, handleImageFallback } from '../../constants/logos';

const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Proyecto', href: '/proyecto' },
  { label: 'Archivo', href: '/archivo' },
  { label: 'Historias', href: '/historias' },
  { label: 'Mapa', href: '/mapa' },
  { label: 'Talleres', href: '/talleres' },
  { label: 'Aprende IA', href: '/aprende' },
];

export function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={isHidden && !isMobileMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-300 px-5 py-3',
          isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-[#1112] shadow-sm' : 'bg-white'
        )}
      >
        <div className="w-[min(100%,1380px)] mx-auto flex items-center justify-between gap-5">
          <Link to="/" className="flex flex-col z-50 block">
            <img 
              src={BRAND_LOGOS.home.src} 
              alt={BRAND_LOGOS.home.alt} 
              className="h-9 sm:h-10 md:h-[48px] w-auto max-w-[170px] md:max-w-[215px] object-contain transition-transform group-hover:scale-105" 
              onError={(e) => handleImageFallback(e, BRAND_LOGOS.home.fallback)}
            />
          </Link>

          {/* Desktop Nav + Official PP Cultura Top-Right Mark */}
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex items-center space-x-6 text-[0.75rem] font-bold uppercase tracking-[0.08em]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "transition-colors hover:text-orange",
                    location.pathname === link.href ? "text-orange" : "text-ink"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center space-x-4 border-l border-[#1112] pl-6 ml-2">
                <button aria-label="Buscar" className="text-ink hover:text-orange transition-colors">
                  <Search size={18} />
                </button>
              </div>
            </nav>

            {/* Official PP Cultura Logo in Top-Right Position */}
            <div className="border-l border-ink/15 pl-5 ml-2">
              <InstitutionalTopRightLogo />
            </div>
          </div>

          {/* Mobile Menu & Institutional Logo */}
          <div className="lg:hidden flex items-center space-x-3.5 z-50">
            <img
              src={BRAND_LOGOS.pp.src}
              alt={BRAND_LOGOS.pp.alt}
              width={38}
              height={38}
              className="h-9 sm:h-10 w-auto object-contain"
              onError={(e) => handleImageFallback(e, BRAND_LOGOS.pp.fallback)}
            />
            <button
              className="text-ink hover:text-orange transition-colors p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-between p-8 pt-24 overflow-y-auto"
          >
            <div className="flex flex-col items-center space-y-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 * i + 0.15 }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "font-barlow text-4xl sm:text-5xl transition-colors hover:text-orange block text-center uppercase font-bold",
                      location.pathname === link.href ? "text-orange" : "text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                aria-label="Buscar" 
                className="flex items-center space-x-3 text-ink hover:text-orange transition-colors mt-4"
              >
                <Search size={22} />
                <span className="font-dm text-sm tracking-widest uppercase font-bold">Buscar en archivo</span>
              </motion.button>
            </div>

            {/* Mobile Institutional Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 pt-6 border-t border-ink/10 flex flex-col items-center gap-4 text-center"
            >
              <div className="flex items-center justify-center gap-7">
                <img
                  src={BRAND_LOGOS.pp.src}
                  alt={BRAND_LOGOS.pp.alt}
                  className="h-12 w-auto object-contain"
                  onError={(e) => handleImageFallback(e, BRAND_LOGOS.pp.fallback)}
                />
                <img
                  src={BRAND_LOGOS.alcaldia.src}
                  alt={BRAND_LOGOS.alcaldia.alt}
                  className="h-12 w-auto object-contain"
                  onError={(e) => handleImageFallback(e, BRAND_LOGOS.alcaldia.fallback)}
                />
              </div>
              <p className="text-[11px] text-ink/70 max-w-sm font-montserrat">
                Proyecto beneficiado con recursos del programa de Planeación del Desarrollo Local y Presupuesto Participativo de Cultura.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
