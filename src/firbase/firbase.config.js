// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLkWUWpsuyXwgAhRQyr17H3OZiJMvmIdc",
  authDomain: "otp-project-2c707.firebaseapp.com",
  projectId: "otp-project-2c707",
  storageBucket: "otp-project-2c707.appspot.com",
  messagingSenderId: "259232338369",
  appId: "1:259232338369:web:eec04277e3bcd917449f40",
  measurementId: "G-MH0BNQPGL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth = getAuth(app)

 export {auth,app}
