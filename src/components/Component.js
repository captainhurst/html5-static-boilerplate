import _ from 'lodash'
import {h, patch, diff, createElement} from 'virtual-dom'
import isVnode from 'virtual-dom/vnode/is-vnode'
import elements from 'lib/virtual-dom-elements'

class Component extends HTMLElement {
  static register(tagName, SubComponent) {
    if (SubComponent === Component) {
      throw new TypeError(`Component is an abtract class and shouldn't be instanciated directly`);
    }

    var prototype = SubComponent.prototype;
    if (!(prototype instanceof Component)) {
      throw new TypeError(`SubComponent should inherit from Component`);
    }

    prototype.componentConstructor = SubComponent;
    return document.registerElement(tagName, {
      prototype: prototype
    });
  }

  constructor() {
    this.dom = elements
  }

  /************
   * DOM HELPERS
   ************/


  empty() {
    while (this.hasChildNodes()) {
      this.removeChild(this.childNodes[0]);
    }
  }

  append(node) {
    this.appendChild(node);
  }


  /************
   * CALLBACKS
   ************/


  createdCallback() {
    this.componentConstructor.call(this);
  }

  attachedCallback() {
    if (this.render) {
      this.setContent(this.render());
    }
  }

  detachedCallback() {

  }

  attributeChangedCallback(/* attrName, oldVal, newVal */) {

  }


  /************
   * RENDERING
   ************/


  setContent(content) {
    if (!_.isArray(content)) content = [content];

    var curType = this._contentType;
    var type = this._contentType = this._whatContentType(content);

    if (!type) {
      throw new TypeError(`invalid node ${content}`);
    }

    if (type !== curType || type === 'dom') {
      this.empty();
    }

    if (type === 'html') {
      this.innerHTML = content.join('');
      return;
    }

    if (type === 'dom') {
      content.forEach((type) => {
        this.appendChild(type);
      });
      return;
    }

    var tree = h(this.tagName, content);
    if (!this._vtree) {
      this._vtree = tree;
      this._vtree.children.forEach((child) => {
        this.appendChild(createElement(child));
      });
      return;
    }

    var patches = diff(this._vtree, tree);
    patch(this, patches);
    this._vtree = tree;
  }

  _whatContentType(content) {
    if (content.some(isVnode)) {
      return 'vnode';
    }

    if (content.every(_.isString)) {
      return 'html';
    }

    return 'dom';
  }
}

export default Component
