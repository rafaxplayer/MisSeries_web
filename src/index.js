import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter} from 'react-router-redux'
import { Route, Redirect } from 'react-router-dom'
import { store, history } from './store'
import App from './App'
import ListTvShows from './components/ListTvShows'
import ListEpisodes from './components/ListEpisodes'
import ListNotSeen from './components/ListNotSeen'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="App">
        <Redirect from="/" to="/home"/>
        <Route path="/" component={App}/> 
        <Route path="/home" component={ListTvShows}/>
        <Route path="/show" component={ListEpisodes} />
        <Route path="/notseen" component={ListNotSeen} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
