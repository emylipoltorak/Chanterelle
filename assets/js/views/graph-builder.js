import React, { Component } from 'react';
import CyContainer from '../components/cy_container';
import { AddNodeBox, EditNodeBox }from '../components/modals';
import CustomAnimation from 'react-responsive-modal';

export default class Graph extends Component {
  constructor (props) {
    super(props);
    this.state = { addNodeOpen: false, editNodeOpen: false, nodeToEdit: {} };
    this.showAddNodeBox = this.showAddNodeBox.bind(this);
    this.hideAddNodeBox = this.hideAddNodeBox.bind(this);
    this.showEditNodeBox = this.showEditNodeBox.bind(this);
    this.hideEditNodeBox = this.hideEditNodeBox.bind(this);
  }

  showAddNodeBox () {
    this.setState({ addNodeOpen: true })
  }

  hideAddNodeBox () {
    this.setState({ addNodeOpen: false })
  }

  showEditNodeBox (e) {
    this.setState({ editNodeOpen: true });
    this.setState({nodeToEdit: this.props.currentWorkflow.nodes.find(obj => {return obj.id == e.currentTarget.id})});
  }

  hideEditNodeBox () {
    this.setState({ editNodeOpen: false })
  }

  render () {
    return (
      <main className='graph'>
        <CyContainer currentWorkflow={this.props.currentWorkflow} loadUserWorkflows={this.props.loadUserWorkflows} showEditNodeBox={this.showEditNodeBox} />
        <button className='add' onClick={this.showAddNodeBox}>Add a Task</button>
        <CustomAnimation open={this.state.addNodeOpen} onClose={this.hideAddNodeBox} little>
          <AddNodeBox currentWorkflow={this.props.currentWorkflow} loadUserWorkflows={this.props.loadUserWorkflows} />
        </CustomAnimation>
        <CustomAnimation open={this.state.editNodeOpen} onClose={this.hideEditNodeBox} little>
          <EditNodeBox currentWorkflow={this.props.currentWorkflow} loadUserWorkflows={this.props.loadUserWorkflows} node={this.state.nodeToEdit || null} hideEditNodeBox={this.hideEditNodeBox} />
        </CustomAnimation>
      </main>
    )};
}
