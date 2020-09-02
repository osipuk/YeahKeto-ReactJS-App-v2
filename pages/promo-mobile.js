import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { PromoMobileContainer } from 'react/containers';
import { PromoSession, Spinner } from 'react/components/common';
import { createNewSession } from 'redux/actions/authActions';
import Router from 'next/router';
import { AuthActions } from 'redux/actions';
import moment from 'moment';
import axios from 'axios';
import { getParameterByName } from 'helpers';

class Promo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: false,
    };
  }

  componentDidMount() {
    this.props.createNewSession();
    // this.postCampaignActivatedEvent();
    // this.postVisitEvent();
    // const { localStorage } = window;
    // localStorage.setItem(
    //   'abtastyParams',
    //   JSON.stringify(this.props.abtastyParams),
    // );
    Router.onRouteChangeStart = () => {
      this.setState({ showSpinner: true });
    };

    // sms_id call
    const smsId = getParameterByName('sms_id');

    // check for sms_id
    if (smsId) {
      const url = `${this.props.API_BASE_URL}/v1/track/smsclick${
        window.location.search
      }`;
      axios.get(url);
    }

    // email_id call
    const emailId = getParameterByName('email_id');

    // check for email_id
    if (emailId) {
      const url = `${this.props.API_BASE_URL}/v1/track/emailclick${
        window.location.search
      }`;
      axios.get(url);
    }
  }

  static getInitialProps({
    ctx: {
      store,
      isServer,
      query: {
        visitorId,
        requestAgent,
        campaignMaps,
        isAuthenticUser,
        API_BASE_URL,
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
          campaignMaps,
          ip,
        }),
      );
      store.dispatch(
        AuthActions.setIsAuthenticParams({
          isAuthenticUser,
        }),
      );
    }
    return { API_BASE_URL };
  }

  postCampaignActivatedEvent = () => {
    const { localStorage } = window;
    localStorage.setItem(
      'abtastyParams',
      JSON.stringify(this.props.abtastyParams),
    );
    localStorage.setItem(
      'campaignMaps',
      JSON.stringify(this.props.abtastyParams.campaignMaps),
    );

    const campaigns = [];
    const tracking_data = {
      device_type: 'MOBILE_PHONE',
      ip: this.props.abtastyParams.ip,
      origin: 'Promo Mobile',
      timestamp: moment().format(),
      visitor_id: this.props.abtastyParams.visitorId,
    };

    const postData = {};

    if (campaigns.length) {
      campaigns.forEach(campaign => {
        postData[campaign] = {
          campaign_id: campaign,
          variation_id: this.props.abtastyParams.campaignMaps[campaign],
          tracking_data,
          action: 'campaign_activated_event',
        };
      });
    }

    axios.post('/multicampaign-abtasty', postData);
  };

  postVisitEvent = () => {
    const { localStorage } = window;
    const abtastyParams = JSON.parse(localStorage.getItem('abtastyParams'));
    const body = {
      tracking_data: {
        visitor_id: abtastyParams.visitorId,
        device_type: 'MOBILE_PHONE',
        origin: window.location.href,
        timestamp: moment().format(),
        ip: abtastyParams.ip,
      },
    };
    axios.post('/abtasty', { ...body, action: 'visit_event' });
  };

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
            href="/static/assets/css/common/slick.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/promo/mobile/index.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/promo/mobile/mobile-new.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/mb-style.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/mb-sprites-style.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/common/slick.css"
          />
          <script src="/static/assets/js/common/jquery.js" />
          <script src="/static/assets/js/common/slick.js" />
        </Head>
        {this.props.sessionId && <PromoSession pageType="leadPage" />}
        <PromoMobileContainer {...this.props} />
        {this.state.showSpinner && <Spinner />}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    sessionId: state.auth && state.auth.sessionId,
    abtastyParams: state.auth.abtastyParams,
  };
}

export default connect(mapStateToProps, { createNewSession })(Promo);
