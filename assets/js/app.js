import React, { Component } from 'react';
import { Header, Footer, Navbar, AuthButtons } from './components/ui';
import { Main } from './main';
import axios from 'axios';
import auth from './auth';
import Cookies from 'js-cookie'

// Set up cookies and auth token for the entire application.
// TODO: pass these values down as props to all children that use them. State?
// Low priority, as the current method functions even if it could be cleaner.
const csrfToken = Cookies.get('csrftoken');
let authToken = 'Token ' + localStorage.token;


export default class App extends Component {
  // The main app, rendered by the router in index.js.

  constructor (props) {
    //set up default props and state, and bind all class methods to be passed down.
    super(props);
    this.state = {workflows: {}, currentWorkflow: {}, isLoggedIn: false, username: ''};
    this.checkLogIn = this.checkLogIn.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.loadWorkflow = this.loadWorkflow.bind(this);
    this.loadUserWorkflows = this.loadUserWorkflows.bind(this);
    this.changeWorkflow = this.changeWorkflow.bind(this);
  }

  componentWillMount() {
    // check to see if the user is logged in, and load the user's workflows. If no user is logged in,
    // this should have no effect.
    console.log('componentWillMount ran');
    this.checkLogIn();
  }

  componentDidMount() {
    this.loadUserWorkflows(true);
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextState.isLoggedIn && this.state.isLoggedIn !== nextState.isLoggedIn) {
      this.setState({workflows: {}, currentWorkflow: {}, isLoggedIn: false, username: ''})
    };

    if (nextState.isLoggedIn && this.state.isLoggedIn !== nextState.isLoggedIn) {
      this.loadUserWorkflows(true);
    }
  }

  loadUserWorkflows(initial) {
    // if the user is logged in, get all of their workflows from the database.
    // Set the global application state to hold their workflows and set the default workflow to
    // the most recently created one.

    initial = initial || false;

    console.log('loadUserWorkflows ran');
    if (this.state.isLoggedIn) {
      axios({
        method: 'post',
        url: '/api/graphs-by-username/',
        headers: {
          "X-CSRFTOKEN": csrfToken,
          "Authorization": authToken
        }
      })
        .then(response => {
          console.log(`response: ${response}`)
          console.log(`workflows: ${response.data}`);
          if (initial) {
            this.setState({workflows: response.data, currentWorkflow: response.data[response.data.length-1], username: response.data[0].owner.username});
          } else {
            this.setState({workflows: response.data});
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  checkLogIn() {
    // update state to reflect the current login status.

    console.log('checkLogIn ran');

    this.setState({isLoggedIn: auth.loggedIn()});
  }

  updateUsername(username) {
    console.log('updateUsername ran');
    this.setState({username: username});
  }

  changeWorkflow (newWorkFlow){
    // changes the value of "currentWorkflow" in the application state, allowing users to switch
    // between workflows in both graph and next view.
    console.log('changeWorkflow ran');
    this.setState({currentWorkflow: this.state.workflows.find(obj => {return obj.id == newWorkFlow})});
    this.loadUserWorkflows();
  }

  loadWorkflow () {
    // re-loads the current workflow from the database to reflect changes.

    console.log('loadWorkflow ran');
    axios({
      method: 'post',
      url: '/api/graph-by-id/',
      data: {id: this.state.currentWorkflow.id},
      headers: {
        "X-CSRFTOKEN": csrfToken,
        "Authorization": authToken
      }
    })
      .then(result => {
        this.setState({currentWorkflow: result.data})
      })
        .catch(error => {
          console.log(error);
        });
  }

  logOut() {
    auth.logout();
    this.setState({workflows: {}, currentWorkflow: {}, isLoggedIn: false, username: ''});
  }

  render () {
    console.log('render ran in app');
    console.log(this.state);
    return (
      <div className='app'>
        <Header currentWorkflow={this.state.currentWorkflow} />
        <AuthButtons isLoggedIn={this.state.isLoggedIn} checkLogIn={this.checkLogIn}  />
        {this.state.isLoggedIn ? <Navbar workflows={this.state.workflows} currentWorkflow={this.state.currentWorkflow} changeWorkflow={this.changeWorkflow} isLoggedIn={this.state.isLoggedIn} username={this.state.username} updateUsername={this.updateUsername} /> : null }
        {(this.state.currentWorkflow.nodes || !this.state.isLoggedIn) ? <Main currentWorkflow={this.state.currentWorkflow} loadUserWorkflows={this.loadUserWorkflows} isLoggedIn={this.state.isLoggedIn} loadWorkflow={this.loadWorkflow} checkLogIn={this.checkLogIn} username={this.state.username} updateUsername={this.updateUsername} />: <main className='loading'>...</main>}
        <Footer />
      </div>
      )
  }
}

export { App };
