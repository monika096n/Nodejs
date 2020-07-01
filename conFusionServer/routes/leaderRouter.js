/*
const express = require('express');
const bodyParser=require('body-parser');

const leaderRouter=express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/') //no semicolons and leader paramter and app.all bcoze router will route this for all the methods


.all((req,res,next) =>  //this all method is for all the http methods 
  {
     res.statusCode=200;
     res.setHeader('Content-Type','text/plain');
     next(); //after executing this for all methods it move to next
 })

.get((req,res,next)=>
{
   res.end('Will send all Leaders to you!');
})


.post((req,res,next)=>
{
   res.end('Will send all leader:'+req.body.name +'with details'+ req.body.description);
})


.put((req,res,next)=>
{  
  res.statusCode=304;//operation not supported
   res.end('PUT operation is not supported');
})

.delete((req,res,next)=>
{
   res.end('Deleting all the Leaders!'); //dangerous operation
});




leaderRouter.route('/:leaderId')


.get((req,res,next)=>
{
   res.end('Will send details of leader:'+req.params.leaderId + 'to you!');
})


.post((req,res,next)=>
{
   res.statusCode=304;//operation not supported
    res.end('POST operation is not supported on /Leaders/:'+req.params.leaderId);

})


.put((req,res,next)=>
{  res.write('Updating the leader'+req.params.leaderId+'\n');
   res.end('will update the leader'+req.body.name+'with details'+req.body.description);
})


.delete((req,res,next)=>
{
   res.end('Deleting the leader:'+req.params.leaderId);
});



module.exports=leaderRouter;
*/
 

const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Leaders=require('../models/leaders');

const authenticate=require('../verify');
const leaderRouter=express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/') //no semicolons and leader paramter and app.all bcoze router will route this for all the methods (/Leaders)


.get((req,res,next)=>   //dispalying from all Leaders
{
    Leaders.find({})
        .then((leaders)=>{
           res.statusCode=200;
           res.setHeader('Content-Type','application/json');
           res.json(leaders);
        },(err)=>next(err))

        .catch((err) => next(err));
})

.post(authenticate.verifyUser,(req, res, next) => {
   Leaders.create(req.body)
   .then((leader) => {
       console.log('leader Created ', leader);
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(leader);
   }, (err) => next(err))
   .catch((err) => next(err));
})


.put(authenticate.verifyUser,(req,res)=>
{  
  res.statusCode=304;//operation not supported
   res.end('PUT operation is not supported');
})

.delete(authenticate.verifyUser,(req, res, next) => {
   Leaders.remove({})
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));    
});




leaderRouter.route('/:leaderId')


.get((req,res,next)=>
{
      Leaders.findById(req.params.leaderId)
      .then((leader)=>{
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(leader);
      },(err)=>next(err))

      .catch((err) => next(err));

})


.post(authenticate.verifyUser,(req,res)=>
{
   res.statusCode=304;//operation not supported
    res.end('POST operation is not supported on /leaders/:'+req.params.leaderId);

})


.put(authenticate.verifyUser,(req,res,next)=>  //updating   by id
{  
   Leaders.findByIdAndUpdate(req.params.leaderId,{  // this findByIdAndUpdate takes three parameters 
      $set:req.body},//it takes content from  body of the request
      {new:true}) //new as a flag
        .then((leader)=>{
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(leader);
      },(err)=>next(err))

      .catch((err) => next(err));

})

.delete(authenticate.verifyUser,(req, res, next) => {
   Leaders.findByIdAndRemove(req.params.leaderId)
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));
});

module.exports=leaderRouter;