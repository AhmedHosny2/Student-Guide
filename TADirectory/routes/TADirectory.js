const { addTa, getAllTas, assignTa, deleteTa, deleteTaCourse , getTaCourses} = require("../controller/TADirectory");
const router = require("express").Router();
const { verifyToken, verifyRole } = require("../middleware/auth");
const { limiter } = require("../utils/rateLimiter.js");
router.use(verifyToken);
router.get("/getTAs", limiter,  getAllTas);
router.get("/getTaCourses", limiter, getTaCourses);
router.use(verifyRole);
router.post("/add",limiter,  addTa);
router.post("/assign", limiter, assignTa);
router.delete("/delete", limiter, deleteTa);
router.delete("/deleteTACourse", limiter, deleteTaCourse);
module.exports = router;

