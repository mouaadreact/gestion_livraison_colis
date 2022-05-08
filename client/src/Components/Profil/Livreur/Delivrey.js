import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import {BsCheckCircleFill} from 'react-icons/bs'
import {FiSearch} from 'react-icons/fi'
import { useSelector } from 'react-redux';
import { UidContext } from '../../AppContext';
import LivImg from '../../Images/Livraison.jpg'
import Pagenation from '../Client/Pagenation';

const Delivrey =()=>{ 

    var tr = document.querySelectorAll("tbody tr");
 //---------------------------
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
   //---------------------------
   const [data,setData]=useState([]);
   const uid=useContext(UidContext);
   const userData=useSelector((state)=>state.userReducer);

   useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}api/user/getLivraison/${uid}`)
       .then(res=>{
           console.log(res.data);
           setData(res.data[0].livraison); 
       }).catch((err)=>console.log(err))
   },[]);

   
//----------------------------------------------
 const handleConfirmation=(e)=>{
  e.preventDefault();

    axios.put(`${process.env.REACT_APP_API_URL}api/user/livreur/confirmLivraison/${e.currentTarget.attributes.idLivraison.value}/${e.currentTarget.attributes.client.value}/${userData.username}`
    ,{
      headers:{
        'Content-Type':'mutipart/form-data'
      }
    });
  
    console.log(e.currentTarget.attributes.usernameC.value)
   
     axios.post(`${process.env.REACT_APP_API_URL}api/user/mail/confirmationLivreur`,
      {
        email:e.currentTarget.attributes.emailC.value,
        username:e.currentTarget.attributes.usernameC.value,
        dest:e.currentTarget.attributes.destC.value
      } );
  
 };
//------------------------------------------
var [currentPage,setCurrentPage]=useState(1);
var [postsPerPage,setPostsPerPage]=useState(10); //akram ??? 

const indexOfLastPost=currentPage*postsPerPage;
const indexOfFirstPost=indexOfLastPost-postsPerPage;
const currentPosts=data.slice(indexOfFirstPost,indexOfLastPost);

const paginate=(pageNumber)=>setCurrentPage(pageNumber);

//------------------------------------------
    return(
        <>
            <div className="card" id="TableSorterCard">
            <div className="card-header py-3">
                <div className="row table-topper align-items-center">
                    <div className="col-12 col-sm-5 col-md-6 text-start" style={{margin:"0px",padding:"5px 15px"}}>
                        <p style={{fontWeight:"bold",fontFamily:"cursive",color:"#ec407a"}}>Delivrey Table</p>
                    </div>
                    <div className="col-12 col-sm-7 col-md-6 text-end" style={{margin:"0px",padding:"5px 15px"}}>
                      <input type="text" style={{paddingTop:"-3px",fontSize:"14px"}} onChange={(e)=>SearchFuntion(e)}/>
                        <a href="#">
                          <FiSearch style={{width:"29px",height:"21px",color:"#ec407a"}}/>
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
                                    <th className="text-center">ClIENT</th>
                                    <th className="text-center">&nbsp;NUmero</th>
                                    <th className="text-center">CIN</th>
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
                                       <td>{ele.client}</td>
                                       <td>{"0"+ele.phoneClient}</td>
                                       <td>{ele.cinClient}</td>
                                       <td>{ele.source}</td>
                                       <td>{ele.dest}</td>
                                       <td>{ele.createdAt}</td>
                                       <td><a className="Donwload" href={"facture/"+ele.facture} download>Download</a></td>
                                       <td>{ele.status ? "delivered" : "pending"}</td>
                                       <td>
                                       {ele.confirm ? "Yes" : "No"} 
                                       <a  role="button" href="#">
                                       <BsCheckCircleFill 
                                           usernameC={ele.client}
                                           destC={ele.dest}
                                           emailC={ele.emailClient} 
                                           idLivraison={ele._id} 
                                           client={ele.client}
                                           style={{width:"56px",height:"17px",color:"#ec407a"}}
                                           onClick={handleConfirmation} 

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
export default Delivrey;