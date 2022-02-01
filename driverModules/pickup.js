const axios = require('axios');
const pickup = require('express').Router();

const fileUpload = require('express-fileupload');
require('../middleware/aws');

const tripDetails = require('../models/tripDetails');
const pickupDetails = require('../models/pickupdetails');

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



pickup.post('/postCarPics' , async (req ,  res) => {
    
    try {
        const { transanction_hash , tripId } = req.body;
        // const { front , back , leftSide , rightSide ,  }
        const fileContent  = req.files 
        const front = fileContent.front
        const back = fileContent.back
        const leftSide = fileContent.leftSide
        const rightSide = fileContent.rightSide
        const interior1 = fileContent.frontInterior
        const interior2 = fileContent.backInterior
        const fuelGaze = fileContent.fuelGaze
        } catch (err) {
            res.status(501).send(err);
        }

        const condition = ["front" , "back" , "leftSide" , "rightSide" , "frontInterior" , "backInterior" , "fuelGaze"]; 
        function getDate() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy +'-' + mm + '-' + dd;
            return today;
        }
        const s3 = new AWS.S3();
        for(let i=0 ; i<7 ; i++) {
            keyname = "condition/"+"transanction_hash/"+getDate()+"/"+condition[i]+".png";

            const params = {
                ACL : "public-read",
                Bucket : 'wagenwiz',
                
            }
        }


        keyname = "profilepics/"+transanction_hash+".png";
    
        // Setting up S3 upload parameters
        const params = {
            ACL : "public-read",
            Bucket: 'wagenwiz',
            Key: keyname, // File name you want to save as in S3
            Body: fileContent 
        };
    
        // Uploading files to the bucket
        await s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
    
            query = {
                'transanction_hash' : transanction_hash
            };
    
            console.log(data)
    
            driverProfile.findOneAndUpdate(query , { profile_pic : data.Location }, function(err, doc) {
                if (err) return res.send(500, {error: err});
                res.send({
                    "response_code": 200,
                    "response_message": "Success",
                    "response_data": data
                }); 
                }).clone().catch(function(err){ console.log(err)});
    
        });
        
        
})

module.exports = pickup;