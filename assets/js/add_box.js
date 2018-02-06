import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

const csrfToken = Cookies.get('csrftoken');

export default class AddBox extends Component {

  constructor (props) {
    super (props);
    this.AddNode = this.AddNode.bind(this)
  }

  AddNode () {
    const newName = document.getElementById('addNode').value;
    axios({
      method: 'post',
      url: 'http://localhost:8000/add-node/',
      data:{name: newName, graph: this.props.graph.id},
      headers: {"X-CSRFToken": csrfToken}
    })
      .then(response => {
        console.log(response.config.data)
      }).catch(error => {
        console.log(error)
    })
  }


  render () {
    return (
      <div className='addBox'>
        <h2>Task:</h2>
        <input type='text' id='addNode' />
        <button id='addNodeButton' onClick={this.AddNode}>Add</button>
        <h2>Edge:</h2>
        <h3>Source:</h3>
        <input type='text' id='addEdgeSource' />
        <h3>Target:</h3>
        <input type='text' id='addEdgeTarget' />
        <button id='addEdgeButton'>Add</button>
      </div>
    )
  }
}


