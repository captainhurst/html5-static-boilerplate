import _ from 'lodash'
import deku from 'deku'

import multipleHandlers from 'lib/Component/multipleHandlers'
import constructable from 'lib/Component/constructable'
import asCustomElement from 'lib/Component/asCustomElement'
import withRefs from 'lib/Component/withRefs'
import flux from 'lib/Component/flux'
import dom from 'lib/Component/dom'

export default component

function component(spec) {
  var DekuComponent = deku.component(_.omit(spec, 'constructor'))

  /**
   * custom plugins
   */

  // allow registering multiple handlers for initialState, beforeMount, etc.
  DekuComponent.use(multipleHandlers)

  // call the constructor before initialState
  DekuComponent.use(constructable(spec.constructor))

  // create a customElement for each component with a tagName
  DekuComponent.use(asCustomElement)

  // provide access to sub-elements
  DekuComponent.use(withRefs)

  // mixin flux
  DekuComponent.use(flux)

  // helpers for dom elements
  DekuComponent.use(dom)

  return DekuComponent
}

component.el = deku.dom
component.dom = dom

var use = deku.component().use;
component.is = function (any) {
  return (any && any.use === use);
}
