import { select, put, all, fork, takeLatest } from 'redux-saga/effects';
import idx from 'idx';
import { OrderActions } from 'redux/actions';
import {
  post,
  get,
  getQueryString,
  parseLeadPostData,
  parseOrderPostData,
  getRevenueAfterDiscount,
  getParameterByName,
  parseQuery
} from 'helpers';
import { getCookie } from 'react/components/common';

const getSession = state => state.auth && state.auth.sessionId;

const packIdMap = {
  210: {
    ProductGroupKey: 'b5a06b4c-df89-4381-8a79-f594349d22ae',
    CustomProducts: [
      {
        ProductID: 21340,
        Quantity: 5,
        Amount: 39,
      },
    ],
  },
  209: {
    ProductGroupKey: 'b5a06b4c-df89-4381-8a79-f594349d22ae',
    CustomProducts: [
      {
        ProductID: 21340,
        Quantity: 3,
        Amount: 49,
      },
    ],
  },
  208: {
    ProductGroupKey: 'b5a06b4c-df89-4381-8a79-f594349d22ae',
    CustomProducts: [
      {
        ProductID: 21340,
        Quantity: 1,
        Amount: 69,
      },
    ],
  },
  213: {
    ProductGroupKey: '4db523ed-baf0-4bf7-90d3-3b4b847445aa',
    CustomProducts: [
      {
        ProductID: 21347,
        Quantity: 3,
        Amount: 77,
      },
    ],
  },
  212: {
    ProductGroupKey: '4db523ed-baf0-4bf7-90d3-3b4b847445aa',
    CustomProducts: [
      {
        ProductID: 21347,
        Quantity: 1,
        Amount: 87,
      },
    ],
  },
  217: {
    ProductGroupKey: '0041249f-9f8b-41c5-a137-ad4ce8133cf6',
    CustomProducts: [
      {
        ProductID: 21348,
        Quantity: 3,
        Amount: 87,
      },
    ],
  },
  215: {
    ProductGroupKey: '0041249f-9f8b-41c5-a137-ad4ce8133cf6',
    CustomProducts: [
      {
        ProductID: 21348,
        Quantity: 1,
        Amount: 97,
      },
    ],
  },
};

/**
 * submitLeadsForm: calls a post leads api which internally calls the CRM api
 * @namespace orderSaga
 * @param  {} action
 */

function* submitLeadsForm(action) {
  console.log({ action });
  yield put(OrderActions.submitLeadsFormRequest());

  try {
      const {
        values, nextUrl, headers, cart,
      } = action.payload;
      console.log('values', values);

      const firstName = values.FirstName;
      const lastName = values.LastName;
      const address = values.Address1;
      const address2 = values.Address2;
      const city = values.City;
      const state = values.State;
      const postalCode = values.ZipCode;
      const phoneNumber = values.Phone;
      const email = values.Email;

      const trackingVars = {
        'affId': getParameterByName('affId'),
        'sourceValue1': getParameterByName('sourceValue1'),
        'sourceValue2': getParameterByName('sourceValue2'),
        'sourceValue3': getParameterByName('sourceValue3'),
        'sourceValue4': getParameterByName('sourceValue4'),
        'sourceValue5': getParameterByName('sourceValue5')
      }

      localStorage.setItem('trck_vars', JSON.stringify(trackingVars));

      const billing = {
        firstName,
        lastName,
        address,
        address2,
        city,
        state,
        postalCode,
        phoneNumber,
        email
      };

      const shipping = {
        firstName,
        lastName,
        address,
        address2,
        city,
        state,
        postalCode
      }
      let sessionId = '';
      let kSessionId = '';
      if (typeof window !== 'undefined') {
        sessionId = yield getCookie('ascbd_session');
        kSessionId = yield getCookie('ascbd_promo_session');

        if (!sessionId || !sessionId.length) {
          window.location.href = window.location.href;
        }
      } else {
        sessionId = yield select(getSession);
      }
      const queryString = getQueryString();
      const apiResponse = yield post(
        '/v1/konnektive/lead',
        {
          ...billing,
          shipping,
          tracking_vars: trackingVars,
        },
        sessionId,
        { ...headers, 'k-session-id': kSessionId },
      );
      if (idx(apiResponse, _ => _.response.data.message) === 'Success') {
        const { lead } = apiResponse.response.data.data;
        // localStorage.setItem('leadData', JSON.stringify(lead));
        // const newQueryString = cart
        //   ? `&orderId=${lead.orderId}${queryString}`
        //   : queryString;
        yield put(OrderActions.submitLeadsFormSuccess({ lead }));
        window.location.assign(`${nextUrl}?${queryString}`);
      } else {
        yield put(OrderActions.submitLeadsFormFailure());
      }
    } catch (error) {
      console.log('error', error);
      yield put(OrderActions.submitLeadsFormFailure({ error }));
    }
}

/**
 * placeOrder: calls the api which internally calls the placeOrder call to CRM api
 * @namespace orderSaga
 * @param  {} action
 */
function* placeOrder(action) {
  yield put(OrderActions.placeOrderRequest());
  try {
    const {
      values, pack, nextUrl, headers, cid,
    } = action.payload;
    let sessionId = '';
    let kSessionId = '';

    const values1 = JSON.parse(localStorage.getItem('leadData'));

    const trackingVars = JSON.parse(localStorage.getItem('trck_vars'));

    console.log('values', values1)

    if (typeof window !== 'undefined') {
      sessionId = yield getCookie('ascbd_session');
      kSessionId = yield getCookie('ascbd_promo_session');

      if (!sessionId || !sessionId.length) {
        window.location.href = window.location.href;
        return;
      }
    } else {
      sessionId = yield select(getSession);
    }

    const {
      orderId,
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      postalCode,
    } = values1;

    const {
      cardExpiry,
      cardNumber,
      cardSecurityCode,
    } = values;

    const payload = {
      orderId,
      cardNumber,
      cardMonth: cardExpiry.cardMonth,
      cardYear: cardExpiry.cardYear,
      cardSecurityCode,
      product1_id: pack.id,
      product1_qty: 1
    };

    const queryString = `orderId=${orderId}${
      getQueryString().startsWith('&') || !getQueryString().length ? '' : '&'
    }${getQueryString()}`;

    const apiResponse = yield post(
      '/v1/konnektive/order',
      { ...payload, tracking_vars: trackingVars },
      sessionId,
      { ...headers, 'k-session-id': kSessionId },
    );
    if (
      idx(apiResponse, _ => _.response.data.message) === 'Success' &&
      idx(apiResponse, _ => _.response.data.code) !== 500
    ) {
      const { localStorage } = window;
      const order = apiResponse.response.data.data;
      localStorage.setItem('upsell1', JSON.stringify([order]));
      localStorage.setItem('pdcts', JSON.stringify(order.items));
      if (values.cart) {
        localStorage.setItem('cartthankyou', true);
        yield put(OrderActions.submitLeadsFormSuccess());
      }
      yield put(OrderActions.placeOrderSuccess({ order }));
      window.location.assign(`${nextUrl}?${queryString}`);
    } else {
      yield put(
        OrderActions.placeOrderFailure({
          error: apiResponse.response.data.message,
        }),
      );
    }
  } catch (error) {
    console.log('error', error);
    yield put(OrderActions.placeOrderFailure({ error }));
  }
}

/**
 * addUpsellToOrder calls the upsale api which internally calls the upsell api of CRM
 * @namespace orderSaga
 * @param  {} action
 */
function* addUpsellToOrder(action) {
  yield put(OrderActions.addUpsellToOrderRequest());
  try {
    const { productId, sendTo, headers, cid } = action.payload;
    let sessionId = '';
    let kSessionId = '';
    const { localStorage } = window;

    let upsell1 = JSON.parse(localStorage.getItem('upsell1'));
    upsell1 = upsell1 && upsell1.length && upsell1[upsell1.length - 1];

    if (typeof window !== 'undefined') {
      sessionId = yield getCookie('ascbd_session');
      kSessionId = yield getCookie('ascbd_promo_session');

      if (!sessionId || !sessionId.length) {
        window.location.href = window.location.href;
        return;
      }
    } else {
      sessionId = yield select(getSession);
    }

    let { orderId } = parseQuery(window.location.search);

    if (!orderId) {
      orderId  = JSON.parse(localStorage.getItem('leadData')).orderId;
    }
    const payload = {
      orderId,
      productId,
      productQty: 1
    };

    // payload.ProductGroups[0].CustomProducts[0].Amount = getRevenueAfterDiscount(
    //   {
    //     cid,
    //     revenue: payload.ProductGroups[0].CustomProducts[0].Amount,
    //   },
    // );

    // const apiResponse = yield post('/v1/response/upsale', payload, sessionId, {
    //   ...headers,
    // });

    const apiResponse = yield post(
      '/v1/konnektive/upsale',
      payload,
      sessionId,
      {
        ...headers,
        'k-session-id': kSessionId,
      },
    );

    if (idx(apiResponse, _ => _.response.data.message) === 'Success') {
      const newOrder = apiResponse.response.data.data;

      console.log('newOrder', newOrder);

      const oldUpselldata = JSON.parse(localStorage.getItem('upsell1'));
      localStorage.setItem('pdcts', JSON.stringify(newOrder.items));

      // oldUpselldata.push(newOrder);
      // pdcts.push(newOrder);

      // localStorage.setItem('upsell1', JSON.stringify(oldUpselldata));
      yield put(OrderActions.placeOrderSuccess({ order: newOrder }));
      yield put(OrderActions.addUpsellToOrderSuccess());
      const queryString = getQueryString();
      window.location.assign(`${sendTo}?${queryString}`);
    } else {
      yield put(OrderActions.addUpsellToOrderFailure());
    }
  } catch (error) {
    console.log('error', error);
    yield put(OrderActions.addUpsellToOrderFailure({ error }));
  }
}

/**
 * getOrderDetails
 * @namespace orderSaga
 * @param  {} action
 * @yields {} orderDetails
 */
function* getOrderDetails(action) {
  yield put(OrderActions.getOrderDetailsRequest());
  try {
    const { headers, orderId } = action.payload;
    let sessionId = '';
    let kSessionId = '';

    if (typeof window !== 'undefined') {
      sessionId = yield getCookie('ascbd_session');
      kSessionId = yield getCookie('ascbd_promo_session');

      if (!sessionId || !sessionId.length) {
        window.location.href = window.location.href;
        return;
      }
    } else {
      sessionId = yield select(getSession);
    }
    const url = orderId
      ? `/v1/konnektive/order/${orderId}`
      : '/v1/konnektive/order/';
    const apiResponse = yield get(url, sessionId, {
      ...headers,
      'k-session-id': kSessionId,
    });
    if (idx(apiResponse, _ => _.response.data.message) === 'Success') {
      const order = apiResponse.response.data.data.data[0];
      localStorage.setItem('leadData', JSON.stringify(order));
      yield put(OrderActions.getOrderDetailsSuccess({ order }));
    } else {
      yield put(
        OrderActions.getOrderDetails({
          headers: {
            'x-ascbd-req-origin': window.location.hostname,
          },
        }),
      );
      yield put(OrderActions.getOrderDetailsFailure());
    }
  } catch (error) {
    console.log('Error', error)
    yield put(OrderActions.getOrderDetailsFailure({ error }));
  }
}

export default function* OrderSagas() {
  yield all([
    fork(takeLatest, OrderActions.SUBMIT_LEADS_FORM, submitLeadsForm),
  ]);
  yield all([
    fork(takeLatest, OrderActions.GET_ORDER_DETAILS, getOrderDetails),
  ]);
  yield all([fork(takeLatest, OrderActions.PLACE_ORDER, placeOrder)]);
  yield all([
    fork(takeLatest, OrderActions.ADD_UPSELL_TO_ORDER, addUpsellToOrder),
  ]);
}
