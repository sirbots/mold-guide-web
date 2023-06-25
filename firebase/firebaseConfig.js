// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGonyF4PsBFBKg52syAqDuMIqgae5_R4I",
  authDomain: "the-mold-site.firebaseapp.com",
  projectId: "the-mold-site",
  storageBucket: "the-mold-site.appspot.com",
  messagingSenderId: "955161298024",
  appId: "1:955161298024:web:cf32ad12bf95f2587be7dd",
  //   measurementId: "G-TVTLJM3VTL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
// Added based on Firestore docs (https://firebase.google.com/docs/firestore/quickstart#web-modular-api_1)
const db = getFirestore(app);

export { db };
