import 'styles/style.less';
import domready from 'domready';

// main view holder
import AppView from 'el/AppView';

// pages that will render in the app view
import HomePage from 'el/HomePage';
import UserPage from 'el/UserPage';
import NotFoundPage from 'el/NotFoundPage';

// create the app view
var view = new AppView();

// tell the view about our routes
view.on('/', HomePage);
view.on('/user/:id', UserPage);

// 404 catch-all
view.on('*', NotFoundPage);

// attach the view to the DOM
domready(function () {
  document.body.appendChild(view);
});
