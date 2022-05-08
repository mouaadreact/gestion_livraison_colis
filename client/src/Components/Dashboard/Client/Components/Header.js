import React, { useEffect, useEffectLayout ,useState} from 'react'
import '../../Dashboard.css'
import '../../assets/bootstrap/css/bootstrap.min.css';
import { useSelector,useDispatch } from 'react-redux'; 
import { getTotalClient, GET_COUNT } from "../../../actions/user.actions";
import axios from 'axios';


function Header() {
    const [client,setClient]= useState(0);
    const [command,setCommand]= useState(0);
    useEffect(()=>{
       async  function fetchData(){
        await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/Client/Count`)
        .then((res)=>{
            if(res!==undefined){
             setClient(res.data.count);
            
            }
        })
        .catch((err)=>console.log(err));

        await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/Client/Command`)
        .then((res)=>{
            if(res!==undefined){
                console.log(res.data);
             setCommand(res.data[0].somme);
            
            }
        })
        .catch((err)=>console.log(err));
         
       }
       fetchData();
    },[]);
     
  return (
    <>
        <div className="row justify-content-start">
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-start-primary py-2" style={{width:"360px"}}>
                                <div className="card-body" style={{textAlign:"center",width:"100%"}} >
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-primary fw-bold text-xs mb-1"><span  style={{fontFamily:'cursive',fontSize:"12px",fontWeight:"bold",color:"#e83e8c",letterSpacing:"1.5px"}}>total number of clients</span></div>
                                            <div 
                                            className="text-dark fw-bold h5 mb-0"
                                            ><span>{client<10 ? "0"+client:client}</span></div>
                                        </div>
                                        <div className="col-auto"><i className="far fa-user-circle fa-2x text-gray-300"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-start-success py-2" style={{marginLeft:"250px",width:"360px"}}>
                                <div className="card-body" style={{textAlign:"center",width:"100%"}}>
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-success fw-bold text-xs mb-1"><span style={{fontFamily:'cursive',fontSize:"12px",fontWeight:"bold",color:"rgb(44, 126, 198)",letterSpacing:"1.5px"}}>total number of commands&nbsp;</span></div>
                                            <div className="text-dark fw-bold h5 mb-0"><span>{command<10?"0"+command:command}</span></div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-tasks fa-2x text-gray-300"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    </>
  )
}

export default Header