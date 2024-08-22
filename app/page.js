import FileUpload from "@/components/FileUpload";
import Image from "next/image";

// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Discord custom emoji</title>
//   </head>
//   <body>
//     <div id="filesubmit">
//       <input type="file" class="file-select" accept="image/*" />
//       <button class="file-submit">SUBMIT</button>
//       <p>api: <%= APIKEY %></p>
//     </div>
//     <script type="module">
//       // Import the functions you need from the SDKs you need
//       //   import { initializeApp } from "firebase/app";
//       //   import { getAnalytics } from "firebase/analytics";
//       import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
//       import {
//         getStorage,
//         ref,
//         uploadBytesResumable,
//       } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
//       import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";

//       // TODO: Add SDKs for Firebase products that you want to use
//       // https://firebase.google.com/docs/web/setup#available-libraries

//       // Your web app's Firebase configuration
//       // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//       const api_key = process.env.APIKEY;
//       const auth_domain = process.env.AUTHDOMAIN
//       const project_id = process.env.PROJECTID
//       const storage_bucket = process.env.STORAGEBUCKET
//       const messaging_sender_id = process.env.MESSAGINGSENDERID
//       const app_id = process.env.APPID
//       const measurement_id = process.env.MEASUREMENTID

//       const firebaseConfig = {
//         apiKey: api_key,
//         authDomain: auth_domain,
//         projectId: project_id,
//         storageBucket: storage_bucket,
//         messagingSenderId: messaging_sender_id,
//         appId: app_id,
//         measurementId: measurement_id,
//       };

//       console.log(api_key);
//       console.log(auth_domain);
//       console.log(project_id);
//       console.log(storage_bucket);
//       console.log(messaging_sender_id);
//       console.log(app_id);
//       console.log(measurement_id);

//       // Initialize Firebase
//       const app = initializeApp(firebaseConfig);

//       // Initialize Firebase Storage
//       const storage = getStorage(app);

//       let selectedFile;

//       function handleFileUploadChange(e) {
//         selectedFile = e.target.files[0];
//       }

//       function handleFileUploadSubmit(e) {
//         if (!selectedFile) {
//           alert("Please select a file first.");
//           return;
//         }

//         const storageRef = ref(storage, "images/" + selectedFile.name);
//         const uploadTask = uploadBytesResumable(storageRef, selectedFile);

//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {},
//           (error) => {
//             console.error("Upload failed:", error);
//           },
//           () => {
//             // what happens if success
//             console.log("Upload success!");
//           }
//         );
//       }

//       document
//         .querySelector(".file-select")
//         .addEventListener("change", handleFileUploadChange);
//       document
//         .querySelector(".file-submit")
//         .addEventListener("click", handleFileUploadSubmit);
//     </script>
//   </body>
// </html>

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Uplaod an image</h1>
        <FileUpload />
      </div>
      <p>api:</p>
    </main>
  );
}
