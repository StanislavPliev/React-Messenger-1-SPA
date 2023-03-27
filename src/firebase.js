import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3SfjPx7SWFH6qoyDKVcbTnRZ22zVhR1A",
  authDomain: "chat-73cc6.firebaseapp.com",
  projectId: "chat-73cc6",
  storageBucket: "chat-73cc6.appspot.com",
  messagingSenderId: "715973982994",
  appId: "1:715973982994:web:ba5724bcf4cb065e0391cb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();