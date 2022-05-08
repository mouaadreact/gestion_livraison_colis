import axios from "axios";
 
export const GET_USER ="GET_USER";
export const UPDATE_LIVREUR="UPDATE_LIVREUR"; 
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_CLIENT="UPDATE_CLIENT";

export const getUser=(uid)=>{
    return (dispatch)=>{ 
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`) 
        .then((res)=>{
            if(res!==undefined){
            dispatch({
                type:GET_USER,
                payload:res.data
            })
        }
        })
        .catch((err)=>console.log(err))
    }
}
 
//------------------------------------------------------------------
export const updateLivreur=(data,id)=>{
return (dispatch)=>{
    return axios({
        method:"put",
        url:`${process.env.REACT_APP_API_URL}api/user/livreur/${id}`,
        withCredentials:true,
        data:data
    })
    .then((res)=>{
        return  axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
        .then((res)=>{
            dispatch({
                type:UPDATE_LIVREUR,
                payload:{
                    email: res.data.email,
                    phone:res.data.phone
                }
            });
        });
    })
    .catch((err)=>console.log(err))
    
 };
}; 
 
//-------------------------------------------------------------------
export const uploadPicture = (data, id) => {
    console.log(data);
    return (dispatch) => {
      return axios(
        {
        method:"post",
        url:`${process.env.REACT_APP_API_URL}api/user/upload/${id}`,
        withCredentials:true, 
        data:data 
        }
      ) 
        .then((res) => {
            return axios
              .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
              .then((res) => {
                dispatch({ type: UPLOAD_PICTURE, payload: res.data.photo });
              });
        })
        .catch((err) => console.log(err));
    };
  };

//-------------------------------------------------------------------

export const updateClient=(data,id)=>{
    return (dispatch)=>{
        return axios({
            method:"put",
            url:`${process.env.REACT_APP_API_URL}api/user/${id}`,
            withCredentials:true,
            data:data
        })
        .then((res)=>{
            return  axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res)=>{
                dispatch({
                    type:UPDATE_CLIENT,
                    payload:{
                        email: res.data.email,
                        phone:res.data.phone,
                        firstname:res.data.firstname,
                        lastname:res.data.lastname,
                        cin:res.data.cin, 
                        password:res.data.password
                    }
                });
            });
        })
        .catch((err)=>console.log(err))
        
     };
    }; 
     


