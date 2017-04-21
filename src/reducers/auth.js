import { LOGIN_USER } from '../consTypes';

export default function(state = { user:null }, action){
    switch (action.type) {
        case LOGIN_USER:
            return Object.assign({},state,{user:action.payload})
         
        default:
            return state;
    }
};