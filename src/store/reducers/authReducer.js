import { USER_LOGIN, USER_LOGOUT } from "../actions/authActions";
import { authItem } from "../initialValues/authItem";

const initialState = {
    authItem:authItem
}

export default function authReducer(state=initialState,{type,payload}){
    switch (type) {
        case USER_LOGIN:
            state.authItem = payload
            return{
                ...state,
                authItem:[...[{loggedIn:true,user:payload}]]
            }
        case USER_LOGOUT:
            state.user = payload
            return{
                ...state,
                authItem:[{loggedIn:false}]
            };

        default:
            return state;
    }
}