const express = require('express');
const bodyParser=require('body-parser');

const dishRouter=express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/') //no semicolons and dish paramter and app.all bcoze router will route this for all the methods


.all((req,res,next) =>  //this all method is for all the http methods 
  {
     res.statusCode=200;
     res.setHeader('Content-Type','text/plain');
     next(); //after executing this for all methods it move to next
 })

.get((req,res,next)=>
{
   res.end('Will send all dishes to you!');
})


.post((req,res,next)=>
{
   res.end('Will send all dish:'+req.body.name +'with details'+ req.body.description);
})


.put((req,res,next)=>
{  
  res.statusCode=304;//operation not supported
   res.end('PUT operation is not supported');
})

.delete((req,res,next)=>
{
   res.end('Deleting all the dishes!'); //dangerous operation
});




dishRouter.route('/:dishId')


.get((req,res,next)=>
{
   res.end('Will send details of dish:'+req.params.dishId + 'to you!');
})


.post((req,res,next)=>
{
   res.statusCode=304;//operation not supported
    res.end('POST operation is not supported on /dishes/:'+req.params.dishId);

})


.put((req,res,next)=>
{  res.write('Updating the dish'+req.params.dishId+'\n');
   res.end('will update the dish'+req.body.name+'with details'+req.body.description);
})


.delete((req,res,next)=>
{
   res.end('Deleting the dish:'+req.params.dishId);
});



module.exports=dishRouter;