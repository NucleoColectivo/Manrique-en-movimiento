import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { Navbar } from './Navbar';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '../ThemeProvider';
import { Instagram, Youtube, Facebook, ArrowUpRight } from 'lucide-react';

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
          
          <footer className="border-t border-foreground/10 py-16 px-6 md:px-12 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <span className="font-editorial text-4xl text-foreground leading-none block mb-2">Manrique</span>
                <span className="font-montserrat text-sm text-aged-yellow font-light tracking-wider uppercase mb-6 block">en Movimiento</span>
                <p className="text-foreground/70 font-light max-w-sm mb-8">
                  Un archivo vivo del barrio Manrique mediante restauración fotográfica y colorización con Inteligencia Artificial.
                </p>
                <div className="flex space-x-6">
                  <a href="#" className="text-foreground hover:text-medellin-orange transition-colors"><Instagram size={24} /></a>
                  <a href="#" className="text-foreground hover:text-medellin-orange transition-colors"><Youtube size={24} /></a>
                  <a href="#" className="text-foreground hover:text-medellin-orange transition-colors"><Facebook size={24} /></a>
                </div>
              </div>
              
              <div>
                <h4 className="font-montserrat uppercase tracking-widest text-xs font-bold mb-6 text-foreground/50">Enlaces</h4>
                <ul className="space-y-4">
                  <li><a href="/proyecto" className="text-foreground/80 hover:text-medellin-orange transition-colors">El Proyecto</a></li>
                  <li><a href="/archivo" className="text-foreground/80 hover:text-medellin-orange transition-colors">Archivo Fotográfico</a></li>
                  <li><a href="/historias" className="text-foreground/80 hover:text-medellin-orange transition-colors">Historias y Testimonios</a></li>
                  <li><a href="/mapa" className="text-foreground/80 hover:text-medellin-orange transition-colors">Mapa Interactivo</a></li>
                  <li><a href="/talleres" className="text-foreground/80 hover:text-medellin-orange transition-colors">Talleres Comunitarios</a></li>
                  <li><a href="/aprende" className="text-foreground/80 hover:text-medellin-orange transition-colors">Aprende IA</a></li>
                  <li><a href="/admin" className="text-foreground/80 hover:text-medellin-orange transition-colors">Admin CMS</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-montserrat uppercase tracking-widest text-xs font-bold mb-6 text-foreground/50">Contacto</h4>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Tu correo electrónico" 
                    className="w-full bg-muted/30 border border-foreground/20 px-4 py-3 text-sm focus:outline-none focus:border-medellin-orange transition-colors"
                  />
                  <textarea 
                    placeholder="Mensaje" 
                    rows={3}
                    className="w-full bg-muted/30 border border-foreground/20 px-4 py-3 text-sm focus:outline-none focus:border-medellin-orange transition-colors resize-none"
                  />
                  <button className="flex items-center gap-2 text-sm font-montserrat uppercase tracking-widest font-medium text-foreground hover:text-medellin-orange transition-colors">
                    Enviar mensaje <ArrowUpRight size={16} />
                  </button>
                </form>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-foreground/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-foreground/50 text-xs font-montserrat uppercase tracking-widest">
              <span>© 2026 Manrique, Memoria en Movimiento</span>
              <span className="mt-4 md:mt-0">Proyecto PP Cultura Medellín</span>
            </div>
          </footer>
        </div>
      </HelmetProvider>
    </ThemeProvider>
  );
}
