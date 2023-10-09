const express = require("express");
const router = express.Router();
const { getCourse, addCourse, updateCourse } = require("../controllers/course");
const { verifyToken, verifyRole } = require("../middleware/auth");

router.use(verifyToken);
router.get("/:courseName", getCourse);
router.use(verifyRole);
router.put("/:courseName", updateCourse);
router.post("/", addCourse);

module.exports = router;
