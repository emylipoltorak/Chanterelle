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

const AuthButtons = (props) => {
  return (
    <div id='auth-buttons'>
      <LogInOutButton isLoggedIn={props.isLoggedIn} checkLogIn={props.checkLogIn} />
      {!props.isLoggedIn ? <RegisterButton /> : null}
    </div>
  )
}

class Navbar extends Component {
  render() {
    return (
      <nav>
        <i className="fas fa-code-branch fa-rotate-180"></i>
        <ul>
          <li><Link to='/'><button>Next</button></Link></li>
          <li><Link to='/graph'><button>Graph</button></Link></li>
        </ul>
      </nav>
    )
  }
};

const LogInButton = () => {
  return <Link to='/login'><button className='login auth'>Log In</button></Link>
}

const LogOutButton = (props) => {
  const updateLogIn = props.checkLogIn;
  return <button className='logout auth' onClick={() => {
    auth.logout();
    props.checkLogIn();
  }}>Log Out</button>
}

const LogInOutButton = (props) => {
  return props.isLoggedIn ? <LogOutButton checkLogIn={props.checkLogIn} /> : <LogInButton />
}

const RegisterButton = () => {
  return <Link to='/register'><button className='register auth'>Register</button></Link>
}

export { Header, Footer, Navbar, AuthButtons }
