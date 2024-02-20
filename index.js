import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBKIBkV5vITokOAxsQ5Mt9nGAWQejKLOmE",
  authDomain: "green-ia.firebaseapp.com",
  databaseURL: "https://green-ia-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "green-ia",
  storageBucket: "green-ia.appspot.com",
  messagingSenderId: "232056525028",
  appId: "1:232056525028:web:71aa265a8354f36b0e5cf1",
  measurementId: "G-BHRBE7S89W"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const loadFirestore = async () => {
  try {
    const { getFirestore } = await import('firebase/firestore');
    const db = getFirestore(app);
  } catch (error) {
    console.error('Error loading Firestore:', error);
  }
};

loadFirestore();
