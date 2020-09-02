import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { withRouter } from 'next/router';
import { getQueryString } from 'helpers';
import { FooterMobileNew } from 'react/components/common';

/**
 * @class Upsell11Treatment1Component
 * @extends {React.PureComponent}
 * @description Mobile component rendered after checkout page <br />
 */
class Upsell11Treatment1Component extends React.PureComponent {
  upgrade = () => {
    this.props.upgrade(4168, '/promo/mobile/upsell-2');
  };

  skipUpsell = () => {
    window.location.assign(`/promo/mobile/upsell-2?${getQueryString()}`);
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
            68% of customers who purchase <span>Yeah Keto</span> also purchase{' '}
            <span>Yeah Forskolin.</span>
          </p>
          <div className="up-mid">
            <p className="upsell-txt3">BOOST YOUR METABOLISM WITH</p>
            <div className="clearall" />
            <img
              src="/static/promo/mobile/images/images/up2-logo.png"
              className="up1-logo"
              alt=""
            />
            <p className="up-sub-name1 up-sub-name2">
              Advanced Metabolic Support Formula*
            </p>
            <div className="upsell-sec1-prdct">
              <div className="upsell1-s1-lftside">
                <img
                  src="/static/promo/mobile/images/images/upsell2-sec1-bg.png"
                  className="upsell1-sec1-bg"
                  alt=""
                />
                <img
                  src="/static/promo/mobile/images/images/upsell2-prdct.png"
                  className="upsell1-prdct"
                  alt=""
                />
                <p className="save-txt1">save 44%</p>
              </div>
              <ul className="up1-s1-list up2-s1-list">
                <li>
                  Breaks Down<br /> <span>Fatty Tissue</span>
                </li>
                <li>
                  Preserve<br /> <span>Lean Mucle</span>
                </li>
                <li>
                  Boost<br /> <span>Metabolism</span>
                </li>
              </ul>
            </div>
            <div className="up1-dscount-cpn">
              <p className="dscnt-txt1">
                Add Your{' '}
                <span className="spcl-dscnt spcl-dscnt1">Special Discounted</span>{' '}
                Bottle Just Pay a Special Price{' '}
                <span className="prc-dscnt">
                  $89.99<img
                    src="/static/promo/mobile/images/images/red-stick.png"
                    alt=""
                  />
                </span>
              </p>
              <p className="price-text2 price-text2-up2">$49.99</p>
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

const Upsell11Treatment1 = withRouter(Upsell11Treatment1Component);

export { Upsell11Treatment1 };
