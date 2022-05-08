import { useEffect, useState } from "react";
import React from 'react';
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import { updateClient } from "../../actions/user.actions";
import { FiCornerLeftDown } from "react-icons/fi";


export default function ClientInfos({profil,userId}) {
    const [lastnametest,setLastnameTest]=useState("");
    const userData=useSelector((state)=>state.userReducer);

    const ExitMethod = (e) => {
      e.preventDefault();
      let EditContenu = document.querySelector('.EditContenu');
      EditContenu.classList.remove("show");
     // vide();

  }

 
 // setLastnameTest(userData.lastname);
  const dispatch=useDispatch(); 

   const [firstname,setFirstname] = useState();
   const [lastname,setLastname] = useState();
   const [cin,setCin] = useState();
   const [email,setEmail] = useState();
   const [phone,setPhone] = useState(); 
   const [password,setPassword] = useState();

 
//-------------------------------------------------------


    const handleUpdate = async(e) => {    
      e.preventDefault();
       var data = {
         firstname:firstname,
         lastname:lastname,
         cin:cin,
         email:email,
         phone:phone,  
         password:password
        };
        
        //console.log(data);
        await dispatch(updateClient(data,userData._id));
       // vide();
        window.location="/Profil";
    }
 
    const AddShow = () => {
      let EditContenu = document.querySelector('.EditContenu');
      EditContenu.classList.add('show');
      //setLastnameTest(userData.lastname);
  }

   //setLastnameTest(userData.lastname);
  return (
    <>
        <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">First Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                     {userData.firstname}
                    </div>
                  </div>
                    <hr/>
                     <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Last Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData.lastname}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData.email}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                     +(212) {userData.phone}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">CIN</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData.cin}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info "  id="EditButton" onClick={AddShow} >Edit</a>

                    </div>
                  </div>
                </div> 
    </div>

    </div>
    <div className="EditContenu">
        <div className="Edit">
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
                        <input type="text" className="form-control" id="FirstName" placeholder="Enter first name"   onChange={(e)=>setFirstname(e.target.value)}/>
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
                        <button type="button" id="cancel" name="submit" style={{marginRight:'10px',fontSize:"13px",fontWeight:"bold",backgroundColor:"#e83e8c",fontFamily:"cursive",border:"0"}} className="btn btn-secondary" onClick={(e)=>{ExitMethod(e)}}>Cancel</button>
                        <button type="button" id="update" name="submit" className="btn btn-primary" onClick={handleUpdate} style={{marginRight:'10px',fontSize:"13px",fontWeight:"bold",fontFamily:"cursive",border:"0"}}>Update</button>
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
