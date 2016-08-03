var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:false}));

app.all('/',function(req,res){
    res.send(req.body.title);
})

app.listen(8080);


