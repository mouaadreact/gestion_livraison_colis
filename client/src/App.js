import './App.css'
//import NavBar  from './Components/NavBar/NavBar';
import Root from './Components/Router/Routers';
import axios from 'axios';
import {UidContext}  from './Components/AppContext';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './Components/actions/user.actions';
function App() {

  const [uid,setUid]=useState(); 
  const dispatch=useDispatch();

  useEffect(()=>{
    const fetchToken =async ()=>{ 
    await axios({
      method:"get",
      url:`${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials:true
    })
       .then((res)=>{
          setUid(res.data);
       })
       .catch((err)=>console.log("No token"))
  }
  fetchToken();

  if(uid) dispatch(getUser(uid))
  },[uid]);

  return (
    <UidContext.Provider value={uid}>
        <Root/>
   </UidContext.Provider>   
  );
}



export default App;
