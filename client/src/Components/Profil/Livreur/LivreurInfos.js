import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { updateLivreur } from "../../actions/user.actions";

const LivreurInfos =()=>{
  let EditContenu=document.querySelector('.EditContenu');
  let Cancel=document.getElementById("Cancel");
  
  const ExitMethod = () => {
    let EditContenu=document.querySelector('.EditContenu');
    EditContenu.classList.remove("show");
}

const userData=useSelector((state)=>state.userReducer);
const dispatch=useDispatch(); 

   const [numberDelivery,setNumberDelivery]=useState(0);
   const [Email,setEmail]=useState();
   const [Phone,setPhone]=useState();

   const handleData=(e)=>{ 
     e.preventDefault();
     const data={
       email:Email,
       phone:Phone
     }

     dispatch(updateLivreur(data,userData._id));
   }

   function AddShow(){
    let EditContenu=document.querySelector('.EditContenu');
    EditContenu.classList.add("show");
   }

    return(
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
                     {/* <a id='EditButton'
                        className="btn btn-info " 
                        style={{fontWeight:"bold",color:"#FFF"}} 
                         onClick={(e)=>{AddShow(e)}}
                         >Edit</a>*/}
                         <a class="btn btn-info " id="EditButton" onClick={AddShow} >Edit</a>
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
                  <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <h6 className="mb-2 text-primary">Personal Details</h6>
                      </div>
                      <div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                              <label for="fullName">Phone Number</label>
                              <input 
                                type="text" 
                                className="form-control" 
                                id="PhoneNumber" 
                                placeholder="Enter Phone Number"
                                onChange={(e)=>setPhone(e.target.value)}
                              />
                          </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                              <label for="eMail">Email</label>
                              <input 
                                type="email" 
                                className="form-control" 
                                id="EMail" 
                                placeholder="Enter email ID"
                                onChange={(e)=>setEmail(e.target.value)}
                              />
                          </div>
                      </div>
                      
                  <div className="row gutters" style={{marginTop:"20px"}}>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="text-right">
                              <button 
                                type="button" 
                                id="Cancel" 
                                name="submit" 
                                className="btn btn-secondary"
                                style={{marginRight:'10px',fontSize:"13px",fontWeight:"bold",backgroundColor:"#e83e8c",fontFamily:"cursive",border:"0"}}
                                onClick={ExitMethod}
                               >
                               Cancel
                               </button>
                              <button 
                                type="button"
                                id="Update" 
                                name="submit" 
                                className="btn btn-primary" 
                                style={{marginRight:'10px',fontSize:"13px",fontWeight:"bold",fontFamily:"cursive",border:"0"}}
                                onClick={(e)=>handleData(e)}
                               >Update</button>
                          </div>
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
export default LivreurInfos;