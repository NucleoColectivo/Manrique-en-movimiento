import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = initializeApp(configData);
const db = getFirestore(app, configData.firestoreDatabaseId);

const VIZTAZ_PHOTOS = [
  {
    id: 'viztaz-1',
    title: 'Cocina tradicional y saberes cotidianos (Abuela)',
    location: 'Manrique, Medellín',
    year: 'c. 1950',
    imageUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2700198-me-restaurada.png',
    originalUrl: '/img/FOTOS VIZTAZ/2700198-me.jpg',
    restoredUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2700198-me-restaurada.png',
    author: 'Corporación Cultural Viztaz / Restauración IA',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Registro de la cotidianidad doméstica en Manrique: mujer mayor preparando alimentos en estufa clásica de la época, con molino manual para maíz y utensilios de cocina tradicionales. La restauración recupera la textura del metal, los contrastes de luz en la cocina y la calidez del momento íntimo.',
    tags: ['cocina', 'cotidiano', 'hogar', 'saberes', 'gastronomía', 'restauración ia', 'antes y después'],
    isBeforeAfter: true,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'viztaz-2',
    title: 'Retrato de juventud y vestidos de época (Dos Jóvenes)',
    location: 'Manrique, Medellín',
    year: 'c. 1955',
    imageUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2700864-restaurada.png',
    originalUrl: '/img/FOTOS VIZTAZ/2700864.jpg',
    restoredUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2700864-restaurada.png',
    author: 'Corporación Cultural Viztaz / Restauración IA',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Retrato de dos jóvenes mujeres vestidas con trajes de cuadros y lazos tradicionales en el interior de una residencia de Manrique. La restauración digital clarifica el estampado de las telas, los peinados y la expresión afectiva de las hermanas.',
    tags: ['juventud', 'moda', 'retrato', 'familia', 'vida cotidiana', 'restauración ia', 'antes y después'],
    isBeforeAfter: true,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'viztaz-3',
    title: 'Encuentro en el umbral del barrio (Pareja en la puerta)',
    location: 'La 45, Manrique',
    year: 'c. 1950',
    imageUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2700968-me-restaurada.png',
    originalUrl: '/img/FOTOS VIZTAZ/2700968-me.jpg',
    restoredUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2700968-me-restaurada.png',
    author: 'Corporación Cultural Viztaz / Restauración IA',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Pareja en el acceso de una edificación barrial con rejas metálicas tradicionales; ella en las escalas y él con tirantes de época. La restauración devuelve nitidez al revoque rústico de la pared, las texturas de la ropa y la profundidad del portal.',
    tags: ['pareja', 'calle', 'arquitectura', 'vida de barrio', 'moda', 'restauración ia', 'antes y después'],
    isBeforeAfter: true,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'viztaz-4',
    title: 'Esquina comercial Unión Total y La Sonora',
    location: 'Carrera 45 con calle comercial, Manrique',
    year: 'c. 1955',
    imageUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2701047-me-restaurada.png',
    originalUrl: '/img/FOTOS VIZTAZ/2701047-me.jpg',
    restoredUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2701047-me-restaurada.png',
    author: 'Corporación Cultural Viztaz / Restauración IA',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Esquina comercial de dos pisos con tejado de barro, toldo de Unión Total, letrero de La Sonora, peatones y alumbrado público característico. La versión restaurada resalta la tipografía de los anuncios comerciales, el tejado de barro cocido y el dinamismo peatonal de la 45.',
    tags: ['comercio', 'la 45', 'arquitectura', 'esquinas', 'urbanismo', 'restauración ia', 'antes y después'],
    isBeforeAfter: true,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'viztaz-5',
    title: 'Hogar, sala y vida cotidiana (Retrato familiar)',
    location: 'Manrique, Medellín',
    year: 'c. 1960',
    imageUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2702158-me-restaurada.png',
    originalUrl: '/img/FOTOS VIZTAZ/2702158-me.jpg',
    restoredUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2702158-me-restaurada.png',
    author: 'Corporación Cultural Viztaz / Restauración IA',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Hombre sentado en un sillón clásico en el interior de una vivienda familiar, con radio, teléfono antiguo y decoración hogareña de mediados del siglo XX. La restauración enfatiza la iluminación ambiental, la textura de la tapicería y los detalles de los aparatos domésticos.',
    tags: ['hogar', 'interior', 'muebles', 'cotidianidad', 'familia', 'restauración ia', 'antes y después'],
    isBeforeAfter: true,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'viztaz-6',
    title: 'Patio familiar y retrato generacional (Patio ajedrezado)',
    location: 'Manrique, Medellín',
    year: 'c. 1958',
    imageUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2702218-restaurada.png',
    originalUrl: '/img/FOTOS VIZTAZ/2702218.jpg',
    restoredUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2702218-restaurada.png',
    author: 'Corporación Cultural Viztaz / Restauración IA',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Retrato de familia reunida en el patio embaldosado de una casa tradicional de Manrique, mostrando varias generaciones y plantas de jardín. La restauración permite apreciar los patrones del suelo ajedrezado, los rostros de niños y adultos y la vegetación del patio.',
    tags: ['familia', 'patio', 'generaciones', 'niños', 'tradición', 'restauración ia', 'antes y después'],
    isBeforeAfter: true,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'viztaz-7',
    title: 'Infancia y juego en el patio interior (Porche)',
    location: 'Manrique, Medellín',
    year: 'c. 1962',
    imageUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2704070-restaurada.png',
    originalUrl: '/img/FOTOS VIZTAZ/2704070.jpg',
    restoredUrl: '/img/FOTOS VIZTAZ/RESTAURADAS/2704070-restaurada.png',
    author: 'Corporación Cultural Viztaz / Restauración IA',
    collectionName: 'Corporación Cultural Viztaz',
    description: 'Grupo de niños y familiares compartiendo una tarde en el porche y patio interior con piso de baldosín decorado y arquitectura doméstica clásica. La restauración digital realza la calidez de las sonrisas infantiles, la ropa de época y los detalles ornamentales de la casa.',
    tags: ['infancia', 'juego', 'patio', 'arquitectura doméstica', 'convivencia', 'restauración ia', 'antes y después'],
    isBeforeAfter: true,
    updatedAt: new Date().toISOString()
  }
];

async function seedViztaz() {
  console.log('Seeding Viztaz restored photographs to Firestore...');
  for (const photo of VIZTAZ_PHOTOS) {
    const docRef = doc(db, 'photographs', photo.id);
    await setDoc(docRef, photo, { merge: true });
    console.log(`Updated photo: ${photo.id} - ${photo.title} (with restoredUrl & isBeforeAfter: true)`);
  }
  console.log('Seeding completed successfully!');
  process.exit(0);
}

seedViztaz().catch(err => {
  console.error('Error seeding Viztaz photos:', err);
  process.exit(1);
});
