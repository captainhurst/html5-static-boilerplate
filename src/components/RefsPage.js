import _ from 'lodash'
import component from 'lib/Component'
import {dom} from 'deku'

var attrs = function (el) {
  return _.map(el.attributes, function (attr) {
    return attr.name + ': ' + attr.value
  }).join(', ');
}

var SubComp = component({
  tagName: 'refs-example-component',
  render(props) {
    return this.dom.p(
      { style: { 'opacity': '0.25'} },
      'sub component',
      props.list('bar', 3)
    );
  }
})

export default component({
  tagName: 'refs-page',
  description: `
    Components can often be made up of several parts. Sometimes
    it is useful to grab a reference to those parts. To accomplish
    there are the following helper methods:

    ---------
    Component#ref(name, [pick])

    Fetch the first element that is labeled ref="name". The second
    arg provides a way to pull values from the ref, strings return that
    property value, arrays pick those keys, and functions are called
    with the value and the functions return value is returned from ref().

    If no elements match the ref name, this method will return undefined.

    ---------
    Component#refs(name, [pluck])

    Exactly like the previous, except that it returns all matching
    refs in DOM order. Its second argument behaves just like pick, but
    over the list of elements, and it always returns an array which might
    be empty.
  `,

  afterMount(el) {
    this.setState({
      refs: {
        "ref('foo')":                     this.ref('foo', attrs),
        "querySelector('[ref=foo]')":     attrs(el.querySelector('[ref=foo]')),

        "ref('bar')":                     this.ref('bar', attrs),
        "querySelector('[ref=bar]')":     attrs(el.querySelector('[ref=bar]')),

        "refs('foo')":                    this.refs('foo', attrs),
        "querySelectorAll('[ref=foo]')":  _.map(el.querySelectorAll('[ref=foo]'), attrs),

        "refs('bar')":                    this.refs('bar', attrs),
        "querySelectorAll('[ref=bar]') reaches into sub-components":  _.map(el.querySelectorAll('[ref=bar]'), attrs)
      }
    });
  },

  render(props, state) {
    var {pre, ul, li} = this.dom
    var refCount = {};

    function list(ref, count, block) {
      refCount[ref] = refCount[ref] || 0
      var items = [];
      while (count-- > 0) {
        let num = ++refCount[ref];
        items.push(
          li({ ref: ref, num: num }, ref + ' #' + num, block ? block() : '')
        );
      }

      return ul(items);
    }

    return [
      pre(this.description),
      pre(JSON.stringify(state.refs, null, '  ') || ''),
      list('foo', 4, () => {
        return list('bar', 3, () => {
          return list('foo', 1, () => {
            return dom(SubComp, { list: list })
          })
        })
      })
    ]
  }
})

