import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { Footer } from 'react/components/common';
import { OrderActions } from 'redux/actions';
import { PromoCheckoutPaymentForm } from 'react/components/promo/desktop';
import { packages } from 'helpers';

const packMapping = {
  210: '5-bottle-order-1',
  209: '3-bottle-order-1',
  208: '1-bottle-order-1',
};

class PromoCheckout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timerRef = '';
    this.state = {
      selected: packages[0],
      scrolled: false,
      timerData: '05:00'
    };
    console.log(this.props);
  }

  componentDidMount() {
    var spd = 100;
    var spdVal = 10;
    var cntDown = 5 * 60 * spdVal;

    const self = this;
    self.timerRef = setInterval(function () {
      var mn, sc, ms;
      cntDown--;
      if(cntDown < 0) {
        return false;
      }
      mn = Math.floor((cntDown / spdVal) / 60 );
      mn = (mn < 10 ? '0' + mn : mn);
      sc = Math.floor((cntDown / spdVal) % 60);
      sc = (sc < 10 ? '0' + sc : sc);
      ms = Math.floor(cntDown % spdVal);
      ms = (ms < 10 ? '0' + ms : ms);
      var result = mn + ':' + sc;
      self.setState({ timerData: result })
    }, spd);
    window.addEventListener('scroll', () => this.setState({ scrolled: true }));
  }

  componentWillUnmount() {
    clearInterval(this.timerRef);
  }

  submitBillingForm = values => {
    // this.sendTransactionDetails();
    // this.sendTransactionDetailsPackInfo();
    this.props.placeOrder({
      values,
      pack: this.state.selected,
      router: this.props.router,
      nextUrl: '/promo/desktop/upsell-1',
      isDesktop: true,
    });
  };

  sendTransactionDetails = () => {
    const { localStorage } = window;
    const id = `${this.state.selected.id}`;
    const revenue = parseInt(this.state.selected.packagePrice);
    const abtastyParams = JSON.parse(localStorage.getItem('abtastyParams'));
    const eventsArray = [
      'desktop-hp-text1-test-checkout'
    ];
    eventsArray.push(packMapping[id]);
    const tracking_data = {
      device_type: 'DESKTOP',
      ip: abtastyParams ? abtastyParams.ip : '',
      origin: 'PromoCheckoutPaymentForm',
      timestamp: moment().format(),
      visitor_id: abtastyParams ? abtastyParams.visitorId : '',
    };
    const postData = {};

    eventsArray.forEach((event, index) => {
      postData[index] = {
        name: event,
        id,
        revenue,
        shipping: '0',
        tracking_data,
        action: 'transaction_event',
      };
    });

    axios.post('/multicampaign-abtasty', postData);
  };

  render() {
    const { selected } = this.state;
    const shippingDate = moment().add(2, 'day');
    const { adv_sub, offerId, transaction_id } = this.props.query;
    const variation313018 = this.props.abtastyParams.campaignMaps['313018'];
    const variation319131 = this.props.abtastyParams.campaignMaps['319131'];
    const variation319133 = this.props.abtastyParams.campaignMaps['319133'];
    const variation319137 = this.props.abtastyParams.campaignMaps['319137'];

    return (
      <React.Fragment>
        {adv_sub && transaction_id && offerId ? (
          <iframe
            src={`https://kowboykit.com/api/event/purchase/?clickid=${adv_sub}&apikey=cad0f78407d7d852008a98df1b266293&programid=125&tid=${transaction_id}&oid=${offerId}`}
            frameBorder="0"
            width="1"
            height="1"
            style={{ position: 'absolute' }}
          />
        ) : null}
        <div className="chk-section1">
          <div className="chk-contentWrap"> 
            <div className="s1inner">
              <div className="chk-hdr">
                <img src="/static/promo/desktop/images/images/logo.png" alt className="chk-logo" />
                <img src="/static/promo/desktop/images/images/chk-hdr.png" alt className="chk-hdr-img" />
                <img src="/static/promo/desktop/images/images/chk-seal.png" alt className="chk-seal" />
              </div>        
              <div className="chkmid-lft">
                <div className="timer-box">
                  <p className="toptimer-txt">Your Special 40% OFF Savings expires in - 
                    <img src="/static/promo/desktop/images/images/chk-eye.png" alt className="chk-eye" /><span id="stopwatch">{this.state.timerData}</span></p>            
                </div>
                <p className="lft-top-txt">SELECT YOUR PACKAGE TODAY &amp; SAVE MORE!</p>
                {packages.map((pack, index) => (
                  <div key={pack.id} className={`prdbox${index+1}`}>
                    <a
                      id={`select-package-${pack.id}`}
                      href="javascript:void(0);"
                      className={
                        pack && pack.id === this.state.selected.id
                          ? 'picked'
                          : ''
                      }
                      onClick={() => {
                        this.setState({ selected: pack });
                      }}
                    >
                      <p className="pack-hding">{pack.title}</p>
                      <div className="free-shipping">Free Shipping</div>
                      <div className="box-lft">
                        <div className="lft-btl">
                          <img src={`/static/promo/desktop/images/images/${
                              pack.desktopImg
                            }`} alt className="rvw-product" /> 
                        </div>                              
                      </div>

                      <div className="box-rgt">
                        <div className="selected-arrow">{pack.msg} </div>
                        <p className="retail-price">REGULAR PRICE <span>{pack.regularPrice}<img src="/static/promo/desktop/images/images/red-cut.png" alt className="red-cut" /></span></p>
                        <p className="prdct-price">{pack.price}<span>/ea</span></p>
                        <p className="you-save">You Save $214.98</p>  
                        <div className="selected-btn" />
                      </div>
                    </a>
                  </div>
                ))}
                <div className="summary-box" id="prc">
                  <div className="smry-hding-bx">
                    <p className="smryhding">ORDER SUMMARY</p>
                  </div>
                  <div className="clearall" />
                  <div id="show1">
                    <div className="smrybox-lft">
                      <div id="prod_img"><img src="/static/promo/desktop/images/images/5btl.png" alt className="smry-btl" /></div>
                      <img src="/static/promo/desktop/images/images/logos.png" alt className="clogo" />  
                    </div>
                    <div className="smrybox-rgt">
                      <ul className="smrylist">
                        <li className="lft" style={{lineHeight: '20px'}}><b>Keto</b><br /><span id="package_type">{this.state.selected.title}</span></li>
                        <li className="rgt" style={{padding: '0 0 12px 0'}}><span id="sub_total">{`$${this.state.selected.packagePrice}`}</span></li>
                        <li className="lft">Shipping &amp; Handling:</li>
                        <li className="rgt" id="shipping_price">$0.00</li>
                        <li className="lft">Discount</li>
                        <li className="rgt">$0.00</li>
                        <li className="lft" style={{borderBottom: 'none'}}><b>Total:</b></li>
                        <li className="rgt" style={{borderBottom: 'none'}} id="total_price"><b>{`$${this.state.selected.packagePrice}`}</b></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chkmid-rgt">
                <div className="chkfrm-top" />
                <div className="chkfrm-mid">
                  <PromoCheckoutPaymentForm onSubmit={this.submitBillingForm} />
                </div>
                <div className="chkfrm-btm" />   
                <div className="clearall" />
                <div className="ck-bottom">
                  <img src="/static/promo/desktop/images/images/ck-ba.png" alt className="ck-ba" /> 
                  <p className="ck-bottom-p1">Stubborn belly fat was a major concern for me. Experienced an incredible transformation within a month of using Yeah Keto.</p> 
                  <p className="ck-bottom-p2"><span>- Susie P.</span>  | Nevada</p>
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

const PromoCheckoutWithRouter = withRouter(PromoCheckout);

const mapStateToProps = reduxState => {
  if (reduxState.order) {
    return {
      placeOrderStatus: reduxState.order.placeOrderStatus,
      abtastyParams: reduxState.auth.abtastyParams,
    };
  }
  return {};
};

const PromoCheckoutContainer = connect(mapStateToProps, { ...OrderActions })(
  PromoCheckoutWithRouter,
);

export default PromoCheckoutContainer;
