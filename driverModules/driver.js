const driver = require('express').Router();

const loginRouter = require('./login');
const pickupRouter = require('./pickup');
const profileRouter = require('./profile');

driver.use('/authenticate' , loginRouter);
driver.use('/profile' , profileRouter);
driver.use('/pickupScreen' , pickupRouter);

module.exports = driver;