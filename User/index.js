const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const db = require("./config/database.js");
const router = require("./routes/user");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use the session
const MONGODB_URI = process.env.CONNECTION_URL;
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // for 14 day
    },
  })
)
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use("/user", router);

const PORT = process.env.PORT || 5001;

db.once('open', () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

db.on('error', (err) => {
  console.error('MongoDB error:', err);
});