import React from 'react'
import SideBar from '../SideBar'
import ChartDeliverers from './Components/ChartDeliverers'
import DeliverersTable from './Components/DeliverersTable'
import Headers from './Components/Headers'
import '../Dashboard.css';
import '../assets/bootstrap/css/bootstrap.min.css';

function Deliverers() {
  return (
    <>
       <div id="page-top">
        <div id="wrapper">
            <SideBar/>
            <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <div className="container-fluid">
                    <div className="d-sm-flex justify-content-between align-items-center mb-4">
                        <h3 className="Admin">Admin Dashboard</h3>
                    </div>
                    <Headers/>
                    <ChartDeliverers/>
                    
            </div>
            </div>
            <DeliverersTable/> 
            </div>
            <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
         </div>
         </div>
    
    </>
  )
}

export default Deliverers