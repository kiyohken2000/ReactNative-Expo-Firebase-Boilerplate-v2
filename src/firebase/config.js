import firebase from 'firebase/compat/app'
import "firebase/compat/firestore"
import "firebase/compat/storage"

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { firebase, auth };
