// Import các thư viện cần thiết từ Firebase v9
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration của bạn
const firebaseConfig = {
    apiKey: 'AIzaSyCA2H9cogV4GHVIgV5mqRq74ipCxHUbtc4',
    authDomain: 'fashion-app-4cc5c.firebaseapp.com',
    projectId: 'fashion-app-4cc5c',
    storageBucket: 'fashion-app-4cc5c.firebasestorage.app',
    messagingSenderId: '71999066182',
    appId: '1:71999066182:web:2d73d1de36af5ed9d63a47',
    measurementId: 'G-N8BWPBV7ML',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Cung cấp đối tượng auth và export
const auth = getAuth(app);

export { auth, analytics };
