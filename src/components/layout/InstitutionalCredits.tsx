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
          
          {/* Zona inferior izquierda: Leyenda obligatoria oficial */}
          <div className="w-full lg:max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 bg-medellin-orange/10 border border-medellin-orange/20 text-medellin-orange text-[11px] font-montserrat font-bold uppercase tracking-widest">
              <span>Alcaldía de Medellín · Comuna 3 Manrique</span>
            </div>
            <p className="font-editorial text-base sm:text-lg text-foreground/90 leading-snug italic mb-2">
              “Proyecto beneficiado con recursos del programa de Planeación del Desarrollo Local y Presupuesto Participativo de Cultura.”
            </p>
            <p className="text-xs text-foreground/60 font-montserrat tracking-wide">
              Manrique en Movimiento · Archivo Vivo y Memoria Comunitaria · 2026
            </p>
          </div>

          {/* Zona inferior derecha: Escudo oficial de la Alcaldía de Medellín y PP Cultura */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 sm:gap-8 flex-shrink-0">
            {/* Logo PP Cultura */}
            <div className="flex flex-col items-center lg:items-end">
              <span className="text-[10px] uppercase font-montserrat tracking-widest text-foreground/50 mb-1.5 hidden sm:block">
                Programa
              </span>
              <img
                src={BRAND_LOGOS.pp.src}
                alt={BRAND_LOGOS.pp.alt}
                width={70}
                height={70}
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-200 hover:scale-105"
                loading="lazy"
                onError={(e) => handleImageFallback(e, BRAND_LOGOS.pp.fallback)}
              />
            </div>

            {/* Separador sutil */}
            <div className="h-12 w-px bg-foreground/15 hidden sm:block" aria-hidden="true" />

            {/* Escudo oficial de la Alcaldía de Medellín */}
            <div className="flex flex-col items-center lg:items-end">
              <span className="text-[10px] uppercase font-montserrat tracking-widest text-foreground/50 mb-1.5 hidden sm:block">
                Distrito de Medellín
              </span>
              <img
                src={BRAND_LOGOS.alcaldia.src}
                alt={BRAND_LOGOS.alcaldia.alt}
                width={120}
                height={92}
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-200 hover:scale-105"
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
      className={`inline-flex items-center gap-2.5 flex-shrink-0 ${className}`}
      title="Presupuesto Participativo Cultura · Alcaldía de Medellín"
    >
      <div className="hidden xl:flex flex-col text-right leading-tight">
        <span className="text-[9px] font-montserrat font-bold uppercase tracking-wider text-ink/75">
          PP Cultura
        </span>
        <span className="text-[8px] font-montserrat font-medium uppercase tracking-widest text-ink/50">
          Medellín 2026
        </span>
      </div>
      <img
        src={BRAND_LOGOS.pp.src}
        alt={BRAND_LOGOS.pp.alt}
        width={40}
        height={40}
        className="h-8 md:h-9 w-auto object-contain transition-transform duration-200 hover:scale-105"
        onError={(e) => handleImageFallback(e, BRAND_LOGOS.pp.fallback)}
      />
    </div>
  );
}

export default InstitutionalCredits;
