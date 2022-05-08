import './NavBar.css';
import '../bootstrap.min.css';
import {BrowserRouter as Router,Link} from "react-router-dom";
import { UidContext } from '../AppContext';
import { useContext, useState } from 'react';
import {useSelector} from 'react-redux';
import {IoNotificationsSharp} from 'react-icons/io5';
import NavBarChoix from './NavBarChoix';


function NavBar(){
    const uid=useContext(UidContext);
    const [open,setOpen]=useState(false);
    const userData=useSelector((state)=>state.userReducer);
    return (
       
     <nav className="navbar navbar-light navbar-expand-md py-3" 
       style={{position:"sticky",top:"0",right:"0",zIndex:"100",width:"100%",background:"linear-gradient(to left ,#42a5f5,#e040fb)"}}>
        <div className="container"><button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-3"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navcol-3" style={{height:"33px",marginBottom:"0"}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-box-seam" style={{width:"21px"}}>
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"></path>
                </svg><span className="navbar-text" style={{marginLeft:"14px",fontWeight:"bold",fontFamily:"Ubuntu",fontSize:"18px",color:"white"}}><span className="logo">Liv</span>raison</span>
                <div style={{padding:"0",width:"0",height:"0"}}></div>
              {uid ? (
                <NavBarChoix/>
              ) :
              (
                <>
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item"><Link exact to="/" className="nav-link" style={{fontFamily:"Ubuntu",fontWeight:"bold",color:"white"}}>Acceuil</Link></li>  
                </ul><Link exact={true} to="/Login" className="Buttons log" >Login</Link><Link exact to="/SignUp"  className="Buttons reg">Registre</Link>
                </>
              )

              }
            </div>
        </div>
    </nav>
        
    )
}


{
    /*
     <div className="Nav">
           <div className="container">
               <div className="logo">Livraison</div>
               <div className="NavBar-form">
               {uid ? (
                   <ul> 
                      <NavLink exact to="/Profil">Profil</NavLink>
                      <NavLink exact to="/Logout">Logout</NavLink>
                   </ul>
               ) -    <NavLink exact to="/SignUp">Sign Up</NavLink>
                      <NavLink exact to="/Login">Login</NavLink>
                      <NavLink exact to="/ContactUs">Contact Us</NavLink>
                   </ul>
               )}
                  
               </div>-
           </div>
        </div> */
}

export default NavBar;