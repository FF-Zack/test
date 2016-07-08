//delate start server
var event = require('events');
var eventEmitter = event.EventEmitter;
var someEvent = new eventEmitter();
var http = require('http');

someEvent.on('pee',function(){
    http.createServer(function(request,response){
        response.writeHead(200,{'content-type':'text/plain'});
        response.write('hello world');
        response.end();
    }).listen(8080);
});

setTimeout(function(){
    someEvent.emit('pee');
    console.log('server start');
},5000);