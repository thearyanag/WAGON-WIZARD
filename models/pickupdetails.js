const mongoose = require("mongoose");
const pickupSchema = new mongoose.Schema({
  number_plate: {
    type: Number,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  model: {
    type: Number,
    required: true,
  },
  additional_notes: {
    type: String,
  },
  condition: {
    front: {
      imageUrl: String,
      rating: Number,
      required: true,
    },
    side: {
      imageUrl: String,
      rating: Number,
      required: true,
    },
    back: {
      imageUrl: String,
      rating: Number,
      required: true,
    },
    fuel_gaze: {
      imageUrl: String,
      required: true,
    },
    overall_comments: {
      type: String,
      required: true,
    },
  },
  ownershipdetails: {
    rc: {
      imageUrl: String,
      required: true,
    },
    pollutionpaper: {
      imageUrl: String,
      required: true,
    },
    insurance: {
      imageUrl: String,
      required: true,
    },
  },
  inventory: {
    type: String,
    required: true,
  },
});
const Pickup = new mongoose.model("Pickup", pickupSchema);
module.exports = Pickup;
