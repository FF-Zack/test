var fs = require('fs');

fs.open('text.txt', 'r', function(err,fd){
    if(err){
        console.error(err);
        return;
    }
    var buf = new Buffer(8);
    // fs.read的功能是从指定的文件描述符  fd 中读取数据并写入  buffer 指向的缓冲区对象。
    //fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead, buffer)])
    //offset 是 buffer 的写入偏移量。 length 是要从文件中读取的字节数
    //position 是文件读取起始位置
    fs.read(fd, buf, 0, 8, null, function(err, bytesRead, buffer){
        if(err){
            console.err(err);
            return;
        }
        console.log('bytesRead: '+bytesRead);
        console.log(buffer);
    })
})