import React, { Component } from 'react';
import { Header, Footer, Navbar } from './components/ui';
import { Main } from './main';
import axios from 'axios';
import auth from './auth';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {graph: {}, isLoggedIn:false};
    this.LoadGraph = this.LoadGraph.bind(this)
    this.checkLogIn = this.checkLogIn.bind(this)
  }

  componentWillMount() {
    this.LoadGraph();
    this.checkLogIn();
  }

  checkLogIn() {
    console.log('checkLogIn ran')
    this.setState({isLoggedIn: auth.loggedIn()})
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
        <Header graph={this.state.graph} isLoggedIn={this.state.isLoggedIn} />
        <Navbar isLoggedIn={this.state.isLoggedIn} />
        { this.state.graph.nodes ? <Main graph={this.state.graph} isLoggedIn={this.state.isLoggedIn} LoadGraph={this.LoadGraph} checkLogIn={this.checkLogIn} /> : <main><h1 className='loading'>...</h1></main>}
        <Footer />
      </div>
      )
  }
}

export { App };
