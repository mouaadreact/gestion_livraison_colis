import React, { useEffect, useState } from 'react'
import { UidContext } from '../AppContext';
import { useContext } from 'react';
import {useSelector} from 'react-redux';
import Livreur from './Livreur/Livreur';
import Client from './Client/Client';
import ClientProfil from './Client/ClientProfil';
import AddDeliery from './Client/AddDeliery';
import {io} from 'socket.io-client';
import { BsWindowSidebar } from 'react-icons/bs';

function ProfilChoix() {
    const uid=useContext(UidContext);
    const userData=useSelector((state)=>state.userReducer);

   //================================================================
    if(userData.type==="livreur"){
   return <Livreur/>
    }else if(userData.type==="client"){
    return <Client />
    }else{
      
    }


}

export default ProfilChoix