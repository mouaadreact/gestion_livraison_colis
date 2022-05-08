const UserModel = require('../Models/user.model');
const {LivraisonModel,LivraisonSchema}= require('../Models/livraison.model');
const fs = require('fs');
 
const {promisify}=require('util');

const { uploadErrors} = require('../Utils/errors.utils');
const pipeline= promisify(require('stream').pipeline);


//=======================================================================
module.exports.uploadProfil=async (req,res,next)=>{
   var filename;
  /* console.log(req.files.file.name);
   console.log(req.body)
   try{
     console.log(req.files.file.mimetype);
        if(req.files.file.mimetype !== "image/jpg"
        && req.files.file.mimetype !== "image/png"
        && req.files.file.mimetype !== "image/jpeg")
        throw Error("invalid file");

        if(req.files.file.size > 500000) throw Error("max size");
    
       filename = Math.round(Math.random() * 1E9)+req.body.username+".jpg";
    
        console.log(filename);
  
    const file=req.files.file;
    file.mv(__dirname+"\\..\\client\\public\\Images\\"+filename,err=>{
      if(err){
        console.log(err);
        return res.status(500).send(err);
      }
    });
    
 console.log(filename);


    
    }catch(err){
          console.log(err);
          const errors = uploadErrors(err);
          return res.status(201).json({errors});
      }

  

*/
  //----------------------------------------------------------
  try { 
    await UserModel.findByIdAndUpdate(
      req.params.id,
        { $set: { photo: req.body.file } },
        { new: true, upsert: true,setDefaultsOnInsert:false,omitUndefined: true})
      //  { new: true, upsert: true, setDefaultsOnInsert: true })
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }));
        
  } catch (err) {
    return res.status(500).send({ message: err });
  }

  //--------------------------------------------------------

   next();
};


//==================================================================
//==================================================================


module.exports.uploadFacture=async(req,res)=>{
  let filename;
  try{
      if(req.files.file===null){
      return res.status(400).json({msg:'Nofile uplaod'});
     }
     
       if(req.files.file.mimetype !== 'application/pdf')
       throw Error("invalid file");

       if(req.files.file.size > 5000000) throw Error("max size");

        filename = Math.round(Math.random() * 1E9)+req.body.usernameClient+"_"+req.params.livreur+".pdf";
        console.log(filename);
     
      const file=req.files.file;
      file.mv(__dirname+"\\..\\client\\public\\facture\\"+filename,err=>{
        if(err){
          console.log(err);
          return res.status(500).send(err);
        }
      });


      console.log(req.body);
      console.log("==================");
      console.log(filename);

    let livraison= await LivraisonSchema.statics.createLivraison(
    req.params.livreur,
    filename,
    req.body.usernameClient,
    req.body.source, 
    req.body.dest,
    req.body.phoneClient,
    req.body.cinClient,
    req.body.emailClient,
    req.body.emailLivreur
     ); 

      await UserModel.findByIdAndUpdate(
        req.params.client,
        { $addToSet: { command: livraison } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) console.log(docs);
          else console.log(err);
        }
      );


  
      await UserModel.findOneAndUpdate(
        {username:req.params.livreur},
        { $addToSet: { livraison: livraison}},
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) console.log(docs);
          else console.log(err);
        }
      );
     
      await UserModel.findOneAndUpdate(
         {username:req.params.livreur},
         {available:false} 
      );

       res.status(200).send({status:true});
       console.log('FINISHED ALL REQUEST   ... ! ')

   }catch(err){
       console.log(err);
       return res.status(201).json({err});
    
   }   
   
  //******************************************************************************* */
   
   /*try {
    await UserModel.findByIdAndUpdate(
      req.params.client,
      { $addToSet: { livraison: livraison } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) console.log(docs);
        else console.log(err);
      }
    );
     } catch (err) {
       return res.status(500).send({ message: err });
     }
 

      try {
      await UserModel.findByIdAndUpdate(
        req.params.livreur,
        { $addToSet: { command: livraison} },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) console.log(docs);
          else console.log(err);
        }
      );
       } catch (err) {
         return res.status(500).send({ message: err });
       }
     
     res.status(200).send({status:true});
     console.log('FINISHED ALL REQUEST   ... ! ')*/
}











//---------------------------------------------------------------------
/*
module.exports.uploadFacture=async(req,res)=>{
  try{
    console.log(req.body);
/*      if(req.files.file===null){
      return res.status(400).json({msg:'Nofile uplaod'});
     }
    // console.log(req.body);
    // console.log(req.files.file);
     
    if(req.file.mimetype !== 'application/pdf')
    throw Error("invalid file");

    if(req.file.size > 5000000) throw Error("max size");
//  console.log("==============================================");

    const filename = req.body.usernameClient+"_"+req.params.livreur+".pdf";

  /*  const readableStream = fs.createReadStream(req.file.path);
    await pipeline (
    readableStream,
     fs.createWriteStream(
       __dirname+"\\..\\..\\client\\public\\facture\\"+filename
     )
 );
   fs.unlinkSync(req.file.path);


 
   const file=req.file;
   file.mv(__dirname+"\\..\\..\\client\\public\\facture\\"+filename,err=>{
     if(err){
       console.log(err);
       return res.status(500).send(err);
     }
     res.json({fileName:filename,filePath:__dirname+"\\..\\..\\client\\public\\facture\\"+filename});
   });


var livraison= await LivraisonSchema.statics.createLivraison(req.params.livreur,
 filename,
 req.body.usernameClient,req.body.source,req.body.dest);





}catch(err){
    console.log(err);
    //const errors = uploadErrors(err);
    return res.status(201).json({err});

}   

//******************************************************************************* 

// weird 
try {
 await UserModel.findByIdAndUpdate(
   req.params.client,
   { $addToSet: { livraison: livraison } },
   { new: true, upsert: true },
   (err, docs) => {
     if (!err) console.log(docs);
     else console.log(err);
   }
 );
  } catch (err) {
    return res.status(500).send({ message: err });
  }


/*   try {
   await UserModel.findByIdAndUpdate(
     req.params.livreur,
     { $addToSet: { livraison: livraison} },
     { new: true, upsert: true },
     (err, docs) => {
       if (!err) console.log(docs);
       else console.log(err);
     }
   );
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  
  res.status(200).send({status:true});
}*/