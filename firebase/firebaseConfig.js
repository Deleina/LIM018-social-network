// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';

import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';

import { getFirestore, 
  doc, 
  addDoc, 
  collection, 
  setDoc, 
  getDocs, 
  onSnapshot, 
  deleteDoc, 
  getDoc, 
  updateDoc,
  query, orderBy, } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';

import {
  getStorage, 
  ref, 
  uploadBytes,
  getDownloadURL,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA33HPkczj5Pn1HEaxSuuEkz5LWHDMUTa4',
  authDomain: 'purr-love.firebaseapp.com',
  projectId: 'purr-love',
  storageBucket: 'purr-love.appspot.com',
  messagingSenderId: '578237034767',
  appId: '1:578237034767:web:e380c2da3118685a558e7a',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Auth
export const auth = getAuth();

export const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log('Hay un usuario');
    console.log(uid);
    //getName(uid);
  } else {
    // User is signed out
    console.log('No hay un usuario');
  }
});

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  sendEmailVerification,
};

export { getFirestore, 
  doc, 
  addDoc, 
  collection, 
  setDoc, 
  getDocs, 
  onSnapshot, 
  deleteDoc, 
  getDoc, 
  updateDoc, query, orderBy, };

export {
  getStorage, 
  ref, 
  uploadBytes,
  getDownloadURL,
};