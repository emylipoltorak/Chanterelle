import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

class Header extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    if (this.props.graph.name) {
      return (
        <header>
          <h1>Chanter<span>elle</span></h1>
          <h2>{`{${this.props.graph.name}}`}</h2>
        </header>
      )
    }
    return (
      <header>
        <h1>Chanter<span>elle</span></h1>
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
        <i className="fas fa-code-branch fa-rotate-180"></i>
        <ul>
          <li><Link to='/'><button>Next</button></Link></li>
          <li><Link to='/graph'><button>Graph</button></Link></li>
          <li><Link to='/login'><button>Log In</button></Link></li>
        </ul>
      </nav>
    )
  }
};

export { Header, Footer, Navbar }
