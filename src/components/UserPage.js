import _ from 'lodash'
import component from 'lib/Component'
import Style from 'lib/Style'

const MONSTER_MASH = 'http://33.media.tumblr.com/44b10800fe9488fca280845bb6287c4f/tumblr_mu0d7lEdIe1s5e5bko1_400.gif';
const PEACE_MAN = 'http://media.tumblr.com/tumblr_m4xm7swFpC1qj3ir1.gif';

export default component({
  tagName: 'user-page',

  constructor() {
    this.toggleImg = _.bind(this.toggleImg, this)
    this.imgStyle = new Style({ cursor: 'pointer' })
    this.headerAttr = {
      style: new Style({
        textAlign: 'left'
      })
    }
  },

  initialState() {
    return {
      url: MONSTER_MASH
    }
  },

  toggleImg(event, props, state) {
    this.setState({
      url: (state.url === MONSTER_MASH) ? PEACE_MAN : MONSTER_MASH
    })
  },

  render(props, state) {
    var {id} = props.req.params
    var {url} = state
    var {headerAttr, toggleImg, imgStyle} = this;
    var {div, h1, p, table, tr, th, td, img, br} = this.dom

    return div({ class: 'user' },
      h1('User ' + id),
      table(
        tr(
          th(headerAttr, 'Name'),
          td('Sigourney')
        ),
        tr(
          th(headerAttr, 'occupation'),
          td('Monster Acrobat')
        )
      ),
      p(
        'Hooray monster twirlz',
        br(),
        img({ src: url, onClick: toggleImg, style: imgStyle })
      )
    )
  }
})

