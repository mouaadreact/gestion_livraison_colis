import React, { useEffect } from 'react'
import '../bootstrap.min.css'
import './Dashboard.css'
import ForBidden_404 from '../Images/403.jpg'
import DashboardChoix from './DashboardChoix'
import { UidContext } from '../AppContext';
import { useContext } from 'react';
import {useSelector} from 'react-redux';
import Client from './Client/Client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
    
    const uid=useContext(UidContext);
    console.log(uid);
    const userData=useSelector((state)=>state.userReducer);

    useEffect(()=>{
        toast.success("Success Access To Admin Page")
    },[]);
  return (
      
    <div>
        {uid ? 
        <>
           <ToastContainer autoClose={3000}/>
           <DashboardChoix/>
        </>
        : 
      <>
      <section className='page-not-found'>
            <img  src={ForBidden_404} alt='403 forbidden'/>
            <h1>403 Forbidden</h1>
            <p>The client does not have access rights to the content; that is, it is unauthorized,
             so the server is refusing to give the requested resource. Unlike 401 Unauthorized,
             the client's identity is known to the server.
             </p>
         </section>
      </>}
    </div>
  )
}

export default Dashboard