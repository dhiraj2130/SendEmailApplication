/**
 * Created by dhiraj.kumar on 17/12/2016.
 */
const Request = require('./request');
var mailgunmodel = function(options){
    if(!options.apikey){
        throw new Error('apiKey value must be defined ');
    }

    this.username = 'api';
    this.apiKey = options.apiKey;
    //this.domain = options.domain;
    this.auth = [this.username, options.apikey].join(':');
    //this.mute = options.mute || false;
   // this.timeout = options.timeout;

    this.host = options.host || 'api.mailgun.net';
    //this.endpoint = options.endpoint || '/v3/sandboxa74099bcdea14342a6b436007711c25a.mailgun.org';
    this.endpoint =    '/v3/sandboxa74099bcdea14342a6b436007711c25a.mailgun.org' ;//options.endpoint || '/v3/sandboxa74099bcdea14342a6b436007711c25a.mailgun.org';


 this.protocol = options.protocol || 'https:';
    this.port = options.port || 443;
    this.retry = options.retry || 1;

    // if (options.proxy) {
    //     this.proxy = options.proxy;
    // }

    this.options = {
        host: this.host,
        endpoint: this.endpoint,
        protocol: this.protocol,
        port: this.port,
        auth: this.auth,
      //  proxy: this.proxy,
      //  timeout: this.timeout,
       // retry: this.retry
    };
    
}

mailgunmodel.prototype.post = function ( data, fn) {
    var req = new Request(this.options);
    return req.request('POST', '/messages', data, fn);
};

module.exports = function (options) {
    return new mailgunmodel(options);
};