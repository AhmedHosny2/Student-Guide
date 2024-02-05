const { addTa, getAllTas , assignTa,deleteTa} = require("../controller/TADirectory");
const router = require("express").Router();
const { verifyToken, verifyRole } = require("../middleware/auth");
router.use(verifyToken);
router.get("/", getAllTas);
router.use(verifyRole);
router.post("/add", addTa);
router.post("/assign", assignTa);
router.delete("/delete", deleteTa);

module.exports = router;
