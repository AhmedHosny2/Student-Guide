const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupUser,
  getUser,
  logoutUser,
  updateUserPoints,
  verifyOTP,
  sendOTP,
  forgetPassword,
  addJTA
} = require("../controller/user");
const {
  verifyToken,
} = require("../middleware/auth");
const { limiter } = require("../utils/rateLimiter.js");
router.post("/signup", limiter, signupUser);
router.post("/login", limiter, loginUser);
router.put("/updatePoints", updateUserPoints);
router.post("/sendOTP", limiter, sendOTP);
router.post("/forgetPassword", limiter, forgetPassword);
router.put("/verifyOTP", limiter, verifyOTP);
router.get("/logout", logoutUser);
router.use(verifyToken);
router.get("/", getUser);
router.post("/addJTA", addJTA);

module.exports = router;
