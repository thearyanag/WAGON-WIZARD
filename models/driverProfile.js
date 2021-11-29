const mongoose = require    ("mongoose");  
const { Schema } = mongoose;

//min 18 age checker.
function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear()-18;
    today = yyyy +'-' + mm + '-' + dd;
    return today;
}

const driver_profile = new Schema({
    transanction_hash : {
        type : String,
        required : [true , 'A must !!']
    },
    name : {
        type : String
    },
    contact : {
        mobile_number : {
            type : Number,
            required : [true , 'Phone number is compulsory !'],
            min : 10
        },
        mail_id : {
            type : String
        },
        address : {
            type : String
        },
    },
    isVerified : {
        type : Number,
        default : 2
    },
    tee_size : {
        type : String
    },
    dob : {
        type : Date,
        max : getDate()
    }
});

module.exports = mongoose.model('driverProfile' , driver_profile);
