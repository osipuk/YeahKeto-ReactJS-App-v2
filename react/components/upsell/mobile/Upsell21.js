import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { PromoSession, Footer } from 'react/components/common';
import { getQueryString, getDiscountBanner } from 'helpers';

/**
 * @class Upsell21
 * @extends {React.PureComponent}
 * @description Mobile Component rendered after Upsell2 page
 */
class Upsell21 extends React.PureComponent {
  upgrade = button => {
    this.postActionTracker('upsell-2-1-yes', `upsell-2-1-yes-${button}`);
    this.props.upgrade(215, '/promo/mobile/thankyou');
  };

  skipUpsell = button => {
    this.postActionTracker('upsell-2-1-no', `upsell-2-1-no-${button}`);
    window.location.assign(`/promo/mobile/thankyou?${getQueryString()}`);
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
        origin: 'Upsell21',
        timestamp: moment().format(),
        ip: abtastyParams.ip,
      },
    };
    axios.post('/abtasty', { ...body, action: 'action_tracking_event' });
  };

  render() {
    const { cid } = this.props.query;
    return (
      <React.Fragment>
        <PromoSession pageType="upsellPage2" />
        {getDiscountBanner({ cid }) && (
          <div className="topbar">
            <p className="topbartxt">
              PROMO CODE <span>CBD33</span> APPLIED!
              <span> HURRY, GET 20% OFF TODAY!</span>
            </p>
          </div>
        )}
        <div className="up-strip">
          <h3>YOU QUALIFY FOR A LIMITED TIME DISCOUNT</h3>
          <p>
            Add 1 Bottle Of<br />
            <strong>CBD Pain Relief Warming Balm</strong> To Your Order Today!
          </p>
        </div>

        <div className="upsell-box">
          <p className="up-txt1">GET INSTANT PAIN RELIEF</p>
          <p className="with-txt">with</p>
          <p className="up-txt2">CBD Warming Balm</p>
          <img
            src="/static/assets/images/upsell2-mobile/up-prod4.jpg"
            className="up-prod"
            alt="upsell-prod"
          />
          <div className="clearall" />
          <div className="price-box">
            <p className="price-box-txt1">Buy 1 Jar Of CBD Pain Relief Balm</p>
            <p className="price-box-txt2">Save 30% Today</p>
            <p className="price-box-txt3">
              <img
                src="/static/assets/images/upsell2-mobile/arrow-left.png"
                width="77"
                height="33"
                alt="arrow-left"
                className="arrow-left"
              />
              {getDiscountBanner({ cid }) ? 77 : 97.0}/ea
              <img
                src="/static/assets/images/upsell2-mobile/arrow-right.png"
                width="77"
                height="33"
                alt="arrow-right"
                className="arrow-right"
              />
            </p>
          </div>

          <div className="bnt-sec">
            <a
              id="cheaper-balm-yes-top"
              href="javascript:void(0)"
              onClick={() => this.upgrade('top')}
            >
              <img
                src="/static/assets/images/ord-btn.png"
                alt="order-btn"
                width="370"
                height="71"
                className="ord-btn pulse"
              />
            </a>
            <p className="thanks-txt">
              <a
                id="cheaper-balm-no-top"
                href="javascript:void(0)"
                onClick={() => this.skipUpsell('top')}
              >
                <img
                  src="/static/assets/images/cut-icon.png"
                  width="15"
                  height="15"
                  alt="cut-icon"
                  className="cut-icon"
                />
                {"No, I don't want better results."}
              </a>
            </p>
          </div>

          <div className="up-strip" style={{ 'margin-top': '50px' }}>
            <h4>BENEFITS OF CBD WARMING BALM INCLUDE ...</h4>
          </div>

          <div className="clearall" />

          <div className="up-bottom-box">
            <img
              src="/static/assets/images/upsell2-mobile/up1-img1.png"
              alt="upsell-img-1"
            />
            <p className="box-txt1">FULL SPECTRUM FORMULA</p>
            <p className="box-txt2">
              CBD Warming Balm is INFUSED with highly a concentrated CBD which
              is known for its medicinal properties and yields a more effective
              solution than any balm in the world.
            </p>
          </div>

          <div className="up-bottom-box">
            <img
              src="/static/assets/images/upsell2-mobile/up2-img2.png"
              alt="upsell-2-img-2"
            />
            <p className="box-txt1">OFFERS ANTIOXIDANT SUPPORT</p>
            <p className="box-txt2">
              CBD Warming Balm works at a cellular level to combat free radical
              damage, boost overall immunity, and provides healing as well as
              aromatherapy benefits.
            </p>
          </div>

          <div className="up-bottom-box">
            <img
              src="/static/assets/images/upsell2-mobile/up2-img3.png"
              alt="upsell-2-img-3"
            />
            <p className="box-txt1">INSTANTLY RELIEVES CHRONIC PAIN</p>
            <p className="box-txt2">
              Melt away muscle fatigue, pain, swelling, and discomfort with Yeah
              Keto WARMING {"BALM'S"} deep, penetrating warmth providing FAST
              relief that will amaze you.
            </p>
          </div>

          <div className="bnt-sec">
            <a
              id="cheaper-balm-yes-bottom"
              href="javascript:void(0)"
              onClick={() => this.upgrade('bottom')}
            >
              <img
                src="/static/assets/images/ord-btn.png"
                alt="order-btn"
                width="370"
                height="71"
                className="ord-btn pulse"
              />
            </a>
            <p className="thanks-txt">
              <a
                id="cheaper-balm-no-bottom"
                href="javascript:void(0)"
                onClick={() => this.skipUpsell('bottom')}
              >
                <img
                  src="/static/assets/images/cut-icon.png"
                  width="15"
                  height="15"
                  alt="cut-icon"
                  className="cut-icon"
                />
                {"No, I don't want better results."}
              </a>
            </p>
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

export { Upsell21 };
