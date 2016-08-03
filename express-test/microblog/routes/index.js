var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.user = function(req,res){

};

router.post = function(req,res){

};

router.reg = function(req,res){

};

router.regAction = function(req,res){

};

router.login = function(req,res){

};

router.loginAction = function(req,res){

};

router.logout = function(req,res){

};


module.exports = router;
