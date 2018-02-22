import React, { Component } from 'react';
import update from 'immutability-helper';

const fieldValidations = [
  ruleRunner('name', 'Name', required),
  ruleRunner("emailAddress", "Email Address", required),
  ruleRunner("password1", "Password", required, minLength(6)),
  ruleRunner("password2", "Password Confirmation", mustMatch("password1", "Password"))
];

export default class Register extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showErrors: false,
      validationErrors: {}
    };
    this.state.validationErrors = run(this.state, fieldValidations);
  }

handleFieldChange(field) {
  return (e) => {
    let newState = update(this.state, {[field]: {$set: e.target.value}
    });
    newState.validationErrors = run(newState, fieldValidations);
    this.setState(newState);
  }
}

}
