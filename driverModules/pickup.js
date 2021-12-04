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


module.exports = pickup;