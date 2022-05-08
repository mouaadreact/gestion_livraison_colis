import React from 'react'
import AddDeliery from './AddDeliery'
import ClientProfil from './ClientProfil'
import './Client.css'
import DataDelivery from './DataDelivery'
function Client() {
  return (
    <>
        <div className="container-fluid">
          <ClientProfil/>
           <div className='' style={{marginTop:"40px"}}></div>
           <AddDeliery  />
           <div className='' style={{marginTop:"40px"}}></div>
           <DataDelivery/>
        </div>
        </>
  )
}

export default Client