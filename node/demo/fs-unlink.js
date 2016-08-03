var fs = require('fs');

fs.unlink('text.txt',function(err){
    if(err){
        console.error(err);
    }
})