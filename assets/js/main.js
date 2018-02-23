import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NextList from './views/next-list';
import LogIn from './views/login';
import Register from './views/register';
import Graph from './views/graph-builder';
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
          <Route path='/login' render={(defaultProps) => !this.props.isLoggedIn ? <LogIn {...this.props} {...defaultProps} /> : <h1>Logged in as {this.props.username}</h1>} />
          <Route path='/register' render={(defaultProps) => !this.props.isLoggedIn ? <Register {...this.props} {...defaultProps} /> : <h1>Logged in as {this.props.username}</h1>} />
        </Switch>
      </main>
    )
  }
}

export { Main };
