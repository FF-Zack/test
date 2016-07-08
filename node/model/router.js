function route(handle, pathname, response, request){
    if(typeof handle[pathname] === 'function'){
        handle[pathname](response,request);
    }
    else{
        console.log("no request handler for "+pathname);
        response.writeHead(404,{"content-type":"text/plain"});
        response.write('404 not found');
        response.end();
    }
}

exports.route = route;