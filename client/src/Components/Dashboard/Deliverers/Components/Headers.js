import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Add.css'

function Headers() {
    const [deliverers,setDeliverers]= useState(0);
    const [command,setCommand]= useState(0);
    useEffect(()=>{
       async  function fetchData(){
        await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/Deliveres/Count`)
        .then((res)=>{
            if(res!==undefined){
             setDeliverers(res.data.count);
             
            }
        })
        .catch((err)=>console.log(err));

        await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/Deliveres/DeliveresCommandAverage`)
        .then((res)=>{
            if(res!==undefined){
            // setCommand(res.data);
            setCommand(res.data[0].average);
            
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
                                <div className="card-body" style={{textAlign:"center",width:"100%"}}>
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="Span_command"><span>TOTAL NUMBER OF DELIVREDS EXIST </span></div>
                                            <div ><span className="number_deliv" style={{marginTop:"8px"}}>{deliverers<10?"0"+deliverers:deliverers}</span></div>
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
                                            <div className="text-uppercase text-success fw-bold text-xs mb-1"><span className="Span_command" style={{color:"rgb(44, 126, 198)"}}>MEAN NUMBER OF DELIVRIES PER DELIVERER</span></div>
                                            <div ><span className="number_deliv">{command<10?"0"+command:command}</span></div>
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

export default Headers