// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAiLk1RgtS30fCXyIXjnf81hwsZ9wCgSU",
  authDomain: "cloud-apparel-db.firebaseapp.com",
  projectId: "cloud-apparel-db",
  storageBucket: "cloud-apparel-db.firebasestorage.app",
  messagingSenderId: "510199093306",
  appId: "1:510199093306:web:f118d842b9b94b1b667d03"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider;

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);