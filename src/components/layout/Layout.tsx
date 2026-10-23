import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { Navbar } from './Navbar';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '../ThemeProvider';
import { Instagram, Youtube, Facebook, ArrowUpRight } from 'lucide-react';

import { InstitutionalCredits } from './InstitutionalCredits';

export function Layout() {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <HelmetProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground font-inter selection:bg-medellin-orange selection:text-white transition-colors duration-500">
          <Navbar />
          <main className="flex-grow">
            <Outlet />
          </main>
          
          <footer className="site-footer bg-[#080808] text-[#f5f5f5] border-t border-white/10 pt-16 px-6 md:px-12 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-14">
              <div className="md:col-span-2">
                <span className="font-editorial text-4xl text-white leading-none block mb-2">Manrique</span>
                <span className="font-montserrat text-sm text-gold font-light tracking-wider uppercase mb-6 block">en Movimiento</span>
                <p className="text-white/70 font-light max-w-sm mb-8 leading-relaxed">
                  Un archivo vivo del barrio Manrique mediante restauración fotográfica y colorización con Inteligencia Artificial.
                </p>
                <div className="flex space-x-6">
                  <a href="#" className="text-white/80 hover:text-orange transition-colors" aria-label="Instagram"><Instagram size={22} /></a>
                  <a href="#" className="text-white/80 hover:text-orange transition-colors" aria-label="YouTube"><Youtube size={22} /></a>
                  <a href="#" className="text-white/80 hover:text-orange transition-colors" aria-label="Facebook"><Facebook size={22} /></a>
                </div>
              </div>
              
              <div>
                <h4 className="font-montserrat uppercase tracking-widest text-xs font-bold mb-6 text-white/50">Enlaces</h4>
                <ul className="space-y-4">
                  <li><a href="/proyecto" className="text-white/75 hover:text-orange transition-colors">El Proyecto</a></li>
                  <li><a href="/archivo" className="text-white/75 hover:text-orange transition-colors">Archivo Fotográfico</a></li>
                  <li><a href="/historias" className="text-white/75 hover:text-orange transition-colors">Historias y Testimonios</a></li>
                  <li><a href="/mapa" className="text-white/75 hover:text-orange transition-colors">Mapa Interactivo</a></li>
                  <li><a href="/talleres" className="text-white/75 hover:text-orange transition-colors">Talleres Comunitarios</a></li>
                  <li><a href="/aprende" className="text-white/75 hover:text-orange transition-colors">Aprende IA</a></li>
                  <li><a href="/admin" className="text-white/75 hover:text-orange transition-colors">Admin CMS</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-montserrat uppercase tracking-widest text-xs font-bold mb-6 text-white/50">Contacto</h4>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <label htmlFor="footer-email" className="sr-only">Tu correo electrónico</label>
                  <input 
                    id="footer-email"
                    type="email" 
                    placeholder="Tu correo electrónico" 
                    className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-orange transition-colors rounded-sm"
                  />
                  <label htmlFor="footer-message" className="sr-only">Mensaje</label>
                  <textarea 
                    id="footer-message"
                    placeholder="Mensaje" 
                    rows={3}
                    className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-orange transition-colors resize-none rounded-sm"
                  />
                  <button className="flex items-center gap-2 text-sm font-montserrat uppercase tracking-widest font-medium text-white hover:text-orange transition-colors cursor-pointer">
                    Enviar mensaje <ArrowUpRight size={16} />
                  </button>
                </form>
              </div>
            </div>

            {/* Bloque institucional oficial PP Cultura y Alcaldía de Medellín */}
            <InstitutionalCredits />
          </footer>
        </div>
      </HelmetProvider>
    </ThemeProvider>
  );
}
