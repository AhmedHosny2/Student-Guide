const express = require("express");
const { signupUser, loginUser } = require("../controller/user");
const router = express.Router();

router.post("/signup", signupUser);
router.get("/login", loginUser);

module.exports = router;
