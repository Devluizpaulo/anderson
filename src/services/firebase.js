import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore"; // Certificando-se de que essas funções estão importadas corretamente

const firebaseConfig = {
  apiKey: "AIzaSyCaurYJPzoYSKyhGP9ATHRV4eLJBhV821g",
  authDomain: "portifolio-luiz-paulo.firebaseapp.com",
  databaseURL: "https://portifolio-luiz-paulo-default-rtdb.firebaseio.com",
  projectId: "portifolio-luiz-paulo",
  storageBucket: "portifolio-luiz-paulo.firebasestorage.app",
  messagingSenderId: "1027701735296",
  appId: "1:1027701735296:web:38a5c0013c5e7d6d53cb65",
  measurementId: "G-D0F2M4CWVM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exporte as funções necessárias
export { auth, db, collection, addDoc, getDocs, query, where, doc, updateDoc };
