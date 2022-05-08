import './Login.css'
import '../bootstrap.min.css'

import {useState,useEffect} from 'react';
import axios from 'axios';
import { UidContext } from '../AppContext';
import { useContext } from 'react';
import ForBidden_404 from '../Images/403.jpg'


function Login(){
    const uid=useContext(UidContext);

   const [username,setUsername]=useState("");
   const [password,setPassword]=useState("");
   
   let UsernameError=document.getElementById('usernameError');
   let PasswordError=document.getElementById('passwordError');

    
  axios.defaults.withCredentials=true;
   async function postName(e){
    console.log(username,password);
       e.preventDefault();
 
               axios({ 
                     method:"post",
                     url:`${process.env.REACT_APP_API_URL}api/user/login`,
                     withCredentials:true,
                     data:{
                         username:username,
                         password:password
                     }

               }).then((res)=>{

                if(res.data.errors){
                  UsernameError.innerHTML=res.data.errors.username;
                  PasswordError.innerHTML=res.data.errors.password;
                  setTimeout(()=>{
                    UsernameError.innerHTML=""
                    PasswordError.innerHTML=""
                  },1000);
                }else{ 
                    console.log(res.data);
                    if(res.data.type==="admin"){
                    window.location='/Dashboard'; 
                    }
                    else{
                      window.location='/Profil';
                    }
                 }


              }).catch(error=>{
                   console.log(error)
              }) 
     
   }


   return (

    <div className="Login"> 
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
       ) :(
         <>
         <div id="main-wrapper" className="container containers">
    <div className="row justify-content-center">
        <div className="col-xl-10">
            <div className="card border-0">
                <div className="card-body p-0">
                    <div className="row no-gutters">

                        <div className="col-lg-6 d-none d-lg-inline-block">
                            <div className="account-blockes rounded-right">
                                <div className="overlay rounded-right"></div>
                                <div className="account-testimonial">   
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="p-3">
                                <div className="mb-3">
                                    <h3 className="h4 font-weight-bold text-theme" style={{color:"rgb(66, 165, 245)"}}>Login</h3>
                                </div>

                                <h6 className="h5 mb-0">Welcome back!</h6>
                                <p className="text-muted mt-2 mb-3">Enter your email address and password to access admin panel.</p>

                                <form method='POST' onSubmit={postName} >
                                    <div className="form-group mt-3 mb-3">
                                        <label for="username">Username</label>
                                        <input 
                                             type="text" 
                                             className="form-control" 
                                             id="username" 
                                             name="username" 
                                             onChange={(e)=>setUsername(e.target.value)}    
                                             />
                                         <div className='Error' id='usernameError'></div>
                                    </div>
                                    
                                    <div className="form-group mb-5">
                                        <label for="password">Password</label>
                                        <input 
                                             type="password" 
                                             className="form-control" 
                                             id="password" 
                                             name="password" 
                                             onChange={(e)=>setPassword(e.target.value)}    
                                             />
                                        <div className='Error' id='passwordError'></div>
                                    </div>
                                    
                                    <button type="submit" className="btn btn-theme" style={{backgroundColor:"rgb(66, 165, 245)",color:"#FFF"}} >Login</button>
                                </form>
                            </div>
                        </div>

                       
                    </div>

                </div>
            </div>

            <p className="text-muted text-center mt-3 mb-0">Don't have an account? <a href="/SignUp" className="text-primary ml-1">register</a></p>

        </div>

    </div>
 </div>
         </>
       )
       }
     </div>  


   )
}

export default Login;

