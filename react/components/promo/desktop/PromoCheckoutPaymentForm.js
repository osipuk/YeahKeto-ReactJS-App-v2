import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import creditCartType from 'credit-card-type';
import {
  TextField,
  CVVField,
  // SameAddressCheckField, TODO: Some time later this might be used
  Spinner,
  SuccessModal,
  Modal,
  CardExpiryField,
  ImageModal,
} from 'react/components/common';
import {
  billingFormValidator,
  normalizeCardNumber,
  normalizeSecurityCode,
} from 'helpers';

/**
 * @class PromoCheckoutPaymentFormClass
 * @extends {React.Component}
 */
class PromoCheckoutPaymentFormClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active_cc_type: '',
      show_cvv_modal: false,
      showErrorModal: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.submitStatus === 'submitting' &&
      this.props.submitStatus === 'failure'
    ) {
      this.setState({ showErrorModal: true });
    }
  }

  hideErrorModal = () => this.setState({ showErrorModal: false });

  _toggleCVVModal = e => {
    e.preventDefault();
    this.setState({ show_cvv_modal: !this.state.show_cvv_modal });
  };

  /**
   * @param {*} cc credit card number
   * @memberof PromoCheckoutPaymentFormClass
   * @description check creditcard type using package "credit-card-type"
   */
  _checkCardType = cc => {
    if (!cc) return;

    const value = cc.toString().replace(/\s/g, '');
    const cc_type = creditCartType(value);

    if (cc_type && cc_type[0] && value.length > 3) {
      this.setState({ active_cc_type: cc_type[0].type });
    } else if (this.state.active_cc_type || value.length < 3) {
      this.setState({ active_cc_type: '' });
    }
  };

  render() {
    const { active_cc_type, show_cvv_modal } = this.state;
    const variation318676 = this.props.abtastyParams.campaignMaps['318676'];

    return (
      <div className="chkfrm-mid">
        {show_cvv_modal && (
          <Modal onClose={this._toggleCVVModal}>
            CVV/CID
            <center>
              <img src="/static/promo/common/cvv.jpg" alt="" />
            </center>
          </Modal>
        )}
        <form
          onSubmit={this.props.handleSubmit}
          className="pure-form pure-form-aligned fv-form fv-form-pure"
        >
          <button
            id="promo-checkout-payment-form-submit"
            type="submit"
            className="fv-hidden-submit"
            style={{ display: 'none', height: 0, width: 0 }}
          />
         
          <div className="cards">
            <span
              className={`card-visa ${
                active_cc_type === 'visa' ? 'active' : ''
              }`}
            >
              <img src="/static/Visa.png" className="card-image" alt="" />
            </span>
            <span
              className={`card-mastercard ${
                active_cc_type === 'master-card' ? 'active' : ''
              }`}
            >
              <img src="/static/Mastercard.png" className="card-image" alt="" />
            </span>
            <span
              className={`card-discover" ${
                active_cc_type === 'american-express' ? 'active' : ''
              }`}
            >
              <img src="/static/amex.png" className="card-image" alt="" />
            </span>
            <span
              className={`card-discover" ${
                active_cc_type === 'discover' ? 'active' : ''
              }`}
            >
              <img src="/static/discover.png" className="card-image" alt="" />
            </span>
          </div>
          {/*
            TODO: Some time later this might be used if we have a user requirement to input
              different addresses for billing and shipping.
              For now it is not used.
            <Field component={SameAddressCheckField} name="same" />
          */}
          <div className="clearfix" />
          <div id="billingDiv" style={{ display: 'none' }} />
          <Field
            component={TextField}
            name="cardNumber"
            className="creditcard"
            placeholder="•••• •••• •••• ••••"
            label="Card Number*"
            onChange={e => this._checkCardType(e.target.value)}
            normalize={normalizeCardNumber}
          />
          <Field component={CardExpiryField} name="cardExpiry" />
          <Field
            containerClass="frm-elem-cvv"
            component={CVVField}
            label="CVV/CID*"
            name="cardSecurityCode"
            className="short cvv-field"
            normalize={normalizeSecurityCode}
            cvvClick={this._toggleCVVModal}
          />
          <div className="clearall" />
          <input type="submit" className="chkbtn pulse" onClick={this.submitForm} value="" />
        </form>
        {this.props.submitStatus === 'submitting' && <Spinner />}
        {this.props.submitStatus === 'success' && (
          <ImageModal>
            <img
              alt=""
              src="/static/assets/images/checkout_success_popup.png"
              style={{ width: '100%', height: '100%' }}
            />
          </ImageModal>
        )}
        {this.state.showErrorModal && (
          <ImageModal onClose={this.hideErrorModal}>
            <img
              alt=""
              src="/static/assets/images/checkout_card_failure_popup.png"
              style={{ width: '100%', height: '100%' }}
              onClick={this.hideErrorModal}
            />
          </ImageModal>
        )}
        <img
          alt=""
          src="/static/assets/images/checkout_success_popup.png"
          style={{ width: 0, height: 0 }}
        />
        <img
          alt=""
          src="/static/assets/images/checkout_card_failure_popup.png"
          style={{ width: 0, height: 0 }}
        />
      </div>
    );
  }
}

const PromoCheckoutPaymentFormComponent = reduxForm({
  form: 'BillingForm',
  validate: billingFormValidator,
})(PromoCheckoutPaymentFormClass);

const selector = formValueSelector('BillingForm');

function mapStateToProps(reduxState) {
  if (reduxState.order) {
    return {
      initialValues: {
        same: 'Yes',
      },
      currentValues: {
        same: selector(reduxState, 'same'),
      },
      submitStatus: reduxState.order.placeOrderStatus,
      submitFailure: reduxState.order.placeOrderError,
      abtastyParams: reduxState.auth.abtastyParams,
    };
  }
  return {};
}

const PromoCheckoutPaymentForm = connect(mapStateToProps)(
  PromoCheckoutPaymentFormComponent,
);

export { PromoCheckoutPaymentForm };
