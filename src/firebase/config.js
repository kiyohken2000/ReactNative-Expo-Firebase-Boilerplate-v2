import * as firebase from 'firebase'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import { firebaseKey } from '../config'

const firebaseConfig = {
  apiKey: firebaseKey.apiKey,
  authDomain: firebaseKey.authDomain,
  projectId: firebaseKey.projectId,
  storageBucket: firebaseKey.storageBucket,
  messagingSenderId: firebaseKey.messagingSenderId,
  appId: firebaseKey.appId,
  measurementId: firebaseKey.measurementId
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
