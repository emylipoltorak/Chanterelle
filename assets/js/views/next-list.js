import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');
const authToken = 'Token '+localStorage.token;


export default class NextList extends Component {
  constructor(props) {
    super(props);
    this.state = {next: []}

    this.getNext = this.getNext.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentWillMount() {
    this.getNext(this.props.graph);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.graph !== nextProps.graph) {
      this.getNext(nextProps.graph);
    }
  }

  getNext(graph) {
    const next = []
    graph.nodes.forEach(node => {
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
    console.log(node);
    axios({
      method: 'post',
      url: '/delete-node/',
      data: {node: node, graph: this.props.graph.id},
      headers: {
        "X-CSRFTOKEN": csrfToken,
        "Authorization": authToken
      }
    })
      .then(response => {
        console.log(response);
        this.props.LoadGraph()
      }).catch(error => {
        console.log(error)
    })
  }

  render() {
    return (
        <ul>
          {this.state.next.map(node => {
              return <li key={node.id}>
                <i className="fas fa-genderless"></i> {node.name} <span id={node.id} onClick={this.deleteTask}><i className="far fa-times-circle"></i></span>
              </li>;
            })}
        </ul>
    );
  }
}
