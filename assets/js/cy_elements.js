import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

cytoscape.use( dagre );

const cyConfig = {
  elements: [],
  style: [
    {
      selector: 'node',
      style: {
        'label': 'data(name)',
        'text-valign':'center',
        'text-halign': 'center',
        'shape': 'cutrectangle',
        'background-color': 'white',
        'border-width': '3px',
        'border-style': 'double',
        'border-color': 'black',
        'width': '80px',
      }
    }, {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle'
      }
    }
  ]
};

export default class CyContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {cy: {}}

  }

  componentDidMount () {
    cyConfig.container = this.refs.cy;
    this.setState({cy: cytoscape(cyConfig)})
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.graph !== nextProps.graph) {
      nextProps.graph.nodes.forEach(node => {
        this.state.cy.add({
          data: {
            id: node.id,
            name: node.name
          }
        })
      });

      nextProps.graph.edges.forEach(edge => {
        this.state.cy.add({
          data: {
            id: edge.id,
            source: edge.parent.id,
            target: edge.child.id
          }
        })
      });

      this.state.cy.layout({
        name: 'dagre'
      }).run();
    }
  }

  render () {
    return <div ref='cy' id='cy'/>
  }
}
