import React, { useContext } from 'react'
import './Dashboard.css';
import '../bootstrap.min.css'
import { useSelector } from 'react-redux';
import { UidContext } from '../AppContext';
import {BrowserRouter as Router,Link} from "react-router-dom";

function SideBar() {
   
    const uid=useContext(UidContext);
  const userData=useSelector((state)=>state.userReducer);
  return (
         <nav style={{background:"linear-gradient(to top, rgb(66, 165, 245), rgb(224, 64, 251))"}} className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0" >
            <div className="container-fluid d-flex flex-column p-0" ><a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                    <div className="sidebar-brand-icon rotate-n-15"><i className="fa fa-dropbox"></i></div>
                    <div className="sidebar-brand-text mx-3"><span>Livraison</span></div>
                </a>
                <hr className="sidebar-divider my-0"/>
                <ul className="navbar-nav text-light" id="accordionSidebar"style={{fontFamily:"cursive"}}>
                    <li className="nav-item"><Link exact to="/Dashboard" className="nav-link active"  >Dashboard</Link></li>
                    <li className="nav-item"><Link exact to="/Dashboard" className="nav-link active" >Clients</Link></li>
                    <li className="nav-item"><Link exact to="/Dashboard/Command" className="nav-link active" >Commands</Link></li>
                    <li className="nav-item"><Link exact to="/Dashboard/Deliverers" className="nav-link active" >Deliveres</Link></li>
                    <li className="nav-item"></li>
                </ul>
                <div className="text-center d-none d-md-inline"><button className="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
            </div>
        </nav>
        
    
  )
}

export default SideBar