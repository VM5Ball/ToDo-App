import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpSHpT-FC_MQFLo3sH9H1TFcvyOpm1tCk",
  authDomain: "todoapp-f444c.firebaseapp.com",
  projectId: "todoapp-f444c",
  storageBucket: "todoapp-f444c.appspot.com",
  messagingSenderId: "168450568711",
  appId: "1:168450568711:web:786207aaeee722eb11b0a2",
  measurementId: "G-80W7SBXYZ0"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();


export{
    auth,
    db
}