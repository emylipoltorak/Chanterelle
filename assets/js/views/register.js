import React, { Component } from 'react';
import auth from '../auth';
import axios from 'axios';
import Cookies from 'js-cookie'

const csrfToken = Cookies.get('csrftoken');
const authToken = 'Token ' + localStorage.token;

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      pw1: '',
      pw2: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePwChange = this.handlePwChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({userName:e.target.value});
  }

  handlePwChange(e) {
    if (e.target.id === 'pw1') {
      this.setState({pw1: e.target.value});
    } else if (e.target.id === 'pw2') {
      this.setState({pw2: e.target.value});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    document.querySelector('#userName').value='';
    document.querySelector('#pw1').value='';
    document.querySelector('#pw2').value='';
    const updateLogIn = this.props.checkLogIn;
    const updateUsername = this.props.updateUsername;
    if (this.state.userName && this.state.pw1 === this.state.pw2) {
      const username = this.state.userName;
      const password = this.state.pw1
      axios({
        method: 'post',
        url: '/register-user/',
        data: {username: username, password: password},
        headers: {
          "X-CSRFTOKEN": csrfToken,
        }
      }).then(result => {
        auth.login(username, password,(loggedIn) => {
          if (loggedIn) {
            updateLogIn();
            updateUsername(username);
          }
        });
        this.setState({userName: '', pw1: '', pw2: ''});
      }).catch(e => {
        console.log(e);
      })
    } else {
      alert('try again');
      this.setState(userName: '', pw1: '', pw2: '');
    }
  };

  render() {
    console.log(this.state.buttonDisabled);
    return (
      <form className='authForm' onSubmit={this.handleSubmit}>
        <h2>Register</h2>
        <label>
          Username:
          <input type='text' id='userName' onChange={this.handleNameChange} />
        </label>
        <label>
          Password:
          <input type='password' id='pw1' onChange={this.handlePwChange}/>
        </label>
        <label>
          Again:
          <input type='password' id='pw2' onChange={this.handlePwChange}/>
        </label>
        <input type='submit' value='Submit'/>
      </form>
    );
  }
}
