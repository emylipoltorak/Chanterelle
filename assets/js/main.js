import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NextList from './views/next-list';
import LogIn from './views/login';
import Graph from './views/graph-builder';


const Main = (props) => (
  <main>
    <Switch>
      <Route exact path='/' render={(defaultProps) => <NextList {...props} {...defaultProps} /> }/>
      <Route path='/graph' render={(defaultProps) => <Graph {...props}  {...defaultProps} />} />
      <Route path='/login' component={LogIn}/>
    </Switch>
  </main>
)

export { Main };
