import type React from 'react';

/**
 * Configuración oficial y resiliente para los logos institucionales y de marca.
 * Incluye rutas locales optimizadas (sin espacios) y fallback oficial automático
 * al repositorio en GitHub para garantizar que NUNCA aparezca una imagen rota en Vercel,
 * GitHub Pages o desarrollo local.
 */

export const BRAND_LOGOS = {
  home: {
    src: '/img/logospng/logo_home.png',
    fallback: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/logospng/logo_home.png',
    alt: 'Manrique, Memoria en Movimiento',
  },
  pp: {
    src: '/img/logospng/logo_pp.png',
    secondaryLocal: '/img/logospng/logo%20pp.png',
    fallback: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/logospng/logo_pp.png',
    alt: 'Presupuesto Participativo Cultura - Alcaldía de Medellín',
  },
  alcaldia: {
    src: '/img/logospng/logo_alcaldia.png',
    secondaryLocal: '/img/logospng/logo%20alcaldia.png',
    fallback: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/logospng/logo_alcaldia.png',
    alt: 'Alcaldía de Medellín - Distrito de Ciencia, Tecnología e Innovación',
  },
  alcaldiaBlanco: {
    src: '/img/logospng/logo_alcaldia_blanco.png',
    fallback: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/logospng/logo_alcaldia_blanco.png',
    alt: 'Alcaldía de Medellín - Distrito de Ciencia, Tecnología e Innovación',
  },
  nucleo: {
    src: '/img/logospng/logo_nucleo_negro.png',
    secondaryLocal: '/img/logospng/logo-negro.png',
    fallback: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/logospng/logo_nucleo_negro.png',
    alt: 'Núcleo Colectivo',
    url: 'http://nucleocolectivo.com/',
  },
  nucleoBlanco: {
    src: '/img/logospng/logo_nucleo_blanco.png',
    secondaryLocal: '/img/logospng/logo-blanco.png',
    fallback: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/logospng/logo-blanco.png',
    alt: 'Núcleo Colectivo',
    url: 'http://nucleocolectivo.com/',
  },
} as const;

/**
 * Manejador estándar de error para etiquetas <img> que conmuta automáticamente al fallback de GitHub.
 */
export function handleImageFallback(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackUrl: string
) {
  const target = event.currentTarget;
  if (target.src !== fallbackUrl) {
    target.src = fallbackUrl;
  }
}
