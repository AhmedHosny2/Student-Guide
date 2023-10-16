const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const MongoDBStore = require("connect-mongodb-session")(session);

const db = require("./config/database.js");
const Router = require("./routes/courseRoutes.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

const CONNECTION_URL = process.env.CONNECTION_URL;
// console.log(CONNECTION_URL);
const store = new MongoDBStore({
  uri: CONNECTION_URL,
  collection: "sessions", // Name of the sessions collection
});

// Use express-session middleware with the MongoDB store
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

// Routes
app.use("/course", Router);

const PORT = process.env.PORT || 5002;

db.once("open", () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

db.on("error", (err) => {
  console.error("MongoDB error:", err);
});
