import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { normalizePhone } from 'helpers';
import { MobileShippingContainer } from 'react/containers';
import { AuthActions } from 'redux/actions';

class Promo extends React.PureComponent {
  static async getInitialProps(props) {
    const {
      store, isServer, query, req,
    } = props.ctx;
    // const { visitorId, variationId } = query;
    // const { ip } = req.session;
    if (isServer) {
      store.dispatch(
        AuthActions.setUniqueSessionId({
          sessionId: query.sessionId,
          headers: {
            'x-ascbd-req-origin': req.get('host'),
          },
        }),
      );
      // store.dispatch(
      //   AuthActions.setAbtastyParams({
      //     visitorId,
      //     variationId,
      //     ip,
      //   }),
      // );
      let { userInfo } = query;
      if (userInfo) {
        userInfo = {
          ...userInfo,
          Phone: normalizePhone(userInfo.Phone),
          ZipCode: userInfo.Zipcode,
        };
        store.dispatch(AuthActions.setUserInfo(userInfo));
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Yeah Keto</title>
          <meta name="viewport" content="width=640, user-scalable=0" />
          <meta
            name="description"
            content="Premium Quality Hemp Extract Products, Organic and Natural"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/fonts/font-hind.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/fonts/font-awesome.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/promo/mobile/index.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/promo/mobile/shipping.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/mb-style.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/formvalidation/formValidation.min.css"
          />
        </Head>
        <MobileShippingContainer {...this.props} />
      </React.Fragment>
    );
  }
}

export default connect()(Promo);
