/**
 * Created by dhiraj.kumar on 17/12/2016.
 */
var https = require('https');
var http = require('http');

var qs = require('querystring');
var q = require('q');

function sendGridRequest(options) {
    this.host = options.host;
    this.protocol = options.protocol;
    this.port = options.port;
    this.endpoint = options.endpoint;
    this.sendGridKey = options.sendGridKey;
}

sendGridRequest.prototype.request = function (method,  data, fn) {
    this.deferred = q.defer();

    var self = this;
    var path = this.endpoint;
    this.payload = `{"personalizations": 
        [
    {"to": [{"email": "dhirajvit@yahoo.com"}]}],
        "from": {"email": "dhirajvit@gmail.com"},
    "subject": "Sending with SendGrid is Fun",
        "content": [{"type": "text/plain", "value": "and easy to do anywhere, even with cURL"

    }
    ]

}`;
    this.headers = {};
    if(method === 'POST'){
        //this.payload = qs.stringify(data);

        var authHeader = " Bearer "+ this.sendGridKey;

        this.headers['Authorization'] = authHeader ;
        this.headers['Content-Type']= 'application/json' ;
    }

    var opts = {
        hostname: this.host,
        port: this.port,
        protocol: this.protocol,
        path: path,
        method: method,
        headers: this.headers,
        //payload: this.payload,
    };

    function finalCb(error, body) {
        if (error) {
            self.deferred.reject(error);
        }
        else {
            self.deferred.resolve(body);
        }
        return fn(error, body);
    }

    this.callback = finalCb;
    this.performRequest(opts);

    return this.deferred.promise;
}

sendGridRequest.prototype.handleResponse = function (res) {
    var self = this;
    var chunks = '';
    var error;

    res.on('data', function (chunk) {
        chunks += chunk;
    });

    res.on('error', function (err) {
        error = err;
    });

    res.on('end', function () {
        var body;
        if (!error && res.statusCode !== 200) {
            var msg = body ? body.message || body.response : body || chunks || res.statusMessage;
            error = new Error(msg);
            error.statusCode = res.statusCode;
        }

        return self.callback(error, body);
    });
};

sendGridRequest.prototype.performRequest = function (options) {
    var self   = this;
    var method = options.method;

        var req;

        if (options.protocol === 'http:') {
            req = http.request(options, function (res) {
                return self.handleResponse(res);
            });
        }
        else {
            req = https.request(options, function (res) {
                return self.handleResponse(res);
            });
        }

        req.on('error', function (e) {
            return self.callback(e);
        });

        if (this.payload && (method === 'POST')) {
            req.write(this.payload);
        }
        req.end();
};

module.exports = sendGridRequest;