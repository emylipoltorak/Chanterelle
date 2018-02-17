import React, { Component } from 'react';
import CyContainer from '../components/cy_container';
import AddBox from '../components/add_box';

export default class Graph extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    console.log(this.props.graph);
    return (
      <main className='graph'>
        <CyContainer graph={this.props.graph} LoadGraph={this.props.LoadGraph} />
        {/* <AddBox graph={this.props.graph} LoadGraph={this.props.LoadGraph} /> */}
      </main>
    )};
}
