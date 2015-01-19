import Component from 'Component'

class UserPage extends Component {
  render() {
    var {id} = this.route.params;
    var {h1} = this.dom;

    return h1('User ' + id);
  }
}

export default Component.register('user-page', UserPage);

