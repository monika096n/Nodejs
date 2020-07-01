/*
const express=require('express');

const http=require('http');

const morgan=require('morgan');



const hostname='localhost';
const  port=3000;

const app=express(); //this node appliction uses express 

//
app.use(morgan('dev')); //using morgan to print log with additional development info

app.use(express.static(__dirname+'/public'));//to serve the static files in the directory= public


//app.use () three parmeters in this next is optional if we don't use in co

app.use( (req,res,next) =>  
{
   // console.log(req.headers);//for 1st example code 

   res.statusCode=200;
   res.setHeader('Content-Type','html/text');
   res.end('<html><body><h1>This is express Server</h1> </body></html>');//response status,header, body

}
); //server setup


const server=http.createServer(app); //create server

server.listen(port,hostname, ()=>{
  console.log(`server running at http://${hostname}:${port}`);

});
//starting server

*/





// second express code with body parser

const express=require('express');

const http=require('http');

const morgan=require('morgan');

const bodyParser=require('body-parser');



const hostname='localhost';
const  port=3000;

const app=express(); //this node appliction uses express 

//
app.use(morgan('dev')); //using morgan to print log with additional development info

app.use(express.static(__dirname+'/public'));//to serve the static files in the directory= public

app.use(bodyParser.json());
//app.use () three parmeters in this next is optional if we don't use in co



const dishRouter = require('./routes/dishRouter');

const promoteRouter = require('./routes/promoteRouter');

const leaderRouter = require('./routes/leaderRouter');



app.use('/dishes',dishRouter);
app.use('/promotions',promoteRouter);
app.use('/leaders',leaderRouter);






/*


app.all('/dishes',(req,res,next) =>  //this all method is for all the http methods 
  {
     res.statusCode=200;
     res.setHeader('Content-Type','text/plain');
     next(); //after executing this for all methods it move to next
 });

app.get('/dishes',(req,res,next)=>
{
   res.end('Will send all dishes to you!');
});


app.post('/dishes',(req,res,next)=>
{
   res.end('Will send all dish:'+req.body.name +'with details'+ req.body.description);
});


app.put('/dishes',(req,res,next)=>
{  
  res.statusCode=304;//operation not supported
   res.end('PUT operation is not supported');
});




app.delete('/dishes',(req,res,next)=>
{
   res.end('Deleting all the dishes!'); //dangerous operation
});


//when we use name dishId the name should need to be mainted to all methods
app.get('/dishes/:dishId',(req,res,next)=>
{
   res.end('Will send details of dish:'+req.params.dishId + 'to you!');
});


app.post('/dishes/:dishId',(req,res,next)=>
{
   res.statusCode=304;//operation not supported
    res.end('POST operation is not supported on /dishes/:'+req.params.dishId);

});


app.put('/dishes/:dishId',(req,res,next)=>
{  res.write('Updating the dish'+req.params.dishId+'\n');
   res.end('will update the dish'+req.body.name+'with details'+req.body.description);
});


app.delete('/dishes/:dishId',(req,res,next)=>
{
   res.end('Deleting the dish:'+req.params.dishId);
});


*/  //this is moved to dishRouter









app.use( (req,res,next) =>  
{
   

   res.statusCode=200;
   res.setHeader('Content-Type','html/text');
   res.end('<html><body><h1>This is express Server</h1> </body></html>');//response status,header, body

}
); //server setup


const server=http.createServer(app); //create server

server.listen(port,hostname, ()=>{
  console.log(`server running at http://${hostname}:${port}`);

});//starting server
