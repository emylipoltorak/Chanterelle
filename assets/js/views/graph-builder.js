import React, { Component } from 'react';
import { render } from 'react-dom';
import CyContainer from '../components/cy_container';
import AddBox from '../components/add_box';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Graph extends Component {
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
        this.setState({graph: result.data[3]})
      }).catch(error => {
        console.log(error)
    })
  }

  render () {
    return (
        <div className='app'>
          <img className='icon' src='https://cms-assets.tutsplus.com/uploads/users/877/posts/28574/image/9-drawing-mushrooms-ink-chanterelle-adding-grass.jpg' alt='Chanterelle Mushroom' />
          <header>
            <h1>Chanterelle</h1>
            <h2>Graph: {this.state.graph.name}</h2>
          </header>
          <CyContainer graph={this.state.graph} LoadGraph={this.LoadGraph} />
          <AddBox graph={this.state.graph} LoadGraph={this.LoadGraph} />
          <Link to='/'><button>Next List</button></Link>
          <Link to='/graph'><button>Graph</button></Link>
          <Link to='/login'><button>Log In</button></Link>
        </div>
      )
  }
}
