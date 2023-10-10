// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEc7L-yVFqPA38ZOdNDifEd26VUGgvHjU",
  authDomain: "realtor-react-clone-78966.firebaseapp.com",
  projectId: "realtor-react-clone-78966",
  storageBucket: "realtor-react-clone-78966.appspot.com",
  messagingSenderId: "849990587264",
  appId: "1:849990587264:web:5a7224a5dbe575d6cee765",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export { db, auth };
