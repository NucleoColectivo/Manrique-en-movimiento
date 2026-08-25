import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = initializeApp(configData);
const db = getFirestore(app, configData.firestoreDatabaseId);

const PHOTOS = [
  {
    title: 'Construcción Parroquia',
    year: '1968',
    location: 'Manrique Central',
    author: 'Familia Salazar',
    tags: ['Arquitectura', 'Religión'],
    imageUrl: 'https://images.unsplash.com/photo-1548625361-ec859c25f4a2?q=80&w=2940&auto=format&fit=crop', // A different working vintage URL
    originalUrl: 'https://images.unsplash.com/photo-1548625361-ec859c25f4a2?q=80&w=2940&auto=format&fit=crop',
    createdAt: new Date()
  },
  {
    title: 'Fiestas del barrio',
    year: '1985',
    location: 'Cancha La González',
    author: 'Anónimo',
    tags: ['Celebración', 'Comunidad'],
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2940&auto=format&fit=crop', // Better URL
    originalUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2940&auto=format&fit=crop',
    createdAt: new Date()
  },
  {
    title: 'Primeros buses',
    year: '1972',
    location: 'La 45',
    author: 'Don Luis (Conductor)',
    tags: ['Transporte', 'Calles'],
    imageUrl: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2940&auto=format&fit=crop',
    originalUrl: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2940&auto=format&fit=crop',
    createdAt: new Date()
  }
];

async function seed() {
  console.log('Seeding Photographs...');
  const batch = writeBatch(db);

  PHOTOS.forEach(photo => {
    const docRef = doc(collection(db, 'photographs'));
    batch.set(docRef, photo);
  });

  await batch.commit();
  console.log('Successfully seeded photographs!');
}

seed().catch(console.error);
