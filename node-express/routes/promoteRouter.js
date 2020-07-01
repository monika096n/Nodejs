
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
   res.end('Will send all promotions to you!');
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
   res.end('Deleting all the promotions!'); //dangerous operation
});




promoteRouter.route('/:promoId')


.get((req,res,next)=>
{
   res.end('Will send details of promotion:'+req.params.promoId + 'to you!');
})


.post((req,res,next)=>
{
   res.statusCode=304;//operation not supported
    res.end('POST operation is not supported on /promotions/:'+req.params.promoId);

})


.put((req,res,next)=>
{  res.write('Updating the promotion'+req.params.promoId+'\n');
   res.end('will update the promotion'+req.body.name+'with details'+req.body.description);
})


.delete((req,res,next)=>
{
   res.end('Deleting the promotion:'+req.params.promoId);
});



module.exports=promoteRouter;