const mongoose = require("mongoose");

const pickupDetails = require('./pickupdetails')
const  ObjectID = require('mongodb').ObjectId;

const tripSchema = new mongoose.Schema({
  trip_id : {
    type : String,
    required : true
  },
  pickup_user : {
    user_type : {
      type : String,
      required : true
    },
    user_id : {
      type : String,
      required : true
    },
    contact : {
      type : Number,
      required : true
    }
  },
  eta : {
    type : Date,
  },
  vehicle : {
    model : {
      type : String,
      required : true
    },
    number : {
      type : String,
      required : true
    }
  },
  start: {
    name : {
      type : String , 
      required : true
    },
    cordinates : {
      type : [Number],
      required : true,
      default : [0.0,0.0] // [latitude,longitude]
    }
  },
  end: {
    name : {
      type : String , 
      required : true
    },
    cordinates : {
      type : [Number],
      required : true,
      default : [0.0,0.0] // [latitude,longitude]
    }
  },
  price: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status : {
    type : String,
    default : "Pending"
  },
  distanceToTravel : {
    type: Number,
    required: true,
  },
  speed: {
    type: Number,
  },
  performanceRating: {
    type: Number,
  },
  ratingByWorkshop: {
    type: Number,
  },
  pickupDetail : {
    type : ObjectID,
    ref : pickupDetails,
    autopopulate : true
  }
});
tripSchema.plugin(require('mongoose-autopopulate'));

module.exports= new mongoose.model("tripDetails",tripSchema);
