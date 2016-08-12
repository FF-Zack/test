var fs = require('fs');

var rs = fs.createReadStream('fs-open.js');

rs.on('data',function(chunk){
    console.log(chunk.toString('utf-8'));
});

rs.on('end',function(){
    console.log('end');
});