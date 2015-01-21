import _ from 'lodash'

import component from 'lib/Component'
import Selectable from 'Selectable'

import FormStore from 'stores/FormStore'
import FormActions from 'actions/FormActions'

export default component({
  tagName: 'form-page',

  questions: [
    'Hello {name}',
    'Your favorite color is {color}',
    'Your {mother} is a hampster and your {father} smells of {farts}',
    'The name of your childhood crush was {name}'
  ],

  afterMount() {
    this.listenTo(FormStore, _.bindKey(this, 'setState'))
  },

  setQuestion(str) {
    FormActions.setQuestion(str);
  },

  onSubmit(event, props, state) {
    event.preventDefault()
    FormActions.submit(state, this.refs('answer').map(function (el) {
      return el.value || el.placeholder
    }));
  },

  render(props, state) {
    var {form, input, button, div, label} = this.dom
    var {questions, onSubmit, setQuestion} = this
    var {pads, vars, question} = state

    var fields = []
    fields.push(component.el(Selectable, {
      options: questions,
      selected: question,
      onChange: setQuestion
    }))

    if (_.size(vars)) {
      vars.forEach(function (name) {
        fields.push(div(
          label(name + ': '),
          input({
            ref: 'answer',
            placeholder: name
          })
        ))
      })
    }

    fields.push(div(button({
      type: 'submit',
      disabled: !pads
    }, 'submit')));

    return form({ onSubmit }, fields);
  }
})
