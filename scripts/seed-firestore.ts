import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = initializeApp(configData);
const db = getFirestore(app, configData.firestoreDatabaseId);

const WORKSHOPS = [
  {
    title: 'Taller 1: "Restaurando el pasado"',
    description: 'Aprenderán a digitalizar y restaurar fotografías antiguas propias o familiares usando herramientas gratuitas en computador y celular. Animarán fotografías de sus propios familiares o de figuras barriales históricas.',
    date: 'Taller de 4 horas',
    time: 'Grupos 15-20 personas',
    location: 'Comuna 3, Manrique',
    materials: ['Computador o celular', 'Fotografías antiguas'],
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2940&auto=format&fit=crop',
    createdAt: new Date()
  },
  {
    title: 'Taller 2: "Nuestro Manrique Animado"',
    description: 'Taller integrador donde cada participante producirá una pequeña pieza de 30 a 60 segundos con fotografías del barrio editadas en programas de edición gratuitos, que serán exhibidas en la muestra de resultados final.',
    date: 'Taller de 4 horas',
    time: 'Grupos 15-20 personas',
    location: 'Comuna 3, Manrique',
    materials: ['Computador o celular', 'Fotografías restauradas'],
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop',
    createdAt: new Date()
  }
];

async function seed() {
  console.log('Seeding Database...');
  const batch = writeBatch(db);

  WORKSHOPS.forEach(ws => {
    const docRef = doc(collection(db, 'workshops'));
    batch.set(docRef, ws);
  });

  await batch.commit();
  console.log('Successfully seeded database!');
}

seed().catch(console.error);
