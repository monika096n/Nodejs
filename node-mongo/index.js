 const  MongoClient=require('mongodb').MongoClient;
//MongoClient will help to interact this application with mongo server

const assert=require('assert');
//for various checking opeartion

const dboper=require('./operations');

const url='mongodb://localhost:27017/';
const dbname='conFusion';//database and url

/* exercise 1


//connect(url,fun(err,client))  allow us to connnect the client to the server
MongoClient.connect(url,(err,client)=>             
{
    assert.equal(err,null);//assert fn checks error=null  
    console.log("Conected correctly to the server");  

    const db=client.db(dbname);   //making the client connect to the database
    const collection=db.collection("dishes");    //connecting the db to  collection

    


    collection.insertOne({"name":"Uthapizza","description":"test"},
    (err,result)=>                 //1st operation
    {
    //insertOne(obj,callback(err,result)); 
        assert.equal(err,null);
        console.log("After Insert:\n");
        console.log(result.ops); //ops is to display the documents of this collection

       collection.find({}).toArray((err,docs)=>{                                                //2nd operation
          assert.equal(err,null);
          console.log("Found\n");
          console.log(docs); //print out the docs here which is inserted

          //dropCollection will drop the specified collection
          db.dropCollection("dishes",(err,result)=>                                           //3rd operation
          {
              assert.equal(err,null);
              client.close();//close  connection to database
          });

       });

    });


});

*/

/*EXeRcISE 2

MongoClient.connect(url,(err,client)=>             
{
    assert.equal(err,null);//assert fn checks error=null  
    console.log("Conected correctly to the server");  

    const db=client.db(dbname);   //making the client connect to the database


dboper.insertDocument(db,{name:"Vadonut",description:"Test"},"dishes",(result)=>
{

       console.log("Inserted Document:\n",result.ops); //ops is to display the documents of this collection
       
       dboper.findDocuments(db,"dishes",(docs)=>
       {
            console.log("Found Documents:\n"+docs);

            dboper.updateDocument(db,{name:"Vadonut",description:"updated Test"},"dishes",(result)=>
            {
                console.log("Updated Document:\n",result.result);
               

                dboper.findDocuments(db,"dishes",(docs)=>
                  {
                      console.log("Found Documents:\n"+docs);
                    
                      dboper.dropCollection("dishes",(result)=>
                      {
                           console.log("Dropped collection:\n"+result);
                            client.close();         
                      
                      
                      }); 
             
                 });
      
            });
            
            
            
      });

    });
});


*/

MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));