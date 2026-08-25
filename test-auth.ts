import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const auth = getAuth(app);

async function test() {
  try {
    await signInAnonymously(auth);
    console.log("Anonymous auth works");
  } catch (e) {
    console.log("Anonymous auth failed:", e.message);
  }
  
  try {
    await createUserWithEmailAndPassword(auth, 'test@example.com', 'password123');
    console.log("Email auth (create) works");
  } catch (e) {
    console.log("Email auth (create) failed:", e.message);
  }
}
test();
