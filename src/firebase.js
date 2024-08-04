import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDZdkQDw76t-FBwxksx2XnmT_bNcqch2wo",
  authDomain: "stream-studio-723d5.firebaseapp.com",
  projectId: "stream-studio-723d5",
  storageBucket: "stream-studio-723d5.appspot.com",
  messagingSenderId: "484185830585",
  appId: "1:484185830585:web:b4b295afc2d6d9ca535768",
  measurementId: "G-WWSP5E6R0C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
