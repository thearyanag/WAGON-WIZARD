const tripRouter = require('express').Router();

const workshopDetails = require('../models/workshopProfile');
const tripDetails = require('../models/tripDetails');

tripRouter.post('/new' , async (req , res) => {
 
    const { workshop_id , user_id , mobile_number , vehicle , end } = req.body;
 
    const workshop = workshopDetails.findOne({'workshop_id' : workshop_id} , function (err,doc) {
        if(err) {
            res.status(501).send(err);
        }
    }).clone();

    const workshopLocation = workshop.location;
    const workshopName = workshop.name;

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
      }
      return result;
    }

    const trip = new tripDetails({
        'trip_id' : makeid(12),
        'pickup_user' : {
            'user_type' : 'customer',
            'user_id' : user_id,
            'contact' : mobile_number
        },
        'vehicle' : vehicle,
        'start' : {
            'name' : workshopName,
            'cordinate' : workshopLocation
        },
        'end' : end
    });

    await trip.save(function(err , doc) {
        if(err) {
            res.status(501).send(err);
        } else {
            res.status(200).send({
                trip_id : doc.trip_id
            });
        }
    });    
})

module.exports = tripRouter;