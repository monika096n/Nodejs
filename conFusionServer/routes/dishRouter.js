/* const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Dishes=require('../models/dishes');

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

*/

/*
const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Dishes=require('../models/dishes');


const dishRouter=express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/') //no semicolons and dish paramter and app.all bcoze router will route this for all the methods (/dishes)


.get((req,res,next)=>   //dispalying from all dishes
{
    Dishes.find({})
        .then((dishes)=>{
           res.statusCode=200;
           res.setHeader('Content-Type','application/json');
           res.json(dishes);
        },(err)=>next(err))

        .catch((err) => next(err));
})

.post((req, res, next) => {
   Dishes.create(req.body)
   .then((dish) => {
       console.log('Dish Created ', dish);
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(dish);
   }, (err) => next(err))
   .catch((err) => next(err));
})


.put((req,res,next)=>
{  
  res.statusCode=304;//operation not supported
   res.end('PUT operation is not supported');
})

.delete((req, res, next) => {
   Dishes.remove({})
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));    
});




dishRouter.route('/:dishId')


.get((req,res,next)=>
{
      Dishes.findById(req.params.dishId)
      .then((dish)=>{
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(dish);
      },(err)=>next(err))

      .catch((err) => next(err));

})


.post((req,res,next)=>
{
   res.statusCode=304;//operation not supported
    res.end('POST operation is not supported on /dishes/:'+req.params.dishId);

})


.put((req,res,next)=>  //updating   by id
{  
   Dishes.findByIdAndUpdate(req.params.dishId,{  // this findByIdAndUpdate takes three parameters 
      $set:req.body},//it takes content from  body of the request
      {new:true}) //new as a flag
        .then((dish)=>{
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(dish);
      },(err)=>next(err))

      .catch((err) => next(err));

})

.delete((req, res, next) => {
   Dishes.findByIdAndRemove(req.params.dishId)
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));
});



dishRouter.route('/:dishId/comments') //no semicolons and dish paramter and app.all bcoze router will route this for all the methods (/dishes)


.get((req,res,next)=>   //dispalying from all dishes
{
    Dishes.findById(req.params.dishId)
        .then((dish)=>{

           if(dish!=null){
                                 
           
           res.statusCode=200;
           res.setHeader('Content-Type','application/json');
           res.json(dish.comments);
           }
           else
           {
              err=new Error("Dish"+req.params.dishId+"not found!");
              err.statusCode=404;
              return next(err);
           }
        },(err)=>next(err)) 

        .catch((err) => next(err));
})


.post((req, res, next) => {
   Dishes.findById(req.params.dishId) 


   .then((dish) => {
         if(dish!=null){
         dish.comments.push(req.body); //pushing the comments from the request body
         dish.save()
         .then((dish)=>
           {

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        },(err)=>next(err));
      }
         
        else
        
        {
           err=new Error("Dish"+req.params.dishId+"not found!");
           err.statusCode=404;
           return next(err);
        }
     },(err)=>next(err))

     .catch((err) => next(err));
})



.put((req,res,next)=>
{  
  res.statusCode=304;//operation not supported
   res.end('PUT operation is not supported on /dishes/'+
   req.params.dishId+'/comments');
})

.delete((req, res, next) => {
   Dishes.findById(req.params.dishId) 
   
   .then((dish) => {
      if(dish!=null){
       for(var i=(dish.comments.length-1);i>=0;i--){

         dish.comments.id(dish.comments[i]._id).remove();
      }
      dish.save()
      .then((dish)=>
        {

         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(dish);
     },(err)=>next(err));
   }
   
      
     else
     
     {
        err=new Error("Dish"+req.params.dishId+"not found!");
        err.statusCode=404;
        return next(err);
     }
  },(err)=>next(err))

  .catch((err) => next(err));
})



  



dishRouter.route('/:dishId/comments/:commentId')


.get((req,res,next)=>
{
      Dishes.findById(req.params.dishId)
      .then((dish)=>{    //1st condition we r checking dish exists and dish comments exists
         if(dish!=null&&dish.comments.id(req.params.commentId)!=null){
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(dish.comments.id(req.params.commentId));
         }
          
         else if(dish==null)  //2nd condition dish not exists
         {
            err=new Error("Dish"+req.params.dishId+"not found!");
            err.statusCode=404;
            return next(err);
         }
        else {  //3rd condition dish commentId not exists
            err=new Error("comment "+req.params.commentId+"not found!");
            err.statusCode=404;
            return next(err);
         }
      },(err)=>next(err))

      .catch((err) => next(err));
})

.post((req,res,next)=>
{
   res.statusCode=304;//operation not supported
    res.end('POST operation is not supported on /dishes/:'+req.params.dishId+'comments'+req.params.commentId);

})


.put((req, res, next) => {
   Dishes.findById(req.params.dishId)
   .then((dish) => {
       if (dish != null && dish.comments.id(req.params.commentId) != null) {
           if (req.body.rating) {
               dish.comments.id(req.params.commentId).rating = req.body.rating;
           }
           if (req.body.comment) {
               dish.comments.id(req.params.commentId).comment = req.body.comment;                
           }
           dish.save()
           .then((dish) => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(dish);                
           }, (err) => next(err));
       }
       else if (dish == null) {
           err = new Error('Dish ' + req.params.dishId + ' not found');
           err.status = 404;
           return next(err);
       }
       else {
           err = new Error('Comment ' + req.params.commentId + ' not found');
           err.status = 404;
           return next(err);            
       }
   }, (err) => next(err))
   .catch((err) => next(err));
})
.delete((req, res, next) => {
   Dishes.findById(req.params.dishId)
   .then((dish) => {
       if (dish != null && dish.comments.id(req.params.commentId) != null) {
           dish.comments.id(req.params.commentId).remove();
           dish.save()
           .then((dish) => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(dish);                
           }, (err) => next(err));
       } else if (dish == null) {
         err = new Error('Dish ' + req.params.dishId + ' not found');
         err.status = 404;
         return next(err);
     }
     else {
         err = new Error('Comment ' + req.params.commentId + ' not found');
         err.status = 404;
         return next(err);            
     }
 }, (err) => next(err))
 .catch((err) => next(err));
});



module.exports=dishRouter;
*/

//web tokens
/*
const express = require('express');
const bodyParser=require('body-parser');
const Dishes=require('../models/dishes');
const authenticate=require('../authenticate');

const dishRouter=express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/') //no semicolons and dish paramter and app.all bcoze router will route this for all the methods (/dishes)


.get((req,res,next)=>   //dispalying from all dishes
{
    Dishes.find({})
        .then((dishes)=>{
           res.statusCode=200;
           res.setHeader('Content-Type','application/json');
           res.json(dishes);
        },(err)=>next(err))

        .catch((err) => next(err));
})

.post(authenticate.verifyUser,(req, res, next) =>{//I would first execute this middleware, which I have exported from the authentic.js file, I first apply that, which is equivalent to saying passport authenticate JWT and you are checking the user. Then if this is successful, then I will move on to do the rest of it. If the authentication fails at this point, then passport authenticate will reply back to the client with the appropriate error message
                                 //we need to verify user
   Dishes.create(req.body)
   .then((dish) => {
       console.log('Dish Created ', dish);
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(dish);
   }, (err) => next(err))
   .catch((err) => next(err));
})


.put(authenticate.verifyUser,(req,res)=>
{  
  res.statusCode=304;//operation not supported
   res.end('PUT operation is not supported');
})

.delete(authenticate.verifyUser,(req, res, next) => {
   Dishes.remove({})
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));    
});




dishRouter.route('/:dishId')


.get((req,res,next)=>
{
      Dishes.findById(req.params.dishId)
      .then((dish)=>{
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(dish);
      },(err)=>next(err))

      .catch((err) => next(err));

})


.post(authenticate.verifyUser,(req,res)=>
{
   res.statusCode=304;//operation not supported
    res.end('POST operation is not supported on /dishes/:'+req.params.dishId);

})


.put(authenticate.verifyUser,(req,res,next)=>  //updating   by id
{  
   Dishes.findByIdAndUpdate(req.params.dishId,{  // this findByIdAndUpdate takes three parameters 
      $set:req.body},//it takes content from  body of the request
      {new:true}) //new as a flag
        .then((dish)=>{
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(dish);
      },(err)=>next(err))

      .catch((err) => next(err));

})

.delete(authenticate.verifyUser,(req, res, next) => {
   Dishes.findByIdAndRemove(req.params.dishId)
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));
});



dishRouter.route('/:dishId/comments') //no semicolons and dish paramter and app.all bcoze router will route this for all the methods (/dishes)


.get((req,res,next)=>   //dispalying from all dishes
{
    Dishes.findById(req.params.dishId)
        .then((dish)=>{

           if(dish!=null){
                                 
           
           res.statusCode=200;
           res.setHeader('Content-Type','application/json');
           res.json(dish.comments);
           }
           else
           {
              err=new Error("Dish"+req.params.dishId+"not found!");
              err.statusCode=404;
              return next(err);
           }
        },(err)=>next(err)) 

        .catch((err) => next(err));
})


.post(authenticate.verifyUser,(req, res, next) => {
   Dishes.findById(req.params.dishId) 


   .then((dish) => {
         if(dish!=null){
         dish.comments.push(req.body); //pushing the comments from the request body
         dish.save()
         .then((dish)=>
           {

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        },(err)=>next(err));
      }
         
        else
        
        {
           err=new Error("Dish"+req.params.dishId+"not found!");
           err.statusCode=404;
           return next(err);
        }
     },(err)=>next(err))

     .catch((err) => next(err));
})



.put(authenticate.verifyUser,(req,res)=>
{  
  res.statusCode=304;//operation not supported
   res.end('PUT operation is not supported on /dishes/'+
   req.params.dishId+'/comments');
})

.delete(authenticate.verifyUser,(req, res, next) => {
   Dishes.findById(req.params.dishId) 
   
   .then((dish) => {
      if(dish!=null){
       for(var i=(dish.comments.length-1);i>=0;i--){

         dish.comments.id(dish.comments[i]._id).remove();
      }
      dish.save()
      .then((dish)=>
        {

         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(dish);
     },(err)=>next(err));
   }
   
      
     else
     
     {
        err=new Error("Dish"+req.params.dishId+"not found!");
        err.statusCode=404;
        return next(err);
     }
  },(err)=>next(err))

  .catch((err) => next(err));
})



  



dishRouter.route('/:dishId/comments/:commentId')


.get((req,res,next)=>
{
      Dishes.findById(req.params.dishId)
      .then((dish)=>{    //1st condition we r checking dish exists and dish comments exists
         if(dish!=null&&dish.comments.id(req.params.commentId)!=null){
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(dish.comments.id(req.params.commentId));
         }
          
         else if(dish==null)  //2nd condition dish not exists
         {
            err=new Error("Dish"+req.params.dishId+"not found!");
            err.statusCode=404;
            return next(err);
         }
        else {  //3rd condition dish commentId not exists
            err=new Error("comment "+req.params.commentId+"not found!");
            err.statusCode=404;
            return next(err);
         }
      },(err)=>next(err))

      .catch((err) => next(err));
})

.post(authenticate.verifyUser,(req,res)=>
{
   res.statusCode=304;//operation not supported
    res.end('POST operation is not supported on /dishes/:'+req.params.dishId+'comments'+req.params.commentId);

})


.put(authenticate.verifyUser,(req, res, next) => {
   Dishes.findById(req.params.dishId)
   .then((dish) => {
       if (dish != null && dish.comments.id(req.params.commentId) != null) {
           if (req.body.rating) {
               dish.comments.id(req.params.commentId).rating = req.body.rating;
           }
           if (req.body.comment) {
               dish.comments.id(req.params.commentId).comment = req.body.comment;                
           }
           dish.save()
           .then((dish) => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(dish);                
           }, (err) => next(err));
       }
       else if (dish == null) {
           err = new Error('Dish ' + req.params.dishId + ' not found');
           err.status = 404;
           return next(err);
       }
       else {
           err = new Error('Comment ' + req.params.commentId + ' not found');
           err.status = 404;
           return next(err);            
       }
   }, (err) => next(err))
   .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req, res, next) => {
   Dishes.findById(req.params.dishId)
   .then((dish) => {
       if (dish != null && dish.comments.id(req.params.commentId) != null) {
           dish.comments.id(req.params.commentId).remove();
           dish.save()
           .then((dish) => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(dish);                
           }, (err) => next(err));
       } else if (dish == null) {
         err = new Error('Dish ' + req.params.dishId + ' not found');
         err.status = 404;
         return next(err);
     }
     else {
         err = new Error('Comment ' + req.params.commentId + ' not found');
         err.status = 404;
         return next(err);            
     }
 }, (err) => next(err))
 .catch((err) => next(err));
});



module.exports=dishRouter;
*/

//mongoose populate
/*
const express = require('express');
const bodyParser=require('body-parser');
const Dishes=require('../models/dishes');
const authenticate=require('../authenticate');

const dishRouter=express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/') //no semicolons and dish paramter and app.all bcoze router will route this for all the methods (/dishes)


.get((req,res,next)=>   //dispalying from all dishes
{
    Dishes.find({})
       .populate('comments.author')
        .then((dishes)=>{
           res.statusCode=200;
           res.setHeader('Content-Type','application/json');
           res.json(dishes);
        },(err)=>next(err))

        .catch((err) => next(err));
})

.post(authenticate.verifyUser,(req, res, next) =>{//I would first execute this middleware, which I have exported from the authentic.js file, I first apply that, which is equivalent to saying passport authenticate JWT and you are checking the user. Then if this is successful, then I will move on to do the rest of it. If the authentication fails at this point, then passport authenticate will reply back to the client with the appropriate error message
                                 //we need to verify user
   Dishes.create(req.body)
   .then((dish) => {
       console.log('Dish Created ', dish);
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(dish);
   }, (err) => next(err))
   .catch((err) => next(err));
})


.put(authenticate.verifyUser,(req,res)=>
{  
  res.statusCode=304;//operation not supported
   res.end('PUT operation is not supported');
})

.delete(authenticate.verifyUser,(req, res, next) => {
   Dishes.remove({})
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));    
});




dishRouter.route('/:dishId')


.get((req,res,next)=>
{
      Dishes.findById(req.params.dishId)
      .populate('comments.author')
      .then((dish)=>{
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(dish);
      },(err)=>next(err))

      .catch((err) => next(err));

})


.post(authenticate.verifyUser,(req,res)=>
{
   res.statusCode=304;//operation not supported
    res.end('POST operation is not supported on /dishes/:'+req.params.dishId);

})


.put(authenticate.verifyUser,(req,res,next)=>  //updating   by id
{  
   Dishes.findByIdAndUpdate(req.params.dishId,{  // this findByIdAndUpdate takes three parameters 
      $set:req.body},//it takes content from  body of the request
      {new:true}) //new as a flag
        .then((dish)=>{
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(dish);
      },(err)=>next(err))

      .catch((err) => next(err));

})

.delete(authenticate.verifyUser,(req, res, next) => {
   Dishes.findByIdAndRemove(req.params.dishId)
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));
});



dishRouter.route('/:dishId/comments') //no semicolons and dish paramter and app.all bcoze router will route this for all the methods (/dishes)


.get((req,res,next)=>   //dispalying from all dishes
{
    Dishes.findById(req.params.dishId)
        .then((dish)=>{

           if(dish!=null){
                                 
           
           res.statusCode=200;
           res.setHeader('Content-Type','application/json');
           res.json(dish.comments);
           }
           else
           {
              err=new Error("Dish"+req.params.dishId+"not found!");
              err.statusCode=404;
              return next(err);
           }
        },(err)=>next(err)) 

        .catch((err) => next(err));
})


.post(authenticate.verifyUser,(req, res, next) => {
   Dishes.findById(req.params.dishId) 


   .then((dish) => {
         if(dish!=null){
            req.body.author = req.user._id;//adding the user id into the author field
         dish.comments.push(req.body); //pushing the comments from the request body
         dish.save()
         .then((dish)=>
           {
            Dishes.findById(dish._id)
            .populate('comments.author')
            .then((dish) => {
               res.statusCode
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        })
      }, (err)=>next(err));
      }
         
        else
        
        {
           err=new Error("Dish"+req.params.dishId+"not found!");
           err.statusCode=404;
           return next(err);
        }
     },(err)=>next(err))

     .catch((err) => next(err));
})



.put(authenticate.verifyUser,(req,res)=>
{  
  res.statusCode=304;//operation not supported
   res.end('PUT operation is not supported on /dishes/'+
   req.params.dishId+'/comments');
})

.delete(authenticate.verifyUser,(req, res, next) => {
   Dishes.findById(req.params.dishId) 
   
   .then((dish) => {
      if(dish!=null){
       for(var i=(dish.comments.length-1);i>=0;i--){

         dish.comments.id(dish.comments[i]._id).remove();
      }
      dish.save()
      .then((dish)=>
        {

         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(dish);
     },(err)=>next(err));
   }
   
      
     else
     
     {
        err=new Error("Dish"+req.params.dishId+"not found!");
        err.statusCode=404;
        return next(err);
     }
  },(err)=>next(err))

  .catch((err) => next(err));
})



  



dishRouter.route('/:dishId/comments/:commentId')


.get((req,res,next)=>
{
      Dishes.findById(req.params.dishId)
      .populate('comments.author')
      .then((dish)=>{    //1st condition we r checking dish exists and dish comments exists
         if(dish!=null&&dish.comments.id(req.params.commentId)!=null){
         res.statusCode=200;
         res.setHeader('Content-Type','application/json');
         res.json(dish.comments.id(req.params.commentId));
         }
          
         else if(dish==null)  //2nd condition dish not exists
         {
            err=new Error("Dish"+req.params.dishId+"not found!");
            err.statusCode=404;
            return next(err);
         }
        else {  //3rd condition dish commentId not exists
            err=new Error("comment "+req.params.commentId+"not found!");
            err.statusCode=404;
            return next(err);
         }
      },(err)=>next(err))

      .catch((err) => next(err));
})

.post(authenticate.verifyUser,(req,res)=>
{
   res.statusCode=304;//operation not supported
    res.end('POST operation is not supported on /dishes/:'+req.params.dishId+'comments'+req.params.commentId);

})


.put(authenticate.verifyUser,(req, res, next) => {
   Dishes.findById(req.params.dishId)
   .then((dish) => {
       if (dish != null && dish.comments.id(req.params.commentId) != null) {
           if (req.body.rating) {
               dish.comments.id(req.params.commentId).rating = req.body.rating;
           }
           if (req.body.comment) {
               dish.comments.id(req.params.commentId).comment = req.body.comment;                
           }
           dish.save()
           .then((dish) => {
            Dishes.findById(dish._id)
            .populate('comments.author')
                .then((dish) => {
          
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(dish);                
           })
         }, (err) => next(err));
       }
       else if (dish == null) {
           err = new Error('Dish ' + req.params.dishId + ' not found');
           err.status = 404;
           return next(err);
       }
       else {
           err = new Error('Comment ' + req.params.commentId + ' not found');
           err.status = 404;
           return next(err);            
       }
   }, (err) => next(err))
   .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req, res, next) => {
   Dishes.findById(req.params.dishId)
   .then((dish) => {
       if (dish != null && dish.comments.id(req.params.commentId) != null) {
           dish.comments.id(req.params.commentId).remove();
           dish.save()
           .then((dish) => {
            Dishes.findById(dish._id)
            .populate('comments.author')
            .then((dish) => {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(dish);                
           })
         }, (err) => next(err));
       } else if (dish == null) {
         err = new Error('Dish ' + req.params.dishId + ' not found');
         err.status = 404;
         return next(err);
     }
     else {
         err = new Error('Comment ' + req.params.commentId + ' not found');
         err.status = 404;
         return next(err);            
     }
 }, (err) => next(err))
 .catch((err) => next(err));
});



module.exports=dishRouter;
*/

//Assignment 3
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');
var Verify    = require('./verify');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.find({}, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.create(req.body, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        var id = dish._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the dish with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

dishRouter.route('/:dishId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.findByIdAndRemove(req.params.dishId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

dishRouter.route('/:dishId/comments')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        for (var i = (dish.comments.length - 1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

dishRouter.route('/:dishId/comments/:commentId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        dish.comments.id(req.params.commentId).remove();
        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports = dishRouter;