const UserModel = require("../Models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const {LivraisonModel,LivraisonSchema}=require("../Models/livraison.model");
const bcrypt=require("bcrypt");

//*********************************************************************** */
module.exports.updateLivreurAdmin= async (req, res) => {
  var passwordCrpty;

  var data={};
  if(req.body.username!=='undefined'){data.username=req.body.username}
  if(req.body.password!=='undefined'){data.password=req.body.password}
  if(req.body.email!=='undefined'){data.email=req.body.email}
  if(req.body.lastname!=='undefined'){data.lastname=req.body.lastname}
  if(req.body.cin!=='undefined'){data.cin=req.body.cin}
  if(req.body.firstname!=='undefined'){data.firstname=req.body.firstname}
  if(req.body.phone!=='undefined'){data.phone=req.body.phone}
  if(req.body.file!=='undefined'){data.file=req.body.file}
  data.id=req.body.id;
  console.log(data)


  if (!ObjectID.isValid(req.body.id))
    return res.status(400).send("ID unknown : " + req.body.id);

   //console.log(req.body);

  if(req.files!==null){
     console.log("data: ")
     console.log(data);
     console.log("-------------")
     if(req.files.file.mimetype !== "image/jpg"
     && req.files.file.mimetype !== "image/png"
     && req.files.file.mimetype !== "image/jpeg")
     throw Error("invalid file");

     if(req.files.file.size > 5000000) throw Error("max size");

      filename = Math.round(Math.random() * 1E9)+req.body.username+".jpg";
  
    const file=req.files.file;
    file.mv(__dirname+"\\..\\client\\public\\Images\\"+filename,err=>{
      if(err){
        console.log(err);
        return res.status(500).send(err);
      }
    });


    const photo = filename;
    const {firstname,lastname,username,email,phone,password,cin,id} = data;
    data.file=filename;
    //console.log(data);
    const salt = await bcrypt.genSalt();
    if(req.body.password!=='undefined'){
       passwordCrpty = await bcrypt.hash(password, salt);
    }else{
        passwordCrpty=password;
    }

  console.log("exits")
    //password hash!
  await UserModel.findByIdAndUpdate(
      { _id:id},
      {
         $set:{
           email:email,
           phone:phone,
           photo:photo,
           password:passwordCrpty,
           username:username,
           cin:cin,
           firstname:firstname,
           lastname:lastname
         }
      },
      { new: true, upsert: true,setDefaultsOnInsert:false,omitUndefined: true},
      (err, docs) => {
        if(!err) console.log(docs);
        if (err) console.log(err); 
      }
    );

    //-------------------------------------------------------------
    }else{
    console.log("no ---------------------")

      const {firstname,lastname,username,email,phone,password,cin,id} = data;
      const salt = await bcrypt.genSalt();
      
      if(req.body.password!=='undefined'){
         passwordCrpty= await bcrypt.hash(password, salt);
      }else{
          passwordCrpty=password;
      }
      

     
     // console.log(req.body);
      await UserModel.findOneAndUpdate(
        { _id:id},
        {
           $set:{
             email:email,
             phone:phone, 
             password:passwordCrpty,
             username:username,
             cin:cin,
             lastname:lastname,
             firstname:firstname
           }
        },
        { new: true, upsert: true,setDefaultsOnInsert:false,omitUndefined: true},
        (err, docs) => {
          if(!err) console.log(docs);
          if (err) console.log(err); 
        }
      );

    }
  
  res.status(200).send({status:true});
};


//================================================================================/
//================================================================================//

module.exports.getAllDeliverers = async (req, res) => {
  
  const users = await UserModel.find({type:'livreur'});
  res.status(200).json(users);
};


 
module.exports.CommandPerDeliverers = async (req,res) => {

  await UserModel.aggregate([
    {"$match" : {'type':'livreur'}},
    {"$unwind": "$livraison"},
    {"$group":{"_id":"$username","total":{"$sum":1}}},
 
  ]).exec((err,result)=>{
    if(err) return res.status(201).json({err});
    else{return res.status(200).json(result)}
  });
 }

 module.exports.DeliveresCommandAverage = async (req,res) => {

  await UserModel.aggregate([
    {"$match" : {'type':'livreur'}},
    {"$unwind": "$livraison"},
    {"$group":{"_id":"$username","total":{"$sum":1}}},
    {"$group": {"_id":"livreur", "average": {"$avg": '$total'}}}
 
  ]).exec((err,result)=>{
    if(err) return res.status(201).json({err});
    else{return res.status(200).json(result)}
  });
 }

 module.exports.TotalDeliverers = async (req,res) => {
  await UserModel.find({type:'livreur'}).count(function (err, count) {
    if(err){
     return res.status(201).send({err});
    }
    else{
   return res.status(200).send({count});
    }
   }
  );
  }

  /*
  module.exports.getAllLivraison = async (req,res) => {
    await LivraisonModel.find({},function (err,docs) {
      if(err){
        return res.status(201).send({err});
      }else{
        return res.status(200).send({docs});
      }
    })
   }*/

   /*module.exports.getAllLivraison = async (req,res) => {
   
    await LivraisonModel.find({},function (err,docs) {
      if(err){
        return res.status(201).send({err});
      }else{
        return res.status(200).send({docs});
      }
    })
   }
   */

   //--------------------------------------------------------------------
   module.exports.getAllLivraison = async (req,res) => {
    var allData=[];
    await UserModel.find({type:'client'},(err,docs)=>{
      if(err){
        return res.status(201).send({err});
      }else{
        return res.status(200).send({docs});
     // allData=[...docs];
      
      }
    });
    /*allData.map((ele)=>{
     // console.log(ele);
      console.log({ele});
    })*/
   
  }
   module.exports.CommandPerMonth = async (req,res) => {
    await UserModel.aggregate([
      {"$match" : {'type':'client'}},
      {"$unwind": "$command"}
     // {"$group":{"_id":"$username","livraison":"$livraison"}}
    ]).exec((err,docs)=>{
      if(err){
        return res.status(201).send({err});
      }
      else{
        const result =[
          {month:1,command:0},
          {month:2,command:0},
          {month:3,command:0},
          {month:4,command:0},
          {month:5,command:0},
          {month:6,command:0},
          {month:7,command:0},
          {month:8,command:0},
          {month:9,command:0},
          {month:10,command:0},
          {month:11,command:0},
          {month:12,command:0},
        ];
        for(let i =0;i<12;i++){
         result[i].command = docs.filter((e)=>(new Date(e.createdAt)).getMonth()===i).length;
        }
      return res.status(200).send({result});
      }
      });
   }


module.exports.TotalCommandInMonth = async (req,res) => {
 await UserModel.aggregate([
   {"$match" : {'type':'client'}},
   {"$unwind": "$command"}
  // {"$group":{"_id":"$username","livraison":"$livraison"}}
 ]).exec((err,docs)=>{
     if(err){
       return res.status(201).send({err});
     }
     else{
     const result = docs.filter((e)=>(new Date(e.createdAt)).getMonth()===new Date().getMonth()).length;
     return res.status(200).send({result});
     }
   });
}


module.exports.TotalCommandInYear = async (req,res) => {
 
  await UserModel.aggregate([
    {"$match" : {'type':'client'}},
    {"$unwind": "$command"}
   // {"$group":{"_id":"$username","livraison":"$livraison"}}
  ]).exec((err,docs)=>{
      if(err){
        return res.status(201).send({err});
      }
      else{
      const result = docs.filter((e)=>(new Date(e.createdAt)).getFullYear()===new Date().getFullYear()).length;
      return res.status(200).send({result});
      }
    });
 }
 

//??????
 module.exports.TotalCommandPending = async (req,res) => {
  console.log(req.params.status);
   await UserModel.aggregate([
     {"$match" : {'type':'client'}},
     {"$unwind": "$command"},
     {"$match":{"command.status":false}},
     {"$group":{"_id":"$username","total":{"$sum":1}}},
     {"$group":{"_id":"command","somme":{"$sum":"$total"}}}
  
   ]).exec((err,result)=>{
     if(err) return res.status(201).json({err});
     else{return res.status(200).json(result)}
   });
  }

  //***************** */
  const changeBoolean=(val)=>{
        if(val==='true') return true;
        else return false;
  };
/******************* */
  module.exports.TotalCommandDelivered = async (req,res) => {
  
      await UserModel.aggregate([
        {"$match" : {'type':'client'}},
        {"$unwind": "$command"},
        {"$match":{"command.status":changeBoolean(req.params.status)}},
        {"$group":{"_id":"$username","total":{"$sum":1}}},
        {"$group":{"_id":"command","somme":{"$sum":"$total"}}}
    
      ]).exec((err,result)=>{
        if(err) return res.status(201).json({err});
        else{return res.status(200).json(result)}
      });
    }

//************************************************************************* */

module.exports.TotalClient = async (req,res) => {
 
  await UserModel.find({type:'client'}).count(function (err, count) {
    if(err){
     return res.status(201).send({err});
    }
    else{
   return res.status(200).send({count});
    }
   }
  );
  }


  module.exports.TotalCommand = async (req,res) => {
    await UserModel.aggregate([
      {"$match" : {'type':'client'}},
      {"$unwind": "$command"},
      {"$group":{"_id":"$username","total":{"$sum":1}}},
      {"$group":{"_id":"command","somme":{"$sum":"$total"}}}
   
    ]).exec((err,result)=>{
      if(err) return res.status(201).json({err});
      else{return res.status(200).json(result)}
    });
   }

   module.exports.CommandPerClient = async (req,res) => {

    await UserModel.aggregate([
      {"$match" : {'type':'client'}},
      {"$unwind": "$command"},
      {"$group":{"_id":"$username","total":{"$sum":1}}}
    ]).exec((err,result)=>{
      if(err) return res.status(201).json({err});
      else{return res.status(200).json(result)}
    });
   }


//************************************************************** */
 

//------------------------------------------------------------------------------------

  module.exports.confirmLivreurLivraison = async (req,res) => {

       
      // await UserModel.findOneAndUpdate({username:req.params.livreur,"livraison.client":req.params.client,"livraison.livreur":req.params.livreur},
      await UserModel.findOneAndUpdate({username:req.params.livreur,"livraison._id":req.params.id},  
      {$set : {available:true,'livraison.$.status':true,'livraison.$.confirm':true}},
       function (err,docs){
         if(err) { 
           console.log(err);
           res.json({message:err}) 
        }
         else {//console.log(docs);
              res.json({message:err}) 
               }
        });

        
       await  UserModel.findOneAndUpdate({username:req.params.client,"command._id":req.params.id},
       {'command.$.status':true});
     
      // console.log(req.params.id);
       await LivraisonModel.findOneAndUpdate({_id:req.params.id},
        {$set : {status:true}});

    };

  //-----------------------

  module.exports.confirmCommandClient = async (req,res) => {
     
  //  await  UserModel.findOneAndUpdate({username:req.params.client,"command.client":req.params.client,"command.livreur":req.params.livreur},
  await UserModel.findOneAndUpdate({username:req.params.client,"command._id":req.params.id}, 
  {'command.$.confirm':true});
  
    await LivraisonModel.findOneAndUpdate({_id:req.params.id},
     {$set : {confirm:true}});

 };

//******************************************************************** */
module.exports.getLivraison = async (req,res)=>{
  const livraison = await UserModel.find({_id:req.params.id}).select("livraison").select("-_id");
  res.status(200).json(livraison);
  }
  module.exports.getCommand = async (req,res)=>{
    const command = await UserModel.find({_id:req.params.id}).select("command").select("-_id");
    res.status(200).json(command);
  }
  module.exports.getAllLivreur = async (req, res) => {
   // console.log("hello");
    const users = await UserModel.find({type:'livreur',available:true}).select("-password");
    res.status(200).json(users);
  };


//----------------------------------------------------------
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find({type:req.params.type}).select("-password");
  res.status(200).json(users);
};


module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

//----------------------------------------------------------------------



module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);


  try {
    console.log(req.body);
    const salt = await bcrypt.genSalt();
    var password;
    if(req.body.password!==undefined){
       password = await bcrypt.hash(req.body.password, salt);
    }else{
        password=req.body.password;
    }
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
         $set:{
          email:req.body.email,
          phone:req.body.phone,
          cin:req.body.cin,
          password:password,
          firstname:req.body.firstname,
          lastname:req.body.lastname
         }
      },
      { new: true, upsert: true,setDefaultsOnInsert:false,omitUndefined: true},
      (err, docs) => {
        if(!err) console.log(docs);
        if (err) console.log(err);
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
  res.status(200).send({status:true});
};

 
//---------------------------------------------------------------

module.exports.updateLivreur = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
try{
    console.log(req.body);
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
         $set:{
            email:req.body.email,
           phone:req.body.phone
         }
      },
      { new: true, upsert: true,setDefaultsOnInsert:false,omitUndefined: true},
      (err, docs) => {
        if(!err) console.log(docs);
        if (err) console.log(err); 
      }
    );
}
    catch(error) {console.log(error);}
  
  res.status(200).send({status:true});
};

//-----------------------------------------------------------------------


/*module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  } 
};*/

module.exports.deleteClient = async (req, res) => {
  try {
    await UserModel.remove({ _id: req.params.id }).exec();
 /*  req.body.dataId.map(async(ele)=>{
      await LivraisonModel.remove({_id:ele}).exec();
    });*/
   

    res.status(200).json({ message: "Successfully deleted. " });

  } catch (err) {
    return res.status(500).json({ message: err });
  }
};


module.exports.deleteLivreur = async (req, res) => {
  try {
    await UserModel.remove({ _id: req.params.id }).exec();
  /*  req.body.dataId.map(async(ele)=>{
      await LivraisonModel.remove({_id:ele}).exec();
    });*/
   

    res.status(200).json({ message: "Successfully deleted. " });

  } catch (err) {
    return res.status(500).json({ message: err });
  }
};



module.exports.addLivraison = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) //||
    //!ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { livraison: req.body } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) console.log(docs);
        else console.log(err);
      }
    );
    // add to following list
    
    
    /*await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }
    );*/
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};




module.exports.deleteLivraison = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) //|| !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: {livraison : {livraisonID : req.body.livraison} } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) console.log(docs);
        else console.log(err);
      }
    );
    // remove to following list

    /*await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }
    );*/
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
