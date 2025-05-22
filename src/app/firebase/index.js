import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAKasclf8_54LGiiqdtUVcW39jkHoj1NZY",
  authDomain: "next-crud-projet.firebaseapp.com",
  projectId: "next-crud-projet",
  storageBucket: "next-crud-projet.appspot.com",
  messagingSenderId: "647755109956",
  appId: "1:647755109956:web:807743ef35415256db8e11"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };