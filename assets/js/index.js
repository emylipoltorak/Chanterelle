import React, { Component } from 'react';
import { render } from 'react-dom';
import CyContainer from './cy_elements';
import AddBox from './add_box';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {graph: {}};
    this.LoadGraph = this.LoadGraph.bind(this)
  }

  componentDidMount() {
    this.LoadGraph()
  }

  LoadGraph () {
    console.log('LoadGraph() ran');
    axios.get('http://localhost:8000/api')
      .then(result => {
        this.setState({graph: result.data[1]})
      }).catch(error => {
        console.log(error)
    })
  }

  render () {
    return (
        <div className='app'>
          <header>
            <h1>Chanterelle</h1>
            <h2>{this.state.graph.name}</h2>
          </header>
          <CyContainer graph={this.state.graph} />
          <AddBox graph={this.state.graph} LoadGraph={this.LoadGraph}/>
        </div>
      )
  }
}

render(<App />, document.getElementById('root'));