import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = initializeApp(configData);
const db = getFirestore(app, configData.firestoreDatabaseId);

async function list() {
  const snap = await getDocs(collection(db, 'photographs'));
  snap.forEach(doc => console.log(doc.id, doc.data().title, doc.data().imageUrl));
}

list().catch(console.error);
