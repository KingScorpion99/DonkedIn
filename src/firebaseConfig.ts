// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVHpUFVdfzng4keR-m13hUVeGWFbYDZZo",
  authDomain: "linkedin-clone-scorpio11.firebaseapp.com",
  projectId: "linkedin-clone-scorpio11",
  storageBucket: "linkedin-clone-scorpio11.appspot.com",
  messagingSenderId: "141439534491",
  appId: "1:141439534491:web:c054095f84d5deec3c0d3e",
  measurementId: "G-TEMREH1CDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)
export { auth, app, firestore, storage }