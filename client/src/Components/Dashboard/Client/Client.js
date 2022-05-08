import React from 'react'
import SideBar from '../SideBar'
import ChartClient from './Components/ChartClient'
import ClientsTable from './Components/ClientsTable'
import Header from './Components/Header'
import '../Dashboard.css';
import '../assets/bootstrap/css/bootstrap.min.css';


function Client() {
  return (
      <>
       <div id="page-top">
        <div id="wrapper">
            <SideBar/>
            <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <div className="container-fluid">
                    <div className="d-sm-flex justify-content-between align-items-center mb-4">
                        <h3 className=""
                     style={{margin:"30px 10px",width:"80%",textAlign:"center",fontFamily:"cursive",fontWeight:"bold",color:"#e83e8c"}}   
                        >Admin Dashboard</h3>
                    </div>
                    <Header/>
                    <ChartClient/>
                    
            </div>
            </div>
            <ClientsTable/> 
            </div>
            <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
         </div>
         </div>
    
    </>
  )
}

export default Client