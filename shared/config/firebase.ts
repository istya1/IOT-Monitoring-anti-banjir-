import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBv_4RZTwzfnUrK9OIb2e2W5p-DKqR9Afo",
  authDomain: "anti-banjir-ff9dd.firebaseapp.com",
  databaseURL: "https://anti-banjir-ff9dd-default-rtdb.firebaseio.com",
  projectId: "anti-banjir-ff9dd",
  storageBucket: "anti-banjir-ff9dd.firebasestorage.app",
  messagingSenderId: "236633184444",
  appId: "1:236633184444:web:7933044b6574a0b361d8b9"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);