import React, { useState } from 'react'
import '../bootstrap.min.css'
import './ContactUs.css'
import axios from 'axios';
import Alert from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function ContactUs() {
  const [email,setEmail]=useState(null);
  const [phone,setPhone]=useState(null);
  const [subject,setSubject]=useState(null);
  const [name,setName]=useState(null);
  const [comment,setComment]=useState(null);
  const [success,setSuccess]=useState(false);

  const handleContactUs=(e)=>{
     e.preventDefault();
     if(email!==null&&phone!==null&&subject!==null&&name!==null&&comment!==null&&email!==""&&phone!==""&&subject!==""&&name!==""&&comment!==""){
         
        const data={
          email:email,
          phone:phone,
          subject:subject,
          name:name,
          comment:comment
      }
      axios.post(`${process.env.REACT_APP_API_URL}api/user/mail/contactus`,data)
      .then((res)=>{
          if(res.status===200) {
              toast.success("Email sucessfully Sended")
              setTimeout(()=>{
                  window.location="/ContactUs";
              },2500);
          }
          
      })
      .catch((err)=>console.log(err));
     
    }else{
        toast.error("You Shoud Fill All Fields ! ");
       }
      
   }

  return (
      <>
      <ToastContainer autoClose={3000}/>
        <div className='contact-us' style={{marginTop:"40px",marginBottom:"30px",fontSize:"14px"}}>
        <div className="container">
        <form>
            <div className="row">
                <div className="col-md-6">
                    <div id="successfail"></div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-xxl-6" id="message" style={{width:"727px"}}>
                    <fieldset style={{width:"636px"}}>
                        <legend style={{fontSize:"20px",color:"#e83e8c",fontWeight:"bold"}}><i className="fa fa-envelope"></i> Contact Us</legend>
                    </fieldset>
                    <div className="has-feedback form-group mb-3">
                    <label className="form-label" for="from_name">Name</label>
                    <input className="form-control" type="text" id="name" name="from_name" required placeholder="Full Name" onChange={(e)=>setName(e.currentTarget.value)}/>
                    </div>
                    <div className="has-feedback form-group mb-3"><label className="form-label" for="from_email">Email</label><input  id="email" className="form-control" type='email'   placeholder="Email Address" onChange={(e)=>setEmail(e.currentTarget.value)} required/></div>
                    <div className="has-feedback form-group mb-3"><label className="form-label" for="from_email">Phone</label><input id="phone" className="form-control" type='text'  placeholder="Phone Number" onChange={(e)=>setPhone(e.currentTarget.value)}/></div>
                    <div className="has-feedback form-group mb-3"><label className="form-label" for="from_email">Subject</label><input id="subject" className="form-control" type='text'  placeholder="Subject Email" onChange={(e)=>setSubject(e.currentTarget.value)}/></div>
                    <div className="form-group mb-3"><label className="form-label" for="comments">Comments</label><textarea id="comment" className="form-control"  placeholder="Enter comments here" rows="5" onChange={(e)=>setComment(e.currentTarget.value)}></textarea></div>
                  
                    <div className="form-group mb-3">
                    <button 
                    className="btn btn-primary d-block w-100 buttonContact" 
                    type="submit" 
                    onClick={(e)=>{handleContactUs(e)}}>Send 
                    <i className="fa fa-chevron-circle-right"></i></button></div>
                    <hr/>
                </div>
                <div className="col-md-6">
                    <fieldset></fieldset>
                </div>
            </div>
            
        </form>
    </div>

    </div>
    </>
  )
}

export default ContactUs