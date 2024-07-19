// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCswNGVEr4bSKMTTrnUC6meyKrvlERw_VU",
    authDomain: "contact-db-4523d.firebaseapp.com",
    projectId: "contact-db-4523d",
    storageBucket: "contact-db-4523d.appspot.com",
    messagingSenderId: "250546330501",
    appId: "1:250546330501:web:9c1127927997f746f682ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);