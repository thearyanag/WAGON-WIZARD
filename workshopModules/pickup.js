const pickup = require("express").Router();

const tripDetails = require("../models/tripDetails");
const pickupDetails = require("../models/pickupdetails");

pickup.get("/", async (req, res) => {
  res.status(200).send("hello brother");
});

pickup.post("/viewStatus", async (req, res) => {
  const { trip_id } = req.body;

  const tripDetail = await tripDetails.findOne({ trip_id: trip_id });

  if (!tripDetail) return res.status(500).send("error");

  return res.status(200).send({ status: tripDetail.status });
});


pickup.post("/viewcarpics", async (req, res) => {
  const { tripId } = req.body;

  const pics = await pickupDetails.find({ trip_id: tripId });
  const { car_pics } = pics[0];

  return res.status(200).send(car_pics.url);
});

module.exports = pickup;
