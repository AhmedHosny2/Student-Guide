const { addTa, getAllTas, getTa } = require("../controller/TADirectory");
const router = require("express").Router();
const { verifyToken, verifyRole } = require("../middleware/auth");
router.use(verifyToken);
router.get("/:email", getTa);
router.get("/", getAllTas);
router.use(verifyRole);
router.post("/", addTa);

module.exports = router;
 