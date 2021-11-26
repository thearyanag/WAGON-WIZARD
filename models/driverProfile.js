import mongoose from 'mongoose';

const { Schema } = mongoose;

const driver_profile = new Schema({
    name : {
        type : String
    },
    mobile_number : {
        type : Number,
        required : [true , 'Phone number is compulsory !']
    },
    mail_id : {
        type : String
    },
    isVerified : {
        type : Number,
        required : [true , 'Verification Status required'],
        default : 2
    },
    address : {
        type : String
    },
    tee_size : {
        type : String
    }
});