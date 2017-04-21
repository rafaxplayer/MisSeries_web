import { LIST_TVEPISODES, GET_NOTSEEN  } from '../consTypes';

export default function(state = { list:[], notseen:[] }, action){
    switch (action.type) {
        case LIST_TVEPISODES:
            return Object.assign({},state,{list:action.payload})
         case GET_NOTSEEN:
            return Object.assign({},state,{notseen:action.payload}) 
        default:
            return state;
    }
};