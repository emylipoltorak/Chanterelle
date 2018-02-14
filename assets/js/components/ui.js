import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

class Header extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <header>
        <h1>Chanterelle</h1>
      </header>
    )
  }
}


class Footer extends Component {
  render () {
    return (
      <footer>Footer goes here</footer>
    )
  }
}

class Navbar extends Component {

  render() {
    return (
      <nav>
        <ul>
          <li><Link to='/'><button>Next List</button></Link></li>
          <li><Link to='/graph'><button>Graph</button></Link></li>
          <li><Link to='/login'><button>Log In</button></Link></li>
        </ul>
      </nav>
    )
  }
};

export { Header, Footer, Navbar }
