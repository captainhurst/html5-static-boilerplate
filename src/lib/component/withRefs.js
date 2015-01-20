export default withRefs

function withRefs(Component) {
  Component.addHandler('afterMount', function (el) {
    this._el = el
  }, true)

  Component.prototype.ref = function (ref) {
    return this._el.querySelector(`[ref=${ref}]`);
  }
}
