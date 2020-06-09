import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Profile from './components/Profile';

ReactDOM.render((
  <Router>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/user' component={Profile}/>
    </Switch>
  </Router>
) , document.getElementById('root'));