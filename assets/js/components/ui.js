import React, { Component } from 'react';

export default const Header = () {
  return
  <header>
    <img className='icon' src='https://cms-assets.tutsplus.com/uploads/users/877/posts/28574/image/9-drawing-mushrooms-ink-chanterelle-adding-grass.jpg' alt='Chanterelle Mushroom' />
    <h1>Chanterelle</h1>
    <h2>Graph: {this.state.graph.name}</h2>
  </header>
}

export default const Footer = () => {
  return <footer>Li Poltorak 2018</footer>
}

export default class Navbar extends Component {
  <nav>
    <ul>
      <li><Link to='/'><button>Next List</button></Link></li>
      <li><Link to='/graph'><button>Graph</button></Link></li>
      <li><Link to='/login'><button>Log In</button></Link></li>
    </ul>
  </nav>
}
