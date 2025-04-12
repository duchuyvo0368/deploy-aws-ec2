import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
const firebaseConfig = {
    apiKey: 'AIzaSyCjR-KqxwzDB_k4vDy4BIbO_5h4ko8ecq8',
    authDomain: 'fashionshop-e032e.firebaseapp.com',
    projectId: 'fashionshop-e032e',
    storageBucket: 'fashionshop-e032e.firebasestorage.app',
    messagingSenderId: '490934149844',
    appId: '1:490934149844:web:b672c3cdd500732658d141',
    measurementId: 'G-XTFDTTHFXY',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default firebase;
export const authentication = getAuth(initializeApp(firebaseConfig))