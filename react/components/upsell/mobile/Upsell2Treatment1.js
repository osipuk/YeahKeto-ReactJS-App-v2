import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { getQueryString } from 'helpers';
import { FooterMobileNew } from 'react/components/common';

/**
 * @class Upsell2Treatment1
 * @extends {React.PureComponent}
 * @description Mobile component rendered after Upsell1 pages
 */
class Upsell2Treatment1 extends React.PureComponent {
  upgrade = () => {
    this.props.upgrade(4166, '/promo/mobile/thankyou');
  };

  skipUpsell = () => {
    window.location.assign(`/promo/mobile/upsell-2-1?${getQueryString()}`);
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
        origin: 'Upsell2Treatment1',
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
      <div className="container">
        <div className="upsell-hdr">
          <img src="/static/promo/mobile/images/images/top-img.jpg" alt="" />
        </div>
        <div className="upsell1-sec1">
          <p className="upsell-txt1">
            <span>WAIT!</span> YOU QUALIFY FOR A LIMITEDTIME DISCOUNT
          </p>
          <p className="upsell-txt2">
            93% of customers who purchase <span>Yeah Keto</span> also purchase{' '}
            <span>Yeah Caralluma.</span>
          </p>
          <div className="up-mid">
            <p className="upsell-txt3">CURB YOUR CRAVINGS WITH</p>
            <div className="clearall" />
            <img
              src="/static/promo/mobile/images/images/up1-logo.png"
              className="up1-logo"
              alt=""
            />
            <p className="up-sub-name1">Advanced Appetite Suppression*</p>
            <div className="upsell-sec1-prdct">
              <div className="upsell1-s1-lftside">
                <img
                  src="/static/promo/mobile/images/images/upsell1-sec1-bg.png"
                  className="upsell1-sec1-bg"
                  alt=""
                />
                <img
                  src="/static/promo/mobile/images/images/upsell21-prdct.png"
                  className="upsell1-prdct"
                  style={{ left: 11 }}
                  alt=""
                />
                <p className="save-txt1">save 44%</p>
              </div>
              <ul className="up1-s1-list">
                <li>
                  Suppress<br /> <span>Appetite</span>
                </li>
                <li>
                  Reduces<br /> <span>Overeating</span>
                </li>
                <li>
                  Boost<br /> <span>Weight Loss</span>
                </li>
              </ul>
            </div>
            <div className="up1-dscount-cpn">
              <p className="dscnt-txt1">
                <span className="spcl-dscnt">Buy 2 Bottles + Get 1 Free</span>
                <br /> Save 60% Today{' '}
              </p>
              <p
                className="price-text2 price-text2-up1-2"
                style={{ color: '#481048' }}
              >
                <span>
                  <img
                    src="/static/promo/mobile/images/images/price-cut.png"
                    alt=""
                  />$120/<sup>ea</sup>
                </span>{' '}
                $77/<sup>ea</sup>
              </p>

              <a onClick={this.upgrade}>
                <img
                  src="/static/promo/mobile/images/images/upsell-btn.png"
                  className="upsell-btn pulse"
                  alt=""
                />
              </a>
              <a onClick={this.skipUpsell}>
                <p className="no-txt">
                  <img
                    src="/static/promo/mobile/images/images/cut-icon.png"
                    alt=""
                  />No thanks, I’m not interested
                </p>
              </a>
            </div>
          </div>
        </div>
        <p className="clearall" />
        <FooterMobileNew />
      </div>
    );
  }
}

export { Upsell2Treatment1 };
