import React from 'react';
import Head from 'next/head';
import moment from 'moment';
import { MobileConfirmContainer } from 'react/containers';
import { connect } from 'react-redux';
import { AuthActions, OrderActions } from 'redux/actions';
import { PromoSession } from 'react/components/common';
import idx from 'idx';
import axios from 'axios/index';

class Confirm extends React.PureComponent {
  componentDidMount() {
    // this.postVisitEvent();
    this.props.getOrderDetails({
      headers: {
        'x-ascbd-req-origin': window.location.hostname,
      },
    });
  }

  static async getInitialProps({
    ctx: {
      store,
      isServer,
      query: {
        visitorId, requestAgent, sessionId, productId, isAuthenticUser,
      },
      req: {
        session: { ip },
      },
    },
  }) {
    if (isServer) {
      store.dispatch(
        AuthActions.setAbtastyParams({
          visitorId,
          requestAgent,
          ip,
          productId,
        }),
      );
      store.dispatch(
        AuthActions.setIsAuthenticParams({
          isAuthenticUser,
        }),
      );
      store.dispatch(AuthActions.setUniqueSessionId({ sessionId }));
    }
  }

  postVisitEvent() {
    axios.post('/abtasty', {
      tracking_data: {
        visitor_id: this.props.abtastyParams.visitorId,
        device_type: 'MOBILE_PHONE',
        origin: window.location.href,
        timestamp: moment().format(),
        ip: this.props.abtastyParams.ip,
      },
      action: 'visit_event',
    });
  }

  render() {
    const { props } = this;
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
            href="/static/assets/css/mb-checkout-new.css"
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
        <PromoSession pageType="checkoutPage" />
        <MobileConfirmContainer {...props} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = reduxState => ({
  order: reduxState.order.order,
  getOrderDetailsStatus: idx(reduxState, _ => _.order.getOrderDetailsStatus),
  abtastyParams: reduxState.auth.abtastyParams,
});

export default connect(mapStateToProps, { ...OrderActions })(Confirm);
