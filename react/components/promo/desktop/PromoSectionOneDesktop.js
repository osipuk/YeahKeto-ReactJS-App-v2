import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { OrderActions } from 'redux/actions';
import { ImageModal } from 'react/components/common';
import { getQueryString } from 'helpers';
import { PromoShippingFormDesktop } from './PromoShippingFormDesktop';

class PromoSectionOneDesktopComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timerRef = '';
  }

  state = {
    showCheckingModal: false,
    timerData: '05:00',
  };

  componentDidMount() {
    const spd = 100;
    const spdVal = 10;
    let cntDown = 5 * 60 * spdVal;

    const self = this;
    self.timerRef = setInterval(() => {
      let mn;
      let sc;
      cntDown -= 1;
      if (cntDown < 0) {
        return false;
      }
      mn = Math.floor(cntDown / spdVal / 60);
      mn = mn < 10 ? `0${mn}` : mn;
      sc = Math.floor((cntDown / spdVal) % 60);
      sc = sc < 10 ? `0${sc}` : sc;
      const result = `${mn}:${sc}`;
      self.setState({ timerData: result });
      return true;
    }, spd);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.submitStatus !== 'success' &&
      this.props.submitStatus === 'success'
    ) {
      const queryString = getQueryString();
      setTimeout(
        () => window.location.assign(`/promo/desktop/checkout?${queryString}`),
        1000,
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerRef);
  }

  submitShippingForm = values => {
    this.setState({ showCheckingModal: true });
    this.props.submitLeadsForm({
      values,
      router: this.props.router,
      nextUrl: '/promo/desktop/checkout',
    });
  };

  render() {
    return (
      <div id="section1">
        <div className="contentWrap position" id="sec1">
          <div className="lft-content">
            <img
              src="/static/promo/desktop/images/images/logo.png"
              alt=""
              className="s1-logo"
            />
            <img
              src="/static/promo/desktop/images/images/s1-hd.png"
              alt=""
              className="s1-hd"
            />
            <p className="s1-p1">
              <strong>Yeah Keto</strong> triggers and maintains the state of
              ketosis, burning fat for energy!
            </p>
            <p className="s1-p2">Yeah Keto Helps You With</p>
            <ul className="s1-list">
              <li>
                <span>Rapid</span> Ketogenic Weight Loss{' '}
              </li>
              <li>
                <span>Instant</span> Energy Boost
              </li>
              <li>
                <span>Appetite</span> Suppression
              </li>
              <li>
                <span>Optimal</span> Metabolic Rate
              </li>
            </ul>
            <p className="clearall" />
            <img
              src="/static/promo/desktop/images/images/s1-arrow.png"
              alt=""
              className="s1-arrow"
            />
            <img
              src="/static/promo/desktop/images/images/s1-btl1.png"
              alt=""
              className="s1-btl1"
            />
            <p className="guarantee-seal">
              Join the Keto Revolution with Yeah Keto!{' '}
            </p>
          </div>
          <div className="rgt-form">
            <img
              src="/static/promo/desktop/images/images/s1-arrow2.png"
              alt=""
              className="s1-animate-arrow"
            />
            <img
              src="/static/promo/desktop/images/images/s1-seal.png"
              alt=""
              className="s1-seal"
            />
            <div className="form-position form-wrapper">
              <p className="frm-timer">
                Hurry! Limited Time Offer{' '}
                <span id="stopwatch">{this.state.timerData}</span>
              </p>
              <img
                src="/static/promo/desktop/images/images/s1-rgt-hd.png"
                alt=""
                className="s1-rgt-hd"
              />
              <PromoShippingFormDesktop
                id="promo-section1-submit-desktop"
                onSubmit={this.submitShippingForm}
              />
              {this.state.showCheckingModal && (
                <ImageModal>
                  <img
                    alt=""
                    src="/static/assets/images/shipping-page-submitting.png"
                    style={{ width: '100%', height: '100%' }}
                  />
                </ImageModal>
              )}
              {this.props.submitStatus === 'success' && (
                <ImageModal>
                  <img
                    alt=""
                    src="/static/assets/images/lead_form_success_popup.png"
                    style={{ width: '100%', height: '100%' }}
                  />
                </ImageModal>
              )}
            </div>
          </div>
          <p className="clearall" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    submitStatus: state.order.submitLeadsFormStatus,
    abtastyParams: state.auth.abtastyParams,
    isAuthentic: state.auth.isAuthentic,
  };
}

const PromoSectionOneDesktop = connect(mapStateToProps, { ...OrderActions })(
  withRouter(PromoSectionOneDesktopComponent),
);

export { PromoSectionOneDesktop };
