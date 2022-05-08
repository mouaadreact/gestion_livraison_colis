import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { UidContext } from '../../AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddDeliery() {
 // console.log(socket);
    const [source,setSource] = useState('');
    const userId=useContext(UidContext);
    const [destination,setDestination] = useState('');
    const [file,setFile] = useState("");
    const [livreur,setLivreur] = useState([]);
    const [selectedLivreur,setselectedLiveur]=useState({});
    const [selectedEmail,setselectedEmail]=useState("");
    const userData=useSelector((state)=>state.userReducer); 

      const handleAddDelivery = async(e)=>{
        e.preventDefault();

      var bodyFormData = new FormData();
      bodyFormData.append('dest',destination);
      bodyFormData.append('source',source);
      bodyFormData.append('file',file);
      bodyFormData.append('usernameClient',userData.username);
      bodyFormData.append('phoneClient',userData.phone);
      bodyFormData.append('cinClient',userData.cin);
      bodyFormData.append('emailClient',userData.email);
      bodyFormData.append('emailLivreur',selectedEmail);
      console.log(bodyFormData);
  try{

      axios.patch(`${process.env.REACT_APP_API_URL}api/user/addLivraison/${userId}/${selectedLivreur}`
    ,bodyFormData
      ,{ 
        headers:{
          'Content-Type':'mutipart/form-data'
        }
      });
 

       axios.post(`${process.env.REACT_APP_API_URL}api/user/mail/newcommand`,
        {
          email:selectedEmail,
          username:userData.username,
          firstname:userData.firstname,
          lastname:userData.lastname,
          source:source,
          dest:destination
        }
      );
     
      toast.success('Command Sucessfully Added ! ');
    }catch(err){
          console.log(err.response.data.msg); 
      }
  };

    useEffect(()=>{
      
      axios({method:'get',
             url:`${process.env.REACT_APP_API_URL}api/user/Livreur`,
             withCredentials:true
    }).then((res) => {setLivreur((livreur)=>[...livreur,...res.data])});
  },[]);
 
  const handleAttribut=(e)=>{
    const [option] = e.target.selectedOptions;
    setselectedLiveur(e.target.value);
    setselectedEmail(option.dataset.email)
  }
  return (
    <>
    <ToastContainer autoClose={3000}/>
    <form onSubmit={handleAddDelivery}>
    <div className="row gutters-sm">
                <div className="col-sm-12 mb-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3">Ajouter une Livraison</h6>
                      
                        <div className="col-md-16">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Source address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input type="text" className="form-control" placeholder="add the source address..." onChange={(e)=>{setSource(e.target.value)}}/>
                    </div>
                  </div>
                    <hr/>
                     <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Source destination</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input type="text" className="form-control" placeholder="add the destination address..." onChange={(e)=>{setDestination(e.target.value)}}/>
                        
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Facture</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input type="file" className="form-control" onChange={(e)=>{setFile(e.target.files[0])}}/>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Deliverer</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <select className="form-control" id="UserSelect" onChange={handleAttribut} >  {/*{(e)=>{setselectedLiveur(e.target.value);}}*/}
                           <option disabled selected value >Add delivers </option>
                           {livreur.map(e=><option key={e._id} data-email={e.email}>{e.username}</option>)} 
                        </select>
                    </div>
                  </div>
                  <hr/>
                  
                  
                  <div className="row">
                    <div className="col-sm-12">
                      <input type='submit' className="btn btn-theme" value="Add Command" style={{backgroundColor:"#e83e8c",color:"#FFF",fontWeight:"bold",fontSize:"14px"}}/>
                    </div>
                      
                    </div>
                  </div>
                </div>
                
                </div>
              </div>



            </div>
          </div>

        </div>
      </form>
    </>
  )
}

export default AddDeliery