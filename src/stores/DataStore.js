import Reflux from 'reflux';
import DataActions from 'actions/DataActions'

export default Reflux.createStore({
  listenables : DataActions,

  onLoad(userInput) {
    setTimeout(() => {
      this.trigger('Hello' + userInput);
    }, 5000);
  }
});
