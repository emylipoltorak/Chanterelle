import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

const csrfToken = Cookies.get('csrftoken');

export default class AddBox extends Component {

  constructor (props) {
    super (props);
    this.state = { name: '', description: '' }

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange (e) {
    this.setState({name: e.target.value});
  }

  handleDescriptionChange (e) {
    this.setState({description: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/add-node/',
      data:{name: this.state.name, description: this.state.description, graph: this.props.currentWorkflow.id},
      headers: {
        "X-CSRFTOKEN": csrfToken,
        "Authorization": 'Token ' + localStorage.token
      }
    })
      .then(response => {
        this.setState({ name: '', description: '' })
        this.props.loadUserWorkflows(false);
      }).catch(error => {
        console.log(error)
    })
  }

  render () {
    return (
      <form className='addBox' onSubmit={this.handleSubmit}>
        <h1>{`{New Task}`}</h1>
        <label id='name'>
          Name:
          <input type='text' value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <label>
          Description:
          <textarea value={this.state.description} onChange={this.handleDescriptionChange} />
        </label>
        <button type='submit' value='Submit'>Add</button>
      </form>
    )
  }
}
