// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
} from "firebase/firestore";

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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    // console.log('users doc: ', userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    // console.log('user snapshot: ', userSnapShot);
    // console.log('snapshot exists?: ', userSnapShot.exists());

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating user: ', error);
        }
        return userDocRef;
    }

    // check if user exists
        // return if it does
        // if doesn't, create(set) the data in users collection.
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}