const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const accountSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures email is unique
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email');
      }
    }
  },
  password: {
    type: String,
    required: true
  },

  cpassword: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user', // Default role is 'user', 'admin' is for admin users
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});


// Instance method to generate a new token and add it to the tokens array
accountSchema.methods.generateAuthToken=async function(){
  try{  
      const token=  jwt.sign({_id:this._id.toString()},"astrowebwebsitetoken", { expiresIn: '3d' })
  this.tokens = this.tokens.concat({token:token})
  await this.save()
  return token
  }
  catch(e){
      console.log(e)
  }



}

// Middleware to hash password before saving

accountSchema.pre("save",async function(next){
  if(this.isModified("password")){
   this.password= await bcrypt.hash(this.password,11);
   this.cpassword= await bcrypt.hash(this.cpassword,11);

  }
  else{
   next()
  }
})


const ecomAuth = mongoose.model('EcomAuth', accountSchema);
module.exports = ecomAuth;
