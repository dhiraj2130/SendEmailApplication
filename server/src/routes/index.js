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

// block other types of http methods.
router.put('/', methodNotAllowed);
router.get('/', methodNotAllowed);
router.delete('/', methodNotAllowed);

// options is required for CORS implemetation
router.options('/mail',(req,res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers','Content-Type');
    res.status(200).send('ok');
})

router.post('/mail',validate({body:emailschema}),(req,res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');

    // generate a random no. 1 or 2
    var  randomNo = Math.floor(Math.random()*2)+1;

     var data  = {};
        data.from = 'postmaster@sandboxa74099bcdea14342a6b436007711c25a.mailgun.org';
         data.to = req.body.emailTo;
         data.subject = req.body.emailSubject;
         data.text = req.body.emailContent;

    if(randomNo == 1 ) {
        sendMailGunFunction(data, (error, body)=> { // do nothing. just a placeholder
        }).then(body => {
            res.status(200).json({ result: "ok" });
        }).catch(error => {
            console.log(" Send mail through mail gun failed ");
            console.log(JSON.stringify(error));

            sendSendGridFunction(data, (error, body) => { // do nothing. just a placeholder
            }).then(body => {
                res.status(200).json({ result: "ok" });
            }).catch(error => {
                console.log(" Send mail through send Grid failed ");
                console.log(JSON.stringify(error));
                res.status(error.statusCode).send(error.status); // error code needs to be set properly.this will only capture
            })
        })
    }else{
        sendSendGridFunction(data, (error, body)=> { // do nothing. just a placeholder
        }).then(body => {
            res.status(200).json({ result: "ok" });
        }).catch(error => {
            console.log(" Send mail through send Grid failed ");
            console.log(JSON.stringify(error));

            sendMailGunFunction(data, (error, body) => { // do nothing. just a placeholder
            }).then(body => {
                res.status(200).json({ result: "ok" });
            }).catch(error => {
                console.log(" Send mail through mail gun failed ");
                console.log(JSON.stringify(error));
                res.status(error.statusCode).send(error.status); // error code needs to be set properly.this will only capture
            })
        })
    }
});

const sendMailGunFunction = function(data, cb){

    var mailgun = mailgunmodel({apikey: mailGunKey});
    return mailgun.post(data, cb);
}

const sendSendGridFunction = function(data,cb){

    var sendGrid = sendGridModel({sendGridKey: sendGridKey});
    return sendGrid.post(data, cb);
}

module.exports = router;