import _ from 'lodash'
import elements from 'lib/elements'
import deku from 'deku'
import {ListenerMethods} from 'reflux'

var DekuComponent = deku.component();

class Component extends DekuComponent {
  static register(tagName, SubComponent) {
    // ensure Component stays an abstract
    if (SubComponent === Component) {
      throw new TypeError(`Component is an abstract class and shouldn't be instantiated directly`);
    }

    // ensure that SubComponent is really a SubComponent
    var proto = SubComponent.prototype;
    if (!(proto instanceof Component)) {
      throw new TypeError(`SubComponent should inherit from Component`);
    }

    // override the render method for content wrapping
    proto.tagName = tagName;
    proto.renderContents = proto.render;
    proto.render = Component.prototype.render;

    // setup the prototype for our custom element
    var el = Object.create(HTMLElement.prototype);
    for (let p = proto;;) {
      _.defaults(el, p);
      if (p.constructor === DekuComponent) break;
      p = Object.getPrototypeOf(p);
    }

    // create the custom element
    var Element = document.registerElement(tagName, { prototype: el });
    SubComponent.Element = proto.Element = Element;
    return SubComponent
  }

  constructor() {
    this.dom = elements
  }

  render(props, state) {
    return deku.dom(this.tagName, {}, this.renderContents(props, state));
  }

/************
 * DOM CALLBACKS
 ************/
  createdCallback() {}
  attachedCallback() {}
  detachedCallback() {}
  attributeChangedCallback(/* attrName, oldVal, newVal */) {}
}

_.assign(Component.prototype, ListenerMethods);

export default Component
