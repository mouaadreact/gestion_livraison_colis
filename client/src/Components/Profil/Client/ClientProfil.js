import React, { useState,useEffect } from 'react'
import ClientInfos from './ClientInfos'
import ClientImage from './ClientImage'
import axios from 'axios';
//import AddDeliery from './AddDeliery';

function ClientProfil() {

    
  return (
      <>
      <div className="row">
          <div className="container">
              <div className="main-body">
                  <div className="row gutters-sm">
                  <ClientImage/>
                  <ClientInfos/>
                  {/*<AddDeliery profil={profil} userId={userId}/>*/}
                  </div>
              </div>
          </div>
      </div>
      </>
    
  )
}

export default ClientProfil
