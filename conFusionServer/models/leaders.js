
const mongoose=require('mongoose'); //inserting mongoose module for creating schema with mongodb
const  Schema=mongoose.Schema; //for schema purpose
require('mongoose-currency').loadType(mongoose);//loading mongoose-currency into  mongoose
const Currency = mongoose.Types.Currency;


const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
     designation: {
        type: String,
        required: true
    },
     abbr: {
        type: String,
        required: true
    }
    
});

var Leaders=mongoose.model('Leader',leaderSchema); //giving new name to leaderSchema
module.exports=Leaders;

