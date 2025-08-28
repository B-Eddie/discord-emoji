"use client";
import { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebaseConfig";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUploadChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setUploadStatus("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus("File size must be less than 5MB.");
      return;
    }
    setSelectedFile(file);
    setUploadStatus("");
    setUploadedUrl("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const handleFileUploadSubmit = () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file first.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus("Uploading...");

    const storageRef = ref(storage, "images/" + selectedFile.name);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        setUploadStatus(`Uploading... ${Math.round(progress)}%`);
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploadStatus("Upload failed. Please try again.");
        setIsUploading(false);
        setUploadProgress(0);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadedUrl(downloadURL);
          setUploadStatus("Upload successful!");
          setIsUploading(false);
          setUploadProgress(0);
        });
      }
    );
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadStatus("");
    setUploadProgress(0);
    setIsUploading(false);
    setUploadedUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-blue-200/50 dark:border-blue-800/50 max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Upload Emoji
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Drag & drop your image or click to browse
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer group ${
            isDragOver
              ? "border-blue-400 bg-blue-50/50 dark:bg-blue-900/20 scale-[1.02] shadow-lg"
              : selectedFile
              ? "border-green-400 bg-green-50/50 dark:bg-green-900/20"
              : "border-blue-300 dark:border-blue-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-900/10"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleFileUploadChange}
          />

          <div className="flex flex-col items-center space-y-4">
            {selectedFile ? (
              <>
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Choose your image
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Status & Progress */}
        {uploadStatus && (
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-800/50">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {uploadStatus}
              </p>
              {isUploading && (
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  {Math.round(uploadProgress)}%
                </span>
              )}
            </div>
            {isUploading && (
              <div className="bg-blue-200 dark:bg-blue-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        )}

        {/* Success State */}
        {uploadedUrl && (
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                  Upload complete!
                </p>
                <a
                  href={uploadedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                >
                  View uploaded image
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-8">
          <button
            onClick={handleFileUploadSubmit}
            disabled={!selectedFile || isUploading}
            className="flex-1 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isUploading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Uploading...</span>
              </div>
            ) : (
              "Upload"
            )}
          </button>

          {(selectedFile || uploadStatus) && (
            <button
              onClick={resetUpload}
              className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
