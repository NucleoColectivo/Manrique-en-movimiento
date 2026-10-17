import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = initializeApp(configData);
const db = getFirestore(app, configData.firestoreDatabaseId);

export const MANRIQUE_LOCATIONS = [
  {
    id: 'teatro-manrique',
    title: 'Cine Teatro Manrique',
    category: 'Cultura y Cine',
    year: '1955',
    lat: 6.2735,
    lng: -75.5522,
    imageUrl: '/img/ANTES Y DESPUES/TEATRO MANRIQUE 1/Captura_de_pantalla_2026-08-10_212607.png_202609021941.jpeg',
    description: 'Emblemático templo cinematográfico y cultural de la Comuna 3. Espacio donde generaciones de familias de Manrique compartieron matinés, cine mexicano y noches de tango sobre La 45.',
    address: 'Carrera 45 con Calle 72, Manrique Central'
  },
  {
    id: 'senor-misericordias',
    title: 'Templo Señor de las Misericordias',
    category: 'Patrimonio Arquitectónico',
    year: '1940',
    lat: 6.2690,
    lng: -75.5542,
    imageUrl: '/img/ANTES Y DESPUES/IGLESIA SEÑOR D ELAS MISERICORDIAS 2/Iglesia gótica bajo la montaña.png',
    description: 'Monumento neogótico y epicentro espiritual del barrio. Su esbelta aguja y rosetones se recortan con fuerza frente al paisaje andino de la ladera nororiental.',
    address: 'Calle 67 con Carrera 44, Manrique'
  },
  {
    id: 'la45-tranvia',
    title: 'Carrera 45 y el Tranvía Histórico',
    category: 'Transporte y Memoria',
    year: '1948',
    lat: 6.2710,
    lng: -75.5535,
    imageUrl: '/img/ANTES Y DESPUES/LA 45/DAP-F-04-63273.0001.jpg_2K_202609022240.jpeg',
    description: 'La gran arteria urbana de Manrique. Vía por donde subía el histórico tranvía eléctrico municipal conectando a la comunidad obrera con el centro de Medellín.',
    address: 'Carrera 45 con Calle 69'
  },
  {
    id: 'esquina-sonora',
    title: 'Esquina Comercial La Sonora y Unión Total',
    category: 'Comercio Tradicional',
    year: '1955',
    lat: 6.2725,
    lng: -75.5530,
    imageUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2701047-me-restaurada.png',
    description: 'Edificación patrimonial de dos pisos en esquina con techumbre de barro, toldo de Unión Total y aviso de La Sonora. Archivo histórico Corporación Cultural Viztaz.',
    address: 'Carrera 45 con Calle 71, Manrique'
  },
  {
    id: 'casa-gardeliana',
    title: 'Casa Gardeliana y Ruta del Tango',
    category: 'Música y Tango',
    year: '1972',
    lat: 6.2748,
    lng: -75.5518,
    imageUrl: '/img/fotos_piloto/Captura de pantalla 2026-08-10 211821.png',
    description: 'Fundada por Leonardo Nieto en la Carrera 45; monumento vivo a Carlos Gardel y sede de la gran tradición tanguera que define la identidad sonora de Manrique.',
    address: 'Carrera 45 # 73-27, Manrique Central'
  },
  {
    id: 'casa-cultura-talleres',
    title: 'Casa de la Cultura de Manrique',
    category: 'Proceso Comunitario',
    year: '2026',
    lat: 6.2715,
    lng: -75.5510,
    imageUrl: '/img/talleres/C537-004 FOTO 11.jpeg',
    description: 'Sede comunitaria de los Talleres de Memoria, Creatividad e Inteligencia Artificial. Espacio de co-creación intergeneracional donde vecinos y jóvenes restauraron sus archivos familiares.',
    address: 'Calle 69 # 44-30, Manrique'
  },
  {
    id: 'palos-verdes-esso',
    title: 'Estación Esso Palos Verdes',
    category: 'Transporte y Territorio',
    year: '1958',
    lat: 6.2665,
    lng: -75.5558,
    imageUrl: '/img/ANTES Y DESPUES/PALOS VERDES/Estación Esso entre colinas mediterráneas.png',
    description: 'Punto neurálgico en el sector de Palos Verdes donde confluían los buses de escalera, taxis y las primeras rutas que ascendían hacia las partes altas de la comuna.',
    address: 'Carrera 45 con Calle 66, Sector Palos Verdes'
  },
  {
    id: 'cocina-tradicional-abuela',
    title: 'Cocina Tradicional y Saberes de las Abuelas',
    category: 'Vida Cotidiana',
    year: '1950',
    lat: 6.2760,
    lng: -75.5485,
    imageUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2700198-me-restaurada.png',
    description: 'Registro doméstico de la cotidianidad barrial: mujer mayor moliendo maíz en fogón tradicional. Homenaje a la gastronomía familiar y a las pioneras del barrio.',
    address: 'Sector Manrique Oriental'
  },
  {
    id: 'patio-ajedrezado',
    title: 'Patio Familiar y Encuentro Generacional',
    category: 'Arquitectura Doméstica',
    year: '1958',
    lat: 6.2700,
    lng: -75.5492,
    imageUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2702218-restaurada.png',
    description: 'Arquitectura doméstica clásica con piso en ajedrez. Lugar de encuentro donde abuelos, hijos y nietos compartían historias y organizaban los convites barriales.',
    address: 'Sector Las Esmeraldas / Manrique'
  },
  {
    id: 'comfama-manrique',
    title: 'Comfama Manrique y Vida Barrial',
    category: 'Encuentro Vecinal',
    year: '1965',
    lat: 6.2785,
    lng: -75.5502,
    imageUrl: '/img/ANTES Y DESPUES/COMFAMA/Escena urbana vintage frente a Comfama.png',
    description: 'Espacio de recreación, encuentro deportivo y formación que dinamizó el tejido social en la zona alta de la comuna durante décadas.',
    address: 'Carrera 45 con Calle 79, Manrique'
  }
];

async function seedLocations() {
  console.log('Seeding authentic Manrique locations to Firestore...');
  
  // Clean old dummy locations
  const oldSnap = await getDocs(collection(db, 'locations'));
  for (const docSnap of oldSnap.docs) {
    if (!MANRIQUE_LOCATIONS.some(l => l.id === docSnap.id)) {
      await deleteDoc(doc(db, 'locations', docSnap.id));
      console.log(`Removed obsolete location: ${docSnap.id}`);
    }
  }

  // Insert authentic project locations
  for (const loc of MANRIQUE_LOCATIONS) {
    await setDoc(doc(db, 'locations', loc.id), {
      ...loc,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log(`Saved location: ${loc.id} - ${loc.title}`);
  }

  console.log('Done seeding Manrique map locations!');
  process.exit(0);
}

seedLocations().catch(err => {
  console.error('Error seeding locations:', err);
  process.exit(1);
});
