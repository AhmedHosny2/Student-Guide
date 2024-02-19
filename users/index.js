const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const passport = require("passport");
require("dotenv").config();

const db = require("./config/database.js");
const userRouter = require("./routes/user");

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
//session
app.use(cookieParser()); // Add cookie parser middleware

// app.use(passport.initialize());
// app.use(passport.session());

// health check
app.get("/health", (req, res) => {
  res.status(200).send("Health check passed");
});
// Routes
app.use("/user", userRouter);

const PORT = process.env.PORT || 5001;

db.once("open", () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

db.on("error", (err) => {
  console.error("MongoDB error:", err);
});
