const express = require("express");
const router = express.Router();
const { getCourse, addCourse, updateCourse } = require("../controllers/course");
const { verifyToken, verifyRole } = require("../middleware/auth");
const { limiter } = require("../utils/rateLimiter.js");
router.use(verifyToken);
router.get("/:courseName", limiter, getCourse);
router.use(verifyRole);
router.put("/:courseName", limiter, updateCourse);
router.post("/", limiter, addCourse);

module.exports = router;
