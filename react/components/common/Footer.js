import React, { PureComponent } from 'react';
import LazyLoad from 'react-lazyload';
import { Modal } from './Modal';
import { CustomerCare } from './CustomerCare';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsAndConditions } from './TermsAndConditions';
import moment from 'moment';

/**
 * @class Footer
 * @extends {PureComponent}
 * @description website footer
 */
class Footer extends PureComponent {
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
      <React.Fragment>
        <div className="footer">
          <div className="contentWrap">
            <p className="ftr-txt1">
              This product has not been evaluated by the FDA. This product is
              not intended to diagnose, treat, cure or prevent any disease.<br />
              Results in description and testimonials may not be typical results
              and individual results may vary.<br />
              This product intended to be used in conjunction with a healthy
              diet and regular exercise.<br />
              Consult your physician before starting any diet, exercise program,
              and taking any diet pill to avoid any health issues.<br />
              Images above are dramatizations.<br /> <br />
              <a
                href="javascript:void(0)"
                onClick={() => {
                  this.setState({ modal: 'footer_terms' });
                }}
              >
                Terms &amp; Conditions
              </a>{' '}
              &nbsp;|&nbsp;
              <a
                href="javascript:void(0)"
                onClick={() => {
                  this.setState({ modal: 'footer_privacy' });
                }}
              >
                Privacy Policy
              </a>
              &nbsp;|&nbsp;
              <a
                href="javascript:void(0)"
                onClick={() => {
                  this.setState({ modal: 'footer_customer' });
                }}
              >
                Contact Us
              </a>
              <br />
              {moment().year()} © Yeah Keto
            </p>
          </div>
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
      </React.Fragment>
    );
  }
}
export { Footer };
