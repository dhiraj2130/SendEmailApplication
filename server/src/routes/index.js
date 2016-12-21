/**
 * Created by dhiraj.kumar on 16/12/2016.
 */
const express = require('express');

const router = express.Router();
const mailgunmodel = require('../models/mailgunmodel');
const mailConfig = require('../../config/mailConfig');
const mailGunKey = require('../../config/mailgunkey').api_key;
const sendGridKey_ = require('../../config/mailgunkey').api_key;
const sendGridModel = require('../models/sendGridModel');

router.post('/test',(req,res) => {
    console.log(" req received ");
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).send({message:'our mail is accepted for processing'});
})
router.post('/',(req,res) => {


    var api_key = 'key-8d6d84a2b9890fb3a091217c4b368758';

    var mailgun = mailgunmodel({apikey: api_key});

    var data = mailConfig;

    mailgun.post(data, function (error, body) {
        if(error){
            res.status(error.statusCode).send(error.status);
        }
        res.status(200).send(body);
    });
});

router.post('/sendGrid',(req,res) => {


    //var api_key = mailGunKey;//'key-8d6d84a2b9890fb3a091217c4b368758';

    var sendGrid = sendGridModel({sendGridKey: "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"});

    var data = mailConfig;

    sendGrid.post(data, function (error, body) {
        if(error){
            res.status(error.statusCode).send(error.status);
        }
        res.status(200).send(body);
    });
});

module.exports = router;