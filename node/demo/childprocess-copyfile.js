var child_process = require('child_process');
var util = require('util');

function copy(source, target, callback) {
    child_process.exec(
        util.format('copy', source, target), callback);
}

copy('test.js', 'test2.js', function (err) {
    // ...
    if(err) console.log(err);
    else console.log('suc');
});