import _ from 'lodash'
import elements from 'lib/elements'
import deku from 'deku'
import {ListenerMethods} from 'reflux'

var DekuComponent = deku.component();

class Component extends DekuComponent {
  static register(tagName, SubComponent) {
    if (SubComponent === Component) {
      throw new TypeError(`Component is an abstract class and shouldn't be instantiated directly`);
    }

    if (!(SubComponent.prototype instanceof Component)) {
      throw new TypeError(`SubComponent should inherit from Component`);
    }

    var elementProto = Object.create(HTMLElement.prototype);
    for (let p = SubComponent.prototype;;) {
      _.defaults(elementProto, p);
      if (p.constructor === DekuComponent) break;
      p = Object.getPrototypeOf(p);
    }

    var Element = document.registerElement(tagName, {
      prototype: elementProto
    });

    SubComponent.Element = SubComponent.prototype.Element = Element;
    return SubComponent
  }

  constructor() {
    this.dom = elements
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
