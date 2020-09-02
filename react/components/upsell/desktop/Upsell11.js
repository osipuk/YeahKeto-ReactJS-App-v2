import React from 'react';
import { PromoSession } from 'react/components/common';
import { withRouter } from 'next/router';
import { getQueryString } from 'helpers';
import { SatisfactionBox } from './SatisfactionBox';
import { Footer } from 'react/components/common';

/**
 * @class Upsell11Component
 * @extends {React.PureComponent}
 * @description Desktop component rendered after checkout page <br />
 */
class Upsell11Component extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shouldAddPixel: false,
      revenue: ''
    };
  }
 
  componentDidMount() {
    // let upsell1 = JSON.parse(localStorage.getItem('upsell1'));
    // upsell1 = upsell1 && upsell1[0] || {OrderInfo: 200};
 
    // this.setState({
    //   shouldAddPixel: true
    // },() => {
    //   this.setState({ revenue: upsell1.OrderInfo.TotalAmount})
    // });
  }

  upgrade = () => {
    this.props.upgrade(4167, '/promo/desktop/upsell-2');
  };

  skipUpsell = () => {
    window.location.assign(`/promo/desktop/upsell-2?${getQueryString()}`);
  };

  scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.shouldAddPixel ?
          <React.Fragment>
            <script>{`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '321559294932280');
              fbq('track', 'Purchase', {currency: 'USD', value: ${this.state.revenue}});
              `}
            </script>

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
          </React.Fragment> : null
        }

        <PromoSession pageType="upsellPage1" />
        <div className="up-bg">
          <div className="inner-container">
            <div className="up-inr">
              <img src="/static/promo/desktop/images/images/logo.png" className="up-logo" />
              <img src="/static/promo/desktop/images/images/chk-hdr.png" alt className="up-steps" />
              <div className="inr-chk inr-pack inr-upsell">
                <div className="upsell-sec">
                  <p className="up-hdg">WAIT! YOU QUALIFY FOR A LIMITED TIME DISCOUNT</p>
                  <p className="up-sub-hdg">68% of customers who purchase <span>Yeah Keto</span> also purchase <span>Yeah Forskolin</span></p>
                  <div className="up-box-bg up2-box-bg">
                    <div className="up-lft up2-lft">
                      <img src="/static/promo/desktop/images/images/up2-pro.png" alt className="up-prd" />
                      <img src="/static/promo/desktop/images/images/up2-lft-img1.png" alt className="up-lft-img1" />
                      <div className="up-seal">
                        <p>save<br />$44%</p>
                      </div>
                    </div>
                    <div className="up-rgt">
                      <p className="up-rgt-txt1">Boost Your Metabolism With</p>
                      <img src="/static/promo/desktop/images/images/up2-logo.png" className="up1-logo" />
                      <p className="up-rgt-txt3 up2-rgt-txt3">Advanced Metabolic Support Formula*</p>
                      <ul className="up-list">
                        <li>
                          <img src="/static/promo/desktop/images/images/up2-tick.png" alt className="for-desk" />
                          <p>Break Down<br /><span>Fatty Tissues</span></p>
                        </li>
                        <li>
                          <img src="/static/promo/desktop/images/images/up2-tick.png" alt className="for-desk" />
                          <p>Preserve<br /><span>Lean Muscle</span></p>
                        </li>
                        <li>
                          <img src="/static/promo/desktop/images/images/up2-tick.png" alt className="for-desk" />
                          <p>Boost<br /><span>Metabolism</span></p>
                        </li>
                      </ul>
                      <div className="up-prd-info">
                        <p className="up-prd-p1 up2-prd-p1">Add Your <span>Special Discounted</span> Bottle<br />Just Pay a Special Price <span><img src="/static/promo/desktop/images/images/strike.png" alt />$89.99</span></p>
                        <p className="prd-prc prd2-prc">$49.99</p>
                        <a onClick={this.upgrade}><img src="/static/promo/desktop/images/images/up-btn.png" alt className="up-btn" /></a>
                        <a onClick={this.skipUpsell}><p className="no-p"> No thanks, I’m not interested </p></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="clearall"></p>
        <Footer />
      </React.Fragment>
    );
  }
}

const Upsell11 = withRouter(Upsell11Component);

export { Upsell11 };
