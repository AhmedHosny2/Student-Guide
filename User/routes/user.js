const express = require("express");
const { signupUser, getLogin } = require("../controller/user");
const router = express.Router();

router.post("/signup", signupUser);
router.get("/login", getLogin);

module.exports = router;
