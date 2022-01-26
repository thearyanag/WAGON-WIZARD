const profile = require('express').Router();

const driverProfile = require('../models/driverProfile');
const path = require('path');
const { AWS } = require('../middleware/aws');

profile.get('/' , async(req , res) => {
    res.send("okay");
});


profile.post('/personalInfo' , async (req , res) => {
    const { transanction_hash , name , mail , dob , tee_size } = req.body;
    const driverPersonal = {
        'name' : name,
        'mail_id' : mail ,
        'dob' : dob,
        'tee_size' : tee_size
    };
    console.log(req.body);

    query = {
        'transanction_hash' : transanction_hash
    };

    await driverProfile.findOneAndUpdate( await query , driverPersonal , function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.status(200).send('Succesfully saved.');  
    }).clone().catch(function(err){ console.log(err)});
});

profile.post('/getPersonalInfo' , async (req,res) => {
    const { transanction_hash } = req.body;
    const profile = await driverProfile.find({ 'transanction_hash' : transanction_hash } , function(err , doc){}).clone();
    res.status(200).send(profile);
});


profile.post('/uploadProfilePic' ,  async (req ,res) => {

    try {

    var { transanction_hash } = req.body;
    const { pp } = req.body;
    var pp_content = Buffer.from(pp, 'base64'); 

    } catch (err) {
        console.log(502);
        res.status(501).send(req.body);
        console.log(503);
    }
    
    

    const s3 = new AWS.S3();

    const keyname = "profilepics/"+"ARYAN"+".png";
    console.log(keyname);

    // Setting up S3 upload parameters
    const params = {
        ACL : "public-read",
        Bucket: 'wagenwiz',
        Key: keyname, // File name you want to save as in S3
        Body: pp_content
    };

    

    // Uploading files to the bucket
    await s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }

        query = {
            'transanction_hash' : transanction_hash
        };

            if (err) return res.send(500, {error: err});
            res.send({
                "response_code": 200,
                "response_message": "Success",
                "response_data": data
            }); 

        console.log(data)

    });
});

profile.post('/getPaymentHistory' , async(req , res) => {

    const { transanction_hash } = req.body;

    const trips = await driverProfile.find( {'transanction_hash' : transanction_hash} , function(err , doc){}).clone();
    const totalPayment = 0;
    const paymentHistory = [];

    for(const trip of trips) {
        paymentHistory.push({'tripId' : trip.trip_id , "payment" : trip.price});
        totalPayment = totalPayment + trip.price;
    }

    res.status(200).send(paymentHistory , { 'totalPayment' : totalPayment });
});

profile.post('/getProfilePic' , async(req , res) => {

    const { transanction_hash } = req.body;
    console.log(transanction_hash);
    const profile = await driverProfile.find({ 'transanction_hash' : transanction_hash } , function(err , doc){}).clone();
    const { profile_pic } = profile;
    res.status(200).send(profile_pic.url);

});

module.exports = profile;
