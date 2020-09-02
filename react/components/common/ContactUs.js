import React from 'react';
import validator from 'validator';
import { post, normalizePhone } from 'helpers';
import { Modal, Spinner } from 'react/components/common';

/**
 * @class ContactUs
 * @extends {React.Component}
 * @description Contact Us form with validation
 */
class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {
        question: '',
        name: '',
        email: '',
        phoneNumber: '',
      },
      error: {},
      submitting: null,
    };
  }

  _handleChange = e => {
    const { name, value } = e.target;

    let val = value;
    if (name === 'phoneNumber') {
      val = normalizePhone(value);
    }

    this.setState(ps => ({
      contact: {
        ...ps.contact,
        [name]: val,
      },
    }));
  };

  _validateName = e => {
    const { value } = e.target;
    let message = '';
    let hasError = false;
    if (!value) {
      hasError = true;
      message = 'The first name is required.';
    }
    this.setState(ps => ({
      error: {
        ...ps.error,
        nameHasError: hasError,
        name: message,
      },
    }));
  };

  _validateEmail = e => {
    const { value } = e.target;
    let message = '';
    let hasError = false;

    if (!value) {
      message = 'The email address is required.';
      hasError = true;
    } else if (!validator.isEmail(value)) {
      message = 'The value is not a valid email address.';
      hasError = true;
    }

    this.setState(ps => ({
      error: {
        ...ps.error,
        emailHasError: hasError,
        email: message,
      },
    }));
  };

  _validatePhone = e => {
    const { value } = e.target;
    let message = '';
    let hasError = false;

    // console.log(validator.isMobilePhone(value, 'en-US'))

    if (!value) {
      hasError = true;
      message = 'Please enter your phone number.';
    } else if (value.length !== 14) {
      hasError = true;
      message =
        'Not a valid 10-digit US phone number (must not include spaces or special characters).';
    }

    this.setState(ps => ({
      error: {
        ...ps.error,
        phoneHasError: hasError,
        phoneNumber: message,
      },
    }));
  };

  _validateState = () => {
    const { name, email, phoneNumber } = this.state.contact;
    const error = {};

    if (!name) {
      error.nameHasError = true;
      error.name = 'The first name is required.';
    }
    if (!email) {
      error.emailHasError = true;
      error.email = 'The email address is required.';
    } else if (validator.isEmail(email)) {
      error.emailHasError = true;
      error.email = 'The value is not a valid email address.';
    }

    if (!phoneNumber) {
      error.phoneHasError = true;
      error.phoneNumber = 'Please enter your phone number.';
    } else if (phoneNumber.length !== 14) {
      error.phoneHasError = true;
      error.phoneNumber =
        'Not a valid 10-digit US phone number (must not include spaces or special characters).';
    }

    return error;
  };

  _submitForm = () => {
    const { nameHasError, emailHasError, phoneHasError } = this.state.error;

    const {
      name, email, phoneNumber, question,
    } = this.state.contact;

    if (
      nameHasError === false &&
      emailHasError === false &&
      phoneHasError === false
    ) {
      this.setState({ submitting: 'submitting' }, async () => {
        await post('/v1/contact-us', {
          name,
          email,
          phone: phoneNumber,
          question,
        });
        this.setState({ submitting: 'success', contact: {} });
      });
    } else {
      const error = this._validateState();
      this.setState({ error });
    }
  };

  _closeModal = () => this.setState({ submitting: null });

  render() {
    const { error } = this.state;
    const { phoneNumber } = this.state.contact;
    // console.error(error)

    return (
      <div>
        <div className="inner-bg">
          <div className="container">
            <div className="inner-txt">
              <span>contact us</span>
              <p className="comn-txt">
                Get in touch with American Science to source the best-quality of
                Cannabidiol extract dietary supplements on the market.
              </p>
            </div>
            <img
              src="/static/assets/images/bnr-prd.png"
              alt=""
              className="inner-prd for-desk"
            />
          </div>
        </div>
        <div className="container">
          <div className="cont-inner">
            <div className="cont-inner-lft">
              <p className="comn-txt">
                You can reach out to us via email or give us a call. Information
                about our location and business hours is provided below.{' '}
              </p>
              <ul className="cont-list">
                <li>
                  <span className="mtop1 address-mtop-1">Yeah Keto</span>
                  <p>
                    Corporate: Peahead Productions LLC, 630 Freedom Business
                    Center Dr King of Prussia, MONTGOMERY. PA 19406
                  </p>
                  <p className="mtop1">
                    Returns: 6525 Gunpark Drive Ste 370-347, Boulder, CO 80301
                  </p>
                </li>
                <li>
                  <span>Hour of Operation</span>
                  <p>
                    Mon-Fri Open 24 Hrs (PST)<br />Sat-Sun Open 24 Hrs (PST)
                  </p>
                </li>
                <li>
                  <span>Email</span>
                  <a href="#">support@americansciencecbd.com</a>
                </li>
                <li>
                  <span>Phone</span>
                  <p>1-877-279-5390</p>
                </li>
              </ul>
            </div>
            <div className="cont-inner-rgt">
              <p className="frm-hdg-txt">Send us A Message</p>
              <div className="frm-container">
                <form id="contact_main" className="fv-form fv-form-pure">
                  <div
                    className={`frmelements pure-control-group fv-has-feedback
                                    ${
                                      error.nameHasError === false
                                        ? ' fv-has-success'
                                        : ''
                                    }
                                    ${
                                      error.nameHasError === true
                                        ? ' fv-has-error'
                                        : ''
                                    }`}
                  >
                    <label>
                      Name<span>*</span>
                    </label>
                    <div className="field">
                      <div className="icon-box">
                        <center>
                          <img
                            src="/static/assets/images/frmicon1.png"
                            alt=""
                          />
                        </center>
                      </div>
                      <input
                        type="text"
                        name="name"
                        className="ft-input"
                        required
                        autoComplete="off"
                        placeholder="First name"
                        data-fv-field="name"
                        onChange={this._handleChange}
                        onBlur={this._validateName}
                      />
                      <i
                        className="fv-control-feedback"
                        data-fv-icon-for="name"
                      />
                    </div>
                    {error.name && (
                      <small
                        className="fv-help-block"
                        data-fv-validator="notEmpty"
                        data-fv-for="name"
                        data-fv-result="NOT_VALIDATED"
                      >
                        {error.name}
                      </small>
                    )}
                  </div>
                  <div
                    className={`frmelements pure-control-group fv-has-feedback
                                    ${
                                      error.emailHasError === false
                                        ? ' fv-has-success'
                                        : ''
                                    }
                                    ${
                                      error.emailHasError === true
                                        ? ' fv-has-error'
                                        : ''
                                    }`}
                  >
                    <label>
                      Email <span>*</span>{' '}
                    </label>
                    <div className="field">
                      <div className="icon-box">
                        <center>
                          <img
                            src="/static/assets/images/frmicon3.png"
                            alt=""
                          />
                        </center>
                      </div>
                      <input
                        name="email"
                        type="text"
                        placeholder="Example: email@somewhere.com"
                        className="ft-input"
                        required
                        autoComplete="off"
                        data-fv-field="email"
                        onChange={this._handleChange}
                        onBlur={this._validateEmail}
                      />
                      <i
                        className="fv-control-feedback"
                        data-fv-icon-for="email"
                      />
                    </div>
                    {error.email && (
                      <small
                        className="fv-help-block"
                        data-fv-validator="emailAddress"
                        data-fv-for="email"
                        data-fv-result="NOT_VALIDATED"
                      >
                        {error.email}
                      </small>
                    )}
                  </div>
                  <div
                    className={`frmelements pure-control-group fv-has-feedback
                                    ${
                                      error.phoneHasError === false
                                        ? ' fv-has-success'
                                        : ''
                                    }
                                    ${
                                      error.phoneHasError === true
                                        ? ' fv-has-error'
                                        : ''
                                    }`}
                  >
                    <label>
                      Phone Number <span>*</span>
                    </label>
                    <div className="field">
                      <div className="icon-box">
                        <center>
                          <img
                            src="/static/assets/images/frmicon4.png"
                            alt=""
                          />
                        </center>
                      </div>
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phone_number"
                        placeholder="Example: (123) 555-6789"
                        className="ft-input"
                        required
                        autoComplete="off"
                        data-fv-field="phoneNumber"
                        maxLength="14"
                        value={phoneNumber}
                        onChange={this._handleChange}
                        onBlur={this._validatePhone}
                      />
                      <i
                        className="fv-control-feedback"
                        data-fv-icon-for="phoneNumber"
                      />
                    </div>
                    {error.phoneNumber && (
                      <small
                        className="fv-help-block"
                        data-fv-validator="callback"
                        data-fv-for="phoneNumber"
                        data-fv-result="NOT_VALIDATED"
                      >
                        {error.phoneNumber}
                      </small>
                    )}
                  </div>
                  <div className="frmelements pure-control-group">
                    <label>
                      My Question <span />
                    </label>
                    <div className="field no-icon comment-box">
                      <textarea
                        name="question"
                        id=""
                        placeholder="Comment"
                        onChange={this._handleChange}
                      />
                    </div>
                  </div>
                  <div
                    className="frmelements btn-element"
                    onClick={this._submitForm}
                  >
                    <img
                      src="/static/assets/images/submit-btn.png"
                      className="button-crt"
                      id="contact_submit"
                      alt=""
                    />
                  </div>
                </form>
                {this.state.submitting === 'success' && (
                  <Modal onClose={this._closeModal}>
                    Submission successful!
                    <div className="modal-body">
                      <p>
                        We have received your message successfully.<br />Thank
                        you.
                      </p>
                      <br />
                      <br />
                    </div>
                  </Modal>
                )}
                {this.state.submitting === 'submitting' && <Spinner />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;
