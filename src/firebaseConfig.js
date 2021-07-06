import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDJLhpyKF_8Ao52gu55LW-Lf3RR7Dzyqfk",
  authDomain: "friends-e6525.firebaseapp.com",
  projectId: "friends-e6525",
  storageBucket: "friends-e6525.appspot.com",
  messagingSenderId: "377257578525",
  appId: "1:377257578525:web:109e46c319b1a20c0736f4",
  measurementId: "G-Q6QMF3K9W9",
};

const fire = firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();

export default fire;
