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
    if (e.target.id === 'username') {
      field = 'username';
      let input = document.querySelector('#username');
      let errorMessages = document.querySelector('#username-errors')
      axios({
        method: 'post',
        url: '/api/check-username/',
        data: {username: this.state.username},
        headers: {
          "X-CSRFTOKEN": csrfToken,
        }
      }).then(response => {
        console.log(response);
        if (response.data.available == "false") {
          errorMessages.innerText = 'Sorry, that username is unavailable.';
          errorMessages.className = 'error-message'
        } else if (response.data.available == 'true') {
          console.log(this.state.username.length < 6);
          if (this.state.username.length < 6) {
            errorMessages.className = 'error-message'
            errorMessages.innerText = 'Sorry, that username is too short.'
          } else {
            errorMessages.className = ''
            errorMessages.innerHTML = '<i class="fas fa-check"></i>'
            input.className += "validated"
          }
        }
      }).catch(errors => {
        console.log(errors)
      });
    } else if (e.target.id === 'pw1') {
      field = 'password1';
      console.log(e.target.value);
      let input = document.querySelector('#pw1');
      let errorMessages = document.querySelector('#pw1-errors');
      errorMessages.innerHTML = '';
      let hasLower = new RegExp("^(?=.*[a-z])");
      let hasUpper = new RegExp("^(?=.*[A-Z])");
      let hasNumber = new RegExp("^(?=.*[0-9])");
      let hasSpecial = new RegExp("^(?=.[!@#\$%\^&])");
      const errors = validate(this.state.username, e.target.value, this.state.pw2);
      if (errors['password1']) {
        errorMessages.innerHTML = 'Errors: <br>';
        errorMessages.className = 'error-message';
        if (!hasLower.test(e.target.value)) {
          errorMessages.innerHTML += 'At least one lowercase letter is required. <br>'
        }
        if (!hasUpper.test(e.target.value)) {
          errorMessages.innerHTML += 'At least one uppercase letter is required. <br>'
        }
        if (!hasNumber.test(e.target.value)) {
          errorMessages.innerHTML += 'At least one number is required. <br>'
        }
        if (!hasSpecial.test(e.target.value)) {
          errorMessages.innerHTML += 'At least one special character (!@#$%^&) is required. <br>'
        } if (e.target.value < 8) {
          errorMessages.innerHTML += 'Minimum password length is 8. <br>'
        }
      } else {
        errorMessages.className = '';
        errorMessages.innerHTML = '<i class="fas fa-check"></i>';
        input.className += "validated";
      }

    } else if (e.target.id === 'pw2') {
      field = 'password2';
      let input = document.querySelector('#pw2');
      let errorMessages = document.querySelector('#pw2-errors');
      if (this.state.pw1 !== e.target.value) {
        errorMessages.className = 'error-message';
        errorMessages.innerText = "Passwords don't match."
      } else {
        errorMessages.className = '';
        errorMessages.innerHTML = '<i class="fas fa-check"></i>';
        input.className += "validated";
      }
    }
    this.setState({
      touched: { [field]: true },
    });
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
        <div className='formfield'>
          <input placeholder='Username' type='text' id='username'
            onChange={this.handleNameChange}
            className={shouldMarkError('username') ? 'errors': ''}
            onBlur={this.handleBlur}
           />
          <p id='username-errors'>
            Choose a unique username that is at least 6 characters long.
          </p>
        </div>
        <div className='formfield'>
          <input placeholder='Password' type='password' id='pw1' onChange={this.handlePwChange} className={shouldMarkError('password1') ? 'errors': ''} onBlur={this.handleBlur} />
          <p id='pw1-errors'>Password should contain a capital letter, a lowercase letter, a number, and a special character.</p>
        </div>
        <div className='formfield'>
          <input  placeholder='Password Again' type='password' id='pw2' onChange={this.handlePwChange} className={shouldMarkError('password2') ? 'errors': ''} onBlur={this.handleBlur} />
          <p id='pw2-errors'>Passwords should match.</p>
        </div>
        <input type='submit' value='Submit' disabled={isDisabled} />
      </form>
    );
  }
}
