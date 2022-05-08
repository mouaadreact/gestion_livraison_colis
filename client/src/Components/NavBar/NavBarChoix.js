import React from 'react'
import { UidContext } from '../AppContext';
import { useContext } from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter as Router,Link} from "react-router-dom";

function NavBarChoix() {
    const uid=useContext(UidContext);
    const userData=useSelector((state)=>state.userReducer);

      if(userData.type==="livreur" || userData.type==="client"){
        return (
            <>
                <ul className="navbar-nav mx-auto">
                <li className="nav-item"><Link exact to="/Profil" className="nav-link" style={{fontFamily:"Ubuntu",fontWeight:"bold",color:"white"}}>Profil</Link></li>  
                </ul>
                <span style={{marginRight:"18px",fontWeight:"bold",color:"#FFF",fontFamily:"Ubuntu",fontSize:"14px"}}>{userData.username}</span>
                <Link exact={true} to="/Logout" className="Buttons log" >Logout</Link>
                
                </>
        )
         }else{

            return (
               <>
                <ul className="navbar-nav mx-auto">
                <li className="nav-item"><Link exact to="/Dashboard" className="nav-link" style={{fontFamily:"Ubuntu",fontWeight:"bold",color:"white"}}>Dashboard</Link></li>  
                </ul>
                <span style={{marginRight:"18px",fontWeight:"bold",color:"#FFF",fontFamily:"Ubuntu",fontSize:"14px"}}>{userData.username}</span>
                <Link exact={true} to="/Logout" className="Buttons log" >Logout</Link>
                
               </>
            )
         }
}

export default NavBarChoix