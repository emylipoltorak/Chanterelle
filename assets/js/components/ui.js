import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import DropdownMenu, { NestedDropdownMenu } from 'react-dd-menu';
import auth from '../auth';
import Cookies from 'js-cookie';
import axios from 'axios';

const csrfToken = Cookies.get('csrftoken');

// small, reusable UI components.

class Header extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    if (this.props.currentWorkflow.name) {
      return (
        <header>
          <h1>Chanter<span>elle</span></h1>
          <h2>{`{${this.props.currentWorkflow.name}}`}</h2>
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
  constructor (props) {
    super (props);
    this.state = { isMenuOpen: false };

    this.handleWorkflowSelect = this.handleWorkflowSelect.bind(this);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.deleteWorkflow = this.deleteWorkflow.bind(this);
  }

  toggle () {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  close () {
    this.setState({ isMenuOpen:false });
  }

  handleWorkflowSelect(e) {
    this.props.changeWorkflow(e.currentTarget.id);
    console.log(e.currentTarget.id);
  }

  deleteWorkflow (e) {
    e.preventDefault();
    console.log(e.currentTarget.id);
    console.log('delete button clicked');
    axios({
      method: 'POST',
      url: '/api/delete-workflow/',
      data: {workflow: e.currentTarget.id},
      headers: {
        "X-CSRFTOKEN": csrfToken,
        "Authorization": 'Token ' + localStorage.token
      }
    }).then(result => {
      this.props.loadUserWorkflows(false);
    }).catch(error => {
      console.log(error);
    });
  }

render() {
  const menuOptions = {
    isOpen: this.state.isMenuOpen,
    close: this.close,
    toggle: <span onClick={this.toggle}><i className="fas fa-code-branch fa-rotate-180"></i></span>,
    align: 'left',
    size: 'sm',
  };

  const nestedProps = {
    toggle: <button id='workflows'>Workflows</button>,
    animate: true,
    nested: 'reverse',
  }

    return (
      <DropdownMenu {...menuOptions}>
        <NestedDropdownMenu {...nestedProps}>
          {
            this.props.workflows[0] ?
            <ul>
              {/* <li><span onClick={this.handleWorkflowSelect}>{this.props.workflows[0]}</span></li> */}
              <li>
                <span id={this.props.workflows[0].id} onClick={this.handleWorkflowSelect}>{this.props.workflows[0].name}</span>
                <div className='edit-delete'>
                  <span id={this.props.workflows[0].id} onClick={this.props.showEditModal}><i className="far fa-edit" /></span>
                </div>
              </li>
              {this.props.workflows.slice(1).map(workflow => {
                return <li key={workflow.id}>
                    <span id={workflow.id} onClick={this.handleWorkflowSelect}>{workflow.name}</span>
                    <div className='edit-delete'>
                      <span id={workflow.id} onClick={this.props.showEditModal}><i className="far fa-edit" /></span>
                      <span id={workflow.id} onClick={this.deleteWorkflow}><i className="fas fa-trash" /></span>
                  </div>
                </li>
              }
            )}
            <li onClick={this.props.showAddModal}><button>+ New Workflow</button></li>
            </ul> : null
          }
        </NestedDropdownMenu>
        <li role='separator' className='separator' />
        <li><Link to='/'>Next</Link></li>
        <li><Link to='/graph'>Graph</Link></li>
      </DropdownMenu>
    );
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
