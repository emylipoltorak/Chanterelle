import React, { Component } from 'react';
import { Header, Footer, Navbar } from '../components/ui';
import BrowserRouter from 'react-router-dom';
import auth from '../auth';

export default class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {userName: '', pw: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePwChange = this.handlePwChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({userName:e.target.value});
  }

  handlePwChange(e) {
    this.setState({pw:e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.userName);
    console.log(this.state.pw);
    document.getElementById('userName').value='';
    document.getElementById('pw').value='';
    auth.login(this.state.userName, this.state.pw, (loggedIn) => {
      if (loggedIn) {
        this.context.router.replace('/')
      }
    })
  };

  render() {
    return (
      <form className='authForm' onSubmit={this.handleSubmit}>
        <h2>Log In</h2>
        <label>
          Username:
          <input type='text' name='userName' id='userName' onChange={this.handleNameChange} />
        </label>
        <label>
          Password:
          <input type='text' name='pw' id='pw' onChange={this.handlePwChange}/>
        </label>
        <input type='submit' value='Submit'/>
      </form>
    );
  }
}
