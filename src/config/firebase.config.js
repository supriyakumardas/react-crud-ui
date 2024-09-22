import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

 const firebaseConfig = {
  apiKey: "AIzaSyCzvMWLxUkv0T_I2b0AMlATNtF-LB54f8U",
  authDomain: "react-webpack-4c73f.firebaseapp.com",
  projectId: "react-webpack-4c73f",
  storageBucket: "react-webpack-4c73f.appspot.com",
  messagingSenderId: "614852782570",
  appId: "1:614852782570:web:16a27c97ecd7dfa487aa93",
  measurementId: "G-VH2CCTTRT3"
};


const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

 auth.settings.appVerificationDisabledForTesting = true;

export { auth };
