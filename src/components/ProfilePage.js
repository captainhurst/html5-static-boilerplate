// import _ from 'lodash'
import component from 'lib/Component'
import auth from 'lib/github-auth'

export default component({
  tagName: 'user-profile',

  initialState() {
    return {
      loggedIn: false
    }
  },

  beforeMount() {
  },

  render() {
    var { p } = this.dom

    debugger
    auth.getToken(function(token) {
      console.log(token)
      debugger
    })

    return p('profile')
  }
})