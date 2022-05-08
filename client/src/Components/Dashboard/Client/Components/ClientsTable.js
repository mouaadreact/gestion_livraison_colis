import React, { useEffect, useState } from 'react'
import '../../Dashboard.css'
import '../../assets/bootstrap/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { BsCheckCircleFill, BsZoomIn } from 'react-icons/bs';
import {BsFillTrashFill} from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagenation from '../../../Profil/Client/Pagenation';

function ClientsTable() {
    
    const [client,setClient]=useState([]);
    useEffect(()=>{
        async function fetchData(){
            await axios.get(`${process.env.REACT_APP_API_URL}api/user/Client/GetTable/client`).then((res)=>{
                if(res!==undefined){
                setClient(res.data);
                }
            }).catch((err)=>console.log(err));
        }
        fetchData();
    },[]);
   
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
 
   const DeleteFunction = async (e) => {
       console.log(e);
       const dataId=[];
      await axios.get(`${process.env.REACT_APP_API_URL}api/user/getCommand/${e}`)
       .then(res=>{
           console.log(res.data);
            res.data[0].command.map((ele)=>{
                dataId.push(ele._id);
            })
       }).catch((err)=>console.log(err))

     
      await axios.delete(`${process.env.REACT_APP_API_URL}api/user/client/${e}`,{data:{dataId:dataId}})
      .then((res)=>{
        if(res!==undefined){
            toast.success('client successfully deleted');    
        }})
      .catch((err)=>console.log(err));
}

//-----------------------------
var [currentPage,setCurrentPage]=useState(1);
var [postsPerPage,setPostsPerPage]=useState(10); //akram ??? 

const indexOfLastPost=currentPage*postsPerPage;
const indexOfFirstPost=indexOfLastPost-postsPerPage;
const currentPosts=client.slice(indexOfFirstPost,indexOfLastPost);

const paginate=(pageNumber)=>setCurrentPage(pageNumber);
//------------------------------
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
        <footer className="bg-white sticky-footer">
                <div className="container-fluid">
                    <div className="card" id="TableSorterCard">
                        <div className="card-header py-3">
                            <div className="row table-topper align-items-center">
                                <div className="col-12 col-sm-5 col-md-6 text-start" style={{margin: "0px",padding: "5px 15px"}}>
                                    <p style={{fontFamily:'cursive',fontSize:"12px",fontWeight:"bold",color:"#e83e8c",letterSpacing:"1.5px"}}
                                    >CLIENT TABLE</p>
                                </div>
                                <div className="col-12 col-sm-7 col-md-6 text-end" style={{margin: "0px",padding: "5px 15px"}}>
                                <input type="text" style={{paddingTop:"-3px"}} onChange={SearchFunction}/>
                                <a href='#'>
                                <FiSearch style={{width:"50px",height:"24px",color:"#ec407a"}}/>
                                </a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12"> 
                                <div className="table-responsive">
                                    <table className="table table-striped table tablesorter" id="ipi-table">
                                        <thead className="thead-dark">
                                            <tr style={{backgroundColor:"#e83e8c",fontFamily:"cursive"}}>
                                                <th className="text-center">Image</th>
                                                <th className="text-center">USERNAME</th>
                                                <th className="text-center">CIN</th>
                                                <th className="text-center">EMAIL</th>
                                                <th className="text-center">phone number</th>
                                                <th className="text-center filter-false sorter-false">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                        {  
                               
                               currentPosts!==undefined ? currentPosts.map((ele,index)=>
                                    <tr>
                                       <td>{index+1}</td>
                                        <td>{ele.username}</td>
                                        <td>{ele.cin}</td>
                                        <td>{ele.email}</td>
                                        <td>{"0"+ele.phone}</td>
                                        <td>
                                        <BsFillTrashFill style={{width:"56px",height:"20px",color:"#ec407a"}} role="button" onClick={()=>{DeleteFunction(ele._id)}}/>
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
                <Pagenation postsPerPage={postsPerPage} totalPosts={client.length} paginate={paginate}/>
                <div className="container my-auto">
                    <div className="text-center my-auto copyright"><span>Copyright © Brand 2022</span></div>
                </div>
            </footer>

    </>
  )
}

export default ClientsTable