 /*const mongoose=require('mongoose'); //inserting mongoose module for creating schema with mongodb
const  Schema=mongoose.Schema; //for schema purpose

var dishSchema=new Schema({   //creating a new schema named dishSchema
    name:{                        //various fields of schema
        type:String, 
        required:true,
        unique:true
    },

    description:{
         type:String,
         required:true

    }
} ,
    {
        timestamps:true
    }
);

var Dishes=mongoose.model('Dish',dishSchema); //giving new name to dishSchema
module.exports=Dishes;

*/
/*
// part 2

const mongoose=require('mongoose'); //inserting mongoose module for creating schema with mongodb
const  Schema=mongoose.Schema; //for schema purpose

var dishSchema=new Schema({   //creating a new schema named dishSchema
    name:{                        //various fields of schema
        type:String, 
        required:true,
        unique:true
    },

    description:{
         type:String,
         required:true

    }
} ,
    {
        timestamps:true
    }
);

var Dishes=mongoose.model('Dish',dishSchema); //giving new name to dishSchema
module.exports=Dishes;

*/
// creating sub-documents
const mongoose=require('mongoose'); //inserting mongoose module for creating schema with mongodb
const  Schema=mongoose.Schema; //for schema purpose
const commentSchema= new Schema({

      rating:{
          type:Number,
          min:1,
          max:5,
          required:true
      },
      comment:{
          type:String,
          required:true
      },
      author:{
          type:String,
          required:true
      }
 },
      {
        timestamps:true
    }
);

var dishSchema=new Schema({   //creating a new schema named dishSchema
    name:{                        //various fields of schema
        type:String, 
        required:true,
        unique:true
    },

    description:{
         type:String,
         required:true

    },
    comments:[commentSchema] //array 
} ,
    {
        timestamps:true
    }
);

var Dishes=mongoose.model('Dish',dishSchema); //giving new name to dishSchema
module.exports=Dishes;

