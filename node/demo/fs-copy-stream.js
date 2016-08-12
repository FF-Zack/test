var fs = require('fs');

var rs = fs.createReadStream('fs-open.js');
var ws = fs.createWriteStream('fs-open2.js');

rs.on('data',function(chunk){
    ws.write(chunk);
});

rs.on('end',function(){
    ws.end();
    console.log('end');
});