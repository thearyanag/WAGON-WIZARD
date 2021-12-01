const mongoose = require("mongoose");
const { Schema } = mongoose;

const pickupSchema = new Schema({
  additional_notes: {
    type: String
  },
  condition: {
    front: {
      imageUrl: {
        type : String
      },
      rating: {
        type : String
      }
    },
    side: {
      imageUrl: {
        type : String
      },
      rating: {
        type : String
      }
    },
    back: {
      imageUrl: {
        type : String
      },
      rating: {
        type : String
      }
    },
    fuel_gaze: {
      imageUrl: {
        type : String
      }
    },
    overall_comments: {
      type: String
    }
  },
  ownershipDetails: {
    rc: {
      imageUrl: {
        type : String,
        required : true
      }
    },
    pollutionpaper: {
      imageUrl: {
        type : String,
        required: true
      }
    },
    insurance: {
      imageUrl: {
        type : String,
        required: true
      }
    },
  },
  inventory: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Pickup", pickupSchema);
