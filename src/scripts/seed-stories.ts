import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = initializeApp(configData);
const db = getFirestore(app, configData.firestoreDatabaseId);

export const STORIES_DATA = [
  {
    id: 'etel-memoria-barrio',
    authorId: 'Doña Etel',
    title: 'La memoria viva de las esquinas',
    audioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/ETEL.mp3',
    duration: '09:30',
    tags: ['Familia', 'Convivencia', 'Tradición oral', 'Años 60'],
    content: 'Doña Etel revive los primeros años en Manrique, la crianza de los hijos, la unión entre familias vecinas y cómo los patios y aceras se convertían en espacios donde se compartía el sancocho, la música y las conversaciones de la tarde.',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20211238.png',
    isPublished: true,
    createdAt: new Date()
  },
  {
    id: 'gustavo-transporte-45',
    authorId: 'Don Gustavo',
    title: 'La 45 y los oficios del barrio',
    audioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/GUSTAVO.mp3',
    duration: '09:34',
    tags: ['Transporte', 'La 45', 'Oficios', 'Años 70'],
    content: 'Don Gustavo relata la transformación del transporte en la Carrera 45, la llegada de los primeros colectivos y buses de escalera, y la evolución del comercio y los talleres que le dieron vida a las calles de Manrique.',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20210743.png',
    isPublished: true,
    createdAt: new Date()
  },
  {
    id: 'marta-convites-comunidad',
    authorId: 'Doña Marta',
    title: 'La construcción comunitaria y los convites',
    audioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/MARTA.mp3',
    duration: '07:12',
    tags: ['Convites', 'Agua', 'Solidaridad', 'Fundación'],
    content: 'Doña Marta recuerda con emoción las jornadas de convite cuando los vecinos se organizaban en cuadrillas para subir materiales a lomo y a brazo, trayendo el agua y levantando juntos los cimientos de sus propios hogares.',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20212607.png',
    isPublished: true,
    createdAt: new Date()
  },
  {
    id: 'oscar-tango-bohemia',
    authorId: 'Don Óscar',
    title: 'Tango, bohemia y juventud en Manrique',
    audioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/OSCAR.mp3',
    duration: '08:39',
    tags: ['Tango', 'Cultura', 'Juventud', 'Bohemia'],
    content: 'Don Óscar recorre los cafés y billares de la época dorada del tango en Manrique, las anécdotas de juventud, la llegada de los fonógrafos y la identidad apasionada y musical que definió para siempre al barrio.',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/fotos_piloto/Captura%20de%20pantalla%202026-08-10%20210542.png',
    isPublished: true,
    createdAt: new Date()
  }
];

async function updateStories() {
  console.log('Actualizando historias con los audios de GitHub...');
  for (const story of STORIES_DATA) {
    const docRef = doc(db, 'stories', story.id);
    await setDoc(docRef, story, { merge: true });
    console.log(`Guardada historia: ${story.authorId} - ${story.title}`);
  }
  console.log('¡Historias actualizadas con éxito!');
  process.exit(0);
}

updateStories().catch(err => {
  console.error('Error al actualizar historias:', err);
  process.exit(1);
});
