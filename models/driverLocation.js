const mongoose = require('mongoose');
const { Schema } = mongoose;

const drive_location = new Schema({
    device_hash : {
        type : String,
        required : [true , '0']
    },
    driver_id : {
        type : String,
        required : [true , '1']
    },
    cordinates : {
        type : [Number],
        required : true,
        default : [0.0,0.0] // [latitude,longitude]
    },
    status : {
        type : String,
        default : "available"
    }
});

module.exports =  mongoose.model('driverLocation', drive_location);
