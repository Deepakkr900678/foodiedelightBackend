const mongoose = require("mongoose")
const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    contactNumber: { type: String },
    openingHours: { type: String },
  },
)

module.exports = mongoose.model("Restaurant", restaurantSchema);
