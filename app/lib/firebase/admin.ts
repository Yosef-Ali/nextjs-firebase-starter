import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Ensure this file is only used on the server side
if (typeof window !== 'undefined') {
  throw new Error('This file should only be used on the server side');
}

function getFirebaseAdminApp() {
  const apps = getApps();
  
  if (!apps.length) {
    return initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }

  return apps[0];
}

export const adminAuth = getAuth(getFirebaseAdminApp()); 