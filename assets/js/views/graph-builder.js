import React, { Component } from 'react';
import CyContainer from '../components/cy_container';
import AddBox from '../components/add_box';
import CustomAnimation from 'react-responsive-modal';

export default class Graph extends Component {
  constructor (props) {
    super(props);
    this.state = { open: false };
    this.showAddBox = this.showAddBox.bind(this);
    this.hideAddBox = this.hideAddBox.bind(this);
  }

  showAddBox () {
    this.setState({ open: true })
  }

  hideAddBox () {
    this.setState({ open: false })
  }

  render () {
    const { open } = this.state;
    return (
      <main className='graph'>
        <CyContainer graph={this.props.graph} LoadGraph={this.props.LoadGraph} />
        <button className='add' onClick={this.showAddBox}>Add a Task</button>
        <CustomAnimation open={open} onClose={this.hideAddBox} little>
          <AddBox graph={this.props.graph} LoadGraph={this.props.LoadGraph} />
        </CustomAnimation>
      </main>
    )};
}
