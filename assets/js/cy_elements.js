import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import axios from 'axios';

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
        'border-opacity': '10%',
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
  componentDidMount () {
    cyConfig.container = this.refs.cy;
    let cy = cytoscape(cyConfig);

    axios.get('http://localhost:8000/api')
    .then(function (result) {
      const graph = result.data[0];
      console.log(graph);
      graph.nodes.forEach(node => {
        cy.add({
          data: {
            id: node.id,
            name: node.name,
            width: name.length *10 + 'px'
          }
        })
      });
      graph.edges.forEach(edge => {
        cy.add({
          data: {
            id: edge.id,
            source: edge.parent.id,
            target: edge.child.id
          }
        })
      });
      cy.layout({
        name: 'dagre'
      }).run();
    }).catch(function (error) {
      console.log(error)
  });

  }

  render () {
    return <div ref='cy' id='cy'/>
  }
}
