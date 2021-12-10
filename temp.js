const dotenv = require('dotenv').config();
const axios = require('axios');

key=process.env.GOOGLE_API_KEY;

try {

    const origin ="26.428554"+"%2C"+"80.332833";
    const destination = "26.438543"+"%2C"+"80.334403";

    const { data } = axios.get(
        'https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${key}'
    )
    console.log("hey");
    console.log(typeofooo(data));
} catch(err) {
    console.log(err);
}

