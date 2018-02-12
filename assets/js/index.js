import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NextList from './views/next-list.js';
import Graph from './views/graph-builder.js';
import LogIn from './views/login.js';


ReactDOM.render(
  <BrowserRouter>
      <div>
        <Route exact path="/" component={NextList} />
        <Route path="/graph" component={Graph} />
        <Route path="/login" component={LogIn} />
      </div>
  </BrowserRouter>,
  document.getElementById('root')
)
