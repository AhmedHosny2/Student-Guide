const { addTa, getAllTas } = require("../controller/TADirectory");
const router = require("express").Router();
const { verifyToken, verifyRole } = require("../middleware/auth");
// router.use(verifyToken);
router.get("/", getAllTas);
// router.use(verifyRole);
router.post("/", addTa);

module.exports = router;
