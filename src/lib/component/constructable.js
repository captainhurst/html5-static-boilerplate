import _ from 'lodash'

export default constructable

function constructable(constructor) {
  if (!constructor) return _.noop;
  return function (Component) {
    var initialState = Component.prototype.initialState;
    Component.prototype.initialState = function () {
      constructor.apply(this, arguments);
      return initialState.apply(this, arguments);
    };
  };
}
