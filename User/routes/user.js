const express = require("express");
const passport = require("passport");
const { signupUser } = require("../controller/user");
const router = express.Router();

router.post("/signup", signupUser);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "login-success",
  })
);
// for testing 
router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
    
});
router.get('/protected-route', (req, res, next) => {
    res.send('You made it to the route.');
});

router.get('/admin-route', (req, res, next) => {
    res.send('You made it to the admin route.');
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
});

router.get("/login-success", (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  );
});

router.get("/login-failure", (req, res, next) => {
  res.send("You entered the wrong password.");
});

module.exports = router;
