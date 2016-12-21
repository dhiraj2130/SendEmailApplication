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


router.post('/mail',(req,res) => {

   var  randomNo = Math.floor(Math.random()*2)+1;

    if(randomNo == 1 ){
        sendMailGunFunction((error,body)=>{
            if(error){
                sendSendGridFunction((error,body) =>{
                    if(error){
                        res.status(error.statusCode).send(error.status);
                    }
                    res.status(200).send(body);
                })
            }
            console.log(`send mail gun worked as first hit.`);
            res.status(200).send(body);
        })
    }else{
        sendSendGridFunction((error,body)=>{
            if(error){
                console.log(`sendGridFailed. trying out mailgun now.${JSON.stringify(error)}`)
                sendMailGunFunction((error,body) =>{
                    if(error){
                        res.status(error.statusCode).send(error.status);
                    }
                    console.log(` Mail gun worked after send grid failed`);
                    res.status(200).send(body);
                })
            }
            res.status(200).send(body);
        })
    }
});

const sendMailGunFunction = function(cb){

    var api_key = 'key-8d6d84a2b9890fb3a091217c4b368758';

    var mailgun = mailgunmodel({apikey: api_key});

    var data = mailConfig;
     mailgun.post(data, cb);
}

const sendSendGridFunction = function(cb){

    var sendGrid = sendGridModel({sendGridKey: "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"});
   // the above key will not work as it is blocked.
    var data = mailConfig;
    sendGrid.post(data, cb);
}

module.exports = router;