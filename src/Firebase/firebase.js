import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyDdYM3ThXYmjBriu_Xvb4svuHlfbaWCYbE",
    authDomain: "nilee-3b696.firebaseapp.com",
    databaseURL: "https://nilee-3b696.firebaseio.com",
    projectId: "nilee-3b696",
    storageBucket: "nilee-3b696.appspot.com",
    messagingSenderId: "298859629718",
    appId: "1:298859629718:web:2bc9dae71188a2122686b7",
    measurementId: "G-6FHP0LSMPT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig); 
 
  const storage = firebase.storage() 

  export  {
    storage, firebase as default
  }