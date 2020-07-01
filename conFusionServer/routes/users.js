/*const bodyParser=require('body-parser');
var User=require('../models/user');

var express = require('express');
var router = express.Router();

router.use(bodyParser.json());

// GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/signup',(req,res,next)=>{
     User.findOne({username:req.body.username}) //finding whether username is unique from database //alraedy have a username
         .then((user) =>{  // if user already exists any variable
             if(user != null){
              var err = new Error('User ' + req.body.username + ' already exists!');
              err.status = 403;
              next(err);
            }
            else{
               return User.create({
                 username:req.body.username,
                 password:req.body.password });
               }
                
              })
           .then((user)=>{   //no duplicate user exists
               res.statusCode=200;
               res.setHeader('Content-Type','application/json');
               res.json({status:'Registrartion Successful!',user:user})
              },(err)=>next(err))
               

              
           .catch((err)=>next(err));

});

router.post('/login',(req,res,next)=>{
  

    if (!req.session.user) { //checking for username property in signed cookie or signed cookie itself doesn't exist //session empty
      var authHeader = req.headers.authorization;
      if (!authHeader) {  //authHeader value doen't exists in header
          var err = new Error('You are not authenticated!');
          res.setHeader('WWW-Authenticate', 'Basic');              
          err.status = 401;
          next(err);
          return;
      }
  
       //authHeader value exists
      var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      var username = auth[0];//we have extracted username and password from auth
      var password = auth[1];
      User.findOne({username: username})
     .then((user) => {
       if (user === null) { //user is null , can;t find username with tht name// giving a new user name
        var err = new Error('User ' + username + ' does not exist!');
        err.status = 403; //forbidden
        return next(err);
      }
      else if (user.password !== password) { //user exists but user password is not matching
        var err = new Error('Your password is incorrect!');
        err.status = 403;
        return next(err);
      }
      else if (user.username === username && user.password === password) { //both username and password is correct
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are authenticated!')
      }
    })
    .catch((err) => next(err));
    }
  
  
    else { //req.session.user  already logged in earlier
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  }
});



router.get('/logout', (req, res) => {
  if (req.session) { //session should need to be exists (i.e) someone should be logged in
    req.session.destroy(); //session is destroyed and info is removed from server side
    res.clearCookie('session-id'); //clering the session from cookie so that client cn't use expired cookie
    res.redirect('/');    //redirecting to / home
  }
  else {  
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

  
module.exports = router;
   
*/


/*              passport
const bodyParser=require('body-parser');
var User=require('../models/user');

var express = require('express');
var router = express.Router();
var passport=require('passport');
router.use(bodyParser.json());

// GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




router.post('/signup',(req,res,next)=>{
     User.register(new User({username:req.body.username}) ,
       req.body.password,
       (err,user)=>{  //if can't register then shows error
             if(err){
              res.statusCode=500;
              res.setHeader('ContentType','application/json');
              res.json({err:err});//
                   }
            
            else {   //no duplicate user exists  
              passport.authenticate('local')(req, res, () => {
               res.statusCode=200;
               res.setHeader('Content-Type','application/json');
               res.json({success:true,status:'Registrartion Successful!'});
                });
               }
          
      });

});

router.post('/login',passport.authenticate('local'),(req,res,next)=>{ //buil in plugin that authenticates locally
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({success:true,status:'you are successfully logged in!'});//this shows in response

    


});



router.get('/logout', (req, res) => {
  if (req.session) { //session should need to be exists (i.e) someone should be logged in
    req.session.destroy(); //session is destroyed and info is removed from server side
    res.clearCookie('session-id'); //clering the session from cookie so that client cn't use expired cookie
    res.redirect('/');    //redirecting to / hom
  }
  else {  
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;




*/

// token based

/*
const bodyParser=require('body-parser');
var User=require('../models/user');

var express = require('express');
var router = express.Router();
var passport=require('passport');
var authenticate=require('../authenticate');
router.use(bodyParser.json());



// GET users listing. 
router.get('/', function(req, res) {
  res.send('respond with a resource');
});




router.post('/signup',(req,res)=>{
     User.register(new User({username:req.body.username}) ,
       req.body.password,
       (err)=>{  //if can't register then shows error
             if(err){
              res.statusCode=500;
              res.setHeader('ContentType','application/json');
              res.json({err:err});//
                   }
            
            else {   //no duplicate user exists  
              passport.authenticate('local')(req, res, () => {
               res.statusCode=200;
               res.setHeader('Content-Type','application/json');
               res.json({success:true,status:'Registrartion Successful!'});
                });
               }
          
      });

});


router.post('/login', passport.authenticate('local'), (req, res) => {

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});



router.get('/logout', (req, res) => {
 

    req.logout();
    
    res.redirect('/');
    
    });


module.exports = router;

*/

/*
//mongoose populate
const bodyParser=require('body-parser');
var User=require('../models/user');

var express = require('express');
var router = express.Router();
var passport=require('passport');
var authenticate=require('../authenticate');
router.use(bodyParser.json());



// GET users listing. 
router.get('/', function(req, res) {
  res.send('respond with a resource');
});




router.post('/signup',(req,res)=>{
     User.register(new User({username:req.body.username}) ,
       req.body.password,(err,user)=>{
     //if can't register then shows error
             if(err){
              res.statusCode=500;
              res.setHeader('ContentType','application/json');
              res.json({err:err});//
                   }
            
                   else {
                    if (req.body.firstname)
                      user.firstname = req.body.firstname;
                    if (req.body.lastname)
                      user.lastname = req.body.lastname;
                    user.save((err, user) => {
                      if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({err: err});
                        return ;
                      }
                      passport.authenticate('local')(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success: true, status: 'Registration Successful!'});
                      });
                    });
                  }
                });
              });
router.post('/login', passport.authenticate('local'), (req, res) => {

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});



router.get('/logout', (req, res) => {
 

    req.logout();
    
    res.redirect('/');
    
    });


module.exports = router;

*/
//Assignment 3
var express = require('express');
var passport = require('passport');
var Users = require('../models/user');
var Verify = require('./verify');

var userRouter = express.Router();

/* GET users listing. */
userRouter.route('/')
  .get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Users.find({}, function(err, users) {
      if (err) throw err;
      res.json(users);
    });
  });

userRouter.post('/register', function(req, res) {
  Users.register(new Users({
      username: req.body.username
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        return res.status(500).json({
          err: err
        });
      }
      if (req.body.admin) {
        Users.findOneAndUpdate({
          username: req.body.username
        }, {
          admin: true
        }, {
          new: true
        }, function(err, user) {
          if (err) throw err;
          console.log(user.username, user.admin);
          user.save();
        });
      }

      passport.authenticate('local')(req, res, function() {
        return res.status(200).json({
          status: 'Registration Successful!'
        });
      });
    });
});

userRouter.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }

      var token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req, res, next);
});

userRouter.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = userRouter;