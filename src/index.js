import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter} from 'react-router-redux'
import { Route, Redirect,Switch } from 'react-router-dom'
import { store, history } from './store'
import App from './App'
import ListTvShows from './components/ListTvShows'
import ListEpisodes from './components/ListEpisodes'
import ListNotSeen from './components/ListNotSeen'
import NotFound from './components/NotFound'
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
       <Redirect from="/" to="/home"/>
        
        <Route exact path="/" component={App}/>
        
        <Route exact path="/home" component={ListTvShows}/>
        <Route exact path="/show" component={ListEpisodes} />
        <Route exact path="/notseen" component={ListNotSeen} />
        <Route component={NotFound} />
        
     </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
