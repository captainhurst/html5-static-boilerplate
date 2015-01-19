import 'styles/style.less';
import domready from 'domready';

import View from 'View';
import {Router} from 'lib/routing';

// pages that will render in the mainView
import HomePage from 'HomePage';
import UserPage from 'UserPage';
import NotFoundPage from 'NotFoundPage';

var router = new Router();
var mainView = new View();

// tell the mainView about our routes
router.on('/', mainView.setter(HomePage));
router.on('/user/:id', mainView.setter(UserPage));

// 404 catch-all
router.otherwise(mainView.setter(NotFoundPage));

// attach the mainView to the DOM
domready(function () {
  document.body.appendChild(mainView);
  router.start();
});
