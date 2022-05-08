import React from "react";
import { useSelector } from "react-redux";
import UploadPicture from "./UploadPicture";
const LivreurImage =()=>{
  const userData=useSelector((state)=>state.userReducer);
  console.log(userData.photo);


  
    return(
        <>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={"Images/"+userData.photo} alt="Admin" className="rounded-circle" style={{width:"140px",height:"140px"}}/>
                    {/*process.env.PUBLIC_URL + "/logo192.png"*/}
                    <div className="mt-3">
                      <h4> {userData.username} </h4>
                      <p className="text-secondary mb-1">
                       {userData.lastname+" "+userData.firstname}
                      </p>
                      <p className="text-muted font-size-sm">
                        {userData.type+" of Livraison Company"} 
                      </p>
                       <UploadPicture/>
                    </div>
                  </div>
                </div>
              </div>     
            </div>
        </>
    )
}

export default LivreurImage;