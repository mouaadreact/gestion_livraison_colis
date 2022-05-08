const UserModel = require('../Models/user.model');
const nodemailer=require("nodemailer") 
///---------------------------------------------


module.exports.ContactUs=async(req,res)=>{
    console.log(req.body);
    let transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            

            user:"ginf2.responsable@gmail.com",
            pass:"ensat_filiere_ginf2"
        },
        tls:{
            rejectUnauthorized:false 
        }
     });
 
     let mailOptions={
         form:req.body.email,
         to:"ginf2.responsable@gmail.com",
         subject:`
         Message from email : ${req.body.email} , 
         subject : 
           ${req.body.subject}`,
         "text":` 
           Message form user:
           Username : ${req.body.name} .
           Phone : ${req.body.phone} .

           Question : ${req.body.comment} .
         `
     };
 
     transporter.sendMail(mailOptions,(err,success)=>{
         if(err) {
            res.status(500).json({"error":err});
         }
         else {
            res.status(200).json({msg:"Email send successfully ! "});
         }
     });
}





//---------------------------------------------------
module.exports.sendEmailNewCommand=async(req,res)=>{
    console.log(req.body);
    let transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"ginf2.responsable@gmail.com",
            pass:"ensat_filiere_ginf2"
        },
        tls:{
            rejectUnauthorized:false 
        }
     });
 
     let mailOptions={
         form:"ginf2.responsable@gmail.com",
         to:req.body.email,
         subject:"Check your table command you have a new commmand incoming ! ",
         "text":`
         Informations about the command :

         clientUsername: ${req.body.username}
         clientName : ${req.body.firstname} ${req.body.lastname}
         source : ${req.body.source} 
         destination : ${req.body.dest}

         Once you delivered the package confirm it on the platform
         `
     };
 
     transporter.sendMail(mailOptions,(err,success)=>{
         if(err) {
            res.status(500).json({"error":err});
            console.log(err)
         }
         else {
            res.status(200).send("Email send successfully ! ");
            console.log("Successefull ");
         }
     });
}

//-----------------------------------------------------------------------------------


module.exports.sendEmailConfirmationLivreur=async(req,res)=>{
    console.log(req.body);
    let transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"ginf2.responsable@gmail.com",
            pass:"ensat_filiere_ginf2"
        },
        tls:{
            rejectUnauthorized:false 
        }
     });
 
     console.log(req.body.username)
     let mailOptions={
         form:"ginf2.responsable@gmail.com",
         to:req.body.email,
         subject:"Your command is delivered ? ",
         "text":`
         hello ${req.body.username} make sure that you're package is delivered 
         to address ${req.body.dest} , if is there any problem please let us know 
         by contacting us on contactUs form (exist in home page)`
     };
 
     transporter.sendMail(mailOptions,(err,success)=>{
         if(err) {
            res.status(500).json({"error":err});
            console.log(err)
         }
         else {
            res.status(200).send("Email send successfully ! ");
            console.log("Successefull ");
         }
     });

}


//--------------------------------------------------------------------------------




module.exports.sendEmailConfirmationClient=async(req,res)=>{
    console.log(req.body);
    let transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"ginf2.responsable@gmail.com",
            pass:"ensat_filiere_ginf2"
        },
        tls:{
            rejectUnauthorized:false 
        }
     });
 
     let mailOptions={
         form:"ginf2.responsable@gmail.com",
         to:req.body.email,
         subject:"Confirmation of client",
         "text":`hello ${req.body.livreur} ,  client : ${req.body.username} was confirm his command`
     };
 
     transporter.sendMail(mailOptions,(err,success)=>{
         if(err) {
            res.status(500).json({"error":err});
            console.log(err)
         }
         else {
            res.status(200).send("Email send successfully ! ");
            console.log("Successefull ");
         }
     });



}