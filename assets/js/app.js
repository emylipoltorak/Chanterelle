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

  componentWillMount() {
    this.LoadGraph();
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
        <Navbar />
        { this.state.graph.nodes ? <Main graph={this.state.graph} LoadGraph={this.LoadGraph} /> : <main><h1 className='loading'>...</h1></main>}
        <Footer />
      </div>
      )
  }
}

export { App };
