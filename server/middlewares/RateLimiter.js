import RateLimiter from 'strict-rate-limiter';
import Raven from 'raven';
import security from './Security';
import redis from '../redis-config';

const limitRequestsInterval = 60 * 1000; // 60 seconds
const limitRequestsNumber = 1000;

/**
 * Middleware for limiting the rate of requests. <br />
 * Currently we limit the number of requests from 1000.
 * Ratelimiter keeps the count of requests from a particular IP inside redis
 * and throws an error if the limit has been crossed
 * @namespace server-middleware
 * @param  {} req
 * @param  {} res
 * @param  {function()} next callback function
 */
export default (req, res, next) => {
  try {
    const id = security.getIp(req);

    if (!id) {
      return res.status(404).json({ error: 'Invalid IP!' });
    }

    // allow 100 request / 60s
    const limiter = new RateLimiter(
      {
        id,
        limit: limitRequestsNumber,
        duration: limitRequestsInterval,
      },
      redis,
    );

    return limiter.get((err, limit, remaining, reset) => {
      if (err) {
        return next(err);
      }

      res.setHeader('X-RateLimit-Limit', limit);
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Reset', Math.floor(reset / 1000));

      if (remaining >= 0) {
        return next();
      }

      // limit exceeded
      res.setHeader('Retry-After', Math.floor((reset - new Date()) / 1000));
      res.statusCode = 429; // eslint-disable-line no-param-reassign

      // trace.incrementMetric(util.format('security/rateLimit'));
      return res.end('Rate limit exceeded.');
    });
  } catch (error) {
    Raven.captureException(error);
    console.error('Exception Occurred in ReactApp', error.stack || error);
  }
};
