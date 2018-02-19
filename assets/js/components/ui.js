import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import auth from '../auth';

// small, reusable UI components.

class Header extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    if (this.props.graph.name) {
      return (
        <header>
          <h1>Chanter<span>elle</span></h1>
          <LogInOutButton isLoggedIn={this.props.isLoggedIn} />
          {!this.props.isLoggedIn ? <RegisterButton /> : null}
          <h2>{`{${this.props.graph.name}}`}</h2>
        </header>
      )
    }
    return (
      <header>
        <h1>Chanter<span>elle</span></h1>
        <LogInOutButton isLoggedIn={this.props.isLoggedIn} />
        {!this.props.isLoggedIn ? <RegisterButton /> : null}
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
    console.log(this.props.isLoggedIn)
    return (
      <nav>
        <i className="fas fa-code-branch fa-rotate-180"></i>
        <ul>
          <li><Link to='/'><button>Next</button></Link></li>
          <li><Link to='/graph'><button>Graph</button></Link></li>
          <li><LogInOutButton isLoggedIn={this.props.isLoggedIn} /></li>
        </ul>
      </nav>
    )
  }
};

const LogInButton = () => {
  return <Link to='/login'><button className='login auth'>Log In</button></Link>
}

const LogOutButton = () => {
  return <button className='logout auth' onClick={auth.logout}>Log Out</button>
}

const LogInOutButton = (props) => {
  return props.isLoggedIn ? <LogOutButton /> : <LogInButton />
}

const RegisterButton = () => {
  return <Link to='/register'><button className='register auth'>Register</button></Link>
}

export { Header, Footer, Navbar }
