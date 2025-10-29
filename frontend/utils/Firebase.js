import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0i3W7T4NbAG1Zws6LvmoitJCpsR4pUec",
  authDomain: "loginonecart-936b9.firebaseapp.com",
  projectId: "loginonecart-936b9",
  storageBucket: "loginonecart-936b9.firebasestorage.app",
  messagingSenderId: "902019161513",
  appId: "1:902019161513:web:010ab7409ce1620593b8b8",
  measurementId: "G-3LD3KS1QKD"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider }


