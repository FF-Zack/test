var fs = require('fs');
var path = require('path');

fs.readdir(process.argv[2],function(err,list){
    var newList = list.filter(function(obj){
        return path.extname(obj) == '.'+process.argv[3];
    });
    for(var i = 0;i<newList.length;i++){
        console.log(newList[i]);
    }

});

