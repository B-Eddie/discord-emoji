const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Configure CORS
app.use(
  cors({
    origin: "*", // Adjust this to the specific domains you want to allow
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    APIKEY: process.env.APIKEY,
    AUTHDOMAIN: process.env.AUTHDOMAIN,
    PROJECTID: process.env.PROJECTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
    APPID: process.env.APPID,
    MEASUREMENTID: process.env.MEASUREMENTID,
  });
});

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// const express = require("express");
// require("dotenv").config();

// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Welcome to my server! ' + process.env.APIKEY);
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

