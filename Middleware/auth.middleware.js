const jwt = require('jsonwebtoken');
const UserModel = require('../Models/user.model');

 

module.exports.checkUser = async (req,res,next) =>{
    const token = req.cookies.jwt;
   
    if(token) {
        jwt.verify(token,process.env.TOKEN_SECRET,async (err, decodedToken)=> {
            if(err){
            
                res.locals.user=null;
               // res.cookie('jwt','',{maxAge:1});
                next();
            }else{
                
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user=user;
                //console.log(user);
                next();
            }
        })
    }else{ 
        res.locals.user=null;
        next();
    }


   // res.sendFile(`${__dirname}/client/build/index.html`)
}

module.exports.requireAuth = (req,res,next) => {
    
    const token = req.cookies.jwt;
 
    if(token){ 
        jwt.verify(token,process.env.TOKEN_SECRET,async (err,decodedToken)=>{
            if(err){
            console.log(err)
            }else{
               
                next();
            }
        });
    }else{
        console.log('No token');
        res.status(400).send({error:'No token'})
    }
}