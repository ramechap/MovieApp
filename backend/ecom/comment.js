const mongoose=require("mongoose")
const schema= mongoose.Schema;
const Schema = require('mongoose').Schema
const youtubecommentSchema= new mongoose.Schema({
    
    comment: {
        type: String,
        required: true,
        default:"",
        trim:true
      
      },
      author:{
        type: String,
        required:true
    },
    postId  :{
        type: String,
        required:true
       
    },
    likes:{
        type: Array,
        default:[]
        
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
  
})
const youtubecomment=mongoose.model("YoutubeComment",youtubecommentSchema);
module.exports=youtubecomment;