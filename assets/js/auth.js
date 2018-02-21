import axios from 'axios';
import Cookies from 'js-cookie'

const csrfToken = Cookies.get('csrftoken');

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;

module.exports = {
  login: function(username, pass, cb) {
    if (localStorage.token) {
      if (cb) cb(true)
      return
    }
    this.getToken(username, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
      } else {
        if (cb) cb(false)
      }
    })
  },

  logout: function() {
    delete localStorage.token
  },

  loggedIn: function() {
    return !!localStorage.token
  },

  getToken: function(username, pass, cb) {
    axios({
      method: 'POST',
      url: '/obtain-auth-token/',
      data: {
        username: username,
        password: pass,
      },
      headers: {
        'Access-Control-Allow-Credentials': true,
      }
    })
      .then(res => {
        cb({
          authenticated: true,
          token: res.data.token
        })
      }).catch(error => {
        console.log(error);
      })
  }

}
