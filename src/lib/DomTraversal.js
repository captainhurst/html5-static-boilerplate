import _ from 'lodash'

function getTraverseFunctions() {
  var test = document.createElement('div')
  if (_.has(test, 'firstElementChild') && _.has(test, 'nextElementSibling')) {
    return {
      getAttribute(el, attr) { return el.getAttribute(attr); },
      getFirstChild(el) { return el.firstElementChild; },
      getNextSibling(el) { return el.nextElementSibling; }
    };
  }

  if (_.has(test, 'firstChild') && _.has(test, 'nextSibling')) {
    let find = function (el) {
      while (el && el.nodeType !== Node.ELEMENT_NODE) el = el.nextSibling;
      return el;
    }

    return {
      getAttribute(el, attr) { return el.getAttribute(attr); },
      getFirstChild(el) { return find(el.firstChild); },
      getNextSibling(el) { return find(el); }
    }
  }

  throw new Error('unable to find sufficient methods for DOM Traversal');
}

var cache;

export default {
  get helpers() {
    return cache || (cache = getTraverseFunctions());
  }
}
