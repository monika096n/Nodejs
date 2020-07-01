/*var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var User=new Schema({
      username:{
          type:String,
          required:true,
          unique:true

       },

       password:{
           type:String,
            required:true
       },
       admin:{
          type:Boolean,
          default:false

       }


});


module.exports=mongoose.model('User',User);
*/
// passport
/*  
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var passportLocalmongoose =require('passport-local-mongoose'); //this is the mongoose plugin for authentiction


var User=new Schema({ //the above plugin already contains username and password so that no need to add in schema
   
       admin:{
          type:Boolean,
          default:false

       }


});

User.plugin(passportLocalmongoose); //adding this pluggin to the moongose

module.exports=mongoose.model('User',user);
*/

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var passportLocalmongoose =require('passport-local-mongoose'); //this is the mongoose plugin for authentiction


var User=new Schema({ //the above plugin already contains username and password so that no need to add in schema
      
      firstname:{
         type:String,
         default:''

      },
       
      lastname:{
         type:String,
         default:''

      },

       admin:{
          type:Boolean,
          default:false

       }


});

User.plugin(passportLocalmongoose); //adding this pluggin to the moongose

module.exports=mongoose.model('User',User);