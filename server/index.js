import express from 'express';
import idx from 'idx';
import next from 'next';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import useragent from 'express-useragent';
import expressSession from 'express-session';
import connectRedis from 'connect-redis';
import querystring from 'querystring';
import Raven from 'raven';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {
  get,
  post,
  postToAbtasty,
  generateAbtastyVisitorId,
  getVariationForVisitor,
  postToAbtastyMultiple,
  getParameterByName,
  getVariationsForVisitor,
} from './api-helpers';
import security from './middlewares/Security';
import rateLimiter from './middlewares/RateLimiter';
import config from './server-config';
import redis from './redis-config';

const path = require('path');
// import authenticParams from '../constants/urlParams';

require('dotenv').config();

const {
  PORT,
  NODE_ENV,
  API_BASE_URL,
  ABTASTY_BASE_URL,
  ABTASTY_API_KEY,
} = process.env;

const dev = NODE_ENV !== 'production';

require('dotenv').config();

const port = PORT ? parseInt(PORT, 10) : 3000;

const server = express();

// Express Middlewares

// for logging express req and res
server.use(
  morgan('combined', {
    skip(req, res) {
      return res.statusCode < 400;
    },
  }),
);

server.use(cookieParser());
server.use(bodyParser.json());
server.use(useragent.express());
server.use('/uploads', express.static('uploads'));

// configure remote logging
if (!dev) {
  Raven.config('https://30b971029d594608bb765ea6e46298f0@sentry.io/1207214', {
    maxBreadcrumbs: 10,
    sendTimeout: 5,
  }).install();
  server.use(compression());
}

const RedisSessionStore = connectRedis(expressSession);

// initialize redis store to be used by Ratelimiter
server.use(
  expressSession({
    key: 'ABCBDSESSID',
    store: new RedisSessionStore({
      prefix: 'starlight_session_',
      client: redis,
    }),
    expireAfterSeconds: 3 * 60 * 60, // session is valid for 3 hours
    secret: config.secret,
    httpOnly: true,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  }),
);

server.use('/*', rateLimiter);

const isAuthentic = req => {
  let isAuthenticUser = false;
  const authenticParams = [
    'affId',
    'sourceValue3',
    'sourceValue4',
    'sourceValue5',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'mailsoft_person_id',
    'cid',
    'sms_id',
    'promocode',
  ];

  if (req.query && Object.keys(req.query).length) {
    const queryParams = Object.keys(req.query);

    isAuthenticUser = queryParams.some(param => {
      if (authenticParams.includes(param)) {
        return true;
      }
      return false;
    });
  }
  return isAuthenticUser;
};

// Security.js for protecting agains xss attacks
server.use((req, res, cb) => {
  res.set('X-Powered-By', 'Yeah Keto');
  res.set('X-XSS-Protection', 1);
  res.set('X-Frame-Options', 'SAMEORIGIN');
  res.set('Referrer-Policy', 'strict-origin');
  try {
    if (req.session) {
      // set key only for page requests
      // ignore for static calls and HMR calls in dev
      if (
        req.url.indexOf('/static/') === -1 &&
        req.url.indexOf('on-demand-entries-ping') === -1
      ) {
        res.set('ABCBDSESSID', req.sessionID);
      }

      if (req.session && !req.session.ip) {
        req.session.ip = security.getIp(req); // eslint-disable-line no-param-reassign
      }

      if (req.session && !req.session.userAgent) {
        req.session.userAgent = req.get('User-Agent'); // eslint-disable-line no-param-reassign
      }
    }
  } catch (error) {
    Raven.captureException(error);
    console.error('Exception Occurred in ReactApp', error.stack || error);
  }
  return cb();
});

/**
 * get sessionId from cookies
 * @param  {} req
 * @param  {} res
 * @return {Object} id : token
 */
const getSessionId = async (req, res) => {
  try {
    const { cookies } = req;
    const token = idx(cookies, _ => _.ascbd_session);
    if (!token || token === 'undefined') {
      console.error('Token not found!!');
      res.redirect('/promo');
    }
    return {
      id: token,
    };
  } catch (error) {
    Raven.captureException(error);
    console.error('Exception Occurred in ReactApp', error.stack || error);
  }
};

const generateSession = async (req, res) => {
  const sessionResponse = await post(
    '/v1/auth',
    {
      username: 'larby@starlightgroup.io',
      password: 'P@ssw0rd',
    },
    {
      'x-ascbd-req-origin': req.get('host'),
    },
  );
  if (idx(sessionResponse, _ => _.response.data)) {
    // eslint-disable-next-line
    return sessionResponse.response.data.data.token;
  }
};

const getVisitorId = async (req, res) => {
  try {
    const { cookies } = req;
    let visitorId = idx(cookies, _ => _.asc_visitor_id);
    if (visitorId && visitorId !== 'undefined') {
      return { visitorId, isNew: false };
    }
    visitorId = await generateAbtastyVisitorId();
    return { visitorId, isNew: true };
  } catch (error) {
    Raven.captureException(error);
    console.error('Exception Occurred in ReactApp', error.stack || error);
  }
};

const qualifiesForCidDiscount = req => {
  try {
    const { cookies } = req;
    const cidDiscount = idx(cookies, _ => _.cid_discount);
    if (cidDiscount && cidDiscount === 'true') {
      return true;
    }
  } catch (error) {
    Raven.captureException(error);
    console.error('Exception Occurred in ReactApp', error.stack || error);
  }
  return false;
};

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  server.post('/abtasty', async (req, res) => {
    const response = await postToAbtasty(req.body.action, req.body);
    console.log({ response });
    res.status(200).send(response);
  });

  server.post('/multicampaign-abtasty', async (req, res) => {
    const campaigns = req.body;
    const promises = [];

    Object.keys(campaigns).forEach(key => {
      const response = postToAbtastyMultiple(
        campaigns[key].action,
        campaigns[key],
      );
      promises.push(response);
    });

    Promise.all(promises)
      .then(values => {
        res.status(200).send('success');
      })
      .catch(reason => {
        console.log(reason);
        res.status(500).send('error');
      });
  });

  server.get('/start-session', async (req, res) => {
    const token = await generateSession(req, res);
    res.cookie('ascbd_session', token, { maxAge: 3600000 });
    res.status(200).send({ token });
  });

  server.get('/cart', async (req, res) => app.render(req, res, '/cart'));

  server.get('/cbd', async (req, res) =>
    res.sendFile(path.join(__dirname, '../static/temp', 'index.html')),
  );

  server.get('/cbd/checkout', async (req, res) =>
    res.sendFile(path.join(__dirname, '../static/temp', 'checkout.html')),
  );

  server.get('/cbd/thankyou', async (req, res) =>
    res.sendFile(path.join(__dirname, '../static/temp', 'thankyou.html')),
  );

  server.get('/cbd/tnc', async (req, res) =>
    res.sendFile(path.join(__dirname, '../static/temp', 'tnc.html')),
  );

  server.get('/cbd/privacy', async (req, res) =>
    res.sendFile(path.join(__dirname, '../static/temp', 'privacypolicy.html')),
  );

  server.get('/cbd/customer', async (req, res) =>
    res.sendFile(path.join(__dirname, '../static/temp', 'customer.html')),
  );

  server.get('/cbd/cvv', async (req, res) =>
    res.sendFile(path.join(__dirname, '../static/temp', 'cvv.html')),
  );

  server.get('/thankyou?', async (req, res) => {
    try {
      const requestAgent = req.useragent.isMobile ? 'mobile' : 'desktop';
      const { orderId } = req.query;

      const sessionId = await getSessionId(req, res);
      return app.render(req, res, '/thankyou-page', {
        orderId,
        sessionId,
        device: requestAgent,
      });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/:useragent?', async (req, res) => {
    try {
      const requestAgent = req.useragent.isMobile ? 'mobile' : 'desktop';
      // const { visitorId, isNew } = await getVisitorId(req, res);
      const visitorId = null;
      const isNew = false;
      const isAuthenticUser = isAuthentic(req);

      // if (isNew) {
      //   res.cookie('asc_visitor_id', visitorId, { maxAge: 3600000 });
      // }

      if (requestAgent !== req.params.useragent) {
        res.redirect(
          `/promo/${requestAgent}?${querystring.stringify(req.query)}`,
        );
        return;
      }
      if (requestAgent === 'desktop') {
        const token = await generateSession(req, res);
        const sessionId = {
          id: token,
        };
        // const campaignMaps = await getVariationsForVisitor(visitorId, {});
        const campaignMaps = [];
        const cid = getParameterByName('cid', req.originalUrl);
        const fromKonnective = getParameterByName('from_k', req.originalUrl);
        let userInfo = null;

        if (cid) {
          const cidResponse = await get(
            `/v1/response/customer/${cid}?from_k=${fromKonnective}`,
            sessionId.id,
            {
              'x-ascbd-req-origin': req.get('host'),
            },
          );

          if (idx(cidResponse, _ => _.response.data.code) === 200) {
            ({ data: userInfo } = cidResponse.response.data);
          }

          console.log('userInfo', userInfo);
          if (userInfo) {
            res.cookie('cid_discount', true, { maxAge: 3600000 });
          }
        }

        app.render(req, res, '/promo-desktop', {
          requestAgent,
          visitorId: null,
          device: requestAgent,
          campaignMaps,
          isAuthenticUser,
          userInfo,
          cid,
          API_BASE_URL,
        });
      }
      if (requestAgent === 'mobile') {
        const cid = getParameterByName('cid', req.originalUrl);
        const campaignMaps = await getVariationsForVisitor(visitorId, {});

        app.render(req, res, '/promo-mobile', {
          requestAgent,
          visitorId,
          device: requestAgent,
          campaignMaps,
          isAuthenticUser,
          cid,
          API_BASE_URL,
        });
      }
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/desktop/checkout', async (req, res) => {
    try {
      const sessionId = await getSessionId(req, res);
      const {
        orderId,
        transaction_id,
        offer_id: offerId,
        aff_sub2: adv_sub,
      } = req.query;
      // const { visitorId } = await getVisitorId(req, res);
      // const campaignMaps = await getVariationsForVisitor(visitorId, {
      //   313018: undefined,
      //   318676: '419445',
      //   319131: '420043',
      //   319133: '420046',
      //   319137: '420050',
      // });

      // redirectToPromo(orderId, req, res, () => {
      app.render(req, res, '/promo-desktop-checkout', {
        orderId,
        sessionId,
        visitorId: '',
        adv_sub,
        transaction_id,
        offerId,
        campaignMaps: [],
      });
      // });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/desktop/upsell-1', async (req, res) => {
    try {
      const sessionId = await getSessionId(req, res);
      const { orderId } = req.query;
      const offerId = req.query.sourceValue5;
      const transaction_id = req.query.sourceValue3;
      const adv_sub = req.query.sourceValue2;
      const affId = req.query.affId;
      // redirectToPromo(orderId, req, res, () => {
      app.render(req, res, '/promo-desktop-upsell', {
        upsell: 1,
        orderId,
        offerId,
        transaction_id,
        adv_sub,
        sessionId,
        affId,
      });
      // });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/desktop/upsell-1-1', async (req, res) => {
    try {
      const sessionId = await getSessionId(req, res);
      const { orderId } = req.query;
      const offerId = req.query.sourceValue5;
      const transaction_id = req.query.sourceValue3;
      const adv_sub = req.query.sourceValue2;

      // redirectToPromo(orderId, req, res, () => {
      app.render(req, res, '/promo-desktop-upsell', {
        upsell: '1-1',
        orderId,
        offerId,
        transaction_id,
        adv_sub,
        sessionId,
      });
      // });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/desktop/upsell-2', async (req, res) => {
    try {
      const sessionId = await getSessionId(req, res);
      const { orderId } = req.query;
      const offerId = req.query.sourceValue5;
      const transaction_id = req.query.sourceValue3;
      const adv_sub = req.query.sourceValue2;

      // redirectToPromo(orderId, req, res, () => {
      app.render(req, res, '/promo-desktop-upsell', {
        upsell: 2,
        orderId,
        offerId,
        transaction_id,
        adv_sub,
        sessionId,
      });
      // });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/desktop/thankyou', async (req, res) => {
    try {
      const sessionId = await getSessionId(req, res);
      const { orderId } = req.query;
      // redirectToPromo(orderId, req, res, () => {
      app.render(req, res, '/thankyou-page', {
        orderId,
        sessionId,
        isPromo: true,
        device: 'desktop',
      });
      // });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/mobile/shipping', async (req, res) => {
    try {
      const sessionId = await getSessionId(req, res);
      // const { visitorId } = await getVisitorId(req, res);
      const cid = getParameterByName('cid', req.originalUrl);
      const fromKonnective = getParameterByName('from_k', req.originalUrl);
      let userInfo = null;

      if (cid) {
        const cidResponse = await get(
          `/v1/response/customer/${cid}?from_k=${fromKonnective}`,
          sessionId.id,
          {
            'x-ascbd-req-origin': req.get('host'),
          },
        );
        if (idx(cidResponse, _ => _.response.data.code) === 200) {
          ({ data: userInfo } = cidResponse.response.data);
        }

        console.log('userInfo', userInfo);
        if (userInfo) {
          res.cookie('cid_discount', true, { maxAge: 3600000 });
        }
      }

      return app.render(req, res, '/promo-mobile-shipping', {
        sessionId,
        userInfo,
        cid,
      });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/mobile/select-package', async (req, res) => {
    try {
      const sessionId = await getSessionId(req, res);
      const { orderId } = req.query;
      // redirectToPromo(orderId, req, res, () => {
      app.render(req, res, '/promo-mobile-select-package', {
        sessionId,
        orderId,
      });
      // });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  // A.k.a. Checkout in AB testing
  server.get('/promo/mobile/confirm', async (req, res) => {
    try {
      const sessionId = await getSessionId(req, res);
      const { visitorId } = await getVisitorId(req, res);
      const {
        orderId,
        offer_id: offerId,
        transaction_id,
        aff_sub2: adv_sub,
        productId,
      } = req.query;
      const cid = qualifiesForCidDiscount(req)
        ? getParameterByName('cid', req.originalUrl)
        : null;
      const isAuthenticUser = isAuthentic(req);

      // redirectToPromo(orderId, req, res, () => {
      app.render(req, res, '/promo-mobile-confirm', {
        sessionId,
        visitorId,
        orderId,
        productId,
        offerId,
        transaction_id,
        adv_sub,
        cid,
        isAuthenticUser,
      });
      // });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/mobile/upsell-1', async (req, res) => {
    try {
      const sessionId = await getSessionId(req, res);
      const { orderId } = req.query;
      const offerId = req.query.sourceValue5;
      const transaction_id = req.query.sourceValue3;
      const adv_sub = req.query.sourceValue2;
      const affId = req.query.affId;
      const isAuthenticUser = isAuthentic(req);
      const { visitorId } = await getVisitorId(req, res);
      const cid = qualifiesForCidDiscount(req)
        ? getParameterByName('cid', req.originalUrl)
        : null;
      app.render(req, res, '/promo-mobile-upsell', {
        upsell: 1,
        offerId,
        orderId,
        transaction_id,
        adv_sub,
        isAuthenticUser,
        sessionId,
        visitorId,
        cid,
        affId,
      });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/mobile/upsell-1-1', async (req, res) => {
    try {
      const sessionId = await getSessionId(req, res);
      const { orderId } = req.query;
      const transaction_id = req.query.sourceValue3;
      const adv_sub = req.query.sourceValue2;
      const isAuthenticUser = isAuthentic(req);
      const cid = qualifiesForCidDiscount(req)
        ? getParameterByName('cid', req.originalUrl)
        : null;

      app.render(req, res, '/promo-mobile-upsell', {
        upsell: '1-1',
        orderId,
        transaction_id,
        isAuthenticUser,
        adv_sub,
        sessionId,
        cid,
      });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/mobile/upsell-2', async (req, res) => {
    try {
      const sessionId = await getSessionId(req, res);
      const { orderId } = req.query;
      const offerId = req.query.sourceValue5;
      const transaction_id = req.query.sourceValue3;
      const adv_sub = req.query.sourceValue2;
      const isAuthenticUser = isAuthentic(req);

      const { visitorId } = await getVisitorId(req, res);

      const cid = qualifiesForCidDiscount(req)
        ? getParameterByName('cid', req.originalUrl)
        : null;

      app.render(req, res, '/promo-mobile-upsell', {
        upsell: 2,
        orderId,
        offerId,
        visitorId,
        isAuthenticUser,
        transaction_id,
        adv_sub,
        sessionId,
        cid,
      });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/desktop/upsell-2-1', async (req, res) => {
    try {
      const sessionId = await getSessionId(req, res);
      const { orderId } = req.query;
      const offerId = req.query.sourceValue5;
      const transaction_id = req.query.sourceValue3;
      const adv_sub = req.query.sourceValue2;
      const cid = qualifiesForCidDiscount(req)
        ? getParameterByName('cid', req.originalUrl)
        : null;
      // redirectToPromo(orderId, req, res, () => {
      app.render(req, res, '/promo-desktop-upsell', {
        upsell: '2-1',
        orderId,
        offerId,
        transaction_id,
        adv_sub,
        sessionId,
        cid,
      });
      // });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/mobile/upsell-2-1', async (req, res) => {
    try {
      const sessionId = await getSessionId(req, res);
      const { orderId } = req.query;
      const offerId = req.query.sourceValue5;
      const transaction_id = req.query.sourceValue3;
      const adv_sub = req.query.sourceValue2;

      const { visitorId } = await getVisitorId(req, res);
      const cid = qualifiesForCidDiscount(req)
        ? getParameterByName('cid', req.originalUrl)
        : null;

      // redirectToPromo(orderId, req, res, () => {
      app.render(req, res, '/promo-mobile-upsell', {
        upsell: '2-1',
        orderId,
        offerId,
        visitorId,
        transaction_id,
        adv_sub,
        sessionId,
        cid,
      });
      // });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/mobile/thankyou', async (req, res) => {
    try {
      const sessionId = await getSessionId(req, res);
      const { orderId } = req.query;
      // redirectToPromo(orderId, req, res, () => {
      app.render(req, res, '/thankyou-page', {
        orderId,
        sessionId,
        isPromo: true,
        device: 'mobile',
      });
      // });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/promo/:useragent/*', async (req, res) => {
    try {
      const requestAgent = req.useragent.isMobile ? 'mobile' : 'desktop';
      res.redirect(`/promo/${requestAgent}`);
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/hemp-oil', async (req, res) => {
    try {
      return app.render(req, res, '/products', {
        product: 'hemp-oil',
      });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/hemp-capsule', async (req, res) => {
    try {
      return app.render(req, res, '/products', {
        product: 'hemp-capsule',
      });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('/warming_balm', async (req, res) => {
    try {
      return app.render(req, res, '/products', {
        product: 'warming_balm',
      });
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });

  server.get('*', (req, res) => {
    try {
      const permittedRoutes = ['/', '/faqs', '/contact', '/products'];
      if (
        req.url.indexOf('/static/') === -1 &&
        req.url.indexOf('on-demand-entries-ping') === -1 &&
        req.url.indexOf('_next') === -1 &&
        req.url.indexOf('uploads') === -1 &&
        !permittedRoutes.includes(req.url)
      ) {
        console.log('coming here also');
        res.redirect('/promo');
      }
      return handle(req, res);
    } catch (error) {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
    }
  });
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on ${port}`);
  });
});
