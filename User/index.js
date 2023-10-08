const express = require("express");
const session = require("express-session");
const cors = require("cors");
var cookies = require("cookie-parser");
const passport = require("passport");
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
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET, 
}));

const MONGODB_URI = process.env.CONNECTION_URL;
app.use(cookies());


// habd  ============================
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => {
  res.render('pages/success', {user: userProfile});
});
app.get('/error', (req, res) => res.send("error logging in"));
 
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
 
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5001/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    const rawJSON = JSON.parse(userProfile._raw);

    // Extract the information
    const firstName = rawJSON.given_name;
    const lastName = rawJSON.family_name;
    const email = rawJSON.email;
    
    // You can use these values to store and verify the user later
    console.log(`First Name: ${firstName}`);
    console.log(`Last Name: ${lastName}`);
    console.log(`Email: ${email}`);
    
    
    res.redirect('http://127.0.0.1:5500/client/html/home.html');
  });



//=======================================================
//routes 
app.use("/user", router);

const PORT = process.env.PORT || 5001;

db.once("open", () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

db.on("error", (err) => {
  console.error("MongoDB error:", err);
});
