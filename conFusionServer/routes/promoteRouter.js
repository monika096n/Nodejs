/*
const express = require('express');
const bodyParser=require('body-parser');

const promoteRouter=express.Router();

promoteRouter.use(bodyParser.json());

promoteRouter.route('/') //no semicolons and promotion paramter and app.all bcoze router will route this for all the methods


.all((req,res,next) =>  //this all method is for all the http methods 
  {
     res.statusCode=200;
     res.setHeader('Content-Type','text/plain');
     next(); //after executing this for all methods it move to next
 })

.get((req,res,next)=>
{
   res.end('Will send all Promotions to you!');
})


.post((req,res,next)=>
{
   res.end('Will send all promotion:'+req.body.name +'with details'+ req.body.description);
})


.put((req,res,next)=>
{  
  res.statusCode=304;//operation not supported
   res.end('PUT operation is not supported');
})

.delete((req,res,next)=>
{
   res.end('Deleting all the Promotions!'); //dangerous operation
});




promoteRouter.route('/:promotion')


.get((req,res,next)=>
{
   res.end('Will send details of promotion:'+req.params.promotion + 'to you!');
})


.post((req,res,next)=>
{
   res.statusCode=304;//operation not supported
    res.end('POST operation is not supported on /Promotions/:'+req.params.promotion);

})


.put((req,res,next)=>
{  res.write('Updating the promotion'+req.params.promotion+'\n');
   res.end('will update the promotion'+req.body.name+'with details'+req.body.description);
})


.delete((req,res,next)=>
{
   res.end('Deleting the promotion:'+req.params.promotion);
});



module.exports=promoteRouter;

*/



const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Promotions=require('../models/promotions');
const authenticate=require('../verify');

const promoteRouter=express.Router();

promoteRouter.use(bodyParser.json());

promoteRouter.route('/') //no semicolons and promotion paramter and app.all bcoze router will route this for all the methods (/Promotions)


.get((req,res,next)=>   //dispalying from all Promotions
{
   Promotions .find({})
        .then((promotions)=>{
           res.statusCode=200;
           res.setHeader('Content-Type','application/json');
           res.json(promotions);
        },(err)=>next(err))

        .catch((err) => next(err));
})

.post(authenticate.verifyUser,(req, res, next) => {
   Promotions.create(req.body)
   .then((promotion) => {
       console.log('promotion Created ', promotion);
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(promotion);
   }, (err) => next(err))
   .catch((err) => next(err));
})


.put(authenticate.verifyUser,(req,res)=>
{  
  res.statusCode=304;//operation not supported
   res.end('PUT operation is not supported');
})

.delete(authenticate.verifyUser,(req, res, next) => {
   Promotions.remove({})
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));    
});




promoteRouter.route('/:promoId')


.get((req,res,next)=>
{
      Promotions.findById(req.params.promoId)
      .then((promotion)=>{
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(promotion);
      },(err)=>next(err))

      .catch((err) => next(err));

})


.post(authenticate.verifyUser,(req,res)=>
{
   res.statusCode=304;//operation not supported
    res.end('POST operation is not supported on /Promotions/:'+req.params.promoId);

})


.put(authenticate.verifyUser,(req,res,next)=>  //updating   by id
{  
   Promotions.findByIdAndUpdate(req.params.promoId,{  // this findByIdAndUpdate takes three parameters 
      $set:req.body},//it takes content from  body of the request
      {new:true}) //new as a flag
        .then((promotion)=>{
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(promotion);
      },(err)=>next(err))

      .catch((err) => next(err));

})



.delete(authenticate.verifyUser,(req, res, next) => {
   Promotions.findByIdAndRemove(req.params.promoId)
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));
});

module.exports=promoteRouter;