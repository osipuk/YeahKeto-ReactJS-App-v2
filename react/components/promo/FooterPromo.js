import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';

import { getQueryString } from 'helpers';
import LazyLoad from 'react-lazyload';
import { Modal } from '../common/Modal';
import { CustomerCare } from '../common/CustomerCare';
import { PrivacyPolicy } from '../common/PrivacyPolicy';
import { TermsAndConditions } from '../common/TermsAndConditions';

class FooterPromoComponent extends React.PureComponent {
  constructor() {
    super();
    this.footerRef = React.createRef();
    this.ctaRef = React.createRef();
    this.state = {
      ctaStyle: { position: 'fixed' },
      modal: null,
    };
  }

  closeModal = () => this.setState({ modal: null });
  closeModalImmediately = () => this.setState({ modal: null });

  componentDidMount() {
    if (this.props.isMobile) {
      document.onscroll = () => {
        const footer = this.footerRef.current;
        const cta = this.ctaRef.current;
        const docViewTop = window.scrollY;
        const docViewBottom = docViewTop + window.innerHeight;
        const elemTop = footer.offsetTop;
        const elemBottom = cta.offsetHeight;
        if (
          elemTop >= docViewBottom + 20 ||
          elemBottom >= docViewBottom + 134
        ) {
          this.setState({ ctaStyle: { position: 'fixed' } });
        } else {
          this.setState({ ctaStyle: { position: 'relative' } });
        }
      };
    }
  }

  gotoShipping = () => {
    window.location.assign(`/promo/mobile/shipping?${getQueryString()}`);
  };

  postActionTracker() {
    if (this.props.isMobile) {
      this.postActionTrackerForMobile();
    } else {
      this.postActionTrackerForDesktop();
    }
  }

  postActionTrackerForDesktop = () => {
    try {
      const { localStorage } = window;
      const abtastyParams = JSON.parse(localStorage.getItem('abtastyParams'));

      const eventsArray = [
        'desktop-hp-text1-test-rush-my-order',
        'desktop-hp-text2-test-rush-my-order',
        'desktop-hp-top-module-symbol1-test-rush-my-order',
        'desktop-hp-module2-caption1-test-rush-my-order',
        'desktop-hp-rush-my-order-texts-test-rush-my-order',
        'desktop-hp-last-module-badge-test-rush-my-order',
        'desktop-hp-as-advertised-on-text-test-rush-my-order',
        'desktop-hp-first-module-badge-test-rush-my-order',
        'desktop-hp-second-module-bulletpoints-test-rush-my-order',
      ];
      const tracking_data = {
        visitor_id: abtastyParams.visitorId,
        device_type: 'DESKTOP',
        origin: 'promo DESKTOP',
        timestamp: moment().format(),
        ip: abtastyParams.ip,
      };
      const postData = {};

      eventsArray.forEach((event, index) => {
        postData[index] = {
          name: event,
          value_string: event,
          type: 'CLICK',
          tracking_data,
          action: 'action_tracking_event',
        };
      });

      axios.post('/multicampaign-abtasty', postData);
    } catch (err) {
      console.log(err);
    }
  };

  postActionTrackerForMobile = () => {
    try {
      const { localStorage } = window;
      const abtastyParams = JSON.parse(localStorage.getItem('abtastyParams'));

      const eventsArray = ['mobile-hp-benefits-module-test-rush-my-order'];
      const tracking_data = {
        visitor_id: abtastyParams.visitorId,
        device_type: 'MOBILE_PHONE',
        origin: 'promo mobile',
        timestamp: moment().format(),
        ip: abtastyParams.ip,
      };
      const postData = {};

      eventsArray.forEach((event, index) => {
        postData[index] = {
          name: event,
          value_string: event,
          type: 'TOUCH',
          tracking_data,
          action: 'action_tracking_event',
        };
      });

      axios.post('/multicampaign-abtasty', postData);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const variation316344 = this.props.isAuthentic.isAuthenticUser
      ? '416547'
      : '416545';

    return (
      <footer ref={this.footerRef}>
        <div id="cta" ref={this.ctaRef} style={this.state.ctaStyle}>
          <a
            id={this.props.tagID}
            href="javascript:void(0)"
            onClick={() => {
              // this.postActionTracker();
              this.gotoShipping();
            }}
            className="shipping_redirect"
          >
            <img
              src="/static/promo/mobile/images/images/button.png"
              className="btn pulse"
            />
          </a>
        </div>

        <p className="clearall" />
        <div className="legal">
          <p className="ftr-txt">
            This product has not been evaluated by the FDA. This product is not
            intended to diagnose, treat, cure or prevent any disease. Results in
            description and testimonials may not be typical results and
            individual results may vary. This product intended to be used in
            conjunction with a healthy diet and regular exercise. Consult your
            physician before starting any diet, exercise program, and taking any
            diet pill to avoid any health issues. Images above are
            dramatizations. <br />
            <br />
            <a
              href="javascript:void(0)"
              onClick={() => {
                this.setState({ modal: 'footer_terms' });
              }}
            >
              TERMS &amp; CONDITIONS
            </a>{' '}
            &nbsp;|&nbsp;
            <a
              href="javascript:void(0)"
              onClick={() => {
                this.setState({ modal: 'footer_privacy' });
              }}
            >
              PRIVACY POLICY
            </a>
            &nbsp;|&nbsp;
            <a
              href="javascript:void(0)"
              onClick={() => {
                this.setState({ modal: 'footer_customer' });
              }}
            >
              CUSTOMER CARE
            </a>
            <br />
            <span style={{ textTransform: 'none' }}>
              {moment().year()} © Yeah Keto
            </span>
          </p>
        </div>
        {this.state.modal === 'footer_terms' && (
          <Modal
            onClose={this.closeModal}
            onCloseBtn={this.closeModalImmediately}
          >
            <React.Fragment>Terms and Conditions</React.Fragment>
            <TermsAndConditions />
          </Modal>
        )}
        {this.state.modal === 'footer_privacy' && (
          <Modal
            onClose={this.closeModal}
            onCloseBtn={this.closeModalImmediately}
          >
            <React.Fragment>Privacy Policy</React.Fragment>
            <PrivacyPolicy />
          </Modal>
        )}
        {this.state.modal === 'footer_customer' && (
          <Modal
            onClose={this.closeModal}
            onCloseBtn={this.closeModalImmediately}
          >
            <React.Fragment>Customer Care</React.Fragment>
            <CustomerCare />
          </Modal>
        )}
      </footer>
    );
  }
}

const mapStateToProps = reduxState => {
  if (reduxState.order) {
    return {
      abtastyParams: reduxState.auth.abtastyParams,
      isAuthentic: reduxState.auth.isAuthentic,
    };
  }
  return {};
};

const FooterPromo = connect(mapStateToProps, null)(FooterPromoComponent);

export { FooterPromo };
