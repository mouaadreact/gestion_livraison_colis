module.exports.signUpErrors = (err) => {
  let errors = { username: "", email: "", password: "" ,cin:"",firstname:"",lastname:"",phone:""};
 
  /* firstname - lastname - phone */
  console.log(err);
     
  if (err.message.includes('username'))  errors.username = "Enter Username";

  if (err.message.includes('email')) errors.email = "Enter Email";

  if (err.message.includes('cin')) errors.cin = "Enter Cin";
  
  if (err.message.includes('firstname')) errors.firstname = "Enter Firstname";
 
  if (err.message.includes('lastname')) errors.lastname = "Enter lastname";
  
  if (err.message.includes('phone')) errors.phone = "Enter Phone";
   
  if (err.message.includes('password'))  errors.password = "Enter Password";


  //--------------------------------------------------------------------------
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("username"))
    errors.pseudo = "Username already exist ";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email already exist";

    //----------------------------------------------------
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("password"))
    errors.pseudo = "Password already exist";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("cin"))
    errors.pseudo = "Cin already exist";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("phone"))
    errors.pseudo = "Phone already exist";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("lastname"))
    errors.pseudo = "Lastname already exist";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("firstname"))
    errors.pseudo = "Firstname already exist";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { username: '', password: ''}

  
  if (err.message.includes("email")) 
    errors.username = "Username inconnu";
  
 if (err.message.includes('password'))
    errors.password = "Password incorrect"

  return errors;
} 

module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: ""};

  if (err.message.includes('invalid file'))
    errors.format = "Format incompatabile";

  if (err.message.includes('max size'))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors
}