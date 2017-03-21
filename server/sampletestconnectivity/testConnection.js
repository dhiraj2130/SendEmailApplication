var http = require('http');



var opts = {
    host: 'localhost',
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

