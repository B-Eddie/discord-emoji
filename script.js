// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "process.env.apiKey",
  authDomain: "process.env.authDomain",
  projectId: "process.env.projectId",
  storageBucket: "process.env.storageBucket",
  messagingSenderId: "process.env.messagingSenderId",
  appId: "process.env.appId",
  measurementId: "process.env.measurementId"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storageService = firebase.storage();
const storageRef = storageService.ref();

let selectedFile;
function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
}

function handleFileUploadSubmit(e) {
    const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); // creates a child directory called images, and place the file inside this directory
    uploadTask.on('state_changed', (snapshot) => {
    }, (error) => {
        console.log(error);
    }, () => {
        // upload complete
        console.log('success');
    });
}

document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);