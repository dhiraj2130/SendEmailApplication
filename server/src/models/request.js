/**
 * Created by dhiraj.kumar on 17/12/2016.
 */
var https = require('https');
var http = require('http');

var qs = require('querystring');
var q = require('q');

function Request(options) {
    this.host = options.host;
    this.protocol = options.protocol;
    this.port = options.port;
    this.endpoint = options.endpoint;
    this.auth = options.auth;
}

Request.prototype.request = function (method, resource, data, fn) {
    this.deferred = q.defer();

    var self = this;
    var path = ''.concat(this.endpoint, resource);
    this.payload = '';
    this.headers = {};
    if(method === 'POST'){
        this.payload = qs.stringify(data);
        if (this.payload) path = path.concat('?', this.payload);
        var length = this.payload ? Buffer.byteLength(this.payload) : 0;
        this.headers['Content-Length'] = length;
    }

    var opts = {
        hostname: this.host,
        port: this.port,
        protocol: this.protocol,
        path: path,
        method: method,
        headers: this.headers,
        auth: this.auth,
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

Request.prototype.handleResponse = function (res) {
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

Request.prototype.performRequest = function (options) {
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

module.exports = Request;