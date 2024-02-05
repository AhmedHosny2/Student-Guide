const { addTa, getAllTas , assignTa} = require("../controller/TADirectory");
const router = require("express").Router();
const { verifyToken, verifyRole } = require("../middleware/auth");
router.use(verifyToken);
router.get("/", getAllTas);
router.use(verifyRole);
router.post("/add", addTa);
router.post("/assign", assignTa);

module.exports = router;
