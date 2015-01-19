import Request from 'lib/routing/Request'
import pathToReg from 'path-to-regexp'

/**
 * Object that will be held by a router and consulted
 * about incoming requests
 *
 * @param  {string} path - the path that this handler should match
 * @param  {Function} fn - the handler function that will
 *                       eventually be called
 */
class Route extends Request {
  constructor(path, fn) {
    super(path);

    this.keys = [];
    this.regexp = pathToReg(this.path, this.keys);
    this.fn = fn;
  }
}

export default Route;
