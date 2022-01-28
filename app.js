// importing the dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv').config()
require('./db/connect');
console.log(process.env.DATABASE_URI)
//definig the express app
const app = express();
// adding Helmet to enhance API's security
app.use(helmet());
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan('combined'));

const bodyParser = require('body-parser')

app.use(bodyParser.json({
  limit : '50mb'
}));

app.use(bodyParser.urlencoded({ extended: false , limit: '50mb' , parameterLimit:50000}));


const driverRouter = require('./driverModules/driver');
const adminRouter = require('./adminModules/admin');
const workshopRouter = require('./workshopModules/workshop');
const { adminBro , adminBroRouter } = require('./adminModules/adminbro');

heroku_port=process.env.PORT;
console.log(heroku_port);
const PORT = process.env.PORT || 3000;
const ORIGIN=process.env.ORIGIN || `http://localhost:${PORT}`;
console.log(PORT ,ORIGIN)
app.use('/driver' , driverRouter);
// app.use('/admin' , adminRouter);
app.use('/workshop' , workshopRouter);
app.use(adminBro.options.rootPath , adminBroRouter);

app.get('/' , (req, res) => {
  console.log('1');
  res.status(200).send('<h1>Hey Nigga,  go and do some work</h1>')
  console.log(req.body);
});

module.exports = app;