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
    res.sendFile(path.join((__dirname, "public', 'index.html")))
});

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
