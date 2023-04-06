// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1zcWNYAo3AJlpBJ3Ted234xNP56hcaUI",
  authDomain: "control-de-gastos-4852f.firebaseapp.com",
  projectId: "control-de-gastos-4852f",
  storageBucket: "control-de-gastos-4852f.appspot.com",
  messagingSenderId: "150639498935",
  appId: "1:150639498935:web:ce9c05e420d30bac71df32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {db, auth};