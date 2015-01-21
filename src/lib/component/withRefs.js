import _ from 'lodash'

export default withRefs

function withRefs(Component) {
  Component.addHandler('afterMount', function (el) {
    this._el = el
  }, true)

  function factory(multi) {
    var method = multi ? 'querySelectorAll' : 'querySelector'

    return function (name, prop) {
      var el = this._el[method](`[ref="${name}"]`)

      if (!prop) return multi ? _.toArray(el) : el
      else return _[multi ? 'pluck' : 'result'](el, prop)
    }
  }

  Component.prototype.ref = factory(false)
  Component.prototype.refs = factory(true)
}
