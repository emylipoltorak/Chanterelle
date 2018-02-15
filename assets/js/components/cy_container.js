import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import cyqtip from 'cytoscape-qtip';
import axios from 'axios';
const $ = require('jquery');
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');

cyqtip( cytoscape );
cytoscape.use( dagre );

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
        'font-size': '20',
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
    this.state = {cy: {}};
    this.renderGraph = this.renderGraph.bind(this);
  };

  componentDidMount () {
    cyConfig.container = this.refs.cy;
    this.setState({cy: cytoscape(cyConfig)});
  };

  componentDidUpdate(prevProps, prevState) {
    this.renderGraph(this.props.graph);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.graph !== nextProps.graph) {
      this.renderGraph(nextProps.graph);
    }
  };

  renderGraph(graph) {
    this.state.cy.remove('*');
    graph.nodes.forEach(node => {
      this.state.cy.add({
        data: {
          id: node.id,
          name: node.name,
          inDegree: node.in_degree,
          deepest: graph.nodes.length
        }
      })
    });

    graph.edges.forEach(edge => {
      this.state.cy.add({
        data: {
          id: edge.id,
          source: edge.parent.id,
          target: edge.child.id
        }
      })
    });

    this.state.cy.elements('[name="root"]').remove();
    this.state.cy.layout({
      name: 'dagre',
      ranker: 'longest-path',
      padding: 15
    }).run();

    this.state.cy.nodes().forEach(ele => {
        ele.qtip({
          content: () => {
            const delBtn = $('<button class="delete-button"><i class="fas fa-trash"></i></button>');
            const editBtn = $('<button class="edit-button"><i class="far fa-edit"></i></button>');
            delBtn.click(() => {
              axios({
                method: 'post',
                url: 'http://localhost:8000/delete-node/',
                data: {node: ele.data('id'), graph: graph.id},
                headers: {"X-CSRFToken": csrfToken}
              })
                .then(response => {
                  console.log(response.config.data);
                  this.props.LoadGraph()
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

      this.state.cy.edges().forEach(ele => {
        ele.qtip({
          content: () => {
            const btn = $('<button class="delete-button"><i class="fas fa-trash"></i></button>');
            btn.click(() => {
              axios({
                method: 'post',
                url: 'http://localhost:8000/delete-edge/',
                data: {parent: ele.data('source'), child: ele.data('target'), graph: graph.id},
                headers: {"X-CSRFToken": csrfToken}
              })
                .then(response => {
                  console.log(response.config.data);
                  graph.LoadGraph();
                }).catch(error => {
                  console.log(error)
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
  }

  render () {
    if (this.state.cy) {
      this.renderGraph;
    }
    return <div ref='cy' id='cy'/>
  }
}
