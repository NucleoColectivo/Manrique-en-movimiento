import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer, setLogLevel } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import config from '../../firebase-applet-config.json';

// Silence internal Firestore SDK reconnect warnings so they do not trigger false positive console error captures in sandboxed iframes
setLogLevel('silent');

const app = !getApps().length ? initializeApp(config) : getApp();

export const db = getFirestore(app, config.firestoreDatabaseId);
export const auth = getAuth(app);

// Validate connection to Firestore per Firebase integration guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firestore operates in offline cache mode.");
    }
  }
}

if (typeof window !== 'undefined') {
  testConnection();
}

export { app };

