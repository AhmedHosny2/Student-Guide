const express = require("express");
var session = require('cookie-session');
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Use const for middleware variable
require("dotenv").config();

const db = require("./config/database.js");
const Router = require("./routes/courseRoutes.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);
app.use(cookieParser()); // Use const for middleware variable

// Routes
app.use("/course", Router);

const PORT = process.env.PORT || 5002;

db.once("open", () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

db.on("error", (err) => {
  console.error("MongoDB error:", err);
});
