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
} = require("../controller/user");
const {
  verifyToken,
  verifyRole,
  testVerifyRole,
  testVerifyToken,
} = require("../middleware/auth");
// router.post("/logout", logoutUser);

router.post("/signup",  signupUser);
router.post("/login",  loginUser);
router.put("/updatePoints", updateUserPoints);
router.post("/sendOTP",  sendOTP);
router.put("/verifyOTP",  verifyOTP);
router.use(verifyToken);
// router.get("/protected-route", testVerifyToken);
// router.get("/admin-route", verifyRole, testVerifyRole);
router.post("/logout", logoutUser);
router.get("/", getUser);

module.exports = router;
