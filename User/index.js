const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
require("dotenv").config();

const passport = require("passport");
const db = require("./config/database.js");
const router = require("./routes/user");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5500',
  }),
);

// use the session
const MONGODB_URI = process.env.CONNECTION_URL;
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // for 1 day
      sameSite: "none",
      secure: true,
    },
  })
);
// require("./config/passport");
// app.use(passport.initialize());
// app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(req.session);

//   next();
// });

// routes
app.use("/user", router);

const PORT = process.env.PORT || 5001;

db.once("open", () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

db.on("error", (err) => {
  console.error("MongoDB error:", err);
});
