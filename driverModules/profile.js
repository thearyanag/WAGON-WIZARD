const profile = require('express').Router();
const fileUpload = require('express-fileupload');

const driverProfile = require('../models/driverProfile');
const path = require('path');
require('../middleware/aws');

profile.use(fileUpload);

profile.post('/personalInfo' , async (req , res) => {
    const { transanction_hash , name , mail , dob , tee_size } = req.body;
    const driverPersonal = {
        'name' : name,
        'mail_id' : mail ,
        'dob' : dob,
        'tee_size' : tee_size
    };

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

    const { transanction_hash } = req.body;
    const fileContent  = Buffer.from(req.files.profilepicture.data , 'binary');

    } catch (err) {
        res.status(501).send(err);
    }
    
    const s3 = new AWS.S3();

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

        driverProfile.findOneAndUpdate(query , { profile_pic : data.Location }, function(err, doc) {
            if (err) return res.send(500, {error: err});
            res.send({
                "response_code": 200,
                "response_message": "Success",
                "response_data": data
            }); 
            }).clone().catch(function(err){ console.log(err)});

    });

});

profile.post('/getProfilePic' , async(req , res) => {

    const { transanction_hash } = req.body;
    console.log(transanction_hash);
    const profile = await driverProfile.find({ 'transanction_hash' : transanction_hash } , function(err , doc){}).clone();
    const { profile_pic } = profile;
    console.log(profile_pic);
    res.status(200).send(profile);

});

module.exports = profile;
