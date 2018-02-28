import React, { Component } from 'react';
import auth from '../auth';
import axios from 'axios';
import Cookies from 'js-cookie'

const csrfToken = Cookies.get('csrftoken');

function validate(username, password1, password2) {
  const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
  return {
    username: !(username.length >= 6),
    password1: !(strongPassword.test(password1)),
    password2: !(strongPassword.test(password1) && password1 === password2)
  }
}

export default class Register extends Component {
// Give users a chance to create a new account.
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pw1: '',
      pw2: '',
      touched: {
        username: false,
        pw1: false,
        pw2: false,
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePwChange = this.handlePwChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  // event handlers for the three controlled text input components.
  handleNameChange(e) {
    this.setState({username:e.target.value});
  }

  handlePwChange(e) {
    if (e.target.id === 'pw1') {
      this.setState({pw1: e.target.value});
    } else if (e.target.id === 'pw2') {
      this.setState({pw2: e.target.value});
    }
  }

  handleSubmit(e) {
    // When the form is submitted,
    e.preventDefault();
    document.querySelector('#username').value='';
    document.querySelector('#pw1').value='';
    document.querySelector('#pw2').value='';
    const updateLogIn = this.props.checkLogIn;
    const updateUsername = this.props.updateUsername;
    if (this.state.username && this.state.pw1 === this.state.pw2 && !this.state.validationErrors) {
      const username = this.state.username;
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
        this.setState({username: '', pw1: '', pw2: ''});
      }).catch(e => {
        console.log(e);
      })
    } else {
      alert('try again');
      this.setState({username: '', pw1: '', pw2: ''});
    }
  };

  handleBlur (e) {
    let field = '';
    if (e.currentTarget.id === 'username') {
      field = 'username';
    } else if (e.currentTarget.id === 'pw1') {
      field = 'password1';
    } else if (e.currentTarget.id === 'pw2') {
      field = 'password2';
    }
    this.setState({
      touched: { [field]: true },
    });
    // if (field == 'username') {
    //   axios({
    //     method: 'post',
    //     url: '/check-username/',
    //     data: {username: this.state.username},
    //     headers: {
    //       "X-CSRFTOKEN": csrfToken,
    //     }
    //   }).then(response => {
    //     console.log(response);
    //     if (!response.available) {
    //       document.querySelector('#username-errors').innerText = 'Sorry, that username is unavailable.';
    //     }
    //   }).catch(errors => {
    //     console.log(errors)
    //   });
    // };
  }

  render() {
    const errors = validate(this.state.username, this.state.pw1, this.state.pw2);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      return errors[field] && this.state.touched[field];
    };

    return (
      <form className='authForm' onSubmit={this.handleSubmit}>
        <h2>Register</h2>
        <label>
          Username:
          <input type='text' id='username' onChange={this.handleNameChange} className={shouldMarkError('username') ? 'errors': ''} onBlur={this.handleBlur} />
          {/* <p id='username-errors'></p> */}
        </label>
        <label>
          Password:
          <input type='password' id='pw1' onChange={this.handlePwChange} className={shouldMarkError('password1') ? 'errors': ''} onBlur={this.handleBlur} />
          {/* <p id='pw1-errors'></p> */}
        </label>
        <label>
          Again:
          <input type='password' id='pw2' onChange={this.handlePwChange} className={shouldMarkError('password2') ? 'errors': ''} onBlur={this.handleBlur} />
          {/* <p id='pw2-errors'></p> */}
        </label>
        <input type='submit' value='Submit' disabled={isDisabled} />
      </form>
    );
  }
}
