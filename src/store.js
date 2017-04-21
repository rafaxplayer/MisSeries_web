import { createStore, applyMiddleware } from 'redux';
import allReducers from './reducers';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
export const history = createHistory()

const middleware = routerMiddleware(history)

export const store = createStore(
  allReducers
  ,
  applyMiddleware(thunk,middleware)
)

store.subscribe(function(){
  console.log("Store update : ", store.getState());
})