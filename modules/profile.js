const profile = require('express').Router();

const driverProfile = require('../models/driverProfile');

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

module.exports = profile;
