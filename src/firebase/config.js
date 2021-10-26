import * as firebase from 'firebase'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAbynvh81TkAmQE2lBY8JEDOVpNaHZOozU",
  authDomain: "expo-boilerplate-v2.firebaseapp.com",
  projectId: "expo-boilerplate-v2",
  storageBucket: "expo-boilerplate-v2.appspot.com",
  messagingSenderId: "852442919227",
  appId: "1:852442919227:web:313aba2cd455b34701871e",
  measurementId: "G-1894ZG59D5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
