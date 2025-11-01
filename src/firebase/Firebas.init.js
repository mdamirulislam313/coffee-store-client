// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvrw05aTMkl9Tii80MfiZvdDLzIOgJSms",
  authDomain: "coffee-store-app-18f13.firebaseapp.com",
  projectId: "coffee-store-app-18f13",
  storageBucket: "coffee-store-app-18f13.firebasestorage.app",
  messagingSenderId: "462464104373",
  appId: "1:462464104373:web:39a17211dee4e3db424bfc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);