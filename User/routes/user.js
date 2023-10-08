const express = require("express");
const { loginUser, signupUser } = require("../controller/user");
const router = express.Router();
const {verifyToken,verifyRole} = require("../middleware/auth");

router.post("/signup", signupUser);
router.post("/login", loginUser);

// for testing =============================================================
router.get("/protected-route", verifyToken, (req, res, next) => {
  console.log("wooow you made it to the protected route");
  res.send("You made it to the route.");
});
router.get("/admin-route", verifyRole, (req, res, next) => {
  /*if checkToken function succeed, api reach this block
   */
  res.send("You made it to the route.");
  next();
});

module.exports = router;
