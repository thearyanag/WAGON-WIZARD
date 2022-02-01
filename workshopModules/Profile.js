const profile = require('express').Router();

const workshopProfile = require('../models/workshopProfile');
const path = require('path');
const { AWS } = require('../middleware/aws');

profile.get('/' , async(req , res) => {
    res.send("okay");
});


profile.post('/personalInfo' , async (req , res) => {
    const { workshop_id,name,number,doi  } = req.body;
    const workshopPersonal = {
        'name' : name,
        'mobile_number' : number ,
        'doi' : doi,
    };
    console.log(req.body);

    query = {
        'workshop_id' : workshop_id
    };

    await workshopProfile.findOneAndUpdate( await query , workshopPersonal , function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.status(200).send('Succesfully saved.');  
    }).clone().catch(function(err){ console.log(err)});
});

profile.post('/getPersonalInfo' , async (req,res) => {
    const { workshop_id } = req.body;
    const profile = await driverProfile.find({  'workshop_id' : workshop_id } , function(err , doc){}).clone();
    res.status(200).send(profile[0]);
});


profile.post('/uploadProfilePic' ,  async (req ,res) => {

    try {

    var { workshop_id } = req.body;
    const { pp } = req.body;
    var pp_content = Buffer.from(pp, 'base64'); 


    } catch (err) {
        console.log(502);
        res.status(501).send(req.body);
        console.log(503);
    }

    const s3 = new AWS.S3();

    const keyname = "profilepics/"+workshop_id+".png";
    // Setting up S3 upload parameters
    const params = {
        ACL : "public-read",
        Bucket: 'wagenwiz',
        Key: keyname, // File name you want to save as in S3
        Body: pp_content
    };

    // Uploading files to the bucket
    await s3.upload(params, function(err, data) {
        if (err) return res.send(500, {error: err});

        query = {
            'workshop_id' : workshop_id
        };

        update = {
            'profile_pic' : {
                'url' : data.Location
            }
        };

        workshopProfile.findOneAndUpdate(query , update , function(err,doc) {
            if (err) return res.send(500, {error: err});
            return res.status(200).send('Succesfully saved.');  
        }).clone().catch(function(err){ console.log(err)});

    });
});

profile.post('/getPaymentHistory' , async(req , res) => {

    const { workshop_id } = req.body;

    const trips = await workshopProfile.find( {'workshop_id' : workshop_id} , function(err , doc){}).clone();
    const totalPayment = 0;
    const paymentHistory = [];

    for(const trip of trips) {
        paymentHistory.push({'tripId' : trip.trip_id , "payment" : trip.price});
        totalPayment = totalPayment + trip.price;
    }

    res.status(200).send(paymentHistory , { 'totalPayment' : totalPayment });
});

profile.post('/getProfilePic' , async(req , res) => {

    const {workshop_id } = req.body;
    console.log(workshop_id);
    const profile = await workshopProfile.find({ 'workshop_id' : workshop_id } , function(err , doc){}).clone();
    const { profile_pic } = profile[0];
    res.status(200).send(profile_pic.url);

});


  


module.exports = profile;
