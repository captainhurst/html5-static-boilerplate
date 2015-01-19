const HOME_PATH = '/';
const HOME_HASH = '#' + HOME_PATH;

class Request {
  constructor(hash) {
    if (!hash) {
      hash = HOME_HASH;
    } else {
      let pre = HOME_HASH;
      while (pre.length) {
        if (hash[0] === pre[0]) hash = hash.substr(1);
        pre = pre.substr(1);
      }
      hash = HOME_HASH + hash;
    }

    this.hash = hash;
    this.path = hash.substr(HOME_HASH.length) || HOME_PATH;
  }

  // called when the router refuses to process this request
  abandoned() {
    console.log('request for', this.hash, 'ABANDONED');
  }

  // called when the does not know how to process this request
  unhandled() {
    console.log('request for', this.hash, 'UNHANDLED');
  }

  try(route, next) {
    if (!route.regexp) {
      route.fn(this, next);
      return true;
    }

    var match = this.path.match(route.regexp);
    if (!match) return;

    this.route = route;
    this.params = _.transform(route.keys, function (vals, key, i) {
      vals[key.name] = match[i + 1];
      if (key.repeat) {
        vals[key.name] = String(vals[key.name]).split(key.delimiter);
      }
    }, {});

    route.fn(this, next);
    return true;
  }
}

export default Request;
