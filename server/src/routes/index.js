/**
 * Created by dhiraj.kumar on 16/12/2016.
 */
const express = require('express');
const { validate } = require('express-jsonschema');
const router = express.Router();
const mailgunmodel = require('../models/mailgunmodel');
const mailConfig = require('../../config/mailConfig');
const mailGunKey = require('../../config/mailgunkey').api_key;
const sendGridKey = require('../../config/sendGridKey').SENDGRID_API_KEY;
const sendGridModel = require('../models/sendGridModel');
const emailschema = require('../schema');


const methodNotAllowed = (req, res) => {
    res.status(405).end();
};

router.put('/', methodNotAllowed);
router.get('/', methodNotAllowed);
router.delete('/', methodNotAllowed);

router.options('/mail',(req,res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers','Content-Type');
    res.status(200).send('ok');
})

router.post('/mail',validate({body:emailschema}),(req,res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');

    var  randomNo = Math.floor(Math.random()*2)+1;

     var data  = {};
        data.from = req.body.emailFrom;//'postmaster@sandboxa74099bcdea14342a6b436007711c25a.mailgun.org';
         data.to = req.body.emailTo;
         data.subject = req.body.emailSubject;
         data.text = req.body.emailContent;

    if(randomNo == 1 ){
        sendMailGunFunction(data,(error,body)=>{
            if(error){
                sendSendGridFunction(data,(error,body) =>{
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
        sendSendGridFunction(data,(error,body)=>{
            if(error){
                console.log(`sendGridFailed. trying out mailgun now.${JSON.stringify(error)}`)
                sendMailGunFunction(data,(error,body) =>{
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

const sendMailGunFunction = function(data,cb){

    var mailgun = mailgunmodel({apikey: mailGunKey});
   // var data = mailConfig;
     mailgun.post(data, cb);
}

const sendSendGridFunction = function(data,cb){

    var sendGrid = sendGridModel({sendGridKey: sendGridKey});
   // the above key will not work as it is blocked.
  //  var data = mailConfig;
    sendGrid.post(data, cb);
}

module.exports = router;