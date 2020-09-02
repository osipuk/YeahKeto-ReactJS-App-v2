import React from 'react';
import Head from 'next/head';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { PromoCheckoutContainer } from 'react/containers';
import { AuthActions, OrderActions } from 'redux/actions';
import { PromoSession } from 'react/components/common';
import idx from 'idx';

class Promo extends React.PureComponent {
  componentDidMount() {
    // this.postCampaignActivatedEvent();
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
        visitorId,
        campaignMaps,
        requestAgent,
        sessionId,
        // adv_sub,
        // transaction_id,
        // offerId,
      },
      req: {
        session: { ip },
      },
    },
  }) {
    if (isServer) {
      store.dispatch(AuthActions.setUniqueSessionId({ sessionId }));
      store.dispatch(
        AuthActions.setAbtastyParams({
          visitorId,
          campaignMaps,
          requestAgent,
          ip,
        }),
      );
    }
  }

  postCampaignActivatedEvent() {
    const campaigns = ['313018', '318676', '319131', '319133', '319137'];
    const tracking_data = {
      device_type: 'DESKTOP',
      ip: this.props.abtastyParams.ip,
      origin: 'Promo Desktop checkout',
      timestamp: moment().format(),
      visitor_id: this.props.abtastyParams.visitorId,
    };
    const postData = {};

    campaigns.forEach(campaign => {
      postData[campaign] = {
        campaign_id: campaign,
        variation_id: this.props.abtastyParams.campaignMaps[campaign],
        tracking_data,
        action: 'campaign_activated_event',
      };
    });

    axios.post('/multicampaign-abtasty', postData);
  }

  postVisitEvent() {
    axios.post('/abtasty', {
      tracking_data: {
        visitor_id: this.props.abtastyParams.visitorId,
        device_type: 'DESKTOP',
        origin: window.location.href,
        timestamp: moment().format(),
        ip: this.props.abtastyParams.ip,
      },
      action: 'visit_event',
    });
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Yeah Keto</title>
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
            href="/static/assets/css/formvalidation/formValidation.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/promo/desktop/checkout.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/promo-style.css"
          />
        </Head>
        <PromoSession pageType="checkoutPage" />
        <PromoCheckoutContainer {...this.props} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = reduxState => ({
  order: idx(reduxState, _ => _.order.order),
  getOrderDetailsStatus: idx(reduxState, _ => _.order.getOrderDetailsStatus),
  abtastyParams: reduxState.auth.abtastyParams,
});

export default connect(mapStateToProps, { ...OrderActions })(Promo);
