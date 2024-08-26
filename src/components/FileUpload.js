"use client";
import { useState } from "react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../lib/firebaseConfig";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [filename, setFilename] = useState("Upload an Image"); // New state for filename

  const handleFileUploadChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFilename(file ? file.name : "Upload an Image"); // Update filename state
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
      (snapshot) => {
        setUploadStatus("Loading...");
      },
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
    <div id="filesubmit" className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-4xl font-bold">Upload Emojis</h1>
      <div className="flex flex-row items-center justify-center gap-4 mt-5 text-center">
        <input
          id="file-input"
          className="hidden"
          type="file"
          onChange={handleFileUploadChange}
        />
        <label
          htmlFor="file-input"
          className="px-4 py-2 text-black bg-transparent border-2 border-gray-400 rounded cursor-pointer"
        >
          {filename}
        </label>
        <button
          onClick={handleFileUploadSubmit}
          className="px-4 py-2 text-black transition-transform border-4 border-white rounded hover:scale-110"
        >
          SUBMIT
        </button>
      </div>
        <p className="mt-4">{uploadStatus}</p> 
    </div>
  );
}
