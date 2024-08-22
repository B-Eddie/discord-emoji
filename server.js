// const express = require('express');
// const path = require('path');
import express from "express";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Inject environment variables into your HTML
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Discord custom emoji</title>
    </head>
    <body>
        <div id="filesubmit">
        <input type="file" class="file-select" accept="image/*" />
        <button class="file-submit">SUBMIT</button>
        </div>
        <script type="module">
        // Import the functions you need from the SDKs you need
        //   import { initializeApp } from "firebase/app";
        //   import { getAnalytics } from "firebase/analytics";
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
        import { getStorage, ref, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";

        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: {process.env.apiKey},
            authDomain: {process.env.authDomain},
            projectId: {process.env.projectId},
            storageBucket: {process.env.storageBucket},
            messagingSenderId: {process.env.messagingSenderId},
            appId: {process.env.appId},
            measurementId: {process.env.measurementId},
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        // Initialize Firebase Storage
        const storage = getStorage(app);

        let selectedFile;

        function handleFileUploadChange(e) {
            selectedFile = e.target.files[0];
        }

        function handleFileUploadSubmit(e) {
            if (!selectedFile) {
            alert("Please select a file first.");
            return;
            }

            const storageRef = ref(storage, "images/" + selectedFile.name);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);

            uploadTask.on(
            "state_changed",
            (snapshot) => {
            },
            (error) => {
                console.error("Upload failed:", error);
            },
            () => {
                // what happens if success
                console.log("Upload success!");
            }
            );
        }

        document
            .querySelector(".file-select")
            .addEventListener("change", handleFileUploadChange);
        document
            .querySelector(".file-submit")
            .addEventListener("click", handleFileUploadSubmit);
        </script>
    </body>
    </html>

  `);
});

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
