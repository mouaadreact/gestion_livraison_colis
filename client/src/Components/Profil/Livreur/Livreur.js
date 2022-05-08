import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
import './Livreur.css'
import LivreurProfil from './LivreurProfil';
import Delivrey from './Delivrey';


const Livreur =()=>{ 
const userData=useSelector((state)=>state.userReducer); 



    return(
        <>
        <div className="container-fluid">
          <LivreurProfil/>
           <div className='' style={{marginTop:"40px"}}></div>
           <Delivrey/>
        </div>
        </>
    )
}
export default Livreur;