import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NextList from './views/next-list';
import LogIn from './views/login';
import Register from './views/register';
import Graph from './views/graph-builder';
import Tutorial from './views/tutorial';
import auth from './auth';


class Main extends Component {
  // the main content component. Returns the login page if a user is not logged in. If they are, returns
  // whatever component the url specifies.

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={(defaultProps) => this.props.isLoggedIn ? <NextList {...this.props} {...defaultProps} /> : <LogIn {...this.props} {...defaultProps} /> } />
          <Route path='/graph' render={(defaultProps) => this.props.isLoggedIn ? <Graph {...this.props}  {...defaultProps} /> : <LogIn {...this.props} {...defaultProps} /> } />
          <Route path='/login' render={(defaultProps) => !this.props.isLoggedIn ? <LogIn {...this.props} {...defaultProps} /> : <Redirect to='/' />} />
          <Route path='/register' render={(defaultProps) => !this.props.isLoggedIn ? <Register {...this.props} {...defaultProps} /> : <Redirect to='/tutorial' /> } />
          <Route path='/tutorial' component={Tutorial} />
        </Switch>
      </main>
    )
  }
}

export { Main };
