const express = require("express");
const { loginUser, signupUser } = require("../controller/user");
const router = express.Router();
const {verifyToken,verifyRole, testVerifyRole , testVerifyToken} = require("../middleware/auth");

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.get("/protected-route", verifyToken, testVerifyToken);
router.get("/admin-route", verifyRole, testVerifyRole);

module.exports = router;
