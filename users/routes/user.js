const express = require("express");
const router = express.Router();
const { limiter } = require("../utils/rateLimiter");
const {
  loginUser,
  signupUser,
  getUser,
  logoutUser,
  updateUserPoints,
  verifyOTP,
  sendOTP,
} = require("../controller/user");
const {
  verifyToken,
  verifyRole,
  testVerifyRole,
  testVerifyToken,
} = require("../middleware/auth");
// router.post("/logout", logoutUser);

router.post("/signup", limiter, signupUser);
router.post("/login", limiter, loginUser);
router.put("/updatePoints", updateUserPoints);
router.post("/sendOTP", limiter, sendOTP);
router.put("/verifyOTP", limiter, verifyOTP);
router.use(verifyToken);
// router.get("/protected-route", testVerifyToken);
// router.get("/admin-route", verifyRole, testVerifyRole);
router.post("/logout", logoutUser);
router.get("/", getUser);

module.exports = router;
