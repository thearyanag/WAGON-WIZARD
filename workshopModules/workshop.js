const workshop = require('express').Router();

const tripRouter = require('./trip');

workshop.use('/trip' , tripRouter);

module.exports = workshop;
