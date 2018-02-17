import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NextList from './views/next-list';
import LogIn from './views/login';
import Graph from './views/graph-builder';
import auth from './auth';


class Main extends Component {
  constructor (props) {
    super(props);
    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth (nextState, replace) {
    if (!auth.loggedIn()) {
      replace({
        pathname:'/login',
        state: {nextPathname: '/'}
      })
    }
  }

  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={(defaultProps) => <NextList {...props} {...defaultProps} />} onEnter={this.requireAuth} />
          <Route path='/graph' render={(defaultProps) => <Graph {...props}  {...defaultProps} />} onEnter={this.requireAuth} />
          <Route path='/login' component={LogIn}/>
        </Switch>
      </main>
    )
  }
}

export { Main };
