const mongoose = require("mongoose");
const { Schema } = mongoose;

const pickupSchema = new Schema({
  tripId : {
    type: String,
    required : true
  },
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
    leftSide: {
      imageUrl: {
        type : String
      },
      rating: {
        type : String
      }
    },
    rightSide : {
      imageUrl : {
        type : String
      },
      rating : {
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
    interior: {
      back : {
        imageUrl: {
          type: String
        }  
      },
      front : {
        imageUrl : {
          type : String
        }
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
      }
    },
    pollutionpaper: {
      imageUrl: {
        type : String,
      }
    },
    insurance: {
      imageUrl: {
        type : String,
      }
    },
  },
  inventory: {
    type: String,
  },
});

module.exports = new mongoose.model("Pickup", pickupSchema);
