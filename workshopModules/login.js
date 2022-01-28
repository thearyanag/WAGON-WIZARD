const dotenv = require("dotenv").config();

const workshoplogin = require("express").Router();

const workshop = require("../models/workshopProfile");
const accountSid = process.env.twilioAccountSid;
const authToken = process.env.twilioAuthToken;
const client = require("twilio")(accountSid, authToken);
const twilio_service_id = process.env.twilioServiceId;

workshoplogin.post("/number", async (req, res) => {
  const { number } = req.body;
  var status;
  function set(number) {
    status = number;
  }
  console.log(req.body);
  await client.verify
    .services(twilio_service_id)
    .verifications.create({ to: number, channel: "sms" })
    .then((verification) => set(verification.status));
  if (status == "pending") {
    res.send(200);
  } else {
    res.send(500);
  }
});

workshoplogin.get("/", (req, res) => {
  res.send("working");
});

workshoplogin.post("/verifyOtp", async (req, res) => {
  const { number, otp } = req.body;

  var status;
  function set(number) {
    status = number;
  }

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  await client.verify
    .services(twilio_service_id)
    .verificationChecks.create({ to: number, code: otp })
    .then((verification_check) => set(verification_check.status));
  if (status == "approved") {
    hash = makeid(14);

    const workshop1 = new workshop({
      workshop_id: hash,
      contact: {
        mobile_number: number,
      },
    });

    await workshop1.save();

    res.send({ workshop_id: hash });
  } else {
    res.status(404).send("Invalid OTP");
  }
});

module.exports = workshoplogin;
