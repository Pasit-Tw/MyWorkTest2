import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
if (!firebase.apps.length){
  const firebaseConfig = {
    apiKey: "AIzaSyDvxW6z69R7Xlgi-ozAYBm4gc-H4i9grmI",
    authDomain: "cs313projecthostel.firebaseapp.com",
    databaseURL: "https://cs313projecthostel.firebaseio.com",
    projectId: "cs313projecthostel",
    storageBucket: "cs313projecthostel.appspot.com",
    messagingSenderId: "849231862230",
    appId: "1:849231862230:web:58250792a7c550080fec77"
  };
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
//export const storage = firebase.storage();

// Points to the root reference
export const storageRef = firebase.storage().ref();

// Points to 'images'
export const imagesRef = storageRef.child('payment/');

export const auth = firebase.auth();