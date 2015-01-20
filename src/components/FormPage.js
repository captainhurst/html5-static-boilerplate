import component from 'lib/Component'

export default component({
  tagName: 'form-page',

  initialState() {
    return {
      message: 'enter message here'
    }
  },

  onSubmit(event, props, state) {
    window.alert(state.message)
    event.preventDefault()
  },

  onChange(event) {
    this.setState({ message: event.target.value })
  },

  render(props, state) {
    var {form, input, button} = this.dom
    var {onSubmit, onChange} = this

    return form({ onSubmit },
      input({ placeholder: 'enter a message', type: 'text' }),
      button({ type: 'submit' }, 'Alert')
    );
  }
})
