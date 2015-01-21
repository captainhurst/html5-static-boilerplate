import Reflux from 'reflux';
import FormActions from 'actions/FormActions'

export default Reflux.createStore({
  listenables: FormActions,

  /*
  forms look like:

  {
    question:
    vars: ['name']
  }

  */

  onSetQuestion(question) {
    var vars = [];
    var pads = question
    .split(/{|}/g)
    .reduce(function (pads, chunk, i, parts) {
      (i % 2 === 0 ? pads : vars).push(chunk);
      if (i + 1 === parts.length) pads.push(chunk);
      return pads;
    }, []);

    this.trigger({ pads, vars })
  },

  onSubmit(form, answers) {
    var {pads, vars} = form
    if (!vars || !pads) return;

    pads = pads.slice(0)
    answers = answers.slice(0)

    var msg = vars.reduce(function (msg) {
      msg += pads.shift()
      msg += answers.shift()
      return msg;
    }, '');

    // append any remaining pads
    msg += pads.join('');

    window.alert(msg);
  }
});
