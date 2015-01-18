class UserPage extends HTMLElement {
  createdCallback() {
    this.innerHTML = '<h1>User {{name}}</h1>';
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

export default document.registerElement('user-page', {
  prototype: UserPage.prototype
});
