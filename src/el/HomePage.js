class HomePage extends HTMLElement {
  createdCallback() {
    this.innerHTML = '<h1>HomePage</h1>';
  }

  attachedCallback() {
    // in the dom!
  }

  detachedCallback() {
    // cleanup!
  }

  attributeChangedCallback() {
    // read!
  }
}

export default document.registerElement('home-page', {
  prototype: HomePage.prototype
});
