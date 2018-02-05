import React, { Component } from 'react';
import { render } from 'react-dom';
import CyContainer from './cy_elements';
import AddBox from './add_box';

class App extends Component {
  render () {
    return (
        <div>
          <CyContainer />
          <AddBox />
        </div>
      )
  }
}

render(<App />, document.getElementById('root'));