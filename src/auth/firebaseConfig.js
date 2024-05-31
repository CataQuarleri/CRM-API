// Import the functions you need from the SDKs you need
import admin from "firebase-admin";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey:     process.env.FIREBASE_PRIVATE_KEY &&
  process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  clientId: process.env.FIREBASE_CLIENT_ID,
  authUri: process.env.FIREBASE_AUTH_URI,
  tokenUri: process.env.FIREBASE_TOKEN_URI,
  authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_x509_CERT_URL,
  clientX509CertUrl: process.env.FIREBASE_CLIENT_x509_CERT_URL,

  // apiKey: process.env.FIREBASE_APIKEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const firebase = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig)
});

export default {
  auth: firebase.auth()
};