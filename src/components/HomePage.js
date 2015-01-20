import Component from 'Component';

import DataStore from 'stores/DataStore';
import DataActions from 'actions/DataActions';

class HomePage extends Component {

  initialState() {
    return {
      message : null,
      loading : false,
      defaultMessage : 'Click to load data'
    };
  }

  afterMount() {
    this.listenTo(DataStore, this.message);
  }

  updateMessage(message) {
    this.setState({
      message : message,
      loading : false
    });
  }

  loadMessage(msg) {
    console.log('lol');
    this.setState({
      loading : true
    });

    DataActions.load(msg);
  }

  render(props, state) {
    var {button, div} = this.dom;

    if (state.loading) {
      return div('Loading...');
    }
    debugger;
    return button(
      { 'ev-click' : this.loadMessage.bind(null, 'World') },
      state.message || state.defaultMessage
    );
  }
}

export default Component.register('home-page', HomePage);
