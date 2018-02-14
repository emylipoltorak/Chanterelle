import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NextList from './views/next-list';
import LogIn from './views/login';
import Graph from './views/graph-builder';
import { App } from './app'


ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
