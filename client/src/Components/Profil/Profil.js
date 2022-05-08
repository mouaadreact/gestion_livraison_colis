import './Profil.css'
import '../bootstrap.min.css'
import { UidContext } from '../AppContext';
import { useContext, useEffect } from 'react';
import Home from '../Home/Home';
import {useSelector} from 'react-redux';
import ForBidden_404 from '../Images/403.jpg'
import Livreur from './Livreur/Livreur';
import ProfilChoix from './ProfilChoix';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profil=()=>{
    const uid=useContext(UidContext);
 //  console.log(uid);
    const userData=useSelector((state)=>state.userReducer);
    useEffect(()=>{
      toast.success("Success Access To Profil Page");
    },[]);

    if(uid){
      return(
        <div className='Profil'>
          <ToastContainer autoClose={3000}/>
          <ProfilChoix/>
        </div>
      )
    }else{
      return(
        <div className='Profil'>
        <section className='page-not-found'>
            <img  src={ForBidden_404} alt='403 forbidden'/>
            <h1>403 Forbidden</h1>
            <p>The client does not have access rights to the content; that is, it is unauthorized,
             so the server is refusing to give the requested resource. Unlike 401 Unauthorized,
             the client's identity is known to the server.
             </p>
         </section>
         </div>
      )
    }
};

export default Profil;