const express = require("express");
const { loginUser, signupUser } = require("../controller/user");
const router = express.Router();
const verifyToken = require("../middleware/auth").verifyToken;
const verifyRole = require("../middleware/auth").verifyRole;
router.post("/signup", signupUser);
router.post("/login", loginUser);
// for testing =============================================================
router.get("/protected-route", verifyToken, (req, res, next) => {
  res.send("You made it to the route.");
});
router.get("/admin-route", verifyRole, (req, res,next) => {
  /*if checkToken function succeed, api reach this block
   */
  res.send("You made it to the route.");
  next();
});

module.exports = router;
