// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACOvep8QuPa6Fma_d1h1B1TYIaSqhlnuI",
  authDomain: "nishanth-selvendran-portfolio.firebaseapp.com",
  projectId: "nishanth-selvendran-portfolio",
  storageBucket: "nishanth-selvendran-portfolio.firebasestorage.app",
  messagingSenderId: "460056543819",
  appId: "1:460056543819:web:f73ad78bcee2016685c3ce",
  measurementId: "G-K98GYL2BG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
