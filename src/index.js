import {Router} from 'lib/routing'
import component from 'lib/Component'
import domready from 'domready'

// general imports...
import 'styles/style.less'

// pages
import FormPage from 'FormPage'
import HomePage from 'HomePage'
import UserPage from 'UserPage'
import LoginPage from 'LoginPage'
import ProfilePage from 'ProfilePage'
import NotFoundPage from 'NotFoundPage'

var App = component({
  tagName: 'app-container',

  constructor() {
    this.router = new Router(this)
    this.router.on('/', HomePage)
    this.router.on('/form', FormPage)
    this.router.on('/login', LoginPage)
    this.router.on('/profile', ProfilePage)
    this.router.on('/user/:id', UserPage)
    this.router.otherwise(NotFoundPage)
  },

  afterMount() {
    this.router.start()
  },

  render(props, state) {
    var {req} = state

    if (!req) return;
    return component.el(req.View, { req });
  }
});

// lets get started!
domready(() => {
  App.render(document.body);
});
