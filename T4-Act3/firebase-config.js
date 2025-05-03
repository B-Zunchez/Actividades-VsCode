// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPajGTUn_-F6gQ1FvUPtyk3INB5uaEudE",
  authDomain: "to-do-list-b8b91.firebaseapp.com",
  projectId: "to-do-list-b8b91",
  storageBucket: "to-do-list-b8b91.firebasestorage.app",
  messagingSenderId: "835812910089",
  appId: "1:835812910089:web:fe73da5e8d0f0ccf9544d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const firebaseApp = app;