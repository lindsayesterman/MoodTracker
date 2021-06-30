import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBiKFyl668YCSTzRy9NaMLTg4nKYu6siWw",
  authDomain: "shimmer-mood-tracker-900b2.firebaseapp.com",
  projectId: "shimmer-mood-tracker-900b2",
  storageBucket: "shimmer-mood-tracker-900b2.appspot.com",
  messagingSenderId: "747982194591",
  appId: "1:747982194591:web:92fbda0e644e1ccf005faa",
  measurementId: "G-FM28QHTM1W",
});

// Initialize Firebase
export default firebaseConfig;
// firebase.analytics();
