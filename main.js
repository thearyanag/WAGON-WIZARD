// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv').config()

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

const loginRouter = require('./modules/login')

port = 3000;
heroku_port=process.env.port;

app.use('/authenticate' , loginRouter);

app.listen(heroku_port || port, () => {
    console.log(`Example app listening at http://localhost:${heroku_port}`)
  })

