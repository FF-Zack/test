var fs = require('fs');

function copy(src,dist){
    fs.createReadStream(src).pipe(fs.createWriteStream(dist));
}

copy('test.js','fs-copy-pipe.js');