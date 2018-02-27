import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

const csrfToken = Cookies.get('csrftoken');

class AddNodeBox extends Component {

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
      <form className='modal' onSubmit={this.handleSubmit}>
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

class EditWorkflowBox extends Component {
  constructor (props) {
    super (props);
    this.state = { name: this.props.workflow.name, description: this.props.workflow.description || '' }

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
      url: '/api/edit-workflow/',
      data:{name: this.state.name, description: this.state.description, workflow: this.props.workflow.id},
      headers: {
        "X-CSRFTOKEN": csrfToken,
        "Authorization": 'Token ' + localStorage.token
      }
    })
      .then(response => {
        this.props.loadUserWorkflows(false);
        this.props.hideEditModal();
      }).catch(error => {
        console.log(error)
    })
  }

  render () {
    return (
      <form className='modal' onSubmit={this.handleSubmit}>
        <h1>{`{Editing: ${this.props.workflow.name}}`}</h1>
        <label id='name'>
          New Name:
          <input type='text' value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <label>
          New Description:
          <textarea value={this.state.description} onChange={this.handleDescriptionChange} />
        </label>
        <button type='submit' value='Submit'>Save</button>
      </form>
    )
  }
}

class AddWorkflowBox extends Component {
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
      url: '/api/add-workflow/',
      data:{name: this.state.name, description: this.state.description},
      headers: {
        "X-CSRFTOKEN": csrfToken,
        "Authorization": 'Token ' + localStorage.token
      }
    })
      .then(response => {
        console.log(response);
        this.setState({ name: '', description: '' })
        this.props.loadUserWorkflows(false);
        this.props.hideAddModal();
      }).catch(error => {
        console.log(error)
    })
  }

  render () {
    return (
      <form className='modal' onSubmit={this.handleSubmit}>
        <h1>{`{New Workflow}`}</h1>
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
};

class EditNodeBox extends Component {
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
      url: '/api/edit-node/',
      data:{name: this.state.name, description: this.state.description, node: this.props.node.id},
      headers: {
        "X-CSRFTOKEN": csrfToken,
        "Authorization": 'Token ' + localStorage.token
      }
    })
      .then(response => {
        this.props.loadUserWorkflows(false);
        this.props.hideEditNodeBox();
      }).catch(error => {
        console.log(error)
    })
  }

  render () {
    console.log(this.props.node);
    return (
      <form className='modal' onSubmit={this.handleSubmit}>
        <h1>{`{Editing: ${this.props.node.name}}`}</h1>
        <label id='name'>
          New Name:
          <input type='text' value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <label>
          New Description:
          <textarea value={this.state.description} onChange={this.handleDescriptionChange} />
        </label>
        <button type='submit' value='Submit'>Save</button>
      </form>
    )
  }
}

export { AddNodeBox, AddWorkflowBox, EditWorkflowBox, EditNodeBox }
