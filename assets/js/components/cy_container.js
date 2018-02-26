import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import cyqtip from 'cytoscape-qtip';
import edgehandles from 'cytoscape-edgehandles';
import axios from 'axios';
const $ = require('jquery');
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');


cyqtip( cytoscape );
cytoscape.use( dagre );
cytoscape.use( edgehandles );

let cy = {};

const cyConfig = {
  elements: [],
  style: [
    {
      selector: 'node',
      style: {
        'label': 'data(name)',
        'color': '#2C2029',
        'text-valign':'center',
        'text-halign': 'center',
        'font-size': '25px',
        'font-family': 'Nixie One, cursive',
        'shape': 'roundrectangle',
        'background-color': 'mapData(inDegree, 1, 8, rgba(163, 154, 164), rgba(240, 146, 60))',
        'background-opacity': 'mapData(inDegree, 1, 8, .3, 1)',
        'border-color': 'transparent',
        'width': 'label',
        'height': 'label',
        'padding': '7px'
      }
    }, {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'target-arrow-fill': 'hollow',
        'target-arrow-color': '#2C2029',
        'width': '1px',
        'color': '#2C2029',
      }
    }
  ]
};

export default class CyContainer extends Component {
  constructor (props) {
    super(props);
    this.renderGraph = this.renderGraph.bind(this);
  };

  componentDidMount () {
    cyConfig.container = this.refs.cy;
    cy = cytoscape(cyConfig);
    this.renderGraph(this.props.currentWorkflow);
  };

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps ran in cyContainer');
    console.log(nextProps.currentWorkflow);
    this.renderGraph(nextProps.currentWorkflow);
  };

  componentWillUnmount () {
    cy.destroy();
  }

  renderGraph(graph) {
    console.log('renderGraph ran');
    cy.destroy();
    cy = cytoscape(cyConfig);
    graph.nodes.forEach(node => {
      cy.add({
        data: {
          id: node.id,
          name: node.name,
          inDegree: node.in_degree,
          outDegree: node.out_degree,
          deepest: graph.nodes.length,
          debugLabel: node.name + ': ' + node.in_degree
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

    cy.elements('[name="root"]').remove();

    let island = cy.nodes().roots().leaves();
    let nonIsland = cy.nodes(!island);

    cy.layout({
      name: 'dagre',
      ranker: 'longest-path',
      padding: 15
    }).run();

    // island.layout({
    //   name: 'grid',
    // }).run();

    cy.nodes().forEach(ele => {
        ele.qtip({
          content: () => {
            const delBtn = $('<button class="delete-button"><i class="fas fa-trash"></i></button>');
            const editBtn = $('<button class="edit-button"><i class="far fa-edit"></i></button>');
            delBtn.click(() => {
              axios({
                method: 'post',
                url: '/delete-node/',
                data: {node: ele.data('id'), graph: graph.id},
                headers: {
                  "X-CSRFTOKEN": csrfToken,
                  "Authorization": 'Token ' + localStorage.token
                }
              })
                .then(response => {
                  this.props.loadUserWorkflows(false)
                }).catch(error => {
                  console.log(error)
              })
            });
            editBtn.click(() => {
              console.log('not implemented yet.')
            });
            return [delBtn, editBtn];
          },
          title: ele.name,
          style: {
            classes: 'qtip-tipsy'
          },
          position: {
            my: 'bottom center',
            at: 'top center',
            target: ele
          }
        });
      });

      cy.edges().forEach(ele => {
        ele.qtip({
          content: () => {
            const btn = $('<button class="delete-button"><i class="fas fa-trash"></i></button>');
            btn.click(() => {
              axios({
                method: 'post',
                url: '/delete-edge/',
                data: {parent: ele.data('source'), child: ele.data('target'), graph: graph.id},
                headers: {
                  "X-CSRFTOKEN": csrfToken,
                  "Authorization": 'Token ' + localStorage.token
                }
              })
                .then(response => {
                  this.props.loadUserWorkflows(false);
                }).catch(error => {
                  console.log(error);
              })
            });
            return btn;
          },
          style: {
            classes: 'qtip-tipsy'
          },
          position: {
            my: 'bottom center',
            at: 'right center',
            target: ele
          }
        });
      });

      let eh = cy.edgehandles();
      eh.enableDrawMode();

      cy.on('ehcomplete', (e, sourceNode, targetNode, addedEles) => {
        axios({
          method: 'post',
          url: '/add-edge/',
          data:{parent: sourceNode.data('id'), child: targetNode.data('id'), graph: this.props.currentWorkflow.id},
          headers: {
            "X-CSRFTOKEN": csrfToken,
            "Authorization": 'Token ' + localStorage.token
          }
        })
          .then(response => {
            console.log('Edge should be created now. Calling loadUserWorkflows.')
            this.props.loadUserWorkflows(false);
          }).catch(error => {
            console.log(error)
        })
      });
  }

  render () {
    return <div ref='cy' id='cy'/>
  }
}
