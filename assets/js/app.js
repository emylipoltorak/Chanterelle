import React, { Component } from 'react';
import { Header, Footer, Navbar } from './components/ui';
import { Main } from './main';
import axios from 'axios';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {graph: {}};
    this.LoadGraph = this.LoadGraph.bind(this)
  }

  componentDidMount() {
    this.LoadGraph()
  }

  LoadGraph () {
    axios.get('http://localhost:8000/api')
      .then(result => {
        this.setState({graph: result.data[3]})
      }).catch(error => {
        console.log(error)
    })
  }

  render () {
    return (
      <div className='app'>
        <Header graph={this.state.graph} LoadGraph={this.LoadGraph} />
        <Navbar />
        <Main graph={this.state.graph} LoadGraph={this.LoadGraph} />
        <Footer />
      </div>
      )
  }
}

export { App };
