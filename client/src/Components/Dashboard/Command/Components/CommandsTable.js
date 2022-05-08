import React, { useEffect, useState } from 'react'
import '../../Dashboard.css';
import '../../assets/bootstrap/css/bootstrap.min.css';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import Pagenation from '../../../Profil/Client/Pagenation';

function CommandTable() { 
    const [command,setCommand]=useState([]);
    var dataArray=[];
    useEffect(()=>{ 
        async function fetchData(){
            await axios.get(`${process.env.REACT_APP_API_URL}api/user/Command/GetTable`).then((res)=>{
                if(res!==undefined){
                res.data.docs.map((ele)=>{
                    for(let i=0;i<ele.command.length;i++){
                           dataArray.push(ele.command[i]);
                    }
                });
                //console.log(dataArray);
                setCommand(dataArray);
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
//------------------------------------
var [currentPage,setCurrentPage]=useState(1);
var [postsPerPage,setPostsPerPage]=useState(10); //akram ??? 

const indexOfLastPost=currentPage*postsPerPage;
const indexOfFirstPost=indexOfLastPost-postsPerPage;
const currentPosts=command.slice(indexOfFirstPost,indexOfLastPost);

const paginate=(pageNumber)=>setCurrentPage(pageNumber);
//------------------------
  return (
    <>
        <footer className="bg-white sticky-footer">
                <div className="container-fluid">
                    <div className="card" id="TableSorterCard">
                        <div className="card-header py-3">
                            <div className="row table-topper align-items-center">
                                <div className="col-12 col-sm-5 col-md-6 text-start" style={{margin: "0px;",padding: "5px 15px;"}}>
                                    <p className="p_command">COMMANDS TABLE</p>
                                </div>
                                <div className="col-12 col-sm-7 col-md-6 text-end" style={{margin: "0px;",padding: "5px 15px;"}}>
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
                                                <th className="text-center">Delivery</th>
                                                <th className="text-center">source adress</th>
                                                <th className="text-center">destination adress</th>
                                                <th className="text-center">date</th>
                                                <th className="text-center">facture</th>
                                                <th className="text-center filter-false sorter-false">status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                        {  
                               
                                    currentPosts!==undefined ? currentPosts.map((ele,index)=>
                                    <tr>
                                       <td>{index+1}</td>
                                        <td>{ele.source}</td>
                                        <td>{ele.dest}</td>
                                        <td>{ele.createdAt}</td>
                                        <td><a className="Donwload" href={"/facture/"+ele.facture} download>Download</a></td>
                                        <td>
                                        <td>{ele.status ? "delivered" : "pending"}</td>
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
                <Pagenation postsPerPage={postsPerPage} totalPosts={command.length} paginate={paginate}/>
                <div className="container my-auto">
                    <div className="text-center my-auto copyright"><span>Copyright © Brand 2022</span></div>
                </div>  
            </footer>

    </>
  )
}

export default CommandTable