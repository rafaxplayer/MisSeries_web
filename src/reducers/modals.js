import { MODAL_OPTIONS_ISOPEN ,MODAL_DETAILS_ISOPEN, MODAL_SHOW } from '../consTypes';

export default function(state = { options:false, details:false, showformodal:null }, action){
    switch (action.type) {
        case MODAL_OPTIONS_ISOPEN:
            return Object.assign({},state,{options:action.payload})
          case MODAL_DETAILS_ISOPEN:
            return Object.assign({},state,{details:action.payload})   
         case MODAL_SHOW:
            return Object.assign({},state,{showformodal:action.payload})
        default:
            return state;
    }
};