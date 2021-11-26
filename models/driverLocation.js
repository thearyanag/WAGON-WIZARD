import mongoose from 'mongoose';

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
    latitude : {
        type : String,
        required : [true , '2']
    },
    longitude : {
        type : String,
        required : [true , '3']
    }
});

module.exports =  mongoose.model('driverLocation', drive_location);
