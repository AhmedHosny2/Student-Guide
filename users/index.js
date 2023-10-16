const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Correct the variable name
const passport = require("passport");
require("dotenv").config();

const db = require("./config/database.js");
const googleRouter = require("./routes/googleAuth.js");
const userRouter = require("./routes/user");

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
app.use(cookieParser()); // Corrected middleware name
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", googleRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 5001;

db.once("open", () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

db.on("error", (err) => {
  console.error("MongoDB error:", err);
});
