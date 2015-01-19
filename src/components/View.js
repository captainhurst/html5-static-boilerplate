import Component from 'Component'


class ComponentView extends Component {
  // once we are in the DOM, start listening to the hash
  attachedCallback() {
    super()
  }

  setter(Component) {
    return (route) => {
      var el = new Component();
      el.route = route;
      this.setContent(el);
    }
  }
}

export default Component.register('component-view', ComponentView);
