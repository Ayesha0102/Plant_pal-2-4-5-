const mongoose = require("mongoose");

const growthUpdateSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    note: {
      type: String,
      maxlength: 300,
    },
    plant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlantCollection",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GrowthUpdate", growthUpdateSchema);
