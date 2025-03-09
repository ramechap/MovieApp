const mongoose=require("mongoose")
const schema= mongoose.Schema;
const Schema = require('mongoose').Schema
const reviewSchema= new mongoose.Schema({
author: {
    type: Schema.Types.ObjectId,
    ref: 'EcomAuth',  // References the User model
    required: true
  },
  postid: {
    type: Schema.Types.ObjectId,
    ref: 'Ecom',  // References the User model
    required: true
  },
  description: {
    type: String,
    required: true,
    default: "",
    trim: true
  },
  email: {
    type: String,
    required: true,
    default: "",
  
  },
  rating: {
    type: Number,  // Changed to Number for rating
    required: true,
    min: 1,         // Rating should be between 1 and 5
    max: 5,
    default: 3      // Default rating if none is provided
  },
  createdAt: { type: Date, default: Date.now }
})

const review=mongoose.model("Review",reviewSchema);

module.exports=review;
