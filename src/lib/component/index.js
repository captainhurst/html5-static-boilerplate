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

  // "plugins"
  DekuComponent.use(multipleHandlers)
  DekuComponent.use(constructable(spec.constructor))
  DekuComponent.use(asCustomElement)
  DekuComponent.use(withRefs)
  DekuComponent.use(flux)
  DekuComponent.use(dom)

  return DekuComponent
}

component.el = deku.dom
component.dom = dom

var use = deku.component().use;
component.is = function (any) {
  return (any && any.use === use);
}
