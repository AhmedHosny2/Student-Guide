const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const connection = require("./database");
const userModel = require("../model/user");
passport.use(
  new LocalStrategy(function (username, password, cb) {
    userModel
      .findOne({ username })
      .then((user) => {
        if (!user) {
          return cb(null, false, { message: "Email does not exist" });
        }
        bcrypt.compare(password, user.password).then((match) => {
          if (!match) {
            return cb(null, false, { message: "Wrong Password" });
          }
          return cb(null, user, { message: "Logged In Successfully" });
        });
      })
      .catch((err) => {
        console.error(err);
        cb(err);
      });
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  userModel
    .findById(id)
    .then(function (user) {
      cb(null, user);
    })
    .catch(function (err) {
      cb(err);
    });
});
