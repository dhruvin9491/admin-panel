import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDUo_wEdOq7SRWFT-wwAwaoEebWPnHq-2g",
  authDomain: "foody-708d0.firebaseapp.com",
  projectId: "foody-708d0",
  storageBucket: "foody-708d0.firebasestorage.app",
  messagingSenderId: "1096910857709",
  appId: "1:1096910857709:web:a1eb6aeaf01cae3950b3e4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);