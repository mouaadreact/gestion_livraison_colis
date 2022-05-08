import React, { useState } from 'react'

function Add() {
    const [firstname,setFirstname] = useState(null);
    const [lastname,setLastname] = useState(null);
    const [cin,setCin] = useState(null);
    const [email,setEmail] = useState(null);
    const [phone,setPhone] = useState(null); 
    const [password,setPassword] = useState(null);

    const InputText = document.querySelectorAll("input[type='text']");
    const InputEmail = document.querySelectorAll("input[type='email']");
    const vide=()=>{
     InputText.forEach((ele)=>{
       ele.value='';
     });
     InputEmail.value='';
    }
    const ExitMethod = (e) => {
        e.preventDefault();
        let EditContenu = document.querySelector('.EditContenu');
        EditContenu.classList.remove("show");
        vide();

    }
    const AddShow = () => {
        let EditContenu = document.querySelector('.EditContenu');
        EditContenu.classList.add('show');
    }
 
  return (
    <>
    <div className='EditContenu show' style={{top:"19% !important"}}>
   <div className='Edit'>
   <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
<div className="card h-100">
   <div className="card-body">
       <div className="row gutters justify-content-start">
           <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
               <h6 className="mb-2 text-primary">Personal Details</h6>
           </div>
           </div>
           <div className="row gutters justify-content-start">
           <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
               <div className="form-group">
                   <label htmlFor="fullName">First Name</label>
                   <input type="text" className="form-control" id="FirstName" placeholder="Enter first name" onChange={(e)=>setFirstname(e.target.value)}/>
               </div>                  
           </div>
           <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
               <div className="form-group">
                   <label htmlFor="fullName">Last Name</label>
                   <input type="text" className="form-control" id="LastName" placeholder="Enter last name" onChange={(e)=>setLastname(e.target.value)}/>
               </div>
           </div>
           
           </div>
           <div className="row gutters justify-content-start">
           <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
               <div className="form-group">
                   <label htmlFor="eMail">Email</label>
                   <input type="email" className="form-control" id="eMail" placeholder="Enter email ID" onChange={(e)=>setEmail(e.target.value)}/>
               </div>
           </div>
           <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
               <div className="form-group">
                   <label htmlFor="phone">Phone</label>
                   <input type="text" className="form-control" id="phone" placeholder="Enter phone number" onChange={(e)=>setPhone(e.target.value)}/>
               </div>
           </div>
           </div>
          
          
           <div className="row gutters justify-content-start">
           <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ">
               <div className="form-group">
                   <label htmlFor="cin">CIN</label>
                   <input type="text" className="form-control" id="cin" placeholder="Enter cin " onChange={(e)=>setCin(e.target.value)}/>
               </div>
           </div>
           <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ">
               <div className="form-group">
                   <label htmlFor="password">Password</label>
                   <input type="text" className="form-control" id="password" placeholder="Enter password " onChange={(e)=>setPassword(e.target.value)}/>
               </div>
           </div>
           
       </div>
       
      
       <div className="row gutters">
           <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
               <div className="text-right">
                   <button type="button" id="cancel" name="submit" style={{marginRight:'10px',fontSize:"12px",fontFamily:"cursive",fontWeight:"bold"}} className="btn btn-secondary" onClick={(e)=>{ExitMethod(e)}}>Cancel</button>
                   <button type="button" id="update" name="submit" className="btn btn-primary" >Update</button>
               </div>
           </div>
       </div>
   </div>
</div>
</div>
   </div>
</div>
</>
  )
}

export default Add;