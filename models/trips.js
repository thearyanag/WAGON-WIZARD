const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

const tripSchema = new mongoose.Schema({
  starting_point: {
    type: String,
    required: true,
  },
  ending_point: {
    type: String,
    required: true,
  },
  price: {
    type: tripSchema.Double,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  time: {
    type: Number,
    default: new Date().getTime(),
  },
  total_distance: {
    type: tripSchema.Double,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  performance_rating: {
    type: Number,
    required: true,
  },
  ratingbyworkshop: {
    type: Number,
    required: true,
  },
  lastweektotalreview: {
    type: Number,
    required: true,
  },
});

const Trips = new mongoose.model("Trips",tripSchema);
module.exports=Trips;
