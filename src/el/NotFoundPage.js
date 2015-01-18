class NotFoundPage extends HTMLElement {
  createdCallback() {
    this.innerHTML = '<h1>Not Found</h1>';
  }

  attachedCallback() {
    // attached
  }

  detachedCallback() {
    // cleanup!
  }

  attributeChangedCallback() {
    // read!
  }
}

export default document.registerElement('not-found-page', {
  prototype: NotFoundPage.prototype
});
