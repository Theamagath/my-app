import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgzrApTkofzhrqf8DEPtVCU4B5lDDZRcc",
  authDomain: "my-app-d02cd.firebaseapp.com",
  projectId: "my-app-d02cd",
  storageBucket: "my-app-d02cd.firebasestorage.app",
  messagingSenderId: "1081190785349",
  appId: "1:1081190785349:web:c97dc478fbddea9570de2c",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;