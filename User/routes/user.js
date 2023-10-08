const express = require("express");
const { loginUser, signupUser } = require("../controller/user");
const router = express.Router();
const isAuth = require("./authMiddleware").isAuth;
const isAdmin = require("./authMiddleware").isAdmin;
const verifyToken = require("../middleware/auth").verifyToken;
router.post("/signup", signupUser);
router.post("/login", loginUser);
// for testing =============================================================
router.get("/register", (req, res, next) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});
router.get("/protected-route", verifyToken, (req, res, next) => {
  res.send("You made it to the route.");
});
router.get("/api", verifyToken, (req, res,next) => {
  /*if checkToken function succeed, api reach this block
   */
  console.log("yeah \n\n\n\n\n\n");
  next();
});

router.get("/admin-route", isAdmin, (req, res, next) => {
  res.send("You made it to the admin route.");
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// router.get("/login-success", (req, res, next) => {
//   res.send(
//     '<p>You successfully logged in. --> <a href="/user/protected-route">Go to protected route</a></p>'
//   );
// });

// router.get("/login-failure", (req, res, next) => {
//   res.send("You entered the wrong password.");
// });

module.exports = router;
