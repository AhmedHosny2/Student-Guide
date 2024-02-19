const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./database.js");

exports.configureServer = (router, routerPrefix, port) => {
  const app = express();

  app.disable("x-powered-by");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
  app.use(cookieParser());

  app.use(routerPrefix,router);

  db.once("open", () => {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  });

  db.on("error", (err) => {
    console.error("MongoDB error:", err);
  });
};
