const UserModel = require('../Models/user.model');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');
const jwt = require('jsonwebtoken');

 
//*************************************************************** */
module.exports.AddLivreur = async (req,res)=>{
    console.log(req.body);
   
      if(req.files.file===null){
        return res.status(400).json({msg:'No file uplaod '});
       }


         if(req.files.file.mimetype !== "image/jpg"
         && req.files.file.mimetype !== "image/png"
         && req.files.file.mimetype !== "image/jpeg")
         throw Error("invalid file");
  
         if(req.files.file.size > 5000000) throw Error("max size");
  
          filename = Math.round(Math.random() * 1E9)+req.body.username+".jpg";
          console.log(filename);
   
  
    
      
        const file=req.files.file;
        file.mv(__dirname+"\\..\\..\\client\\public\\Images\\"+filename,err=>{
          if(err){
            console.log(err);
            return res.status(500).send(err);
          }
        });


        const photo = filename;
        const {firstname,lastname,username,email,phone,password,cin,type,livraison} = req.body;
        
    try{
       const user = await UserModel.create({firstname,lastname,username,email,phone,password,photo,cin,type,livraison});
        console.log(user);
        res.status(201).json({user: user._id});
    }catch(err){
        const errors = signUpErrors(err);
        res.status(200).send({errors});
    }
    }

//************************************************************** */
module.exports.signUp = async (req,res)=>{
//const photo = res.photo;
const {firstname,lastname,username,email,phone,password,cin,type,livraison} = req.body;

try{
  // const user = await UserModel.create({firstname,lastname,username,email,phone,password,photo,cin,type,livraison});
   const user = await UserModel.create({firstname,lastname,username,email,phone,password,cin,type,livraison});
    console.log(user);
    res.status(201).json({user: user._id});
}catch(err){
    const errors = signUpErrors(err);
 res.status(200).send({errors});
}
}

module.exports.signIn = async (req,res) => {
    const {username,password} = req.body;
         
    try{ 
        const user = await UserModel.login(username,password);
       const id=user._id;
       console.log("==============================");
         console.log(user);
    console.log("=======================================");
        const token = jwt.sign({id},process.env.TOKEN_SECRET, {
            expiresIn : 3*24*60*60*1000 
        });
        
        res.cookie('jwt',token,{httpOnly :true,maxAge:3*24*60*60*1000 });
       
        res.status(200).json({user:user._id,type:user.type});
    } catch(err){
        const errors = signInErrors(err);
        res.status(200).json({errors});
    }
}

module.exports.logout = (req,res) =>{
    res.cookie('jwt','',{maxAge :1});
    res.redirect('/');
}