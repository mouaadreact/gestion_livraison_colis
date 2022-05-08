const mongoose = require('mongoose');
const { isEmail,isNumber } = require('validator');

const LivraisonSchema = new mongoose.Schema(
  {
    livreur:{
        type: String,
        required: true, 
        minLength: 3,
        maxLength: 55,
        trim: true
    }, 
    client:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        trim: true
    },
    phoneClient:{
      type:Number,
      required:true
    },
    cinClient:{
      type: String,
      required: true
    }, 
    status:{
      type: Boolean,
      default:false,
      trim: true
  },
  confirm : {
    type: Boolean,
    default:false,
    trim: true
},
   source: {
      type: String,
      required: true,
      trim: true
    },
    dest: {
      type: String,
      required: true,
      trim: true,
    },
    facture: {
        type: String,
        required: true,
        trim: true,
       
    },
    emailClient:{
      type: String,
      required: true,
      trim: true,
    },
    emailLivreur:{
      type: String,
      required: true,
      trim: true,
    }
      
  },
  {
    timestamps: true,
  }
);


//********************************************************************* */
//LivraisonSchema.index({ livreur : 1,client:1 },{unique:true});
LivraisonSchema.index({ livreur : 1,client:1,createdAt:1},{sparse:true});

 
//******************************************************************************** */

LivraisonSchema.statics.createLivraison = async function(livreur,facture,client,source,dest,phoneClient,cinClient,emailClient,emailLivreur) {
    try{
        const livraison = await LivraisonModel.create({livreur,facture,client,source,dest,phoneClient,cinClient,emailClient,emailLivreur});
        console.log(livraison);
        return livraison;
    }catch(err){
        console.log(err);
     return err;
    }
};

const LivraisonModel = mongoose.model("delivery", LivraisonSchema);

module.exports = {LivraisonModel,LivraisonSchema};
