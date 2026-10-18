import React from 'react';
import { BRAND_LOGOS, handleImageFallback } from '../../constants/logos';

interface InstitutionalCreditsProps {
  className?: string;
  variant?: 'full' | 'compact';
}

/**
 * InstitutionalCredits - Bloque institucional oficial de PP Cultura y Alcaldía de Medellín
 * 
 * Cumple estrictamente con la Guía de Marcación de Productos Digitales e Interactivos 2026:
 * - Indicador oficial de PP Cultura en la zona superior derecha (disponible también como subcomponente)
 * - Leyenda obligatoria exacta en la zona inferior izquierda:
 *   "Proyecto beneficiado con recursos del programa de Planeación del Desarrollo Local y Presupuesto Participativo de Cultura."
 * - Escudo oficial de la Alcaldía de Medellín en la zona inferior derecha.
 * - Respeta áreas de protección, proporciones originales e integridad de los archivos.
 */
export function InstitutionalCredits({ className = '', variant = 'full' }: InstitutionalCreditsProps) {
  return (
    <section 
      aria-label="Créditos institucionales"
      className={`border-t border-foreground/15 bg-background/50 pt-10 pb-6 transition-colors duration-300 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8">
          
          {/* Zona inferior izquierda: Logo Núcleo Colectivo + Leyenda obligatoria oficial */}
          <div className="w-full lg:max-w-3xl flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6 text-center sm:text-left">
            {/* Logo de Núcleo Colectivo con enlace oficial */}
            <a
              href="http://nucleocolectivo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 transition-transform duration-200 hover:scale-105 inline-block group"
              title="Núcleo Colectivo · Plataforma Cultural y Comunitaria (http://nucleocolectivo.com/)"
            >
              <img
                src={BRAND_LOGOS.nucleo.src}
                alt={BRAND_LOGOS.nucleo.alt}
                width={130}
                height={55}
                className="h-12 sm:h-14 md:h-16 w-auto object-contain dark:invert transition-opacity group-hover:opacity-85"
                loading="lazy"
                onError={(e) => handleImageFallback(e, BRAND_LOGOS.nucleo.fallback)}
              />
            </a>

            {/* Separador vertical sutil en pantallas medianas y grandes */}
            <div className="h-14 w-px bg-foreground/15 hidden sm:block shrink-0" aria-hidden="true" />

            {/* Texto y leyenda institucional */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-2.5 bg-medellin-orange/10 border border-medellin-orange/20 text-medellin-orange text-[11px] font-montserrat font-bold uppercase tracking-widest">
                <span>Alcaldía de Medellín · Comuna 3 Manrique</span>
              </div>
              <p className="font-editorial text-base sm:text-lg text-foreground/90 leading-snug italic mb-1.5">
                “Proyecto beneficiado con recursos del programa de Planeación del Desarrollo Local y Presupuesto Participativo de Cultura.”
              </p>
              <p className="text-xs text-foreground/60 font-montserrat tracking-wide">
                Manrique en Movimiento · Archivo Vivo y Memoria Comunitaria · 2026
              </p>
            </div>
          </div>

          {/* Zona inferior derecha: Escudo oficial de la Alcaldía de Medellín y PP Cultura */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-7 sm:gap-9 flex-shrink-0">
            {/* Logo PP Cultura */}
            <div className="flex flex-col items-center lg:items-end">
              <span className="text-[11px] font-semibold uppercase font-montserrat tracking-widest text-foreground/60 mb-2 hidden sm:block">
                Programa
              </span>
              <img
                src={BRAND_LOGOS.pp.src}
                alt={BRAND_LOGOS.pp.alt}
                width={80}
                height={80}
                className="h-14 sm:h-16 md:h-[74px] w-auto object-contain transition-transform duration-200 hover:scale-105"
                loading="lazy"
                onError={(e) => handleImageFallback(e, BRAND_LOGOS.pp.fallback)}
              />
            </div>

            {/* Separador sutil */}
            <div className="h-14 sm:h-16 md:h-[70px] w-px bg-foreground/15 hidden sm:block" aria-hidden="true" />

            {/* Escudo oficial de la Alcaldía de Medellín */}
            <div className="flex flex-col items-center lg:items-end">
              <span className="text-[11px] font-semibold uppercase font-montserrat tracking-widest text-foreground/60 mb-2 hidden sm:block">
                Distrito de Medellín
              </span>
              <img
                src={BRAND_LOGOS.alcaldia.src}
                alt={BRAND_LOGOS.alcaldia.alt}
                width={140}
                height={108}
                className="h-14 sm:h-16 md:h-[74px] w-auto object-contain transition-transform duration-200 hover:scale-105"
                loading="lazy"
                onError={(e) => handleImageFallback(e, BRAND_LOGOS.alcaldia.fallback)}
              />
            </div>
          </div>

        </div>

        {/* Fila de copyright y pie */}
        <div className="mt-8 pt-6 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-montserrat uppercase tracking-widest text-foreground/50 gap-3 text-center sm:text-left">
          <span>© 2026 Núcleo Colectivo · Manrique, Memoria en Movimiento</span>
          <span>Desarrollo Local y Presupuesto Participativo de Cultura</span>
        </div>
      </div>
    </section>
  );
}

/**
 * InstitutionalTopRightLogo - Indicador oficial de PP Cultura para la zona superior derecha
 */
export function InstitutionalTopRightLogo({ className = '' }: { className?: string }) {
  return (
    <div 
      className={`inline-flex items-center gap-3 flex-shrink-0 ${className}`}
      title="Presupuesto Participativo Cultura · Alcaldía de Medellín"
    >
      <div className="hidden xl:flex flex-col text-right leading-tight">
        <span className="text-[10px] font-montserrat font-bold uppercase tracking-wider text-ink/80">
          PP Cultura
        </span>
        <span className="text-[9px] font-montserrat font-medium uppercase tracking-widest text-ink/55">
          Medellín 2026
        </span>
      </div>
      <img
        src={BRAND_LOGOS.pp.src}
        alt={BRAND_LOGOS.pp.alt}
        width={46}
        height={46}
        className="h-9 md:h-[42px] w-auto object-contain transition-transform duration-200 hover:scale-105"
        onError={(e) => handleImageFallback(e, BRAND_LOGOS.pp.fallback)}
      />
    </div>
  );
}

export default InstitutionalCredits;
