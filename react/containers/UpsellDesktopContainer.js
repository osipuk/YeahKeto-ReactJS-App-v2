import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { OrderActions } from 'redux/actions';
import { Footer, Spinner, SuccessModal } from 'react/components/common';
import {
  Upsell1,
  Upsell11,
  Upsell2,
  Upsell21,
} from '../components/upsell/desktop';
import moment from 'moment';

/**
 * @class UpsellDesktopContainerComponent
 * @extends {React.PureComponent}
 * @description Desktop container components for Upsells : Renders the Upsell pages according to the stage <br />
 * Also renders iframe for tracking variables
 */
class UpsellDesktopContainerComponent extends React.PureComponent {
  upgrade = (productId, nextPage) => {
    this.props.addUpsellToOrder({
      productId,
      sendTo: nextPage,
      router: this.props.router,
      order: this.props.order,
    });
  };

  render() {
    const { upsell, offerId, adv_sub, affId } = this.props.query;

    return (
      <React.Fragment>
        {upsell === 1 &&
          offerId && (
            <iframe
              title="cbd"
              // src={`https://trk.starlightgroup.io/aff_l?offer_id=${offerId}&transaction_id=${transaction_id}&adv_sub=${adv_sub}`}
              src={`https://trk.starlightgroup.io/aff_l?offer_id=${offerId}&adv_sub=${adv_sub}`}
              frameBorder="0"
              width="1"
              height="1"
              style={{ position: 'absolute' }}
            />
          )}

          <React.Fragment>
            {upsell === 1 &&
              affId === 'cake' && (
                <iframe
                  src="https://response-pixel.com/p.ashx?o=608&e=232"
                  frameBorder="0"
                  width="1"
                  height="1"
                  style={{ position: 'absolute' }}
                />
              )}
          </React.Fragment>

        <div className="container">
          <div className="upsell-box">
            <div className="up-top">
            <p className="topbartxt">
              <span>WARNING:</span> Due to extremely high media demand, there is
              limited supply of <span>Yeah Keto</span> in stock as of{' '}
              <span>{moment().format('dddd, ll')}</span>
            </p>
        </div>
            {upsell === 1 && <Upsell1 upgrade={this.upgrade} {...this.props} />}
            {upsell === '1-1' && (
              <Upsell11 upgrade={this.upgrade} {...this.props} />
            )}
            {upsell === 2 && <Upsell2 upgrade={this.upgrade} {...this.props} />}
            {upsell === '2-1' && (
              <Upsell21 upgrade={this.upgrade} {...this.props} />
            )}
          </div>
          <div className="clearall" />
          {this.props.submitStatus === 'submitting' && <Spinner />}
          <SuccessModal
            visible={this.props.submitStatus === 'success'}
            message="Order updated successfully."
          />
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    order: state.order,
    submitStatus: state.order.addUpsellToOrderStatus,
  };
}

const UpsellDesktopContainer = connect(mapStateToProps, { ...OrderActions })(
  withRouter(UpsellDesktopContainerComponent),
);

export default UpsellDesktopContainer;
