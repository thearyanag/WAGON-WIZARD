
//Import the mongoose module
var mongoose = require('mongoose');
const dotenv = require('dotenv').config()

//Set up default mongoose connection
var mongoDB = process.env.DATABASE_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;
console.log('done')
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
