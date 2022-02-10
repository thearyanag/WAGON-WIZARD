const workshop = require('express').Router();

const tripRouter = require('./trip');
const loginRouter = require("./login");
const profileRouter = require("./Profile");
const pickupRouter = require("./pickup");

workshop.use("/trip", tripRouter);
workshop.use("/login", loginRouter);
workshop.use("/profile", profileRouter);
workshop.use("/pickup", pickupRouter);


module.exports = workshop;
