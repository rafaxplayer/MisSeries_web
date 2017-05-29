import { combineReducers } from 'redux';
import showsReducer from './shows';
import episodesReducer from './episodes';
import authReducer from './auth';
import modalsReducer from './modals';


const allReducers = combineReducers({
    shows:showsReducer,
    episodes:episodesReducer,
    auth:authReducer,
    modals:modalsReducer
    
})

export default allReducers;
