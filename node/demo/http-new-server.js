var http = require('http');

var server = new http.Server();

server.on('request',function(req,res){
    res.writeHead(200,{'content-type':'text/html'});
    res.write('<h1>hello world</h1>');
    res.end();
    console.log('server request');
})

server.listen(8080);