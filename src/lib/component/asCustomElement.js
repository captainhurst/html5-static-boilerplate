import deku from 'deku'
import _ from 'lodash'

export default asCustomElement

function register(tagName, proto) {
  if (!tagName){
    throw new TypeError('Missing tag name for component');
  }

  var prototype = Object.create(HTMLElement.prototype, proto.dom)
  document.registerElement(tagName, { prototype })
}

function asCustomElement(Component) {
  var proto = Component.prototype

  register(proto.tagName, proto);

  proto.renderContents = proto.render || _.noop
  proto.render = function render(props, state) {
    return deku.dom(this.tagName, {}, this.renderContents(props, state))
  }
}
