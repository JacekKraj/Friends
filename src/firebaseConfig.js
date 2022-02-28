import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'friends-e6525.firebaseapp.com',
  projectId: 'friends-e6525',
  storageBucket: 'friends-e6525.appspot.com',
  messagingSenderId: '377257578525',
  appId: '1:377257578525:web:109e46c319b1a20c0736f4',
  measurementId: 'G-Q6QMF3K9W9',
};

export const fire = firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
