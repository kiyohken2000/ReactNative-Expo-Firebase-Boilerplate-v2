import * as firebase from 'firebase'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAZwBnrty-mv0YOcyQQROxVwCumS2lpTu8",
  authDomain: "reactnative-expo-boilerplate.firebaseapp.com",
  projectId: "reactnative-expo-boilerplate",
  storageBucket: "reactnative-expo-boilerplate.appspot.com",
  messagingSenderId: "800782233378",
  appId: "1:800782233378:web:79d50721f6d0ce10cc7f7b",
  measurementId: "G-2JV5SBQ1ZP"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
