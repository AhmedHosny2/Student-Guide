const express = require("express");
const router = express.Router();
const passport = require('passport');
const{authenticateGoogle,googleCallback} = require("../controller/googleAuth");
router.get("/google", authenticateGoogle);
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/error', // Redirect on failure
  }), googleCallback);

module.exports = router;
