const express = require('express');
const path = require('path');
const cors = require('cors');
// import express from "express";
// import path from "path";
// import cors from "cors";

const app = express();
app.use(cors());
app.set('view engine', 'ejs')

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'views')));

// Inject environment variables into your HTML
app.get("/", (req, res) => {
    res.render('index', {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
        measurementId: process.env.measurementId,
    });
});

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
