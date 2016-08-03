var fs = require('fs');

fs.readFile('emit.js','utf8',function(err,data){
    if(!err){
        console.log(data);
    }
})

var emitTxt = fs.readFileSync('emit.js','utf8');
console.log(emitTxt);