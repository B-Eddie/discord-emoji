"use client";
import { useState } from "react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../lib/firebaseConfig";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileUploadChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUploadSubmit = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const storageRef = ref(storage, "images/" + selectedFile.name);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Upload failed:", error);
        setUploadStatus("Upload failed.");
      },
      () => {
        setUploadStatus("Upload successful!"); // Update state on success
      }
    );
  };

  return (
    <div id="filesubmit">
      <input type="file" onChange={handleFileUploadChange} />
      <button onClick={handleFileUploadSubmit}>SUBMIT</button>
      {uploadStatus && <p>{uploadStatus}</p>} {/* upload status */}
    </div>
  );
}
