import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';

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
          isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-[#1112]' : 'bg-white'
        )}
      >
        <div className="w-[min(100%,1380px)] mx-auto flex items-center justify-between gap-5">
          <Link to="/" className="flex flex-col z-50 block">
            <img 
              src="https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/logospng/logo_home.png" 
              alt="Manrique, Memoria en Movimiento" 
              className="h-8 md:h-11 w-auto max-w-[150px] md:max-w-[190px] object-contain" 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 text-[0.75rem] font-bold uppercase tracking-[0.08em]">
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

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-4 z-50">
            <button
              className="text-ink hover:text-orange transition-colors"
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
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center space-y-8"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i + 0.2 }}
              >
                <Link
                  to={link.href}
                  className={cn(
                    "font-barlow text-5xl transition-colors hover:text-orange block text-center uppercase font-bold",
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
              transition={{ delay: 0.8 }}
              aria-label="Buscar" 
              className="flex items-center space-x-3 text-ink hover:text-orange transition-colors mt-8"
            >
              <Search size={24} />
              <span className="font-dm text-sm tracking-widest uppercase font-bold">Buscar en archivo</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
