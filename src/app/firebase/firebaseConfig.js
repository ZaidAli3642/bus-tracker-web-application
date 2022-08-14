import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRk1HgYdYzoqvjnI5aeDPCPu7nkHbqR7U",
  authDomain: "bus-tracking-app-backend.firebaseapp.com",
  projectId: "bus-tracking-app-backend",
  storageBucket: "bus-tracking-app-backend.appspot.com",
  messagingSenderId: "204843320445",
  appId: "1:204843320445:web:6b4979e74317cc1e8c5d14",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
