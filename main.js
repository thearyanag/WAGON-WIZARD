// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv').config()
require('./db/connect');
//definig the express app
const app = express();
// adding Helmet to enhance API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan('combined'));

const driverRouter = require('./driverModules/driver');
const adminRouter = require('./adminModules/admin');
const workshopRouter = require('./workshopModules/workshop');
const { adminBro , adminBroRouter } = require('./adminModules/adminbro');

port = 8000;
heroku_port=process.env.PORT;

app.use('/driver' , driverRouter);
// app.use('/admin' , adminRouter);
app.use('/workshop' , workshopRouter);
app.use(adminBro.options.rootPath , adminBroRouter);

app.get('/' , (req, res) => {
  res.send('<h1>Hey ,  go and do some work</h1>')
});

app.listen(heroku_port || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

