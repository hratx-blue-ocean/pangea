import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Profile from './components/Profile';

ReactDOM.render((
  <Router>
    <Switch>
      <Route exact path='/' component={Profile}/>
      <Route path='/user' component={Home}/>
    </Switch>
  </Router>
) , document.getElementById('root'));