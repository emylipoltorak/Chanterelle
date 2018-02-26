import React, { Component } from 'react';
import DropdownMenu, { NestedDropdownMenu } from 'react-dd-menu';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

export default class Navbar extends Component {
  constructor (props) {
    super (props);
    this.state = { isMenuOpen: false };

    this.handleWorkflowSelect = this.handleWorkflowSelect.bind(this);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.click = this.click.bind(this);
  }

  toggle () {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  close () {
    this.setState({ isMenuOpen:false });
  }

  click (e) {
    console.log(e.target)
  }

  handleWorkflowSelect(e) {
    this.props.changeWorkflow(e.target.id);
  }

render() {
  const menuOptions = {
    isOpen: this.state.isMenuOpen,
    close: this.close,
    toggle: <span onClick={this.toggle}><i className="fas fa-code-branch fa-rotate-180"></i></span>,
    align: 'left',
    size: 'sm',
  };

  const nestedProps = {
    toggle: <button id='workflows'>Workflows</button>,
    animate: true,
    nested: 'reverse',
  }

    return (
      <DropdownMenu {...menuOptions}>
        <NestedDropdownMenu {...nestedProps}>
          {
            this.props.workflows[0] ?
            <ul>
              {this.props.workflows.map(workflow => {
                return <li key={workflow.id}><button id={workflow.id} onClick={this.handleWorkflowSelect}>{workflow.name}</button></li>
              }
            )}
            <li><button>+ New Workflow</button></li>
            </ul> : null
          }
        </NestedDropdownMenu>
        <li role='separator' className='separator' />
        <li><Link to='/'>Next</Link></li>
        <li><Link to='/graph'>Graph</Link></li>
      </DropdownMenu>
    );
  }
}
