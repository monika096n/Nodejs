/* passport
var passport=require('passport'); //passport is for local authentication
var LocalStrategy=require('passport-local').Strategy;

var User=require('./models/user');

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
*/



//tokenbased
/*
var passport=require('passport'); //passport is for local authentication
var LocalStrategy=require('passport-local').Strategy;
var User=require('./models/user');

var JwtStrategy =require('passport-jwt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt;
var jwt=require('jsonwebtoken'); // used to create, sign, and verify tokens

var config=require('./config');

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){ //to create a token
    return jwt.sign(
        user,config.secretKey,{expiresIn:3600}
   ); //sign is to create token it takes 3 params

}

var opts={};

opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken(); //to extract token fom auth header
opts.secretOrKey=config.secretKey;

exports.jwtPassport=passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    console.log("JWT Payload:",jwt_payload);
      User.findOne({_id:jwt_payload._id},(err,user)=>{ //finding a user with id 
          if(err){
                return  done(err,false); //error bcoz can't find that id and user is false
          }

          else if(user){  //user !=null
            return  done(null,user);
          }
          else {   //we couldn't find user
            return done(null, false);
        }

      });
}));

exports.verifyOrdinaryUser = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secretKey, function (err, decoded) {
          if (err) {
              var err = new Error('You are not authenticated!');
              err.status = 401;
              return next(err);
          } else {
              // if everything is good, save to request for use in other routes
              req.decoded = decoded;
              next();
          }
      });
  } else {
      // if there is no token
      // return an error
      var err = new Error('No token provided!');
      err.status = 403;
      return next(err);
  }
};

exports.verifyAdmin = function(req,res,next){
  if(req.decoded._doc.admin !== true)  {
      return next(err);
  }else {
    // if the user is not admin
        // return an error
        // if the user is not admin
        // return an error
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
      return next();
  }
};




exports.verifyUser =passport.authenticate('jwt',{session:false});
//bcoz we are not using sessions instead of that we are using tokens
*/


//assignment 3

var Users = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function(user) {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600
  });
};

exports.verifyOrdinaryUser = function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secretKey, function(err, decoded) {
      if (err) {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        return next(err);
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    var err = new Error('No token provided!');
    err.status = 403;
    return next(err);
  }
};

exports.verifyAdmin = function(req, res, next) {
  if (req.decoded._doc.admin) {
    next();
  } else {
    var err = new Error('You are not authorized to perform this operation!');
    err.status = 403;
    next(err);
  }
};