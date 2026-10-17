import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = initializeApp(configData);
const db = getFirestore(app, configData.firestoreDatabaseId);

const BPP_PHOTOS = [
  {
    id: 'bpp-1',
    title: 'Construcción y trazado de la Carrera 45',
    location: 'Carrera 45, Manrique',
    year: '1945',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 210431.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Apertura de la vía principal que transformó a Manrique en un eje de conexión fundamental con el centro de Medellín.',
    tags: ['carrera 45', 'infraestructura', 'urbanismo']
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
    tags: ['vivienda', 'convites', 'ladera']
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
    tags: ['transporte', 'tranvía', 'movilidad']
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
    tags: ['comercio', 'oficios', 'cotidianidad']
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
    tags: ['comunidad', 'espacio público', 'tertulia']
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
    tags: ['arquitectura', 'patrimonio', 'vivienda']
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
    tags: ['panorámica', 'demografía', 'territorio']
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
    tags: ['iglesia', 'patrimonio', 'plaza']
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
    tags: ['carrera 45', 'transporte', 'comercio']
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
    tags: ['infancia', 'juegos', 'cotidianidad']
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
    tags: ['paisaje', 'comunidad', 'acueducto']
  },
  {
    id: 'bpp-12',
    title: 'Esquinas y vida cotidiana en Manrique',
    location: 'Manrique',
    year: '1965',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 212544.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Encuentro barrial en la esquina, peatones y dinámica comercial tradicional de la comuna.',
    tags: ['esquinas', 'comunidad', 'cotidianidad']
  },
  {
    id: 'bpp-13',
    title: 'Fachada y entorno del Cine Teatro Manrique',
    location: 'Carrera 45, Manrique',
    year: '1955',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 212607.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Registro histórico de la fachada original del emblemático Cine Teatro Manrique, hito del encuentro barrial.',
    tags: ['teatro', 'cine manrique', 'patrimonio']
  },
  {
    id: 'bpp-14',
    title: 'Calles tradicionales y arquitectura de tapia',
    location: 'Manrique Central',
    year: '1958',
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 212904.png',
    author: 'Biblioteca Pública Piloto',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Casas de tapia y calles empinadas en los primeros años de consolidación barrial.',
    tags: ['arquitectura', 'calles', 'vivienda']
  },
  {
    id: 'bpp-15',
    title: 'Trazado urbano y ladera de Manrique (DAP 63270)',
    location: 'Manrique, Medellín',
    year: '1946',
    imageUrl: '/img/fotos_piloto/DAP-F-04-63270.0001.jpg',
    author: 'Biblioteca Pública Piloto / DAP',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Vista técnica y patrimonial del Archivo Histórico Medellín / Biblioteca Pública Piloto sobre la apertura de vías en la ladera.',
    tags: ['archivo dap', 'urbanismo', 'ladera']
  },
  {
    id: 'bpp-16',
    title: 'La 45 y el transporte colectivo (DAP 63276)',
    location: 'Carrera 45, Manrique',
    year: '1952',
    imageUrl: '/img/fotos_piloto/DAP-F-04-63276.0001.jpg',
    author: 'Biblioteca Pública Piloto / DAP',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Primeros buses de escalera y colectivos transitando por la Carrera 45 en ascenso.',
    tags: ['carrera 45', 'transporte', 'archivo dap']
  },
  {
    id: 'bpp-17',
    title: 'Fachada comercial y vida de barrio (DAP 63287)',
    location: 'Manrique',
    year: '1954',
    imageUrl: '/img/fotos_piloto/DAP-F-04-63287.0001.jpg',
    author: 'Biblioteca Pública Piloto / DAP',
    collectionName: 'Biblioteca Pública Piloto',
    description: 'Locales comerciales, billares y sastrerías de la época dorada de Manrique.',
    tags: ['comercio', 'oficios', 'archivo dap']
  }
];

async function seedBpp() {
  console.log('Seeding Biblioteca Piloto photos to Firestore...');
  for (const photo of BPP_PHOTOS) {
    const docRef = doc(db, 'photographs', photo.id);
    await setDoc(docRef, { ...photo, updatedAt: new Date().toISOString() }, { merge: true });
    console.log(`Updated ${photo.id}: ${photo.title}`);
  }
  console.log('Done seeding BPP photos!');
  process.exit(0);
}

seedBpp().catch(err => {
  console.error('Error seeding BPP photos:', err);
  process.exit(1);
});
