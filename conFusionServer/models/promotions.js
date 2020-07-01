
const mongoose=require('mongoose'); //inserting mongoose module for creating schema with mongodb
const  Schema=mongoose.Schema; //for schema purpose
require('mongoose-currency').loadType(mongoose);//loading mongoose-currency into  mongoose
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({
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
 
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
  
});

var Promotions=mongoose.model('Promotion',promotionSchema); //giving new name to dishSchema
module.exports=Promotions;

