import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

console.log("Storage Bucket:", process.env.NEXT_PUBLIC_STORAGEBUCKET);
console.log("API:", process.env.NEXT_PUBLIC_APIKEY);

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);