const express = require("express");
const router = express.Router();
const { verifyRole, verifyToken } = require("../middleware/auth");
const {
  addCampusIcon,
  getAllCampusIcons,
  getCampusIcon,
  updateCampusIcon,
} = require("../controller/campusIcons");

router.use(verifyToken);
router.get("/", getAllCampusIcons);
router.get("/:name", getCampusIcon);
router.use(verifyRole);
router.post("/", addCampusIcon);
router.put("/:name", updateCampusIcon);
