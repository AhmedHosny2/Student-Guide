const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/database.js");
const Router = require("./routes/TADirectory.js");
const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser()); 

app.use("/TADirectory", Router);

const PORT = process.env.PORT || 5003;

db.once("open", () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

db.on("error", (err) => {
  console.error("MongoDB error:", err);
});
