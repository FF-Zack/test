var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var crypto = require('crypto');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.user = function(req,res){

};

router.post = function(req,res){

};

router.reg = function(req,res){
  res.render('reg',{title :'用户注册'})
};

router.regAction = function(req,res){
  if(req.body['password-repeat'] != req.body['password']){
    req.flash('error','两次输入口令不同！');
    return res.redirect('/reg');
  }
  //生成口令散列值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
    name : req.body.username,
    password : password
  });

  User.get(newUser.name, function(err,user){
    if(user){
      err = '用户名已存在';
    }
    if(err){
      req.flash('error',err);
      return res.redirect('/reg');
    }
    newUser.save(function(err){
      if(err){
        req.flash('error',err);
        return res.redirect('/reg');
      }
      req.session.user = newUser;
      req.flash('success','注册成功');
      res.redirect('/');
    })
  })


};

router.login = function(req,res){

};

router.loginAction = function(req,res){

};

router.logout = function(req,res){
  req.session.user = null;
  req.flash('success','登出成功');
  req.redirect('/');
};


module.exports = router;
