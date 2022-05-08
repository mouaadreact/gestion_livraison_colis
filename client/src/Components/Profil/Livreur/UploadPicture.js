import axios from 'axios';
import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { uploadPicture } from '../../actions/user.actions';
import FileBase64 from 'react-file-base64'

function UploadPicture() {
const userData=useSelector((state)=>state.userReducer);
const dispatch=useDispatch();
const [Picture,setPicture]=useState("");

    const handlePicture=async(e)=>{
        e.preventDefault();
       /* var data=new FormData();
        data.append('username',userData.username);
        data.append('id',userData._id);
        data.append("file",Picture);*/
        var data={
          username:userData.username,
          id:userData._id,
          file:Picture
        }
        console.log(data);
        dispatch(uploadPicture(data,userData._id));
    }

  return ( 
    <form action="" onSubmit={handlePicture} className="Form-Chane-Picture">
      <label 
        htmlFor='Picture'>
      </label>
     <FileBase64 onDone={({base64})=>setPicture(base64)} />

      <input type="submit" value="Send" style={{padding:"9px 11px",border:"none",borderRadius:"10px",
        backgroundColor:"#008cff",color:"#FFF",fontFamily:"Ubuntu",fontSize:"13px",fontWeight:"bold"}}
        onClick={handlePicture} />
    </form>
  )
}

export default UploadPicture