// delete node axios call
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
    this.props.loadUserWorkflows(false);
  }).catch(error => {
    console.log(error)
})
// edit button (jquery plz change)

editBtn.click((e) => {
  this.props.showEditNodeBox(e);
});

// delete edge axios

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
