const express = require("express");
const router = express.Router();
const {
  addGrowthUpdate,
  editGrowthUpdate,
  deleteGrowthUpdate,
  getGrowthUpdates,
} = require("../controllers/growthController");
const { protect } = require("../middleware/authMiddleware");

router.get("/:plantId", getGrowthUpdates);
router.post("/", protect, addGrowthUpdate);
router.put("/:id", protect, editGrowthUpdate);
router.delete("/:id", protect, deleteGrowthUpdate);

module.exports = router;