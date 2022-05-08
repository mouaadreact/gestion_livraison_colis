const mongoose = require('mongoose');
const { isEmail , } = require('validator');
const bcrypt = require('bcrypt');
const {LivraisonModel,LivraisonSchema}= require('../Models/livraison.model');

const userSchema = new mongoose.Schema(
  {
    firstname:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        trim: true
    },
    lastname:{
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      trim: true
    },
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true, 
      unique: true,
      trim: true,
    },
    phone:{
      type:Number,
      required:true,
      unique:true
    },
    password: {
      type: String,
      required:true,
      //max:1024,
      minlength:6
    },
    photo: {
      type: Buffer,
     // required: true,
      default: null
    },
    cin :{
      type: String,
      required: true,
      max: 1024,
      trim:true,
      unique:true,
      minlength:7,
      maxlength:8
    },
    type :{
        type: String,
        required: true,
        max: 1024,
      },
      
    livraison: {
        type:[LivraisonSchema],
        required:false
    },
    command:{
      type:[LivraisonSchema],
      required:false
    },
    available:{
      type: Boolean,
      default:true,
      trim: true
    }
    
  },
  {
    timestamps: true,
  }
);

userSchema.index({ firstname: 1, lastname: 1 }, { sparse:true});

// play function before save into display: 'block',
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next(); 
}); 

userSchema.statics.login = async function(username, password
  ) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
}; 

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;