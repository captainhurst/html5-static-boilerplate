import page from 'page';

class AppView extends HTMLElement {

  /**
   * Schedule a route handler
   *
   * @param  {string} path - the path to attach to
   * @param  {function|Component...} - any number of middleware elements to process for this route
   * @return {undefined}
   */
  on(path, ...wares) {
    var each;
    wares.forEach(each = (middleware) => {
      if (Array.isArray(middleware))
        return middleware.forEach(each);

      if (middleware.prototype instanceof HTMLElement)
        middleware = this._transition(middleware);

      page(path, middleware);
    });
  }

  // once we are in the DOM, setup the handler
  attachedCallback() {
    page({
      hashbang: true
    });
  }

  /**
   * Transition to a new View/Component/Element
   *
   * @param  {obj} route - the route/page context
   * @param  {HTMLElement} Component - the Component to transition to
   * @return {undefined}
   */
  transitionTo(route, Component) {
    while (this.hasChildNodes()) {
      this.removeChild(this.childNodes[0]);
    }

    var comp = new Component();
    comp.route = route;
    this.appendChild(comp);
  }

  // Helper for creating transitions to Elements
  _transition(Component) {
    return (route) => {
      this.transitionTo(route, Component);
    }
  }
}

export default document.registerElement('app-view', {
  prototype: AppView.prototype
});
