import Component from 'lib/Component'

class UserPage extends Component {
  render(props) {
    var {id} = props.req.params
    var {div, h1, p, table, tr, th, td} = this.dom

    return div({ class: 'user' },
      h1('User ' + id),
      table(
        tr(
          th('Name'),
          td('Sigourney')
        ),
        tr(
          th('occupation'),
          td('Monster Acrobat')
        )
      ),
      p(`
        spencer wrote this amazing page, if you
        like it then you should download hyrule
      `)
    )
  }
}

export default Component.register('user-page', UserPage)

