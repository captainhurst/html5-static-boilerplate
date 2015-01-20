import App from 'App'
import domready from 'domready'

// general imports...
import 'styles/style.less'

// lets get started!
domready(() => {
  document.body.appendChild(new App.Element())
});
