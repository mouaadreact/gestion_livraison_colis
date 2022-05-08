import {FiSearch} from 'react-icons/fi';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UidContext } from '../../AppContext';
import { useSelector } from 'react-redux'; 
import {BsCheckCircleFill} from 'react-icons/bs';
import Pagenation from './Pagenation';

function DataDelivery() {
    const [data,setData]=useState([]);
    const uid=useContext(UidContext);
    const userData=useSelector((state)=>state.userReducer);

    const SearchFuntion=(e)=>{
        var rowTable=document.querySelectorAll("tbody tr td:nth-of-type(2)");
        rowTable.forEach((ele)=>{
             if(ele.textContent.includes(e.target.value)){
                  ele.parentElement.style.display="";
              }else{
                  ele.parentElement.style.display='none';
              }
         })
       
        }
 
    useEffect(()=>{
         axios.get(`${process.env.REACT_APP_API_URL}api/user/getCommand/${uid}`)
        .then(res=>{
            console.log(res.data);
            setData(res.data[0].command);
        }).catch((err)=>console.log(err))
    },[]); 

  //******************************************************** */

   const handleConfirmationClient=(e)=>{
   // /livreur/confirmCommand/:client/:livreur

   e.preventDefault();
   //console.log(e.currentTarget.attributes.client.value);
   
   try{
 
     axios.put(`${process.env.REACT_APP_API_URL}api/user/livreur/confirmCommand/${e.currentTarget.attributes.idCommand.value}/${userData.username}`
     ,{
       headers:{
         'Content-Type':'mutipart/form-data'
       }
     });
 
 
 
      axios.post(`${process.env.REACT_APP_API_URL}api/user/mail/confirmationClient`,
       {
         email:e.currentTarget.attributes.emailLivreur.value,
         username:userData.username,
         livreur:e.currentTarget.attributes.livreur.value,
       }
     );

    
   }catch(err){
         console.log(err.response.data.msg); 
     }

   }

   var [currentPage,setCurrentPage]=useState(1);
   var [postsPerPage,setPostsPerPage]=useState(10); //akram ??? 

   const indexOfLastPost=currentPage*postsPerPage;
   const indexOfFirstPost=indexOfLastPost-postsPerPage;
   const currentPosts=data.slice(indexOfFirstPost,indexOfLastPost);

   const paginate=(pageNumber)=>setCurrentPage(pageNumber);
  //********************************************************** */
  return (
      <>
            <div className="card mt-5" id="TableSorterCard" >
                    <div className="card-header py-3">
                <div className="row table-topper align-items-center">
                    <div className="col-12 col-sm-5 col-md-6 text-start" style={{margin: "0px",padding: "5px 15px"}}>
                        <p className="" style={{color: "rgb(232, 62, 140)",fontSize:"15px",fontWeight:"bold",fontFamily:"cursive"}}>Command Table</p>
                    </div>
                    
                    <div className="col-12 col-sm-7 col-md-6 text-end" style={{margin: "0px",padding: "5px 15px"}}>
                <input type="text" style={{paddingTop:"-3px"}} onChange={SearchFuntion} />
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
                                <tr style={{backgroundColor:"#e83e8c"}}>
                                    <th className="text-center">ID</th>
                                    <th className="text-center">Deliverer</th>
                                    <th className="text-center">source Address</th>
                                    <th className="text-center">destination Address</th>
                                    <th className="text-center">Date</th>
                                    <th className="text-center">facture</th>
                                    <th className="text-center filter-false sorter-false">Status</th>
                                    <th className="text-center filter-false sorter-false">Confirm</th>
                                </tr>
                            </thead>
                            <tbody  className="text-center">
                            {  
                              
                                currentPosts !==undefined ? currentPosts.map((ele,index)=>
                                     <tr key={index+1}>

                                        <td >{index+1}</td>
                                         <td>{ele.livreur}</td>
                                         <td>{ele.source}</td>
                                         <td>{ele.dest}</td>
                                         <td>{ele.createdAt}</td>
                                         <td><a className="Donwload" href={"facture/"+ele.facture} download>Download</a></td>
                                         <td>{ele.status ? "delivered" : "pending"}</td>
                                         <td>
                                         {ele.confirm ? "Yes" : "No"} 
                                         <a  role="button" href="#">
                                         <BsCheckCircleFill 
                                         livreur={ele.livreur}
                                         idCommand={ele._id} 
                                         emailLivreur={ele.emailLivreur} 
                                         onClick={handleConfirmationClient} 
                                         style={{width:"56px",height:"20px",color:"#ec407a"}}
                                          />
                                         </a>
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
        <Pagenation postsPerPage={postsPerPage} totalPosts={data.length} paginate={paginate}/>
        </>
         )
}

export default DataDelivery