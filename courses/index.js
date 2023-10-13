const express = require("express");
const session = require("express-session");
const cors = require("cors");
var cookies = require("cookie-parser");
require("dotenv").config();

const db = require("./config/database.js");
const Router = require("./routes/courseRoutes.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: true,
//     secret: process.env.SESSION_SECRET,
//   })
// );
app.use(cookies());

//routes
app.use("/course", Router);

const PORT = process.env.PORT || 5002;

db.once("open", () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

db.on("error", (err) => {
  console.error("MongoDB error:", err);
});
