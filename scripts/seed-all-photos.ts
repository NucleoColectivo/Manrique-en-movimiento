import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc, getDocs, deleteDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = initializeApp(configData);
const db = getFirestore(app, configData.firestoreDatabaseId);

const ALL_PHOTOS = [
  // =========================================================================
  // --- COLECCIÓN 1: ANTES Y DESPUÉS (Restauración e Inteligencia Artificial) ---
  // =========================================================================
  {
    id: 'ad-comfama',
    title: 'Comfama Manrique y vida cotidiana',
    location: 'Carrera 45 con Calle 71, Manrique',
    year: 'c. 1960',
    imageUrl: '/img/ANTES Y DESPUES/COMFAMA/Escena urbana vintage frente a Comfama.png',
    originalUrl: '/img/ANTES Y DESPUES/COMFAMA/DAP-F-04-63280.0001.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/COMFAMA/Escena urbana vintage frente a Comfama.png',
    author: 'Archivo DAP / Recreación Artística IA',
    collectionName: 'Antes y Después',
    description: 'Contraste entre la fotografía patrimonial del Departamento Administrativo de Planeación (DAP-F-04-63280) y la recreación visual restaurada con inteligencia artificial del edificio Comfama y su entorno barrial.',
    tags: ['comfama', 'patrimonio', 'arquitectura', 'restauración ia', 'antes y después'],
    isBeforeAfter: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-teatro-manrique',
    title: 'Teatro Manrique (Cine Manrique)',
    location: 'Carrera 45, Manrique Central',
    year: 'c. 1955',
    imageUrl: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Captura_de_pantalla_2026-08-10_212607.png_202609021941.jpeg',
    originalUrl: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Captura de pantalla 2026-08-10 212607.png',
    restoredUrl: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Captura_de_pantalla_2026-08-10_212607.png_202609021941.jpeg',
    author: 'Archivo Histórico / Restauración 2K Núcleo Colectivo',
    collectionName: 'Antes y Después',
    description: 'El histórico Teatro Manrique en su esplendor: la fotografía original de época y su restauración digital en alta definición 2K que recupera la marquesina, los letreros y los detalles arquitectónicos del mítico cine barrial.',
    tags: ['teatro', 'cine', 'cultura', 'la 45', 'restauración 2k', 'antes y después'],
    isBeforeAfter: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-teatro-vintage',
    title: 'Cine Manrique - Recreación de Época',
    location: 'Carrera 45, Manrique',
    year: 'c. 1952',
    imageUrl: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Cine Manrique en una Calle Vintage.png',
    originalUrl: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/DAP-F-04-63287.0001.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Cine Manrique en una Calle Vintage.png',
    author: 'Archivo DAP / Recreación Artística IA',
    collectionName: 'Antes y Después',
    description: 'Fachada patrimonial del Teatro Manrique registrada por el DAP y reinterpretada mediante modelos generativos que evocan la atmósfera cinematográfica y urbana de mediados del siglo XX.',
    tags: ['teatro', 'recreación ia', 'patrimonio', 'la 45', 'antes y después'],
    isBeforeAfter: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-palos-verdes',
    title: 'Estación de Gasolina Esso Palos Verdes',
    location: 'Palos Verdes, Manrique',
    year: 'c. 1965',
    imageUrl: '/img/ANTES Y DESPUES/PALOS VERDES/Estación Esso entre colinas mediterráneas.png',
    originalUrl: '/img/ANTES Y DESPUES/PALOS VERDES/BOMBA PALOS VERDES.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/PALOS VERDES/Estación Esso entre colinas mediterráneas.png',
    author: 'Archivo Popular / Recreación IA',
    collectionName: 'Antes y Después',
    description: 'La icónica estación Esso en el sector de Palos Verdes, punto neurálgico de abastecimiento y ascenso a la ladera nororiental, recreada cromática y paisajísticamente con IA.',
    tags: ['palos verdes', 'transporte', 'gasolina', 'recreación ia', 'antes y después'],
    isBeforeAfter: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-la45-tranvia',
    title: 'Carrera 45 y Transporte de Época',
    location: 'Carrera 45, Manrique',
    year: 'c. 1950',
    imageUrl: '/img/ANTES Y DESPUES/LA 45/BPP_FOTOS_ANTIGUAS_MEDELLIN.jpg_2K_202609012055.jpeg',
    originalUrl: '/img/ANTES Y DESPUES/LA 45/BPP FOTOS ANTIGUAS MEDELLIN.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/LA 45/BPP_FOTOS_ANTIGUAS_MEDELLIN.jpg_2K_202609012055.jpeg',
    author: 'Biblioteca Pública Piloto / Restauración 2K',
    collectionName: 'Antes y Después',
    description: 'La arteria principal de Manrique con vehículos de época, tranvía y arquitectura tradicional. La restauración en resolución 2K elimina artefactos visuales y define texturas del pavimento.',
    tags: ['la 45', 'transporte', 'tranvía', 'restauración 2k', 'antes y después'],
    isBeforeAfter: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-la45-esquina',
    title: 'La 45 Comercial y Transeúntes (DAP 63273)',
    location: 'Carrera 45, Manrique',
    year: 'c. 1960',
    imageUrl: '/img/ANTES Y DESPUES/LA 45/DAP-F-04-63273.0001.jpg_2K_202609022240.jpeg',
    originalUrl: '/img/ANTES Y DESPUES/LA 45/DAP-F-04-63273.0001.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/LA 45/DAP-F-04-63273.0001.jpg_2K_202609022240.jpeg',
    author: 'Archivo DAP / Restauración 2K',
    collectionName: 'Antes y Después',
    description: 'Registro patrimonial DAP-F-04-63273 del dinamismo comercial de la 45, procesado a 2K con notable recuperación de carteles comerciales, líneas de cables y transeúntes.',
    tags: ['la 45', 'comercio', 'calle', 'restauración 2k', 'antes y después'],
    isBeforeAfter: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-la45-pendiente',
    title: 'La 45 y la Pendiente de Manrique',
    location: 'Carrera 45 con Calle 72, Manrique',
    year: 'c. 1958',
    imageUrl: '/img/ANTES Y DESPUES/LA 45/Captura_de_pantalla_2026-08-10_211821.png_202609021037.jpeg',
    originalUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 211821.png',
    restoredUrl: '/img/ANTES Y DESPUES/LA 45/Captura_de_pantalla_2026-08-10_211821.png_202609021037.jpeg',
    author: 'Archivo Comunitario / Restauración 2K',
    collectionName: 'Antes y Después',
    description: 'La pronunciada pendiente topográfica de Manrique a lo largo de la 45, realzada en alta definición 2K para apreciar la hilera de casas y el tendido urbano.',
    tags: ['la 45', 'pendiente', 'urbanismo', 'restauración 2k', 'antes y después'],
    isBeforeAfter: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-manrique-panoramica',
    title: 'Panorámica de Manrique y sus Colinas',
    location: 'Comuna 3, Manrique',
    year: 'c. 1955',
    imageUrl: '/img/ANTES Y DESPUES/MANRIQUE/104984791_10157514176532711_8589110590739892379_n.jpg_2K_202609011226.jpeg',
    originalUrl: '/img/ANTES Y DESPUES/MANRIQUE/104984791_10157514176532711_8589110590739892379_n.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/MANRIQUE/104984791_10157514176532711_8589110590739892379_n.jpg_2K_202609011226.jpeg',
    author: 'Archivo Histórico / Restauración 2K',
    collectionName: 'Antes y Después',
    description: 'Vista panorámica del poblamiento inicial sobre las colinas orientales, con reconstrucción digital 2K de cubiertas, senderos y vegetación nativa.',
    tags: ['panorámica', 'colinas', 'ladera', 'restauración 2k', 'antes y después'],
    isBeforeAfter: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-manrique-viviendas',
    title: 'Casas Tradicionales y Vida de Barrio',
    location: 'Sector Central, Manrique',
    year: 'c. 1962',
    imageUrl: '/img/ANTES Y DESPUES/MANRIQUE/Captura_de_pantalla_2026-08-10_210824.png_202609012311.jpeg',
    originalUrl: '/img/ANTES Y DESPUES/MANRIQUE/Captura de pantalla 2026-08-10 210824.png',
    restoredUrl: '/img/ANTES Y DESPUES/MANRIQUE/Captura_de_pantalla_2026-08-10_210824.png_202609012311.jpeg',
    author: 'Archivo Comunitario / Restauración 2K',
    collectionName: 'Antes y Después',
    description: 'Las típicas viviendas de bahareque y teja de barro que flanqueaban las calles de Manrique, restauradas con textura nítida de muros y carpintería.',
    tags: ['vivienda', 'barrio', 'arquitectura', 'restauración 2k', 'antes y después'],
    isBeforeAfter: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-iglesia-panoramica',
    title: 'Templo del Señor de las Misericordias y Serranía',
    location: 'Parroquia Señor de las Misericordias, Manrique',
    year: 'c. 1948',
    imageUrl: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/Panorámica vintage de iglesia gótica y pueblo serrano.png',
    originalUrl: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/memoria visual de medellin eerr.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/Panorámica vintage de iglesia gótica y pueblo serrano.png',
    author: 'Memoria Visual de Medellín / Recreación Paisajística IA',
    collectionName: 'Antes y Después',
    description: 'La silueta inconfundible del templo neogótico elevándose sobre las faldas verdes de la cordillera oriental de Medellín, reinterpretada en paleta pictórica y cromática fiel a su geografía.',
    tags: ['iglesia', 'misericordias', 'neogótico', 'recreación ia', 'antes y después'],
    isBeforeAfter: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ad-iglesia-gotica',
    title: 'Templo Neogótico bajo la Montaña',
    location: 'Manrique Oriental',
    year: 'c. 1952',
    imageUrl: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/Iglesia gótica bajo la montaña.png',
    originalUrl: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/473777221_10170971042745247_6880941470456618617_n.jpg',
    restoredUrl: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/Iglesia gótica bajo la montaña.png',
    author: 'Archivo Comunitario / Recreación IA',
    collectionName: 'Antes y Después',
    description: 'La aguja gótica y los vitrales del templo contrastados con la ladera nororiental, integrando el registro fotográfico original y la versión colorizada.',
    tags: ['iglesia', 'arquitectura', 'patrimonio', 'recreación ia', 'antes y después'],
    isBeforeAfter: true,
    createdAt: new Date().toISOString()
  },

  // =========================================================================
  // --- COLECCIÓN 2: CORPORACIÓN CULTURAL VIZTAZ (7 Fotos Patrimoniales) ---
  // =========================================================================
  {
    id: 'viztaz-1',
    title: 'Cocina tradicional y saberes cotidianos',
    location: 'Manrique, Medellín',
    year: 'c. 1950',
    imageUrl: '/img/FOTOS VIZTAZ/2700198-me.jpg',
    author: 'Corporación Cultural Viztaz',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Registro de la cotidianidad doméstica en Manrique: mujer mayor en cocina tradicional con molino manual, estufa de época y utensilios colgados.',
    tags: ['cocina', 'cotidiano', 'hogar', 'saberes', 'gastronomía'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'viztaz-2',
    title: 'Retrato de juventud y vestidos de época',
    location: 'Manrique, Medellín',
    year: 'c. 1955',
    imageUrl: '/img/FOTOS VIZTAZ/2700864.jpg',
    author: 'Corporación Cultural Viztaz',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Retrato de dos jóvenes mujeres vestidas con trajes de cuadros y lazos tradicionales en el interior de una residencia de Manrique.',
    tags: ['juventud', 'moda', 'retrato', 'familia', 'vida cotidiana'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'viztaz-3',
    title: 'Encuentro en el umbral del barrio',
    location: 'La 45, Manrique',
    year: 'c. 1950',
    imageUrl: '/img/FOTOS VIZTAZ/2700968-me.jpg',
    author: 'Corporación Cultural Viztaz',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Pareja en el acceso de una edificación barrial con rejas metálicas tradicionales; ella en las escalas y él con tirantes de época.',
    tags: ['pareja', 'calle', 'arquitectura', 'vida de barrio', 'moda'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'viztaz-4',
    title: 'Esquina comercial Unión Total y La Sonora',
    location: 'Carrera 45 con calle comercial, Manrique',
    year: 'c. 1955',
    imageUrl: '/img/FOTOS VIZTAZ/2701047-me.jpg',
    author: 'Corporación Cultural Viztaz',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Esquina comercial de dos pisos con tejado de barro, toldo de Unión Total, letrero de La Sonora, peatones y alumbrado público característico.',
    tags: ['comercio', 'La 45', 'arquitectura', 'esquinas', 'urbanismo'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'viztaz-5',
    title: 'Hogar, sala y vida cotidiana',
    location: 'Manrique, Medellín',
    year: 'c. 1960',
    imageUrl: '/img/FOTOS VIZTAZ/2702158-me.jpg',
    author: 'Corporación Cultural Viztaz',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Hombre sentado en un sillón clásico en el interior de una residencia de Manrique, rodeado de objetos familiares, radio y teléfono de época.',
    tags: ['hogar', 'interior', 'muebles', 'cotidianidad', 'familia'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'viztaz-6',
    title: 'Patio familiar y retrato generacional',
    location: 'Manrique, Medellín',
    year: 'c. 1958',
    imageUrl: '/img/FOTOS VIZTAZ/2702218.jpg',
    author: 'Corporación Cultural Viztaz',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Retrato de familia reunida en el patio embaldosado de una casa de Manrique, mostrando abuelos, hijos y nietos compartiendo el hogar.',
    tags: ['familia', 'patio', 'generaciones', 'niños', 'tradición'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'viztaz-7',
    title: 'Infancia y juego en el patio interior',
    location: 'Manrique, Medellín',
    year: 'c. 1962',
    imageUrl: '/img/FOTOS VIZTAZ/2704070.jpg',
    author: 'Corporación Cultural Viztaz',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Grupo de niños y familiares en el patio interior de arquitectura doméstica clásica con plantas ornamentales y baldosín decorado.',
    tags: ['infancia', 'juego', 'patio', 'arquitectura doméstica', 'convivencia'],
    createdAt: new Date().toISOString()
  },

  // =========================================================================
  // --- COLECCIÓN 3: BIBLIOTECA PÚBLICA PILOTO (11 Fotografías Históricas) ---
  // =========================================================================
  {
    id: 'bpp-1',
    title: 'Construcción y trazado de la Carrera 45',
    location: 'Carrera 45, Manrique',
    year: '1945',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 210431.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Apertura de la vía principal que transformó a Manrique en un eje de conexión fundamental con el centro de Medellín.',
    tags: ['carrera 45', 'infraestructura', 'urbanismo'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'bpp-2',
    title: 'Primeras viviendas y laderas de Manrique',
    location: 'Manrique Oriental',
    year: '1950',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 210542.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Asentamientos iniciales en la ladera nororiental, caracterizados por la autoconstrucción y los convites comunitarios.',
    tags: ['vivienda', 'convites', 'ladera'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'bpp-3',
    title: 'El Tranvía en Manrique',
    location: 'Estación Manrique',
    year: '1948',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 210627.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'El histórico tranvía eléctrico que conectaba a los habitantes con la dinámica económica del Valle de Aburrá.',
    tags: ['transporte', 'tranvía', 'movilidad'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'bpp-4',
    title: 'Comercio tradicional y vida de barrio',
    location: 'Calle central, Manrique',
    year: '1955',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 210709.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Tiendas de abarrotes, sastrerías y cafeterías que consolidaron el tejido económico y social del vecindario.',
    tags: ['comercio', 'oficios', 'cotidianidad'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'bpp-5',
    title: 'Encuentro vecinal y espacio público',
    location: 'Sector Central',
    year: '1960',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 210743.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Las esquinas y aceras como epicentro de tertulia, música de carrilera y tango en la vida cotidiana de Manrique.',
    tags: ['comunidad', 'espacio público', 'tertulia'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'bpp-6',
    title: 'Arquitectura de las primeras casas',
    location: 'Manrique Central',
    year: '1952',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 210824.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Fachadas en tapia y teja de barro que dieron identidad a los primeros barrios de la comuna 3.',
    tags: ['arquitectura', 'patrimonio', 'vivienda'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'bpp-7',
    title: 'Panorámica de la comuna en expansión',
    location: 'Sector Las Granjas',
    year: '1965',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 211238.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Crecimiento demográfico acelerado y ocupación progresiva de las colinas de Medellín a mediados del siglo XX.',
    tags: ['panorámica', 'demografía', 'territorio'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'bpp-8',
    title: 'Templo Parroquial y plaza',
    location: 'Plaza de Manrique',
    year: '1958',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 211441.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'El templo como núcleo articulador espiritual, comunitario y de las celebraciones patronales del barrio.',
    tags: ['iglesia', 'patrimonio', 'plaza'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'bpp-9',
    title: 'El bullicio de la Carrera 45',
    location: 'Carrera 45 con Calle 72',
    year: '1962',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 211821.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Buses escalonados, peatones y el ritmo comercial incesante que inmortalizó el espíritu tanguero de Manrique.',
    tags: ['carrera 45', 'transporte', 'comercio'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'bpp-10',
    title: 'Infancia y juegos en la calle',
    location: 'Manrique Oriental',
    year: '1968',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 212235.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Los niños jugando trompo y fútbol en calles sin pavimentar, testimonio de la vida comunitaria y libre de la época.',
    tags: ['infancia', 'juegos', 'cotidianidad'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'bpp-11',
    title: 'Transformación del paisaje barrial',
    location: 'Manrique',
    year: '1970',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 212425.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Perspectiva histórica y dinámica de la comunidad organizada construyendo acueductos comunitarios y vías de acceso.',
    tags: ['paisaje', 'comunidad', 'acueducto'],
    createdAt: new Date().toISOString()
  }
];

async function seed() {
  console.log('Seeding photographs in Firestore...');
  const colRef = collection(db, 'photographs');
  
  // Clean existing
  const snap = await getDocs(colRef);
  console.log(`Clearing ${snap.size} existing photographs...`);
  for (const docSnap of snap.docs) {
    await deleteDoc(doc(db, 'photographs', docSnap.id));
  }

  // Batch insert
  const batch = writeBatch(db);
  for (const photo of ALL_PHOTOS) {
    const docRef = doc(db, 'photographs', photo.id);
    batch.set(docRef, photo);
  }

  await batch.commit();
  console.log(`Successfully seeded ${ALL_PHOTOS.length} photographs into Firestore!`);
  console.log('- 11 Fotos con Comparador Antes y Después');
  console.log('- 7 Fotos de Corporación Cultural Viztaz');
  console.log('- 11 Fotos de Biblioteca Pública Piloto');
  process.exit(0);
}

seed().catch(err => {
  console.error('Error seeding photos:', err);
  process.exit(1);
});
