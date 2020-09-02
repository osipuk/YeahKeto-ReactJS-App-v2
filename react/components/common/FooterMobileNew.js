import React from 'react';
import moment from 'moment';

import { Modal } from './Modal';
import { CustomerCare } from './CustomerCare';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsAndConditions } from './TermsAndConditions';

class FooterMobileNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: null,
    };
  }

  closeModal = () => this.setState({ modal: null });
  closeModalImmediately = () => this.setState({ modal: null });

  render() {
    return (
      <div className="legal">
        <p className="ftr-txt">
          <a
            href="javascript:void(0)"
            onClick={() => {
              this.setState({ modal: 'footer_terms' });
            }}
          >
            Terms &amp; Conditions
          </a>{' '}
          &nbsp;|&nbsp;{' '}
          <a
            href="javascript:void(0)"
            onClick={() => {
              this.setState({ modal: 'footer_privacy' });
            }}
          >
            Privacy Policy
          </a>{' '}
          &nbsp;|&nbsp;{' '}
          <a
            href="javascript:void(0)"
            onClick={() => {
              this.setState({ modal: 'footer_customer' });
            }}
          >
            Contact Us
          </a>
          <br />
          <br />
          <span style={{ textTransform: 'none' }}>
            {moment().year()} © Yeah Keto
          </span>
        </p>
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
      </div>
    );
  }
}

export { FooterMobileNew };
