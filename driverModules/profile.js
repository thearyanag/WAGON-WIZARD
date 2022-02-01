const profile = require('express').Router();

const driverProfile = require('../models/driverProfile');
// const driverLocation
const path = require('path');
const { AWS } = require('../middleware/aws');

const AWSUpload = async (keyname , File) => {

    const s3 = new AWS.S3;
    const params = {
        ACL : "public-read",
        Bucket: 'wagenwiz',
        Key: keyname, // File name you want to save as in S3
        Body: File
    };

    const result = await s3.upload(params, function(err, data) {
        if(err) 
        { 
            return err;
        }
    }).promise();
    return result.Location;

}

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
    res.status(200).send(profile[0]);
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


    const keyname = "profilepics/"+transanction_hash+".png";
    // Setting up S3 upload parameters
    var result = await AWSUpload(keyname , pp_content);
    console.log("result"+result);
        query = {
            'transanction_hash' : transanction_hash
        };

        update = {
            'profile_pic' : {
                'url' : result
            }
        };

        driverProfile.findOneAndUpdate(query , update , function(err,doc) {
            if (err) return res.send(500, {error: err});
            return res.status(200).send('Succesfully saved.');  
        }).clone().catch(function(err){ console.log(err)});

});

profile.post('/updateKYCDocs' , async(req , res) => {
    const { transanction_hash } = req.body;

    const { aadhar_card , pan_card , driving_license , residential_proof } = req.body;
    const aadhar_content = Buffer.from(aadhar_card , 'base64');
    const pan_content = Buffer.from(pan_card , 'base64');
    const driving_content = Buffer.from(driving_license , 'base64');
    const residential_content = Buffer.from(residential_proof , 'base64');
})

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
    const { profile_pic } = profile[0];
    res.status(200).send(profile_pic.url);

});

profile.post('/dailyCheckIn' , async (req , res) => {
    const { transanction_hash , dailyCheck } = req.body;
  
    query = {
      'transanction_hash' : transanction_hash
    }
    
    if(dailyCheck == true) {
      await driverProfile.findOneAndUpdate(query , {'dailyCheck' : true} , function(err,doc) {
        if (err) return res.send(500, {error: err});
        return res.status(200).send('Updated');  
    }).clone().catch(function(err){ console.log(err)});
  
    }
  })
  
  profile.get('/getDailyCheck' , async(req , res) => {
    const { transanction_hash } = req.body;
  
    const profile = await driverProfile.find({ 'transanction_hash' : transanction_hash } , function(err , doc){}).clone();
    const { dailyCheck } = profile[0];
    console.log(profile)
    console.log(dailyCheck)
    return res.status(200).send({'dailyCheckIn' : dailyCheck});
  })
  
profile.post('/getStatus' , async(req , res) => {
    const { transanction_hash } = req.body;
    driver
})


module.exports = profile;
