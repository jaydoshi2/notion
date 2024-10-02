import { initializeApp, getApps, App, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Parse the SERVICE_JSON from environment variables
const serviceJSON = JSON.parse(process.env.SERVICE_JSON || '{}');

let app: App;

if (getApps().length === 0) {
    app = initializeApp({
        credential: cert(serviceJSON), // Use the parsed JSON object
    });
} else {
    app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
