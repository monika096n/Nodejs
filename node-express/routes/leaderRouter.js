
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
   res.end('Will send all leaders to you!');
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
   res.end('Deleting all the leaders!'); //dangerous operation
});




leaderRouter.route('/:leaderId')


.get((req,res,next)=>
{
   res.end('Will send details of leader:'+req.params.leaderId + 'to you!');
})


.post((req,res,next)=>
{
   res.statusCode=304;//operation not supported
    res.end('POST operation is not supported on /leaders/:'+req.params.leaderId);

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