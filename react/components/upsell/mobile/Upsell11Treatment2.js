import React from 'react';
import Head from 'next/head';
import moment from 'moment';
import axios from 'axios';
import { PromoSession, Footer } from 'react/components/common';
import { withRouter } from 'next/router';
import { getQueryString, getDiscountBanner } from 'helpers';

/**
 * @class Upsell11Treatment2Component
 * @extends {React.PureComponent}
 * @description Mobile Component rendered after Upsell1 page
 */
class Upsell11Treatment2Component extends React.PureComponent {
  componentDidMount() {
    this.postVisitEvent();
  }

  upgrade = () => {
    this.props.sendTransactionDetails(
      'order-confirmation-upsell-1-1',
      'Upsell11Treatment2',
    );
    this.postActionTracker('upsell-1-1-yes', 'upsell-1-1-yes');
    this.props.upgrade(212, '/promo/mobile/upsell-2?&prev=upsell11');
  };

  skipUpsell = () => {
    this.postActionTracker('upsell-1-1-no', 'upsell-1-1-no');
    window.location.assign(`/promo/mobile/upsell-2?${getQueryString()}`);
  };

  postActionTracker = (name, value_string) => {
    const { abtastyParams } = this.props;
    const body = {
      name,
      value_string,
      type: 'CLICK',
      tracking_data: {
        visitor_id: abtastyParams.visitorId,
        device_type: 'MOBILE_PHONE',
        origin: 'Upsell11Treatment2',
        timestamp: moment().format(),
        ip: abtastyParams.ip,
      },
    };
    axios.post('/abtasty', { ...body, action: 'action_tracking_event' });
  };

  postVisitEvent = () => {
    const { abtastyParams } = this.props;
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
    const { cid } = this.props.query;
    console.info('Rendering Upsell11 Treatment 2');
    return (
      <React.Fragment>
        <Head>
          <link
            href="/static/mobile/css/upsell-treatment2.css"
            rel="stylesheet"
          />
        </Head>
        <PromoSession pageType="upsellPage1" />
        <div className="upsell-top">
          <div className="contentWrap">
            <img
              alt="logo"
              src="/static/assets/images/logo.png"
              className="up-logo"
              width="180"
            />
            <img
              src="/static/assets/images/ups-step.png"
              alt=""
              className="up-step"
            />
          </div>
        </div>
        <div className="up-mid1">
          {getDiscountBanner({ cid }) && (
            <div className="topbar">
              <p className="topbartxt">
                PROMO CODE <span>CBD33</span> APPLIED!
                <span> HURRY, GET 20% OFF TODAY!</span>
              </p>
            </div>
          )}
          <div className="contentWrap">
            <p className="up-txt1">WAIT! Your Order Is Not Complete</p>
            <p className="up-txt2">
              Get better results by adding on the <strong>CBD Capsules</strong>{' '}
              to your order. Take advantage of our special offer-{' '}
              <strong>Buy 1 Bottle &amp; Get a 30% Discount</strong>
            </p>

            <div className="pop-coupon">
              <img
                alt="ups1"
                src="/static/assets/images/up1-single.png"
                style={{
                  position: 'absolute',
                  top: '60px',
                  left: '20px',
                  width: '220px',
                }}
              />
              <div className="up2-content">
                <img
                  alt=""
                  src="/static/assets/images/timer-icon.png"
                  className="up-timer"
                />
                <p className="prod-txt">
                  Buy 1 Bottle Of<br />
                  <span>CBD Capsules</span>
                </p>
                <p className="prod-txt">+</p>
                <p className="prod-txt">
                  Get A Discount<br />
                  <span>Save 30% Today</span>
                </p>
                <p className="price-txt">
                  Today Only<br />
                  <span>129.95</span> {getDiscountBanner({ cid }) ? 69.0 : 87.0}/ea
                </p>
                <p className="shipping-txt">
                  Plus we'll pay for the added shipping cost
                </p>
              </div>
            </div>

            <p className="up-txt3">
              This amazing offer won't ever be made again, and as always, you're
              backed by a rock-solid, <span>100% money-back-guarantee</span>.
              Just click the coupon above or the <span>"Yes"</span> button below
              now to stock up while you can!
            </p>
            <input
              id="cheaper-capsule-yes"
              src="/static/assets/images/up2-btn.png"
              alt=""
              className="up-btn"
              type="image"
              onClick={this.upgrade}
            />
            <img
              src="/static/assets/images/secure256.png"
              alt=""
              className="up-secur"
            />
            <a
              id="cheaper-capsule-no"
              href="javascript:void(0);"
              className="up-no-thanks"
              onClick={this.skipUpsell}
            >
              <img alt="no thanks" src="/static/assets/images/close-icon.png" />&nbsp;No,
              I don't want better results.
            </a>
            <img
              src="/static/assets/images/card-secure.png"
              alt=""
              className="card-secure"
            />
          </div>
        </div>
        <div id="footer">
          <div className="container">
            <div className="ftr-txt">
              <Footer noLogo>
                <span />
              </Footer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const Upsell11Treatment2 = withRouter(Upsell11Treatment2Component);

export { Upsell11Treatment2 };
