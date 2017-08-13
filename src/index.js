import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { store } from './store'
import App from './App'
import ListTvShows from './components/ListTvShows'
import ListEpisodes from './components/ListEpisodes'
import ListNotSeen from './components/ListNotSeen'
import NotFound from './components/NotFound'

render(
  <Provider store={ store }>
    <Router basename="/mis-series">
        <App>
          <Switch>
            <Route exact path="/" component={ListTvShows}/>
            <Route path="/show" component={ListEpisodes} />
            <Route path="/notseen" component={ListNotSeen} />
            <Route component={NotFound} />
          </Switch>
        </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
