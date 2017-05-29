import { createStore, applyMiddleware } from 'redux';
import allReducers from './reducers';
import createHistory from 'history/createBrowserHistory'

import thunk from 'redux-thunk';
export const history = createHistory()



export const store = createStore(
  allReducers
  ,
  applyMiddleware(thunk)
)

store.subscribe(function(){
  console.log("Store update : ", store.getState());
})