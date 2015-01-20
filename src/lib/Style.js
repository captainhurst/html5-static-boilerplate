import _ from 'lodash'

const CAPS = /([A-Z]+)/g

class Style {
  constructor(rules) {
    _.transform(rules, function (style, val, name) {
      if (typeof val === 'number') {
        val = val + 'px'
      }

      style[name.replace(CAPS, '-$1').toLowerCase()] = val
    }, this);
  }
}

export default Style
