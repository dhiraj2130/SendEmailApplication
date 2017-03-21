var http = require('http');

//req.params.excursionKey
//req.header.hostname

var opts = {
    host: req.header('hostname'),
    port: '8000',
    //protocol: 'http:',
    path: '/partyaddress/name',
    method: 'GET',
    // headers: this.headers,
    // auth: this.auth,
};



http.request(opts,function(res){

    var str ='';

    res.on('data',function(chunk){
        str += chunk;
    });

    res.on('end',function(){
        console.log(str);
    })

}).end();

