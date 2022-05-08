import React from 'react'
import SideBar from '../SideBar'
import ChartCommand from './Components/ChartCommand'
import CommandsTable from './Components/CommandsTable'
import Header from './Components/Header'
import '../Dashboard.css';
import '../assets/bootstrap/css/bootstrap.min.css';
function Command() {
  return (
      <>
    <div id="page-top">
    <div id="wrapper">
        <SideBar/>
        <div class="d-flex flex-column" id="content-wrapper">
        <div id="content">
            <div class="container-fluid">
                <div class="d-sm-flex justify-content-between align-items-center mb-4">
                    <h3 class="Admin">Admin Dashboard</h3>
                </div>
                <Header/>
                <ChartCommand />                
                               
        </div>
        </div>
        <CommandsTable/>
        </div>
        <a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
     </div>
    </div>
    </>
  )
}

export default Command