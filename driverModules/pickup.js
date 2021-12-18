const axios = require('axios');


const pickup = require('express').Router();

const tripDetails = require('../models/tripDetails');

pickup.get('/' , async (req , res) => {
    res.status(200).send('Bella Ciao !');
}); 

pickup.get('/getPickupData' , async (req , res) => {
    const { transanction_hash } = req.body;

    query = { 'user_id' : transanction_hash };

    tripDetails.findOne(query , function (err , doc) {
        if(err) {
            res.status(501).send(err);
        } else {
            res.status(200).send(doc);
        }
    }).clone();
});

pickup.post('/requestCashPickup' , async(req , res) => {
    const { transanction_hash , tripId} = req.body;

    const query = {
        'transanction_hash' : transanction_hash,
        'trip_id' : tripId
    };

    tripDetails.findOne(query , function(err , doc) {
        if(err) {
            res.status(501).send(err);
        } else {
            res.status(200).send('Will be communicated');
        }
    }).clone();
})

pickup.get('/try' , async (req , res) => {
    key=process.env.GOOGLE_API_KEY;

try {

        const origin ="26.428554"+"%2C"+"80.332833";
        const destination = "26.438543"+"%2C"+"80.334403";
        const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=26.428554%2C80.332833&destinations=26.438543%2C80.334403&key='+key;
        console.log(url);

        const { data } = axios.get(
            url
        );

        res.send(data);
    } catch(err) {
        res.send(err);
    }
});

module.exports = pickup;