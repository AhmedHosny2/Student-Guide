const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy
require("dotenv").config();
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
    callbackURL: "http://localhost:5001/user/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      console.log(userProfile);
      return done(null, userProfile);
  }
));
 
