# Manrique en Movimiento · V3 React

Experiencia documental interactiva para el archivo vivo de memoria fotográfica del barrio Manrique.

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- Lucide React
- Accesibilidad base WCAG: foco visible, teclado, labels, contraste, `prefers-reduced-motion`, ajuste de texto
- Imágenes fuente desde `img/` del repositorio público

## Ejecutar

```bash
npm install
npm run dev
npm run build
```

## Arquitectura del objeto patrimonial

Al seleccionar una fotografía se abre una ficha con siete capas:

1. **Ficha** — fecha, lugar, familia, autoría, contexto y etiquetas.
2. **Antes / Después** — comparador con slider; conserva la distinción entre original e intervención.
3. **Animación** — movimiento sutil identificado como interpretación.
4. **Testimonio** — voz, transcripción y contexto.
5. **Mapa** — lugar asociado y futura georreferenciación.
6. **IA** — modelo, prompt, tiempo y etapas del proceso.
7. **Créditos y derechos** — autoría, procedencia, licencia y consentimiento.

El modelo `Photo` de `src/App.tsx` está pensado para migrar posteriormente a Supabase/CMS sin rediseñar la experiencia.

## Imágenes

La V3 utiliza como fuente visual:

`https://github.com/NucleoColectivo/Manrique-en-movimiento/tree/main/img`

En producción recomendamos migrar estas imágenes a un CDN / Supabase Storage y generar AVIF/WebP responsive, manteniendo el campo `sourceUrl` para trazabilidad.

## Siguiente arquitectura de producción

```text
React UI
  ├─ Archivo / búsqueda / filtros
  ├─ Ficha patrimonial
  │   ├─ Original
  │   ├─ Restauración
  │   ├─ Animación
  │   ├─ Testimonio + transcripción
  │   ├─ Territorio
  │   ├─ Metadatos IA
  │   └─ Derechos / consentimiento
  └─ Timeline + mapa
        ↓
Supabase
  ├─ photos
  ├─ testimonies
  ├─ places
  ├─ ai_processes
  ├─ rights
  └─ media
        ↓
Storage / CDN
```

## Rama de desarrollo

`react-vite-v3`

La rama `main` conserva la versión previa. Esta migración se mantiene aislada hasta validación visual y funcional.
