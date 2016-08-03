var fs = require('fs');

fs.realpath('emit.js',function(err,path){
    if(err){
        console.error(err);
    }
    else{
        console.log(path);
    }
})