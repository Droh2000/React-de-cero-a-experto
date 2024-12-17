// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';

// Este es para la base de datos
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCROji3hpd94_pJrMuJ3rfUrm3zK6RvzzI",
  authDomain: "react-cursos-db746.firebaseapp.com",
  projectId: "react-cursos-db746",
  storageBucket: "react-cursos-db746.firebasestorage.app",
  messagingSenderId: "155495227002",
  appId: "1:155495227002:web:ddbd7f0e7a0992460865c3"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Esta es la parte de Autenticacion (Aqui tenemos todas las funcionalidades)
export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );