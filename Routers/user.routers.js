const router = require('express').Router();
const authController =require('../Controllers/auth.controller');
const userController=require('../Controllers/user.controller');
const uploadController= require('../Controllers/upload.controller');
const mailController=require("../Controllers/mail.controller");
const multer = require('multer');
const path = require('path');
const upload = multer({dest: `C:/Users/Mouaa/OneDrive/Bureau/Projet_Livraison_Colis/client/public/uploads/profil/`});
//======================================================
const UserModel = require('../Models/user.model');
const LivraisonSchema= require('../Models/livraison.model');
const LivraisonModel= require('../Models/livraison.model');
//=============================================================
//router.post("/register",upload.single('file'),uploadController.uploadProfil,authController.signUp);
router.post("/register",authController.signUp);
router.post("/addLivreur",authController.AddLivreur);
router.post("/login",authController.signIn);
router.post("/updateLivreurAdmin",userController.updateLivreurAdmin);
router.post('/upload/:id',uploadController.uploadProfil);   

//-------------------
router.post('/mail/contactus',mailController.ContactUs);
router.post('/mail/newcommand',mailController.sendEmailNewCommand);
router.post('/mail/confirmationLivreur',mailController.sendEmailConfirmationLivreur);
router.post('/mail/confirmationClient',mailController.sendEmailConfirmationClient);
//-----------------------------
router.get("/logout",authController.logout); 
router.get("/Client/GetTable/:type",userController.getAllUsers);
router.get("/livreur",userController.getAllLivreur);
router.get("/getLivraison/:id",userController.getLivraison);
router.get("/getCommand/:id",userController.getCommand);
router.get("/:id",userController.userInfo);

router.get("/Client/Count",userController.TotalClient);
router.get("/Client/Command",userController.TotalCommand);
router.get("/Client/CommandPerClient",userController.CommandPerClient);

router.get("/Command/CommandCurrentMonth",userController.TotalCommandInMonth);
router.get("/Command/CommandCurrentYear",userController.TotalCommandInYear);
router.get("/Command/CommandDelivered/:status",userController.TotalCommandDelivered);
router.get("/Command/CommandPerMonth",userController.CommandPerMonth);
router.get("/Command/GetTable",userController.getAllLivraison);

router.get("/Deliveres/Count",userController.TotalDeliverers);
router.get("/Deliveres/DeliveresCommandAverage",userController.DeliveresCommandAverage);
router.get("/Deliveres/CommandPerDeliver",userController.CommandPerDeliverers);
router.get("/Deliveres/GetTable",userController.getAllDeliverers);
 

router.put("/livreur/confirmCommand/:id/:client",userController.confirmCommandClient);
router.put("/livreur/confirmLivraison/:id/:client/:livreur",userController.confirmLivreurLivraison);

 //------------------------------
router.put("/:id",userController.updateUser);
router.put("/livreur/:id",userController.updateLivreur);
  
router.delete('/client/:id',userController.deleteClient);
router.delete('/livreur/:id',userController.deleteLivreur);

router.patch('/addLivraison/:client/:livreur',uploadController.uploadFacture);
router.patch('/deleteLivraison/:id',userController.deleteLivraison);
 


module.exports=router;