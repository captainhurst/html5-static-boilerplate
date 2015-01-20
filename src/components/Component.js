import _ from 'lodash'
import elements from 'lib/elements'
import deku from 'deku'

var DekuComponent = deku.component();

class Component extends DekuComponent {
  static register(tagName, SubComponent) {
    if (SubComponent === Component) {
      throw new TypeError(`Component is an abstract class and shouldn't be instantiated directly`);
    }

    var prototype = SubComponent.prototype;
    if (!(prototype instanceof Component)) {
      throw new TypeError(`SubComponent should inherit from Component`);
    }

    SubComponent.Element =
    prototype.Element =
    document.registerElement(tagName, {
      prototype: prototype
    });

    return SubComponent
  }

  constructor() {
    this.dom = elements
  }

/************
 * DOM CALLBACKS
 ************/
  createdCallback() {
    this.componentConstructor.call(this)
    _.bindAll(this)
  }

  attachedCallback() {

  }

  detachedCallback() {

  }

  attributeChangedCallback(/* attrName, oldVal, newVal */) {

  }
}

export default Component
