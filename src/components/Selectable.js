import component from 'lib/Component'

export default component({
  tagName: 'selectable',

  onChange(event, props) {
    props.onChange(this.ref('select', 'value'))
  },

  render(props) {
    var {select, option} = this.dom
    var {options, selected} = props

    options = options.map(function (val) {
      return option({ selected: selected === val }, val)
    })

    if (!selected) {
      options.unshift(option({ selected: true }, ''))
    }

    return select({
      ref: 'select',
      onChange: this.onChange
    }, options)
  }
})
