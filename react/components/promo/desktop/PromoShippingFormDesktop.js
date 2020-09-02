import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import {
  stateslist,
  shippingFormValidator,
  normalizePhone,
  normalizePostalCode,
} from 'helpers';
import { TextField, SelectField, AddressField } from 'react/components/common';
import { AuthActions, OrderActions } from 'redux/actions';

class PromoShippingFormDesktopComponent extends React.PureComponent {
  postActionTracker = () => {
    const { localStorage } = window;
    const abtastyParams = JSON.parse(localStorage.getItem('abtastyParams'));
    const eventsArray = [
      'desktop-hp-text1-test-rush-my-order',
      'desktop-hp-text2-test-rush-my-order',
      'desktop-hp-top-module-symbol1-test-rush-my-order',
      'desktop-hp-last-module-picture-test-rush-my-order',
      'desktop-hp-form-top-section-test-rush-my-order',
      'desktop-hp-module2-caption1-test-rush-my-order',
      'desktop-hp-rush-my-order-texts-test-rush-my-order',
      'desktop-hp-last-module-badge-test-rush-my-order',
      'desktop-hp-first-module-badge-test-rush-my-order',
      'desktop-hp-second-module-bulletpoints-test-rush-my-order',
    ];
    const tracking_data = {
      visitor_id: abtastyParams.visitorId,
      device_type: 'DESKTOP',
      origin: 'promo desktop',
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
  };

  render() {
    const { props } = this;

    return (
      <form
        id="form-contact"
        onSubmit={e => {
          props.handleSubmit(e);
        }}
        className="pure-form pure-form-aligned fv-form fv-form-pure"
      >
        <button
          id={props.id}
          type="submit"
          className="fv-hidden-submit"
          style={{ display: 'none', width: '0px', height: '0px' }}
        />
        <div className="rgt-form inside-form">
          {/*<img src="/static/promo/desktop/images/images/s1-arrow2.png" alt className="s1-animate-arrow" />*/}
          <div className="form-position form-wrapper-start">
            <Field
              component={TextField}
              containerClass="first-field"
              name="FirstName"
              placeholder="First name"
            />
            <Field
              component={TextField}
              name="LastName"
              placeholder="Last name"
            />
            <Field
              component={AddressField}
              name="Address1"
              placeholder="Street and number, P.O. box, c/o."
              changeField={this.props.change}
            />
            <Field
              component={TextField}
              name="Address2"
              placeholder="Apartment, suite, unit, building, floor, etc."
            />
            <Field
              component={TextField}
              name="City"
              placeholder="Your City"
            />
            <Field
              component={SelectField}
              name="State"
              placeholder="State"
              options={stateslist}
            />
            <Field
              component={TextField}
              name="ZipCode"
              placeholder="Zip Code"
              normalize={normalizePostalCode}
            />
            <Field
              component={TextField}
              name="Phone"
              placeholder="Example: (123) 555-6789"
              normalize={normalizePhone}
            />
            <Field
              component={TextField}
              name="Email"
              placeholder="Example: email@somewhere.com"
            />
          </div>
          <div><input type="submit" value="" id="rush-my-order-form-click" onClick={this.showErrorModal} class="submit pulse" /></div> 
          <div className="clearall" />
          <div>
            <img src="/static/promo/desktop/images/images/secure.png"  alt=""  class="secure"/>
          </div>
        </div>
        <div className="clearall" />
      </form>
    );
  }
}

const mapStateToProps = reduxState => {
  if (reduxState.order) {
    return {
      placeOrderStatus: reduxState.order.placeOrderStatus,
      abtastyParams: reduxState.auth.abtastyParams,
      isAuthentic: reduxState.auth.isAuthentic,
      initialValues: reduxState.auth.userInfo,
    };
  }
  return {};
};

const PromoShippingFormDesktop = connect(mapStateToProps, {
  ...OrderActions,
  ...AuthActions,
})(
  reduxForm({
    form: 'PromoContact',
    validate: shippingFormValidator,
    enableReinitialize: true,
  })(PromoShippingFormDesktopComponent),
);

export { PromoShippingFormDesktop };
