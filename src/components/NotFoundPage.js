import Component from 'lib/Component'

class NotFoundPage extends Component {
  render() {
    var {h1} = this.dom
    return h1('Not Found')
  }
}

export default Component.register('not-found-page', NotFoundPage)
