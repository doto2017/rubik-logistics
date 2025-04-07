// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB87EHmoQLeOmmr6_78Q4R87DdnjkKantY',
  authDomain: 'rubik-db.firebaseapp.com',
  projectId: 'rubik-db',
  storageBucket: 'rubik-db.firebasestorage.app',
  messagingSenderId: '109337115182',
  appId: '1:109337115182:web:4b99f972fc03e674debdbf',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
