const GrowthUpdate = require("../models/GrowthUpdate");

// Add a progress update
exports.addGrowthUpdate = async (req, res) => {
  try {
    const { image, note, plant } = req.body;

    const update = await GrowthUpdate.create({
      image,
      note,
      plant,
      author: req.user._id,
    });

    res.status(201).json(update);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Edit own progress update
exports.editGrowthUpdate = async (req, res) => {
  try {
    const update = await GrowthUpdate.findById(req.params.id);

    if (!update) {
      return res.status(404).json({ message: "Update not found" });
    }

    if (update.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this update" });
    }

    update.note = req.body.note || update.note;
    update.image = req.body.image || update.image;

    const savedUpdate = await update.save();
    res.status(200).json(savedUpdate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete own progress update
exports.deleteGrowthUpdate = async (req, res) => {
  try {
    const update = await GrowthUpdate.findById(req.params.id);

    if (!update) {
      return res.status(404).json({ message: "Update not found" });
    }

    if (update.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this update" });
    }

    await update.deleteOne();
    res.status(200).json({ message: "Update deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all growth updates for a specific plant
exports.getGrowthUpdates = async (req, res) => {
  try {
    const updates = await GrowthUpdate.find({ plant: req.params.plantId }).sort({ createdAt: 1 });
    res.status(200).json(updates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};