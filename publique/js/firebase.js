// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKIBkV5vITokOAxsQ5Mt9nGAWQejKLOmE",
  authDomain: "green-ia.firebaseapp.com",
  projectId: "green-ia",
  storageBucket: "green-ia.appspot.com",
  messagingSenderId: "232056525028",
  appId: "1:232056525028:web:71aa265a8354f36b0e5cf1",
  measurementId: "G-BHRBE7S89W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
