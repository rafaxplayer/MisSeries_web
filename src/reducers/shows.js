import { LIST_TVSHOWS} from '../consTypes';

export default function(state = { list:[] }, action){
    switch (action.type) {
        case LIST_TVSHOWS:
            return Object.assign({},state,{ list:action.payload })
    default:
            return state;
    }
};