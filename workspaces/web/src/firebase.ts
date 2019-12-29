import "firebase/analytics"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const config = {
  apiKey: "AIzaSyA-eIOZtddutNeh5KMTBifIGpqxnIZHUEM",
  authDomain: "listen-together-637e4.firebaseapp.com",
  databaseURL: "https://listen-together-637e4.firebaseio.com",
  projectId: "listen-together-637e4",
  storageBucket: "listen-together-637e4.appspot.com",
  messagingSenderId: "434149085946",
  appId: "1:434149085946:web:fd93437f9e7d8030c42f43",
  measurementId: "G-BQFCMGHPDV",
}

export const firebaseApp = firebase.initializeApp(config)
firebaseApp.analytics()
