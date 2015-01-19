import Component from 'Component';

class HomePage extends Component {
  render() {
    var {h1} = this.dom;
    return h1('Hello Word');
  }
}

export default Component.register('home-page', HomePage);
