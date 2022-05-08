import React from 'react'
import {Route,Switch,BrowserRouter as Router,Redirect} from 'react-router-dom'
import { UidContext } from '../AppContext';
import { useContext } from 'react';
import {useSelector} from 'react-redux';
import Command from './Command/Command'
import Client from './Client/Client'
import '../bootstrap.min.css'
import './Dashboard.css'
import Deliverers from './Deliverers/Deliverers';

function DashboardChoix() {
  const uid=useContext(UidContext);
  const userData=useSelector((state)=>state.userReducer);
  if(userData.type==="admin"){
  return (
    
    <Router>
     <Switch>
         <Route exact={true} path="/Dashboard/" component={Client}/>
         <Route exact={true} path="/Dashboard/Command" component={Command}/>
         <Route exact path="/Dashboard/Deliverers" component={Deliverers}/>
     </Switch>  
    </Router> 
     
  )}
  else{
     <div>error</div>
  }
}

export default DashboardChoix