import React, { Component } from 'react';
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
    this.setState({pw: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    const updateLogIn = this.props.checkLogIn;
    const updateUsername = this.props.updateUsername;
    const username = this.state.userName;
    const password = this.state.pw;
    auth.login(username, password,(loggedIn) => {
      if (loggedIn) {
        console.log(username);
        updateLogIn();
        updateUsername(username);
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
          <input type='password' name='pw' id='pw' onChange={this.handlePwChange}/>
        </label>
        <input type='submit' value='Submit'/>
      </form>
    );
  }
}
