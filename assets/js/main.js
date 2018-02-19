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
  }

  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={(defaultProps) => this.props.isLoggedIn ? <NextList {...this.props} {...defaultProps} /> : <LogIn {...this.props} {...defaultProps} /> } />
          <Route path='/graph' render={(defaultProps) => this.props.isLoggedIn ? <Graph {...this.props}  {...defaultProps} /> : <LogIn {...this.props} {...defaultProps} /> } />
          <Route path='/login' render={(defaultProps) => <LogIn {...this.props} {...defaultProps} />} />
        </Switch>
      </main>
    )
  }
}

export { Main };
