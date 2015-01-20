import _ from 'lodash'
import component from 'lib/component'
import DataStore from 'stores/DataStore'
import DataActions from 'actions/DataActions'

export default component({
  tagName: 'home-page',

  constructor() {
    this.messageLoader = _.memoize((msg) => {
      return _.bind(this.loadMessage, this, msg)
    })
  },

  initialState() {
    return {
      message: null,
      loading: false,
      defaultMessage: 'Click to load data'
    }
  },

  afterMount() {
    this.listenTo(DataStore, this.setMessage)
  },

  setMessage(message) {
    this.setState({
      message: message,
      loading: false
    })
  },

  loadMessage(msg) {
    this.setState({
      loading: true
    })

    DataActions.load(msg)
  },

  render(props, state) {
    var {p, button} = this.dom

    if (state.loading) {
      return p('Loading...')
    }

    var msg = state.message || state.defaultMessage
    var onClick = this.messageLoader('World')
    return button({ onClick }, msg)
  }
})
