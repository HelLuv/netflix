import {initializeApp, getApp, getApps} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCopWsbG7DPMAGLyLNwhyfBFh2EOmrao_o",
  authDomain: "netflix-miriad.firebaseapp.com",
  projectId: "netflix-miriad",
  storageBucket: "netflix-miriad.appspot.com",
  messagingSenderId: "780109927978",
  appId: "1:780109927978:web:7ea91d8e48c9ccf02b5553"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export {auth, db};