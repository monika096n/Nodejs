/* const mongoose=require('mongoose');

const Dishes=require('./models/dishes');

const url='mongodb://localhost:27017/conFusion'; //url with database
//const connect=mongoose.connect(url); //mongoose support this method to connect to mongodb servery

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }); //due to warning uing this code

connect.then((db)=>  //if db is correctly connected then executes this fn
{
   console.log("Connected correctly to the server");

   var newDish=Dishes({
       name:"Uthappizza",
       description:"test"

    });
       newDish.save()    //save() will save this to the database and this will return a promise
             .then((dish)=>
                {
                    console.log(dish);

                    return Dishes.find({}); //this will start finding the dishes 
                })

                .then((dishes)=>
                {
                    console.log(dishes);

                    return Dishes.deleteMany({}); //this will remove all the dishes from database (bcoz of warning using deleteMany)
                })

                 .then(()=>{
                        return mongoose.connection.close();

                 })
                .catch((err)=>{
                            console.log(err);
                });
                    

    });

*/
/*
  //part 2   

  const mongoose=require('mongoose');

const Dishes=require('./models/dishes');

const url='mongodb://localhost:27017/conFusion'; //url with database
//const connect=mongoose.connect(url); //mongoose support this method to connect to mongodb servery

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }); //due to warning uing this code

connect.then((db)=>  //if db is correctly connected then executes this fn
{
   console.log("Connected correctly to the server");

   Dishes.create({
       name:"Uthapizza",
       description:"test"

   })
                  //save() will save this to the database and this will return a promise
         .then((dish)=>
                {
                    console.log(dish);

                    return Dishes.find({}).exec(); //this will start finding the dishes 
                })

       .then((dishes)=>
                {
                    console.log(dishes);

                    return Dishes.deleteMany({}); //this will remove all the dishes from database (bcoz of warning using deleteMany)
                })

        .then(()=>{
                        return mongoose.connection.close();

                 })
        .catch((err)=>{
                            console.log(err);
                });
                    

});
 
*/


//creating sub-documents

const mongoose=require('mongoose');

const Dishes=require('./models/dishes');

const url='mongodb://localhost:27017/conFusion'; //url with database
//const connect=mongoose.connect(url); //mongoose support this method to connect to mongodb servery

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }); //due to warning uing this code

connect.then((db)=>  //if db is correctly connected then executes this fn
{
   console.log("Connected correctly to the server");

   Dishes.create({
    name: 'Uthappizza',
    description: 'test'
})
.then((dish) => {
    console.log(dish);

    return Dishes.findByIdAndUpdate(dish._id, {
        $set: { description: 'Updated test'}
    },{ 
        new: true 
    })
    .exec();
})
.then((dish) => {
    console.log(dish);

    dish.comments.push({
        rating: 5,
        comment: 'I\'m getting a sinking feeling!',
        author: 'Leonardo di Carpaccio'
    });

    return dish.save();
})
.then((dish) => {
    console.log(dish);

    return Dishes.deleteMany({});
})
.then(() => {
    return mongoose.connection.close();
})
.catch((err) => {
    console.log(err);
});

});