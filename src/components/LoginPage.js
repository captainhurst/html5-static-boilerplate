// import _ from 'lodash'
import component from 'lib/Component'
import auth from 'lib/github-auth'

export default component({
  tagName: 'login-form',

  initialState() {
    return {
      loggedIn: false
    }
  },

  // beforeMount() {
  // },

  render() {
    var { p } = this.dom
    auth.ajax({
      url: 'https://github.com/login/oauth/authorize',
      dataType: 'json',
      success: function (data) {
        console.log(data)
        debugger
      },
      error: function (err) {
        console.log(err)
        debugger
      }
    })

    return p('github, coming soon')
  }
})