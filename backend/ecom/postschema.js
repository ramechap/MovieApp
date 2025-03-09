const mongoose=require("mongoose")
const schema= mongoose.Schema;
const Schema = require('mongoose').Schema
const ecomSchema= new mongoose.Schema({
  photourl:{
    type:String,
    required:true,
    trim:true
},
    title:{
        type:String,
        required:true,
      
        trim:true
    },
    description: {
        type: String,
        required: true,
        default:"",
        trim:true
      
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity:{
      type:Number,
      default:1
    },
    price:{
      type:Number,
      default:1
    },
    categoryy: [{
      type: String,   // Array of strings (categories)
      required: true
    }],
   specification:[{
    type: String,   // Array of strings (categories)
    required: true
  }],
     
    
      filename: {
        type: String,
        trim:true
      
      },
    createdAt: {
        type: Date,
        default: Date.now
      },
})


const ecom=mongoose.model("Ecom",ecomSchema);

module.exports=ecom;
