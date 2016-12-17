/**
 * Created by dhiraj.kumar on 17/12/2016.
 */
const sendGridKey = require('../../config/sendGridKey').SENDGRID_API_KEY;
const sendGridRequest = require('./sendGridRequest');
var sendGridModel = function(options){

    if(!options.sendGridKey){
        throw new Error('sendGridKey value must be defined ');
    }
    //
    // this.username = 'api';
     this.sendGridKey = options.sendGridKey;
     //this.authHeader = [this.username, options.apikey].join(':');
    //
    //
     this.host = options.host || 'api.sendgrid.com';
    this.endpoint =   options.endpoint || '/v3/mail/send';
    //
     this.protocol = options.protocol || 'https:';
     this.port = options.port || 443;
    //
    this.options = {
        host: this.host,
        endpoint: this.endpoint,
        protocol: this.protocol,
        port: this.port,
        sendGridKey: this.sendGridKey,
    };
}

sendGridModel.prototype.post = function ( data, fn) {
    var req = new sendGridRequest(this.options);
    return req.request('POST', data, fn);
};

module.exports = function (options) {
    return new sendGridModel(options);
};



