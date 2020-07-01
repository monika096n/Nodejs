/* var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var dishRouter = require('./routes/dishRouter');
var promoteRouter = require('./routes/promoteRouter');

var leaderRouter = require('./routes/leaderRouter');




const mongoose = require('mongoose'); //newly added

const Dishes = require('./models/dishes');

const Promotions=require('./models/promotions');

const  Leaders=require('./models/leaders');


const url = 'mongodb://localhost:27017/conFusion';
//const connect = mongoose.connect(url);

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }); //due to warning uing this code

connect.then((db) => {     //using promise for callbacks
    console.log("Connected correctly to server");
}, (err) => { console.log(err); }); //till this



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

function auth(req,res,next){

   console.log(req.headers);
   var authHeader = req.headers.authorization;

   if(!authHeader){
            var err=new Error('You are not authenticated');

            res.setHeader('WWW-Authenticate','Basic'); //for password

            err.status=401;//unauthorized
            return next(err);
   }

   else{ //authHeader value exists

         var auth=new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');//it will be like arrry

        var username=auth[0];  //we have extracted username and password from auth
        var password=auth[1];
        
        if(username==="admin" && password==="password"){
               next(); //go to next work

         }
         else{  //if not match with username and password
          var err=new Error('You are not authenticated');

          res.setHeader('WWW-Authenticate','Basic');

          err.status=401;//unauthorized
          return next(err);
         }



   }

}



app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoteRouter);
app.use('/leaders', leaderRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
*/


                                     //EXPRESS COOKIES
/*

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var dishRouter = require('./routes/dishRouter');
var promoteRouter = require('./routes/promoteRouter');

var leaderRouter = require('./routes/leaderRouter');




const mongoose = require('mongoose'); //newly added

const Dishes = require('./models/dishes');

const Promotions=require('./models/promotions');

const  Leaders=require('./models/leaders');


const url = 'mongodb://localhost:27017/conFusion';
//const connect = mongoose.connect(url);

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }); //due to warning uing this code

connect.then((db) => {     //using promise for callbacks
    console.log("Connected correctly to server");
}, (err) => { console.log(err); }); //till this



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


 //cookie setup start here
app.use(cookieParser('12345-67890-09876-54321'));

function auth (req, res, next) {

  if (!req.signedCookies.username) { //checking for username property in signed cookie or signed cookie itself doesn't exist
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
    var pass = auth[1];

    if (username == 'admin' && pass == 'password') { //we have extracted username and password from auth
        res.cookie('username','admin',{signed: true});
        next(); //authorized//proceed forward
   }
   
   else {  //if not match with username and password
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        next(err);
    }
  }


  else {//checking for username property in signed cookie or signed cookie  exist
      if (req.signedCookies.username === 'admin') {//signed username is admin
          next();
      }
      else {
          var err = new Error('You are not authenticated!');//if username is other than admin
          err.status = 401;
          next(err);
      }
    }
}




app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoteRouter);
app.use('/leaders', leaderRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

*/


//Sessions

/*

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var dishRouter = require('./routes/dishRouter');
var promoteRouter = require('./routes/promoteRouter');

var leaderRouter = require('./routes/leaderRouter');

var session=require('express-session');

var FileStore=require('session-file-store')(session);



const mongoose = require('mongoose'); //newly added

const Dishes = require('./models/dishes');

const Promotions=require('./models/promotions');

const  Leaders=require('./models/leaders');


const url = 'mongodb://localhost:27017/conFusion';
//const connect = mongoose.connect(url);

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }); //due to warning uing this code

connect.then((db) => {     //using promise for callbacks
    console.log("Connected correctly to server");
}, (err) => { console.log(err); }); //till this



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


 //cookie setup start here
//app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
    name:'session-id',
    secret:'12345-67890-09876-54321',
    saveUninitialized:false,
    resave:false,
    store:new FileStore()
}));

/* function auth (req, res, next) {

  if (!req.session.username) { //checking for username property in signed cookie or signed cookie itself doesn't exist
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
    var pass = auth[1];

    if (username === 'admin' && pass === 'password') { //we have extracted username and password from auth
        res.session.username='admin';
        next(); //authorized//proceed forward
   }
   
   else {  //if not match with username and password
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        next(err);
    }
  }


  else {//checking for username property in signed cookie or signed cookie  exist
      if (req.session.username === 'admin') {//signed username is admin
        console.log('req.session: ',req.session); 
        next();
      }
      else {
          var err = new Error('You are not authenticated!');//if username is other than admin
          err.status = 401;
          next(err);
      }
    }
} */

/*

app.use('/', indexRouter);
app.use('/users', usersRouter);
function auth (req, res, next) {
  console.log(req.session);

  if (!req.session.user) { //if  not a loggined in user in session
          var err = new Error('You are not authenticated!');
          res.setHeader('WWW-Authenticate', 'Basic');                        
          err.status = 403;
          next(err);
          return;
      
  }
  else {
      if (req.session.user === 'authenticated') {
          
          next();
      }
      else {
          var err = new Error('You are not authenticated!');
          err.status = 403;
          next(err);
      }
  }
}





app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoteRouter);
app.use('/leaders', leaderRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

*/
//passport
/*
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var authenticate = require('./authenticate');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var dishRouter = require('./routes/dishRouter');
var promoteRouter = require('./routes/promoteRouter');

var leaderRouter = require('./routes/leaderRouter');

var session=require('express-session');

var FileStore=require('session-file-store')(session);



const mongoose = require('mongoose'); //newly added

const Dishes = require('./models/dishes');

const Promotions=require('./models/promotions');

const  Leaders=require('./models/leaders');


const url = 'mongodb://localhost:27017/conFusion';
//const connect = mongoose.connect(url);

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }); //due to warning uing this code

connect.then((db) => {     //using promise for callbacks
    console.log("Connected correctly to server");
}, (err) => { console.log(err); }); //till this



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


 //cookie setup start here
//app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
    name:'session-id',
    secret:'12345-67890-09876-54321',
    saveUninitialized:false,
    resave:false,
    store:new FileStore()
}));


app.use(passport.initialize());
app.use(passport.session());


/* function auth (req, res, next) {  //for basic authentication

  if (!req.session.username) { //checking for username property in signed cookie or signed cookie itself doesn't exist
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
    var pass = auth[1];

    if (username === 'admin' && pass === 'password') { //we have extracted username and password from auth
        res.session.username='admin';
        next(); //authorized//proceed forward
   }
   
   else {  //if not match with username and password
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        next(err);
    }
  }


  else {//checking for username property in signed cookie or signed cookie  exist
      if (req.session.username === 'admin') {//signed username is admin
        console.log('req.session: ',req.session); 
        next();
      }
      else {
          var err = new Error('You are not authenticated!');//if username is other than admin
          err.status = 401;
          next(err);
      }
    }
} /* */  //can't remove

/*

app.use('/', indexRouter);
app.use('/users', usersRouter);
function auth (req, res, next) {
  console.log(req.user);

  if (!req.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    next(err);
  }
  else {
        next();
  }
}



app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoteRouter);
app.use('/leaders', leaderRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
*/
//tokens

/*
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var authenticate = require('./authenticate');
var config=require('./config');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var dishRouter = require('./routes/dishRouter');
var promoteRouter = require('./routes/promoteRouter');

var leaderRouter = require('./routes/leaderRouter');

var session=require('express-session');

var FileStore=require('session-file-store')(session);



const mongoose = require('mongoose'); //newly added

const Dishes = require('./models/dishes');

const Promotions=require('./models/promotions');

const  Leaders=require('./models/leaders');


const url = config.mongoUrl;
//const connect = mongoose.connect(url);

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }); //due to warning uing this code

connect.then((db) => {     //using promise for callbacks
    console.log("Connected correctly to server");
}, (err) => { console.log(err); }); //till this



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


 //cookie setup start here
//app.use(cookieParser('12345-67890-09876-54321'));


app.use(passport.initialize());



/* function auth (req, res, next) {  //for basic authentication

  if (!req.session.username) { //checking for username property in signed cookie or signed cookie itself doesn't exist
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
    var pass = auth[1];

    if (username === 'admin' && pass === 'password') { //we have extracted username and password from auth
        res.session.username='admin';
        next(); //authorized//proceed forward
   }
   
   else {  //if not match with username and password
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        next(err);
    }
  }


  else {//checking for username property in signed cookie or signed cookie  exist
      if (req.session.username === 'admin') {//signed username is admin
        console.log('req.session: ',req.session); 
        next();
      }
      else {
          var err = new Error('You are not authenticated!');//if username is other than admin
          err.status = 401;
          next(err);
      }
    }
}   //can't remove



/*
app.use('/', indexRouter);
app.use('/users', usersRouter);
//we have removed auth fn
app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes', dishRouter);
app.use('/promotions', promoteRouter);
app.use('/leaders', leaderRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
*/
//assignment 3
/*
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var authenticate = require('./verify');
var config=require('./config');
var foo=require('foo.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var dishRouter = require('./routes/dishRouter');
var promoteRouter = require('./routes/promoteRouter');

var leaderRouter = require('./routes/leaderRouter');

var session=require('express-session');

var FileStore=require('session-file-store')(session);



const mongoose = require('mongoose'); //newly added

const Dishes = require('./models/dishes');

const Promotions=require('./models/promotions');

const  Leaders=require('./models/leaders');


const url = config.mongoUrl;
//const connect = mongoose.connect(url);

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }); //due to warning uing this code

connect.then((db) => {     //using promise for callbacks
    console.log("Connected correctly to server");
}, (err) => { console.log(err); }); //till this



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


 //cookie setup start here
//app.use(cookieParser('12345-67890-09876-54321'));


app.use(passport.initialize());



/* function auth (req, res, next) {  //for basic authentication

  if (!req.session.username) { //checking for username property in signed cookie or signed cookie itself doesn't exist
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
    var pass = auth[1];

    if (username === 'admin' && pass === 'password') { //we have extracted username and password from auth
        res.session.username='admin';
        next(); //authorized//proceed forward
   }
   
   else {  //if not match with username and password
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        next(err);
    }
  }


  else {//checking for username property in signed cookie or signed cookie  exist
      if (req.session.username === 'admin') {//signed username is admin
        console.log('req.session: ',req.session); 
        next();
      }
      else {
          var err = new Error('You are not authenticated!');//if username is other than admin
          err.status = 401;
          next(err);
      }
    }
}   //can't remove

*/

/*
app.use('/', indexRouter);

//we have removed auth fn
app.use(express.static(path.join(__dirname, 'public')));
app.use(foo.verifyOrdinaryUser); 
app.use(foo.verifyAdmin);


app.use('/dishes', dishRouter);
app.use('/promotions', promoteRouter);
app.use('/leaders', leaderRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
*/

// assignment 4
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport= require('passport');
var authenticate = require('./authenticate');

var config = require('./config');

var db= mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected successfully to server.")
})

var routes = require('./routes/index');
var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var favoriteRouter = require('./routes/favoriteRouter');

var app = express();

app.all('*', function(req, res, next){
    if (req.secure){
        return next();
    }
    res.redirect('https://' + req.hostname + ':' + app.get('secPort') + req.url);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);
app.use('/favorites', favoriteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;