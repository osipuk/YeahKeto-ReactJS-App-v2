import React from 'react';
import { PromoSession } from 'react/components/common';
import { withRouter } from 'next/router';
import { getQueryString } from 'helpers';
import { SatisfactionBox } from './SatisfactionBox';
import { Footer } from 'react/components/common';

/**
 * @class Upsell1Component
 * @extends {React.PureComponent}
 * @description Desktop Component rendered after Upsell1 page
 */
class Upsell1Component extends React.PureComponent {
  upgrade = () => {
    this.props.upgrade(4168, '/promo/desktop/upsell-2');
  };

  skipUpsell = () => {
    window.location.assign(`/promo/desktop/upsell-1-1?${getQueryString()}`);
  };

  render() {
    return (
      <React.Fragment>
        <PromoSession pageType="upsellPage1" />
        {/** Offer Conversion: Yeah Keto F  */ }
        <iframe src="http://komodo.go2cloud.org/aff_l?offer_id=1" scrolling="no" frameBorder="0" width="1" height="1"></iframe>
        {/** End Offer Conversion */ }
        <div className="up-bg">
          <div className="inner-container">
            <div className="up-inr">
              <img
                src="/static/promo/desktop/img/logo.png"
                className="up-logo"
              />
              <img
                src="/static/promo/desktop/img/chk-hdr.png"
                alt
                className="up-steps"
              />
              <div className="inr-chk inr-pack inr-upsell">
                <div className="upsell-sec">
                  <p className="up-hdg">
                    WAIT! YOU QUALIFY FOR A LIMITED TIME DISCOUNT
                  </p>
                  <p className="up-sub-hdg">
                    68% of customers who purchase <span>Yeah Keto</span> also
                    purchase <span>Yeah Forskolin</span>
                  </p>
                  <div className="up-box-bg up2-box-bg">
                    <div className="up-lft up2-lft up1-1-lft">
                      <img
                        src="/static/promo/desktop/img/up1-1-prd.png"
                        alt
                        className="up-prd"
                      />
                      <img
                        src="/static/promo/desktop/img/up2-lft-img1.png"
                        alt
                        className="up-lft-img1"
                      />
                      <div className="up-seal">
                        <p>
                          save<br />$44%
                        </p>
                      </div>
                    </div>
                    <div className="up-rgt">
                      <p className="up-rgt-txt1">Boost Your Metabolism With</p>
                      <img
                        src="/static/promo/desktop/img/up2-logo.png"
                        className="up1-logo"
                      />
                      <p className="up-rgt-txt3 up2-rgt-txt3">
                        Advanced Metabolic Support Formula*
                      </p>
                      <ul className="up-list">
                        <li>
                          <img
                            src="/static/promo/desktop/img/up2-tick.png"
                            alt
                            className="for-desk"
                          />
                          <p>
                            Break Down<br />
                            <span>Fatty Tissues</span>
                          </p>
                        </li>
                        <li>
                          <img
                            src="/static/promo/desktop/img/up2-tick.png"
                            alt
                            className="for-desk"
                          />
                          <p>
                            Preserve<br />
                            <span>Lean Muscle</span>
                          </p>
                        </li>
                        <li>
                          <img
                            src="/static/promo/desktop/img/up2-tick.png"
                            alt
                            className="for-desk"
                          />
                          <p>
                            Boost<br />
                            <span>Metabolism</span>
                          </p>
                        </li>
                      </ul>
                      <div className="up-prd-info">
                        <p className="up-prd-p1 up2-prd-p1">
                          <span>Buy 2 Bottles + Get 1 Free</span>
                          <br />Save 60% Today{' '}
                        </p>
                        <p className="prd-prc prd1-1-prc">
                          <span>
                            <img
                              src="/static/promo/desktop/img/price-cut.png"
                              alt
                            />$120/<sup>ea</sup>
                          </span>{' '}
                          $77/<sup>ea</sup>
                        </p>
                        <a onClick={this.upgrade}>
                          <img
                            src="/static/promo/desktop/img/up-btn.png"
                            alt
                            className="up-btn"
                          />
                        </a>
                        <a onClick={this.skipUpsell}>
                          <p className="no-p">
                            {' '}
                            No thanks, I’m not interested{' '}
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const Upsell1 = withRouter(Upsell1Component);

export { Upsell1 };
