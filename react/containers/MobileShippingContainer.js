import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { AuthActions, OrderActions } from 'redux/actions';
import {
  stateslist,
  shippingFormValidator,
  normalizePhone,
  normalizePostalCode,
  getDiscountBanner,
} from 'helpers';
import {
  TextField,
  SelectField,
  AddressField,
  ImageModal,
  FooterMobileNew,
} from 'react/components/common';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'next/router';

/**
 * @class MobileShippingContainerComponent
 * @extends {React.PureComponent}
 * @description Container Component for Shipping Form on Mobile
 */
class MobileShippingContainerComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showCheckingModal: false,
    };
  }

  onSubmit = e => {
    this.props.handleSubmit(values => {
      this.setState({ showCheckingModal: true });
      this.props.submitLeadsForm({
        values,
        router: this.props.router,
        nextUrl: '/promo/mobile/select-package',
      });
    })(e);
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
    const { cid } = this.props.query;
    return (
      <div className="mobile-body">
        <div id="container">
          <div className="getheight">
            <div
              className="spng-hd"
              style={{ height: getDiscountBanner({ cid }) ? '173px' : '143px' }}
            >
              <img
                src="/static/promo/mobile/images/images/top-img.jpg"
                alt=""
                className="img-resp"
              />
              <div id="ck-sec2">
                <div className="frm-bg2">
                  <p className="chk-toptxt1">VERIFY YOUR SHIPPING INFO</p>
                  <p className="chk-top-txt2" />
                </div>
              </div>
            </div>
            <p className="clearall" />
            <div id="trialsec2">
              <div className="clearfix" />
              <div className="trialform">
                <form
                  id="form-contact"
                  className="pure-form pure-form-aligned fv-form fv-form-pure"
                  autoComplete="on"
                >
                  <div className="trialfrmmid">
                    <Field
                      containerClass="frmelmnts1"
                      component={TextField}
                      name="FirstName"
                      label="First Name*"
                      placeholder="First Name*"
                      autoCorrect="off"
                      autoComplete="name"
                      type="text"
                    />
                    <Field
                      containerClass="frmelmnts3"
                      component={TextField}
                      name="LastName"
                      label="Last Name*"
                      placeholder="Last Name*"
                      autoCorrect="off"
                      autoComplete="family-name"                     
                    />
                    <div className="clearfix" />
                    <Field
                      containerClass="frmelmnts2"
                      component={AddressField}
                      name="Address1"
                      label="Address Line 1*"
                      placeholder="Street and number, P.O. box, c/o."
                      changeField={this.props.change}
                      autoCorrect="off"
                      autoComplete="address-line1"                      
                    />
                    <Field
                      containerClass="frmelmnts2"
                      component={TextField}
                      name="Address2"
                      label="Address Line 2"
                      placeholder="Apartment, suite, unit, building, floor, etc."
                      autoCorrect="off"
                      autoComplete="address-line2"                     
                    />
                    <div className="clearfix" />
                    <Field
                      containerClass="frmelmnts2"
                      component={TextField}
                      name="City"
                      label="City*"
                      placeholder="Your City"
                      autoCorrect="off"
                      autoComplete="address-level2"                     
                    />
                    <div className="clearfix" />
                    <Field
                      containerClass="frmelmnts1"
                      component={TextField}
                      name="ZipCode"
                      label="Zip Code*"
                      placeholder="Zip Code"
                      normalize={normalizePostalCode}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoCorrect="off"
                      autoComplete="postal-code"
                      type="tel"
                    />
                    <Field
                      inputStyle={{ width: '99%' }}
                      containerClass="frmelmnts3"
                      component={SelectField}
                      name="State"
                      label="State*"
                      placeholder="Select State"
                      options={stateslist}
                    />
                    <div className="clearfix" />
                    <Field
                      containerClass="frmelmnts1"
                      component={TextField}
                      name="Phone"
                      label="Phone Number*"
                      placeholder="Example: (123) 555-6789"
                      normalize={normalizePhone}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoCorrect="off"
                      autoComplete="tel"
                      type="tel"
                    />
                    <Field
                      containerClass="frmelmnts3"
                      component={TextField}
                      name="Email"
                      label="Email*"
                      placeholder="Example: email@somewhere.com"
                      type="email"
                      autoCapitalize="off"
                      autoCorrect="off"
                      autoComplete="email"
                    />
                  </div>
                  <div className="clearfix" />
                  <div className="btn-box">
                    <img
                      src="/static/promo/mobile/images/images/secure-img.png"
                      alt="secure"
                      className="secure-img"
                    />
                    <a href="#" onClick={this.onSubmit}>
                      <img
                        src="/static/promo/mobile/images/images/rush-button.png"
                        alt="rush"
                        className="trial-btn pulse"
                      />
                    </a>
                    <img
                      src="/static/promo/mobile/images/images/c-logo.png"
                      alt="c-logo"
                      className="c-logo"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <FooterMobileNew />
        </div>
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
        <img
          alt=""
          src="/static/assets/images/lead_form_success_popup.png"
          style={{ width: 0, height: 0 }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    submitStatus: state.order.submitLeadsFormStatus,
    abtastyParams: state.auth.abtastyParams,
    initialValues: state.auth.userInfo,
  };
}

const MobileShippingContainer = connect(mapStateToProps, {
  ...OrderActions,
  ...AuthActions,
})(
  reduxForm({
    form: 'MobileShippingForm',
    validate: shippingFormValidator,
    enableReinitialize: true,
  })(withRouter(MobileShippingContainerComponent)),
);

export default MobileShippingContainer;
