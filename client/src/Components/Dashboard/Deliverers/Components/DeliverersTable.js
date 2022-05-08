import React, { useEffect, useState } from 'react'
import '../../Dashboard.css'
import '../../assets/bootstrap/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { BsCheckCircleFill } from 'react-icons/bs';
import {BsFillTrashFill} from 'react-icons/bs';
import {MdAddBox} from 'react-icons/md';
import {FaPen} from 'react-icons/fa';
import './Add.css';
import Pagenation from '../../../Profil/Client/Pagenation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DeliverersTable() {

    const [deliverers,setDeliverers]=useState([]);
    useEffect(()=>{
        async function fetchData(){
            await axios.get(`${process.env.REACT_APP_API_URL}api/user/Deliveres/GetTable`).then((res)=>{
                if(res!==undefined){
                //console.log(res.data);
                setDeliverers(res.data);
                }
            }).catch((err)=>console.log(err));
        }
        fetchData();
    });
  
   const SearchFunction = (e) => {
    var rowTable=document.querySelectorAll("tbody tr td:nth-of-type(2)");
       rowTable.forEach(ele=>{
           if(ele.textContent.includes(e.target.value)){
               ele.parentElement.style.display="";
               ele.parentElement.style.transition="all 0.3s ease-in-out";

           }else{
               ele.parentElement.style.display="none";
               
           }
       })
   }


  /************************************************************ */
  const [firstname,setFirstname] = useState();
  const [lastname,setLastname] = useState();
  const [cin,setCin] = useState();
  const [email,setEmail] = useState();
  const [phone,setPhone] = useState(); 
  const [password,setPassword] = useState();
  const [file,setFile]=useState(); 
  const [username,setUsername]=useState();
  const [Id,setID]=useState();
  const type="livreur";


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
      let addButton = document.querySelector('.add');
     let updateButton= document.querySelector('.update');
      let EditContenu = document.querySelector('.EditContenu');
      EditContenu.classList.remove("show");
      vide();

  }
  const AddShow = (e) => {
      let EditContenu = document.querySelector('.EditContenu');
      let addButton = document.querySelector('.add');
      let updateButton= document.querySelector('.update');  
      updateButton.style.display="none";
      addButton.style.display="";
      EditContenu.classList.add('show');
  }

  const AddShowUpdate = (e) => {
    let EditContenu = document.querySelector('.EditContenu');
    let addButton = document.querySelector('.add');
    let updateButton= document.querySelector('.update');
    setID(e.currentTarget.attributes.dataSet.value);
    updateButton.style.display="";
    addButton.style.display="none";
    EditContenu.classList.add('show');
}

  //********************************************************* */
  async function AddLivreur(e){
          e.preventDefault(); 
          var Data=new FormData();
      
          Data.append('username',username);
          Data.append('password',password);
          Data.append('email',email);
          Data.append('cin',cin);
          Data.append('firstname',firstname);
          Data.append('lastname',lastname);
          Data.append('type',type);
          Data.append('phone',phone);
          Data.append('file',file);

        axios.post(`${process.env.REACT_APP_API_URL}api/user/addLivreur`,Data).then(res=>{
        console.log(res.data);
        toast.success('client successfully Add');
        }).catch(erreur=>console.log(erreur));

  }


  //************************************************************** */
   const DeleteFunction = async (e) => {
       console.log(e);

       const dataId=[];
      await axios.get(`${process.env.REACT_APP_API_URL}api/user/getLivraison/${e}`)
       .then(res=>{
           console.log(res.data);
           res.data[0].livraison.map((ele)=>{
                dataId.push(ele._id);
            })
       }).catch((err)=>console.log(err));

       //---------
      await axios.delete(`${process.env.REACT_APP_API_URL}api/user/livreur/${e}`).then((res)=>{
        if(res!==undefined){
        toast.success('client successfully deleted');
        }
    }).catch((err)=>console.log(err));
}
   
//*********************************************************** */
const UpdateLivreur=(e)=>{
   // console.log(e.currentTarget.attributes.dataSet.value)
      e.preventDefault();
       var Data=new FormData();
       Data.append('username',username);
       Data.append('password',password);
       Data.append('email',email);
       Data.append('cin',cin);
       Data.append('firstname',firstname);
       Data.append('lastname',lastname);
       Data.append('phone',phone);
       Data.append('file',file);
       Data.append('id',Id);
      console.log(Data);
       axios.post(`${process.env.REACT_APP_API_URL}api/user/updateLivreurAdmin`,Data).then(res=>{
        console.log(res.data);
        toast.success('client successfully Updated');
         }).catch(erreur=>console.log(erreur));
}

//------------------------------------------
var [currentPage,setCurrentPage]=useState(1);
var [postsPerPage,setPostsPerPage]=useState(10); //akram ??? 

const indexOfLastPost=currentPage*postsPerPage;
const indexOfFirstPost=indexOfLastPost-postsPerPage;
const currentPosts=deliverers.slice(indexOfFirstPost,indexOfLastPost);

const paginate=(pageNumber)=>setCurrentPage(pageNumber);

//------------------------------------------
  return (
    <>
    <ToastContainer height="0px"
        position="top-right"
        autoClose={1600}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
          />
        <div style={{marginTop:"20px",marginBottom:"20px"}}>
        <div className='EditContenu'>
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

       <div className="row gutters justify-content-start">
           <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ">
               <div className="form-group">
                   <label htmlFor="username">Username</label>
                   <input type="text" className="form-control" id="username" placeholder="Enter cin " onChange={(e)=>setUsername(e.target.value)}/>
               </div>
           </div>
           <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ">
               <div className="form-group">
                   <label htmlFor="image">Image</label>
                   <input type="file" className="form-control" id="image"  onChange={(e)=>setFile(e.target.files[0])}/>
               </div>
           </div>
           
       </div>
       
      
       <div className="row gutters">
           <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
               <div className="text-right">
                   <button type="button" id="cancel" name="submit" style={{marginRight:'10px',fontSize:"12px",fontFamily:"cursive",fontWeight:"bold" ,border:"0",backgroundColor:"rgb(232, 62, 140)"}} className="btn btn-secondary " onClick={(e)=>{ExitMethod(e)}}>Cancel</button>
                   <button type="button" id="update" name="submit" className="btn btn-primary update" style={{marginRight:'10px',fontSize:"12px",fontFamily:"cursive",fontWeight:"bold",border:"0"}} onClick={UpdateLivreur}>Update</button>
                   <button type="button" id="add" name="submit" className="btn btn-primary add"  style={{marginRight:'10px',fontSize:"12px",fontFamily:"cursive",fontWeight:"bold"}} onClick={AddLivreur}>Add</button>

               </div>
           </div>
       </div>
   </div>
</div>
</div>
   </div>
</div>
         </div>

        <footer className="bg-white sticky-footer">
                <div className="container-fluid">
                    <div className="card" id="TableSorterCard">
                        <div className="card-header py-3">
                            <div className="row table-topper align-items-center">
                                <div className="col-12 col-sm-5 col-md-6 text-start" style={{margin: "0px",padding: "5px 15px"}}>
                                    <p className="h_command">DELIVERERS TABLE</p>
                                </div>
                                <div className="col-12 col-sm-7 col-md-6 text-end" style={{margin: "0px",padding: "5px 15px"}}>
                                <input type="text" style={{paddingTop:"-3px"}} onChange={SearchFunction}/>
                                <a href='#'>
                                <FiSearch style={{width:"50px",height:"24px",color:"#ec407a"}}/>
                                <MdAddBox style={{width:"50px",height:"24px",color:"#3d5afe"}} className='exist' onClick={AddShow}/>
                                </a>
                                </div>
            
                            </div>
                        </div>
                       
                        <div className="row">
                            <div className="col-12">
                                <div className="table-responsive">
                                    <table className="table table-striped table tablesorter" id="ipi-table">
                                        <thead className="thead-dark">
                                            <tr style={{backgroundColor:"rgb(232, 62, 140)",fontFamily:"cursive"}}>
                                                <th className="text-center">ID</th>
                                                <th role="input" className="text-center">FIRST NAME</th>
                                                <th  role="input" className="text-center">LAST NAME</th>
                                                <th role="input" className="text-center">IMAGE</th>
                                                <th  role="input" className="text-center">USERNAME</th>
                                                <th role="input" className="text-center">CIN</th>
                                                <th role="input" className="text-center">PHONE</th>
                                                <th role="input" className="text-center">EMAIL</th>
                                                <th className="text-center filter-false sorter-false">ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                        {  
                               
                               currentPosts!==undefined ? currentPosts.map((ele,index)=>
                                    <tr>
                                       <td role="input" >{index+1}</td>
                                        <td role="input" >{ele.firstname}</td>
                                        <td role="input" >{ele.lastname}</td>
                                        <td role="input" ><img  className="rounded-circle" src={"/Images/"+ele.photo} alt="No" style={{width:"60px",height:"60px"}} /></td>
                                        <td role="input" >{ele.username}</td>
                                        <td role="input" >{ele.cin}</td>
                                        <td role="input" >{"0"+ele.phone}</td>
                                        <td role="input" >{ele.email}</td>
                                        <td>
                                          <span style={{display:"flex"}}>
                                          <FaPen dataSet={ele._id} role="button" style={{width:"56px",height:"20px",color:"#ec407a"}} onClick={AddShowUpdate} />
                                          <BsFillTrashFill style={{width:"56px",height:"20px",color:"#ec407a"}} role="button" onClick={()=>{DeleteFunction(ele._id)}}/>
                                          </span>
                                        </td>
                                   </tr>
                                ):<></>
                               }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                    <Pagenation postsPerPage={postsPerPage} totalPosts={deliverers.length} paginate={paginate}/>

             
                <div className="container my-auto">
                    <div className="text-center my-auto copyright"><span>Copyright © Brand 2022</span></div>
                </div>
            </footer>
    </>
  )
}

export default DeliverersTable