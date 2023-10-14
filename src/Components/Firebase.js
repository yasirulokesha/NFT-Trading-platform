// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeznV4HyV0G95bw7X8Ro3NULj7JqdAHks",
    authDomain: "opentrade-130c1.firebaseapp.com",
    projectId: "opentrade-130c1",
    storageBucket: "opentrade-130c1.appspot.com",
    messagingSenderId: "209571506345",
    appId: "1:209571506345:web:7ca8ef015d410fc765a1b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)