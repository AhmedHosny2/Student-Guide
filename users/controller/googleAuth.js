const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { BASE_URL } = require("../services/BaseURLs");
//get dotenv
require("dotenv").config();
// router.get('/success', (req, res) => {
//   res.render('pages/success', {user: userProfile});
// });
// router.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.CLIENT_URL}`,
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

exports.authenticateGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleCallback = (req, res) => {
  console.log("hereeeee \n\n");
  const rawJSON = JSON.parse(userProfile._raw);

  // Extract the information
  const firstName = rawJSON.given_name;
  const lastName = rawJSON.family_name;
  const email = rawJSON.email;

  // You can use these values to store and verify the user later
  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log(`Email: ${email}`);

  res.redirect(`${process.env.CLIENT_URL}/client/html/home.html`);
};
