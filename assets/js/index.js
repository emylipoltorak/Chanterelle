import React, { Component } from 'react';
import { render } from 'react-dom';
import CyContainer from './cy_elements';
import AddBox from './add_box';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {graph: {}}
  }

  componentDidMount() {
    this.LoadGraph()
  }

  LoadGraph () {
    axios.get('http://localhost:8000/api')
      .then(result => {
        this.setState({graph: result.data[1]})
      }).catch(error => {
        console.log(error)
    })
  }

  render () {
    return (
        <div>
          <CyContainer graph={this.state.graph} />
          <AddBox graph={this.state.graph} />
        </div>
      )
  }
}

render(<App />, document.getElementById('root'));