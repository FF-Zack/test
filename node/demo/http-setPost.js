var http = require('http');
var querystring = require('querystring');

var contents = querystring.stringify({
    name : 'test',
    email : 'ff@11.com',
    address : 'xxxxxxxxxxxx'
});

var options = {
    host : 'localhost',
    path : '/app/post.php',
    method : 'POST',
    headers : {
        'content-Type' : 'application/x-www-form-urlencoded',
        'content-length' : contents.length
    }
};

var req = http.request(options,function(res){
    res.setEncoding('utf8');
    res.on('data',function(data){
        console.log(data);
    })
});

req.write(contents);
req.end();

