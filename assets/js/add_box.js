import React, { Component } from 'react';

export default class AddBox extends Component {
  render () {
    return (
      <div className='addBox'>
        <input id='addNode' />
        <input id='addSource' />
        <input id='addTarget' />
        <button>Submit</button>
      </div>
    )
  }
}


