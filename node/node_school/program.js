var http = require('http');
var port = process.argv[2];

var data = [];


var server = http.createServer(function (req,res) {
    var stream = fs.createReadStream(filePath, {
        flags: 'r',
        encoding: 'utf8',
        fd: null,
        mode: '0666',
        autoClose: true
    });
    stream.on('data',function(chunk){
        data.push(chunk);
    });
    stream.on('end',function(){
        res.end(data.join(''));
    })
});
server.listen(port);