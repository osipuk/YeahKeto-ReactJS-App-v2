import React, { PureComponent } from 'react';
import { Modal } from './Modal';
import { CustomerCare } from './CustomerCare';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsAndConditions } from './TermsAndConditions';

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
          <div className="container">
            <div className="contentWrap">
              <p className="ftr-txt">
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    this.setState({ modal: 'footer_terms' });
                  }}
                >
                  Terms and Conditions
                </a>&nbsp;|&nbsp;
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    this.setState({ modal: 'footer_privacy' });
                  }}
                >
                  Privacy Policy
                </a>&nbsp;|&nbsp;
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    this.setState({ modal: 'footer_customer' });
                  }}
                >
                  Customer Care
                </a>&nbsp;|&nbsp;
              </p>

              <p className="ftr-txt w40 mtop2">
                <img
                  src="/static/assets/images/mc-v.png"
                  alt="We accept VISA, MasterCard, Amex"
                />
              </p>

              <p className="ftr-txt just">
                <br />This product is not for use by or sale to persons under
                the age of 18. This product should be used only as directed on
                the label. It should not be used if you are pregnant or nursing.
                Consult with a physician before use if you have a serious
                medical condition or use prescription medications. A{' '}
                {"Doctor's"}
                advice should be sought before using this and any supplemental
                dietary product. All trademarks and copyrights are property of
                their respective owners and are not affiliated with nor do they
                endorse this product. These statements have not been evaluated
                by the FDA. This product is not intended to diagnose, treat,
                cure or prevent any disease. Individual weight loss results will
                vary. By using this site, you agree to follow the Privacy Policy
                and all Terms & Conditions printed on this site. Void Where
                Prohibited by Law.
              </p>

              <p className="ftr-txt mtop2">
                Copyright 2018 © All Rights Reserved - Yeah Keto
              </p>
            </div>
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
