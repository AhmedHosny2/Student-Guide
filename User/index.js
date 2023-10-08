const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
var cookies = require("cookie-parser");
require("dotenv").config();

const db = require("./config/database.js");
const router = require("./routes/user");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5500",
  })
);

const MONGODB_URI = process.env.CONNECTION_URL;
app.use(cookies());

//routes 
app.use("/user", router);

const PORT = process.env.PORT || 5001;

db.once("open", () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

db.on("error", (err) => {
  console.error("MongoDB error:", err);
});
