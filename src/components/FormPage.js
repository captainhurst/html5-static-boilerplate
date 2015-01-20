import component from 'lib/Component'

export default component({
  tagName: 'form-page',

  initialState() {
    return {
      message: 'enter message here'
    }
  },

  onSubmit(event) {
    event.preventDefault();
    var message = this.ref('message')
    window.alert(message.value);
  },

  render() {
    var {form, input, button} = this.dom
    var {onSubmit} = this

    return form({ onSubmit },
      input({ ref: 'message', placeholder: 'enter a message', type: 'text' }),
      button({ type: 'submit' }, 'Alert')
    );
  }
})
