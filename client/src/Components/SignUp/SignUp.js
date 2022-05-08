import '../bootstrap.min.css'
import './SignUp.css'
import {useState} from 'react'; //,useEffect
import axios from 'axios';
import { UidContext } from '../AppContext';
import { useContext } from 'react';
import ForBidden_404 from '../Images/403.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp =()=>{
    const uid=useContext(UidContext);

     

    const [firstname,setFirstName]=useState("");
    const [lastname,setLastName]=useState("");
    const [phone,setPhone]=useState();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [cin,setCin]=useState("");
    const [confirmpassword,SetConfirmpassword]=useState("");
    const type="client";
   // const type="admin";

    axios.defaults.withCredentials=true;
    async function postName(e){

        e.preventDefault();

     const PasswordError=document.getElementById('passwordError');
     const CinError=document.getElementById('cinError');
     const UsernameError=document.getElementById('usernameError');
     const EmailError=document.getElementById('emailError');
     const FirstNameError=document.getElementById("firstnameError");
     const LastNameError=document.getElementById("lastnameError");
     const PhoneError=document.getElementById("phoneError");

     //------------------------------------------------------

     const ValueFirstName=document.getElementById('firstName');
     const ValueLastName=document.getElementById('lastName');
     const ValueEmail=document.getElementById("email");
     const ValueCin=document.getElementById("cin");
     const ValuePhone=document.getElementById("phone");
     const ValueUsername=document.getElementById("username");
     const ValuePassword=document.getElementById("password");
    const ValueConfirmPassword=document.getElementById("confirmPassword");
    console.log(ValueConfirmPassword.value);

//--------------------
     const SuccessEnregistrer=document.getElementById('SuccessEnregistrer');
//---------------
    if(password!==confirmpassword){
       PasswordError.innerHTML='Confirm your password'
    } 
    else{
        var bodyFormData=new FormData();
       // bodyFormData.append('file',photo);
         
                axios({
                   method:"post",
                   url:`${process.env.REACT_APP_API_URL}api/user/register`,
                   withCredentials:true,
                   data:{
                       username:username,
                       password:password,
                       email:email,
                       cin:cin,
                       firstname:firstname,
                       lastname:lastname,
                       type:type,
                       phone:phone
                    
                   }
               }).then(res=>{

                   console.log(res.data);

                   if(res.data.errors){ 
                       console.log(res.data.errors);
                       PasswordError.innerHTML=res.data.errors.password;
                       UsernameError.innerHTML=res.data.errors.username;
                       CinError.innerHTML=res.data.errors.cin;
                       EmailError.innerHTML=res.data.errors.email;
                       FirstNameError.innerHTML=res.data.errors.firstname;
                       LastNameError.innerHTML=res.data.errors.lastname;
                       PhoneError.innerHTML=res.data.errors.phone; 


                   }else{
                      toast.success('Success Register ! ');
                      PasswordError.innerHTML="";
                       UsernameError.innerHTML="";
                       CinError.innerHTML="";
                       EmailError.innerHTML="";
                       FirstNameError.innerHTML="";
                       LastNameError.innerHTML="";
                       PhoneError.innerHTML="";

                       ValueEmail.value="";
                       ValueFirstName.value="";
                       ValueLastName.value="";
                       ValueConfirmPassword.value="";
                       ValuePassword.value="";
                       ValueCin.value="";
                       ValuePhone.value="";
                       ValueUsername.value="";

                   }
               }).catch(erreur=>console.log(erreur));


               
       
      }
      

    }



return( 
   
   <div className="SignUp">
       {uid ? (
            <>
            <section className='page-not-found'>
            <img  src={ForBidden_404} alt='403 forbidden'/>
            <h1>403 Forbidden</h1>
            <p>The client does not have access rights to the content; that is, it is unauthorized,
             so the server is refusing to give the requested resource. Unlike 401 Unauthorized,
             the client's identity is known to the server.
             </p>
         </section>
            </>
       ) : (
            <>
            <ToastContainer autoClose={3000}/>
            <div id="main-wrapper" className="container containers">
                <div className="row justify-content-center">
                    <div className="col-xl-10">
                        <div className="card border-0">
                            <div className="card-body p-0">
                                <div className="row no-gutters">
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="mb-5">
                                                <h3 className="h4 font-weight-bold text-theme">Register</h3>
                                </div>
                                <form  method='POST' onSubmit={postName} >
                                    <div className="form-group">
                                        <label for="firstName">FirstName<span className="obligatoire">*</span></label>
                                        <input
                                         type="text" 
                                         className="form-control" 
                                         id="firstName" 
                                         /*pattern="[A-Za-z]{1-32}"
                                         required*/
                                         onChange={(e)=>setFirstName(e.target.value)
                                         }
                                        />
                                        <div className="Error" id="firstnameError"></div>
                                    </div>
                                    <div className="form-group">
                                        <label for="lastName">LastName<span className="obligatoire">*</span></label>
                                        <input
                                         type="text" 
                                         className="form-control" 
                                         id="lastName" 
                                        /* pattern="[A-Za-z]{1-32}"
                                         required*/
                                         onChange={(e)=>setLastName(e.target.value)}
                                        />
                                        <div className="Error" id="lastnameError"></div>
                                    </div>
                                    <div className="form-group">
                                        <label for="username">Username<span className="obligatoire">*</span></label>
                                        <input 
                                        type="text"
                                         className="form-control" 
                                         id="username" 
                                       /* required*/
                                         onChange={(e)=>setUsername(e.target.value)}
                                         />
                                          {/*pattern="([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}" */}
                                        <div className="Error" id="usernameError"></div>
                                    </div>
                                    <div className="form-group">
                                        <label for="phone">Phone<span className="obligatoire">*</span></label>
                                        <input
                                         type="text" 
                                         className="form-control" 
                                         id="phone" 
                                        /* pattern="^0[5-7][0-9]{8}"
                                         required*/
                                         onChange={(e)=>setPhone(e.target.value)}
                                        />
                                        <div className="Error" id="phoneError"></div>
                                    </div>
                                    <div className="form-group">
                                        <label for="email">Email address<span className="obligatoire">*</span></label>
                                        <input 
                                        type="text"
                                         className="form-control"
                                          id="email" 
                                         /* required*/
                                         onChange={(e)=>setEmail(e.target.value)}
                                          />
                                          <div className="Error" id="emailError"></div>
                                    </div>
                                    <div className="form-group">
                                        <label for="cin">CIN<span className="obligatoire">*</span></label>
                                        <input 
                                        type="text" 
                                        className="form-control" 
                                        id="cin"  
                                       /* required*/
                                         onChange={(e)=>setCin(e.target.value)}
                                        />
                                         {/* pattern="^[A-Z]{1,2}[0-9]{6}" */}
                                        <div className="Error" id="cinError"></div>
                                    </div>
                                     {/*<div className="form-group">
                                        <label for="photo">Photo<span className="obligatoire">*</span></label>
                                        <input 
                                        type="file" 
                                        className="form-control" 
                                        id="photo"
                                        required
                                         onChange={(e)=>setPhoto(e.target.files[0])}
                                         />
                                    </div>*/}
                                    <div className="form-group">
                                        <label for="password">Password<span className="obligatoire">*</span></label>
                                        <input 
                                        type="password" 
                                        className="form-control"
                                         id="password"  
                                         /*required*/
                                         onChange={(e)=>setPassword(e.target.value)}
                                         />
                                    </div>
                                    <div className="form-group mb-5">
                                        <label for="confirmPassword">Confirm Password<span className="obligatoire">*</span></label>
                                        <input 
                                        type="password" 
                                        className="form-control" 
                                        id="confirmPassword"
                                       /* required*/
                                        onChange={(e)=>SetConfirmpassword(e.target.value)}
                                       
                                         />
                                         <div className="Error" id="passwordError"></div>
                                         <div className="Success" id="SuccessEnregistrer"></div>
                                    </div>
                                    <button type="submit" className="btn btn-theme" style={{backgroundColor:"rgb(66, 165, 245)",color:"#FFF"}}>Register</button>
                                </form>
                            </div>
                        </div>


                        <div className="col-lg-6 d-none d-lg-inline-block">
                            <div className="account-blocks rounded-right">
                                <div className="overlay rounded-right"></div>
                                <div className="account-testimonial">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
          
            <div style={{display:"flex",justifyContent:"center"}}>
            <p className="text-muted text-center mt-3 mb-0">Don't have an account? </p>
            <a href="/Login" className="text-primary ml-1" style={{marginTop:"16px",marginLeft:"8px",cursor:"pointer"}}>register</a>
            </div>
        </div>
 
    </div>
    
</div>
            </>
       )
       }
   </div>

)
}

export default SignUp;