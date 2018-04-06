import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AddNodeBox, EditNodeBox }from '../components/modals';
import CustomAnimation from 'react-responsive-modal';

const csrfToken = Cookies.get('csrftoken');


export default class NextList extends Component {
  constructor(props) {
    super(props);
    this.state = {next: [], addNodeOpen: false, editNodeOpen: false, nodeToEdit: {}}

    this.getNext = this.getNext.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.showAddNodeBox = this.showAddNodeBox.bind(this);
    this.hideAddNodeBox = this.hideAddNodeBox.bind(this);
    this.showEditNodeBox = this.showEditNodeBox.bind(this);
    this.hideEditNodeBox = this.hideEditNodeBox.bind(this);
  }

  componentWillMount() {
    this.getNext(this.props.currentWorkflow);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentWorkflow !== nextProps.currentWorkflow) {
      this.getNext(nextProps.currentWorkflow);
    }
  }

  getNext(workflow) {
    const next = []
    workflow.nodes.forEach(node => {
      if (node.in_degree === 1) {
        next.push(node)
      };
    })
    this.setState({next: next})
  }

  deleteTask(e) {
    // This method should run an animation showing the list item being crossed out,
    // then fading out of existence. It should cache a copy of the node.
    // If there is something already in the cache, it should delete that item.
    // Then, it should delete the node from the database and run LoadGraph.
    // LoadGraph should trigger a re-render of the list, with any new items in place.
    const node = e.currentTarget.id;
    axios({
      method: 'post',
      url: '/delete-node/',
      data: {node: node, graph: this.props.currentWorkflow.id},
      headers: {
        "X-CSRFTOKEN": csrfToken,
        "Authorization": 'Token ' + localStorage.token
      }
    })
      .then(response => {
        this.props.loadUserWorkflows(false);
      }).catch(error => {
        console.log(error)
    })
  }

  showAddNodeBox () {
    this.setState({ addNodeOpen: true })
  }

  hideAddNodeBox () {
    this.setState({ addNodeOpen: false })
  }

  showEditNodeBox (e) {
    this.setState({
      editNodeOpen: true,
      nodeToEdit: this.props.currentWorkflow.nodes.find(obj => {return obj.id == e.currentTarget.id})
    });
  }

  hideEditNodeBox () {
    this.setState({ editNodeOpen: false })
  }

  render() {
    return (
      <main className='next'>
        <ul>
          {this.state.next.map(node => {
              return <li key={node.id}>
                <span id={node.id} onClick={this.deleteTask}><i className="fas fa-genderless"></i></span> {node.name} <span id={node.id} onClick={this.showEditNodeBox}><i className="far fa-edit"></i></span>
              </li>;
            })}
        </ul>
        <button className='add' onClick={this.showAddNodeBox}>Add a Task</button>
        <CustomAnimation open={this.state.addNodeOpen} onClose={this.hideAddNodeBox} little>
          <AddNodeBox
            currentWorkflow={this.props.currentWorkflow}
            loadUserWorkflows={this.props.loadUserWorkflows}
           />
        </CustomAnimation>
        <CustomAnimation open={this.state.editNodeOpen} onClose={this.hideEditNodeBox} little>
          <EditNodeBox
            currentWorkflow={this.props.currentWorkflow}
            loadUserWorkflows={this.props.loadUserWorkflows}
            node={this.state.nodeToEdit}
            hideEditNodeBox={this.hideEditNodeBox}
          />
        </CustomAnimation>
      </main>
    );
  }
}
