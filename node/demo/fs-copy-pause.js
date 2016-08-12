var fs = require('fs');

var rs = fs.createReadStream('fs-open.js');
var ws = fs.createWriteStream('fs-open2.js');

rs.on('data',function(chunk){
    if(ws.write(chunk) == false){
        rs.pause();
    }
});

rs.on('end',function(){
    ws.end();
    console.log('end');
});

ws.on('drain',function(){
    rs.resume();
});