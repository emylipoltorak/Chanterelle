import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NextList extends Component {
  render() {
    return (
      <div id='next-list'>
        Next List
        <Link to='/'><button>Next List</button></Link>
        <Link to='/graph'><button>Graph</button></Link>
        <Link to='/login'><button>Log In</button></Link>
      </div>
    );
  }
}
