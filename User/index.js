const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const router = require("./routes/user");
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const MONGODB_URI = process.env.CONNECTION_URL;
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use the session 
app.use(
    session({
      secret: "my secret",
      resave: false,
      saveUninitialized: true,
          store: store,
    })
  );





app.use("/user", router);




const PORT = process.env.PORT || 5001;
const handleServerStartup = () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};


async function main() {
  await mongoose.set("strictQuery", true);
  await mongoose
    .connect(MONGODB_URI, mongooseOptions)
    .then((result) => {
      handleServerStartup();
    })
    .catch((err) => {
      console.log(err);
    });
}
main();
