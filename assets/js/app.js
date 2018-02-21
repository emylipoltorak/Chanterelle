import React, { Component } from 'react';
import { Header, Footer, Navbar, AuthButtons } from './components/ui';
import { Main } from './main';
import axios from 'axios';
import auth from './auth';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {graph: {}, isLoggedIn:false, username: ''};
    this.LoadGraph = this.LoadGraph.bind(this);
    this.checkLogIn = this.checkLogIn.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  componentWillMount() {
    this.LoadGraph();
    this.checkLogIn();
  }

  checkLogIn() {
    this.setState({isLoggedIn: auth.loggedIn()})
  }

  updateUsername(username) {
    this.setState({username: username})
  }

  LoadGraph () {
    axios.get('http://localhost:8000/api')
      .then(result => {
        this.setState({graph: result.data[0]})
      }).catch(error => {
        console.log(error)
    })
  }

  render () {
    return (
      <div className='app'>
        <Header graph={this.state.graph} />
        <AuthButtons isLoggedIn={this.state.isLoggedIn} checkLogIn={this.checkLogIn} />
        <Navbar isLoggedIn={this.state.isLoggedIn} username={this.state.username} updateUsername={this.updateUsername} />
        { this.state.graph.nodes ? <Main graph={this.state.graph} isLoggedIn={this.state.isLoggedIn} LoadGraph={this.LoadGraph} checkLogIn={this.checkLogIn} username={this.state.username} updateUsername={this.updateUsername} /> : <main><h1 className='loading'>...</h1></main>}
        <Footer />
      </div>
      )
  }
}

export { App };
