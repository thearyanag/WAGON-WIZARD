const login = require('express').Router();

const twilio_service_id='VAd25bedb8ba696875f5067f321ea586bc';

login.post('/number' ,async (req , res) => {
    const { number } = req.body; 
    console.log(number);
    var status; 
    function set(number) {
      status = number;
    }
    await client.verify.services(twilio_service_id)
             .verifications
             .create({to: number, channel: 'sms'})
             .then(verification => set(verification.status));
    if(status == "pending") {
      res.send(200);
    } else {
      res.send(500);
    }
});

login.get('/' , (req , res) => {
  res.send("it works");
});

login.post('/verifyOtp' , async (req , res) => {
    const { number , otp } = req.body;
  
    var status; 
    function set(number) {
      status = number;
    }  
  
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
  
    await client.verify.services(twilio_service_id)
        .verificationChecks
        .create({to: number, code: otp})
        .then(verification_check => set(verification_check.status));
    if(status == "approved") {
      hash = makeid(14);
      res.send({ 'transanction_hash' : hash });
    } else {
      res.status(404).send("Invalid OTP");
    }
  });

module.exports = login;