import Component from 'lib/Component'
import {Router} from 'lib/routing'

// pages that will render in the mainView
import HomePage from 'HomePage'
import UserPage from 'UserPage'
import NotFoundPage from 'NotFoundPage'

class App extends Component {
  createdCallback() {
    super()

    this.router = new Router(this)
    this.router.on('/', HomePage)
    this.router.on('/user/:id', UserPage)
    this.router.otherwise(NotFoundPage)
  }

  handleRequest(req) {
    while(this.hasChildNodes()) {
      this.removeChild(this.childNodes[0])
    }

    this.scene = req.View.render(this, { req })
  }

  attachedCallback() {
    super()
    this.router.start()
  }
}

export default Component.register('app-container', App)
