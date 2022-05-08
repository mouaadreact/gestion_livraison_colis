import { GET_USER, UPDATE_LIVREUR, UPLOAD_PICTURE } from "../actions/user.actions";
const initialState ={}; 

export default function userReducer(state=initialState,action){
switch(action.type){
    case GET_USER:
        return action.payload    
    case UPDATE_LIVREUR:
        return {
            ...state,
            email:action.payload.email,
            phone:action.payload.phone
        };
    case UPLOAD_PICTURE:
        return {
            ...state,
            photo:action.payload
        }
    default:
    return state;
}

}