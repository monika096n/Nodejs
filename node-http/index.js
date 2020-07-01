const http=require('http');// creating  variable using const and importing http module,fs and path module
const fs=require('fs');
const path=require('path');



const hostname='localhost';
const port=3000;
/*
//going to create a server using createServer fn
const server=http.createServer( (req,res) => {
    console.log(" Requested for "+ req.url + " by method "+req.method);
    
    if (req.method=='GET'){    //GET method

          var fileUrl;

          if (req.url=='/')  fileUrl='/index.html'; //if it doesn't specify file in url  it defaults to this file  

           else  fileUrl=req.url;

           
                      var filePath=path.resolve('./public'+fileUrl); //converts relative to absolute full fledge path 
                      const fileExt=path.extname(filePath);  //it extracts the extension of file from the filepath

                      if(fileExt=='.html'){

                          fs.exists(filePath,(exists)=>{  //checking file exits or not
                              if(!exists){ //file not exists
                                  res.statusCode=404;
                                  res.setHeader('Content-Type','text/html');
                                  res.end('<html><body><h1>ERROR:404: '+ fileUrl+' File not found</h1> </body></html>');//body of response
                                  return;
                              }
                              else{ //file exists
                               
                                    res.statusCode=200;
                                    res.setHeader('Content-Type','text/html');
                                    fs.createReadStream(filePath).pipe(res); //read the given file and give it to response
                                    return;
                                
                              }

                          })
                      }

                      else{ //if it is not a html file

                                  res.statusCode=404;
                                  res.setHeader('Content-Type','text/html');
                                  res.end('<html><body><h1>ERROR:404: '+fileUrl+' This is not a HTML file </h1> </body></html>');
                                  return;




                      }

    }  //GET method

    else{ //if it is other than GET method


        res.statusCode=404;
        res.setHeader('Content-Type','text/html');
        res.end('<html><body><h1>ERROR:404: '+url.method+' This is not a Supported method </h1> </body></html>');
        return;




    } 





/* instead of sending body 
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>Hello, World!</h1></body></html>');
    //response body 

});
*/



const server = http.createServer( (req, res) => {

  
  console.log(' Request for ' + req.url + ' by method ' + req.method);

  if (req.method == 'GET') {
    var fileUrl;
    if (req.url == '/') fileUrl = '/index.html';
    else fileUrl = req.url;

    var filePath = path.resolve('./public'+fileUrl);
    const fileExt = path.extname(filePath);
    if (fileExt == '.html') {
      fs.exists(filePath, (exists) => {
        
        if (!exists) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error 404: ' + fileUrl + 
                      ' not found</h1></body></html>');
          return;
        }
        else{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
        }

      });
    }
    else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + fileUrl + 
              ' not a HTML file</h1></body></html>');
    }
  }
  else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + req.method + 
              ' not supported</h1></body></html>');
  }

})







//going to start the server
server.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});


