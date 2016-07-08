var http = require('http');
var url = require('url');

function startServer(route,handle){
    function onRequest(request, response){
        var pathname = url.parse(request.url).pathname;
        route(handle, pathname, response, request);

    }
    http.createServer(onRequest).listen(8080);
}

exports.startServer = startServer;
