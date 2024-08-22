import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

console.log("Storage Bucket:", process.env.STORAGEBUCKET);
console.log("API:", process.env.APIKEY);

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);