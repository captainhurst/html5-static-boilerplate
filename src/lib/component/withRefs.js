import _ from 'lodash'
import {helpers} from 'lib/DomTraversal'

var {getAttribute, getFirstChild, getNextSibling} = helpers
const PARENT_EL_SYM = Symbol('el')

export default withRefs

function withRefs(Component) {
  Component.addHandler('afterMount', function (el) {
    // stash a reference to the element
    this[PARENT_EL_SYM] = el
  }, true)

  function search(start, ref, all, entityId) {
    var el = start

    if (entityId == null) {
      entityId = start.__entity__
    }

    if (all && !_.isArray(all)) {
      all = []
    }

    do {
      // bad tree or out of bounds
      if (!el || el.__entity__ !== entityId) {
        continue
      }

      // match our search?
      if (getAttribute(el, 'ref') === ref) {
        // found one, is that enough?
        if (!all) return el

        // collect and continue to possible children
        all.push(el)
      }

      // try for the first child
      let child = getFirstChild(el)

      // search and collect all found
      if (child && all) {
        search(child, ref, all, entityId)
        continue
      }

      // search and respond if any found
      if (child && !all) {
        let match = search(child, ref, false, entityId)
        if (match) return match
        continue
      }
    } while ((el = getNextSibling(el)))

    if (all) return all
  }

  function factory(all) {
    return function (ref, prop) {
      var parent = this[PARENT_EL_SYM]
      var els = search(getFirstChild(parent), ref, all)
      if (!prop) return all ? _.toArray(els) : els
      else return _[all ? 'pluck' : 'result'](els, prop)
    }
  }

  Component.prototype.ref = factory(false)
  Component.prototype.refs = factory(true)
}
