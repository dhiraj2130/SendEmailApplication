/**
 * Created by dhiraj.kumar on 16/12/2016.
 */
const express = require('express');

const router = express.Router();
const mailgunmodel = require('../models/mailgunmodel');
const mailConfig = require('../../config/mailConfig');

router.post('/',(req,res) => {


    var api_key = 'key-8d6d84a2b9890fb3a091217c4b368758';
   // var domain = 'www.mydomain.com';
    var mailgun = mailgunmodel({apikey: api_key});

    var data = mailConfig;

    mailgun.post(data, function (error, body) {
        if(error){
            res.status(error.statusCode).send(error.status);
        }
        res.status(200).send(body);
    });
});

module.exports = router;