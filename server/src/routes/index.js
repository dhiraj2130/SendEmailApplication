/**
 * Created by dhiraj.kumar on 16/12/2016.
 */
const express = require('express');

const router = express.Router();
const mailgunmodel = require('../models/mailgunmodel');
const mailConfig = require('../../config/mailConfig');
const mailGunKey = require('../../config/mailgunkey').api_key;
const sendGridKey = require('../../config/mailgunkey').api_key;

router.post('/',(req,res) => {


    //var api_key = mailGunKey;//'key-8d6d84a2b9890fb3a091217c4b368758';

    var mailgun = mailgunmodel({apikey: mailGunKey});

    var data = mailConfig;

    mailgun.post(data, function (error, body) {
        if(error){
            res.status(error.statusCode).send(error.status);
        }
        res.status(200).send(body);
    });
});

module.exports = router;