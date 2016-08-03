var http = require('http');
var querystring = require('querystring');

var server = http.createServer(function(req,res){
    var post = '';
    req.on('data',function(chunk){
        post += chunk;
    });

    req.on('end',function(){
        post = querystring.parse(post);
        res.write('post title is: '+post.title+'&');
        res.write('post text is: '+post.text);
        res.end();
    });
});

server.listen(8080);