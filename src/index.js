import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router} from 'react-router-redux'
import { Route, Redirect } from 'react-router-dom'
import { store, history } from './store'
import App from './App'
import ListTvShows from './components/ListTvShows'
import ListEpisodes from './components/ListEpisodes'
import ListNotSeen from './components/ListNotSeen'
import NotFound from './components/NotFound'


render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Redirect from="/" to="/home"/>
        <Route path="/" component={App}/>
        <Route path="/home"  component={ListTvShows}/>
        <Route path="/show" component={ListEpisodes} />
        <Route path="/notseen" component={ListNotSeen} />
        {/*<Route component={NotFound} />*/}
        
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
