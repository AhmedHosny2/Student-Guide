const express = require("express");
const router = express.Router();

const { loginUser, signupUser, getUser } = require("../controller/user");
const {
  verifyToken,
  verifyRole,
  testVerifyRole,
  testVerifyToken,
} = require("../middleware/auth");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.use(verifyToken);
router.get("/protected-route", testVerifyToken);
router.get("/admin-route", verifyRole, testVerifyRole);
router.get("/:userId", getUser);

module.exports = router;
