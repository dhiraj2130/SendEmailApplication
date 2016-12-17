/**
 * Created by dhiraj.kumar on 17/12/2016.
 */
const sendGridKey = require('../../config/sendGridKey').SENDGRID_API_KEY;

var sendGridModel = function(options){

    if(!options.sendGridKey){
        throw new Error('sendGridKey value must be defined ');
    }
    //
    // this.username = 'api';
     this.sendGridKey = options.sendGridKey;
    // this.auth = [this.username, options.apikey].join(':');
    //
    //
    // this.host = options.host || 'api.mailgun.net';
    // this.endpoint =   options.endpoint || '/v3/sandboxa74099bcdea14342a6b436007711c25a.mailgun.org';
    //
    // this.protocol = options.protocol || 'https:';
    // this.port = options.port || 443;
    //
    // this.options = {
    //     host: this.host,
    //     endpoint: this.endpoint,
    //     protocol: this.protocol,
    //     port: this.port,
    //     auth: this.auth,
    // };

}

// mailgunmodel.prototype.post = function ( data, fn) {
//     var req = new Request(this.options);
//     return req.request('POST', '/messages', data, fn);
// };

module.exports = function (options) {
    return new sendGridModel(options);
};



