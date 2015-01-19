import Component from 'Component'

class NotFoundPage extends Component {
  render() {
    return '<h1>Not Found</h1>';
  }
}

export default Component.register('not-found-page', NotFoundPage);
