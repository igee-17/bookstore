// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLLn2H_HNnFDoRLm4k3Eesgxm-nZaIFQA",
    authDomain: "bookstore-f3dd8.firebaseapp.com",
    projectId: "bookstore-f3dd8",
    storageBucket: "bookstore-f3dd8.appspot.com",
    messagingSenderId: "764433858760",
    appId: "1:764433858760:web:58f5f7719bb69a275ae5fd",
    measurementId: "G-STWQKPT1EH"
};

// const firebaseConfig = {
//     apiKey: "AIzaSyDOFej6Ox4SaQYX9f6faLxrs0RQbkf4XWs",
//     authDomain: "shoestore-3c67f.firebaseapp.com",
//     projectId: "shoestore-3c67f",
//     storageBucket: "shoestore-3c67f.appspot.com",
//     messagingSenderId: "465390983902",
//     appId: "1:465390983902:web:0b1a4863e5e42955bb404f",
//     measurementId: "G-9TWYMVJB86"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };