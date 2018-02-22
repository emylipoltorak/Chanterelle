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
      <footer>
        <a href='http://lipoltorak.com'><p><i className="far fa-copyright"></i>Emyli Poltorak 2018</p></a>
        <div className='social-buttons'>
          <a href='https://github.com/emylipoltorak'><i className="fab fa-github-alt"></i></a>
          <a href='https://www.linkedin.com/in/li-poltorak/'><i className="fab fa-linkedin-in"></i></a>
          <a href='mailto:emyli.poltorak@gmail.com'><i className="fas fa-at"></i></a>
          <a href='https://www.codepen.io/Emyli/'><i className="fab fa-codepen"></i></a>
        </div>
      </footer>
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

  constructor(props) {
    super(props);
    this.handleWorkflowSelect = this.handleWorkflowSelect.bind(this);
  }

  handleWorkflowSelect(e) {
    this.updateWorkflow(e.target.id);
  }

  render() {
    return (
      <nav>
        <i className="fas fa-code-branch fa-rotate-180"></i>
        <ul>
          <li>
            <button id='workflows' onClick={this.handleWorkflowSelect}>Workflows</button>
            <ul>
              {this.props.graphs.map(graph => {
                return <li key={graph.id}><button id={graph.id}>{this.props.graph.name}</button></li>
              })}
            </ul>
          </li>
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
