import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { PromoSession, Footer } from 'react/components/common';
import { withRouter } from 'next/router';
import { getQueryString, getDiscountBanner } from 'helpers';
import { SatisfactionBox } from './SatisfactionBox';
import { FooterMobileNew } from 'react/components/common';

/**
 * @class Upsell1Component
 * @extends {React.PureComponent}
 * @description Mobile component rendered after checkout page <br />
 */
class Upsell1Component extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shouldAddPixel: false,
      revenue: ''
    };
  }
  
  componentDidMount() {
    // this.postVisitEvent();
    // let upsell1 = JSON.parse(localStorage.getItem('upsell1'));
    // upsell1 = upsell1[0];
  
    // this.setState({
    //   shouldAddPixel: true
    // },() => {
    //   this.setState({ revenue: upsell1.OrderInfo.TotalAmount})
    // });
  }

  upgrade = () => {
    this.props.sendTransactionDetails('order-confirmation-upsell-1', 'Upsell1');
    this.props.upgrade(213, '/promo/mobile/upsell-2');
  };

  skipUpsell = () => {
    window.location.assign(`/promo/mobile/upsell-1-1?${getQueryString()}`);
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
    return (
      <div className="container">
        <noscript>
          <iframe
            src="http://komodo.go2cloud.org/aff_l?offer_id=1`"
            width="1"
            height="1"
            alt=""
            style={{display: 'none'}}
            frameborder="0"
          />
        </noscript>
        <div className="upsell-hdr"><img src="images/top-img.jpg" /></div>
        <div className="upsell1-sec1">
          <p className="upsell-txt1"><span>WAIT!</span> YOU QUALIFY FOR A LIMITEDTIME DISCOUNT</p>
          <p className="upsell-txt2">68% of customers who purchase <span>Yeah Keto</span> also purchase <span>Yeah Forskolin.</span></p>
          <div className="up-mid">
            <p className="upsell-txt3">BOOST YOUR METABOLISM WITH</p>
            <div className="clearall" />
            <img src="images/up2-logo.png" className="up1-logo" />
            <p className="up-sub-name1 up-sub-name2">Advanced Metabolic Support Formula*</p>
            <div className="upsell-sec1-prdct">
              <div className="upsell1-s1-lftside">
                <img src="images/upsell2-sec1-bg.png" className="upsell1-sec1-bg" />
                <img src="images/upsell2-prdct.png" className="upsell1-prdct" />
                <p className="save-txt1">save 44%</p>
              </div>
              <ul className="up1-s1-list up2-s1-list">
                <li>Breaks Down<br /> <span>Fatty Tissue</span></li>
                <li>Preserve<br /> <span>Lean Mucle</span></li>
                <li>Boost<br /> <span>Metabolism</span></li>
              </ul>
            </div>
            <div className="up1-dscount-cpn">
              <p className="dscnt-txt1">Add Your <span className="spcl-dscnt spcl-dscnt1">Special Discounted</span> Bottle Just Pay a Special Price <span className="prc-dscnt">$89.99<img src="images/red-stick.png" /></span></p>
              <p className="price-text2 price-text2-up2">$49.99</p>
              <a href="upsell-2.php"><img src="images/upsell-btn.png" className="upsell-btn pulse" /></a>
              <a href="upsell-2.php"><p className="no-txt">No thanks, I’m not interested</p></a>
            </div>
          </div>
        </div>
        <p className="clearall" />
        <FooterMobileNew />
      </div>
    );
  }
}

const Upsell1 = withRouter(Upsell1Component);

export { Upsell1 };
