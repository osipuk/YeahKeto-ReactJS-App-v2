import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import moment from 'moment';
import axios from 'axios';
import { PromoDesktopContainer } from 'react/containers';
import { AuthActions } from 'redux/actions';
import { createNewSession } from 'redux/actions/authActions';
import { normalizePhone, getParameterByName } from 'helpers';
import { PromoSession } from 'react/components/common';

class Promo extends React.PureComponent {
  componentDidMount() {
    this.props.createNewSession();
    // this.postCampaignActivatedEvent();
    // this.postVisitEvent();

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
        userInfo,
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
          ip,
          campaignMaps,
        }),
      );
      store.dispatch(
        AuthActions.setIsAuthenticParams({
          isAuthenticUser,
        }),
      );

      if (userInfo) {
        userInfo = {
          ...userInfo,
          Phone: normalizePhone(userInfo.Phone),
          ZipCode: userInfo.Zipcode,
        };
        store.dispatch(AuthActions.setUserInfo(userInfo));
      }
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
      device_type: 'DESKTOP',
      ip: this.props.abtastyParams.ip,
      origin: 'Promo Desktop',
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
  };

  postVisitEvent = () => {
    const { localStorage } = window;
    const abtastyParams = JSON.parse(localStorage.getItem('abtastyParams'));
    const body = {
      tracking_data: {
        visitor_id: abtastyParams.visitorId,
        device_type: 'DESKTOP',
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
            href="/static/assets/css/promo/desktop/index.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/promo-style.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/sprites-style.css"
          />
          <script
            src="https://code.jquery.com/jquery-2.2.4.min.js"
            integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
            crossorigin="anonymous" />
          <script src="https://fast.wistia.net/assets/external/E-v1.js" async />
        </Head>
        {this.props.sessionId && <PromoSession pageType="leadPage" />}
        <PromoDesktopContainer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  sessionId: state.auth && state.auth.sessionId,
  abtastyParams: state.auth.abtastyParams,
});

export default connect(mapStateToProps, { ...AuthActions, createNewSession })(
  Promo,
);
