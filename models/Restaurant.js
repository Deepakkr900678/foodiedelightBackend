const mongoose = require("mongoose")
const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String},
    description: { type: String},
    location: { type: String},
    contactNumber: { type: String },
    openingHours: { type: String },
  },
)

module.exports = mongoose.model("Restaurant", restaurantSchema);
