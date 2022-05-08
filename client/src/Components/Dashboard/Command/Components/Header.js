import React, { useEffect, useState } from 'react'
import '../../Dashboard.css';
import '../../assets/bootstrap/css/bootstrap.min.css';
import axios from 'axios';
import './Command.css'
function Header() {
    const [commandInCurrentMonth,setCommandInCurrentMonth] = useState(0);
    const [commandDelivered,setCommandDelivered] = useState(0);
    const [commandPending,setCommandPending] = useState(0);
    const [commandInCurrentYear,setCommandInCurrentYear] = useState(0);

    useEffect(()=>{
        async function fetchData(){
            await axios.get(`${process.env.REACT_APP_API_URL}api/user/Command/CommandCurrentMonth`).then(res=>{
                if(res!==undefined){
                    setCommandInCurrentMonth(res.data.result);
                }
            });

            await axios.get(`${process.env.REACT_APP_API_URL}api/user/Command/CommandDelivered/true`).then(res=>{
                if(res!==undefined){
                    setCommandDelivered(res.data[0].somme);
                }
            });

            await axios.get(`${process.env.REACT_APP_API_URL}api/user/Command/CommandDelivered/false`).then(res=>{
                if(res!==undefined){
                    setCommandPending(res.data[0].somme);
                }
            });

            await axios.get(`${process.env.REACT_APP_API_URL}api/user/Command/CommandCurrentYear`).then(res=>{
                if(res!==undefined){
                    setCommandInCurrentYear(res.data.result);
                }
            });
        }

        fetchData();
    },[]);
  return (
    <div>
        <div className="row">
                        <div className="col-md-6 col-xl-3 mb-4"> 
                            <div className="card shadow border-start-primary py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-primary fw-bold text-xs mb-1"><span className='Span_command'>Total number Commands in this month</span></div>
                                            <div className="text-dark fw-bold h5 mb-0"><span>{commandInCurrentMonth<10?"0"+commandInCurrentMonth:commandInCurrentMonth}</span></div>
                                        </div>
                                        <div className="col-auto"><i className="far fa-user-circle fa-2x text-gray-300"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-start-primary py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-primary fw-bold text-xs mb-1"><span style={{color:"rgb(44, 126, 198)"}} className='Span_command'>Total number commands delivred</span></div>
                                            <div className="text-dark fw-bold h5 mb-0"><span >{commandDelivered<10?"0"+commandDelivered:commandDelivered}</span></div>
                                        </div>
                                        <div className="col-auto"><i className="far fa-user-circle fa-2x text-gray-300"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow border-start-success py-2" style={{marginTop: "20px;"}}>
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-success fw-bold text-xs mb-1"><span className='Span_command'>total number of commands pending&nbsp;</span></div>
                                            <div className="text-dark fw-bold h5 mb-0"><span>{commandPending<10?"0"+commandPending:commandPending}</span></div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-tasks fa-2x text-gray-300"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-start-success py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-success fw-bold text-xs mb-1"><span style={{color:"rgb(44, 126, 198)"}} className='Span_command'>total number of commands in year&nbsp;</span></div>
                                            <div className="text-dark fw-bold h5 mb-0"><span>{commandInCurrentYear<10?"0"+commandInCurrentYear:commandInCurrentYear}</span></div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-tasks fa-2x text-gray-300"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    </div>
  )
}

export default Header