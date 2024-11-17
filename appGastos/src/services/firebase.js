import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Asegúrate de importar getFirestore

const firebaseConfig = {
  apiKey: "AIzaSyAbUtn9GZLZzcYBPEaU3K7W7auPTmpK7e0",
  authDomain: "appgastosfirebase-a6fa7.firebaseapp.com",
  projectId: "appgastosfirebase-a6fa7",
  storageBucket: "appgastosfirebase-a6fa7.firebasestorage.app",
  messagingSenderId: "673242528798",
  appId: "1:673242528798:web:c501a93355cda00571c20f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Obtener la referencia de Firestore
const db = getFirestore(app);

export { db };
