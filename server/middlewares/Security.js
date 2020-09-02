// middleware for security
// Entry points, ip tampering, and so on
// it makes api return 403 error and sets `req.session.isBot` to true
import xss from 'xss';
import config from '../server-config';
import Raven from 'raven';

/**
 * Middleware to protect react server from xss attacks
 * @function
 * @namespace server-middleware
 * @param  {} req
 */
function getIp(req) {
  try {
    // https://support.cloudflare.com/hc/en-us/articles/200170986-How-does-CloudFlare-handle-HTTP-Request-headers-
    if (config.ENV !== 'development' && req.headers['cf-connecting-ip']) {
      return xss(req.headers['cf-connecting-ip']);
    }

    // http://stackoverflow.com/a/10849772/1885921
    if (req.headers['x-forwarded-for']) {
      return xss(req.headers['x-forwarded-for']);
    }
    return req.connection.remoteAddress;
  } catch (error) {
    Raven.captureException(error);
    console.error('Exception Occurred in ReactApp', error.stack || error);
  }
}

export default {
  getIp,
};
