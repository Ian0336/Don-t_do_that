import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2X41MuCvwYAk01lvl59VGdEu3oUe3b0g",
  authDomain: "yoga-data-553c9.firebaseapp.com",
  databaseURL:
    "https://yoga-data-553c9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yoga-data-553c9",
  storageBucket: "yoga-data-553c9.appspot.com",
  messagingSenderId: "854860833968",
  appId: "1:854860833968:web:7533a611ebb58a32950775",
  measurementId: "G-9MZDCPJ6FK",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
export { db, firebaseApp };
