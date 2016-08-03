var fs = require('fs');

fs.open('text.txt','w+',function(err,fd){
    if(!err){
        console.log(fd);  //文件描述符是一个非负整数，表示操作系统内核为当前进程所维护的打开文件的记录表索引。
    }
})