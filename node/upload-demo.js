var server = require("./model/server");
var router = require("./model/router");
var requestHandlers = require("./model/requestHandlers");

var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;

server.startServer(router.route,handle);