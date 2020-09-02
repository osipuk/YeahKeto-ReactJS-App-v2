import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { OrderActions } from 'redux/actions';
import {
  Upsell1Treatment1,
  Upsell1Treatment2,
  Upsell11Treatment1,
  Upsell11Treatment2,
  Upsell2Treatment1,
  Upsell2Treatment2,
  Upsell21Treatment1,
} from 'react/components/upsell/mobile';
import { Spinner, SuccessModal } from 'react/components/common';

const campaignIds = { 1: '308072', '1-1': '308073', 2: '308075' };
/**
 * @class UpsellMobileContainerComponent
 * @extends {React.PureComponent}
 * @description Mobile container components for Upsells :
 * Renders the Upsell pages according to the stage <br />
 * Also renders iframe for tracking variables
 */
class UpsellMobileContainerComponent extends React.PureComponent {
  postCampaignActivatedEvent = () => {
    const { upsell } = this.props.query;
    const campaignId = campaignIds[upsell.toString()];
    if (campaignId) {
      const body = {
        campaign_id: campaignId.toString(),
        variation_id: this.props.abtastyParams.variationId,
        tracking_data: {
          device_type:
            this.props.query.device === 'desktop' ? 'DESKTOP' : 'MOBILE_PHONE',
          ip: this.props.abtastyParams.ip,
          origin: 'Promo Desktop',
          timestamp: moment().format(),
          visitor_id: this.props.abtastyParams.visitorId,
        },
      };
      axios.post('/abtasty', {
        ...body,
        action: 'campaign_activated_event',
      });
    }
  };

  upgrade = (productId, nextPage) => {
    const { cid } = this.props.query;
    this.props.addUpsellToOrder({
      productId,
      sendTo: nextPage,
      router: this.props.router,
      cid,
    });
  };

  sendTransactionDetails = (name, origin) => {
    const { localStorage } = window;
    const items = JSON.parse(localStorage.getItem('upsell1'));
    const id = items[0].OrderInfo.CustomerID.toString();
    const revenue = items.reduce(
      (agg, val) => agg + val.OrderInfo.TotalAmount,
      0,
    );
    const abtastyParams = JSON.parse(localStorage.getItem('abtastyParams'));
    const body = {
      name,
      id,
      revenue,
      shipping: '0',
      tracking_data: {
        device_type: 'MOBILE_PHONE',
        ip: abtastyParams ? abtastyParams.ip : '',
        origin,
        timestamp: moment().format(),
        visitor_id: abtastyParams ? abtastyParams.visitorId : '',
      },
    };
    axios.post('/abtasty', { ...body, action: 'transaction_event' });
  };

  render() {
    const {
      upsell, offerId, adv_sub, affId,
    } = this.props.query;
    const { abtastyParams } = this.props;
    
    return (
      <React.Fragment>
        <div id="container">
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
                  title="Upsell"
                  src="https://response-pixel.com/p.ashx?o=608&e=232"
                  frameBorder="0"
                  width="1"
                  height="1"
                  style={{ position: 'absolute' }}
                />
              )}
          </React.Fragment>
          <SuccessModal
            visible={this.props.submitStatus === 'success'}
            message="Order updated successfully."
          />
          {upsell === 1 && (
            <React.Fragment>
            {/** Offer Conversion: Yeah Keto F  */ }
            <iframe src="http://komodo.go2cloud.org/aff_l?offer_id=1" scrolling="no" frameBorder="0" width="1" height="1"></iframe>
            {/** End Offer Conversion */ }
              {this.props.isAuthentic.isAuthenticUser ? (
                <Upsell1Treatment2
                  upgrade={this.upgrade}
                  {...this.props}
                  abtastyParams={abtastyParams}
                  sendTransactionDetails={this.sendTransactionDetails}
                />
              ) : (
                <Upsell1Treatment1
                  upgrade={this.upgrade}
                  {...this.props}
                  abtastyParams={abtastyParams}
                  sendTransactionDetails={this.sendTransactionDetails}
                />
              )}
            </React.Fragment>
          )}
          {upsell === '1-1' && (
            <React.Fragment>
              {this.props.isAuthentic.isAuthenticUser ? (
                <Upsell11Treatment2
                  upgrade={this.upgrade}
                  {...this.props}
                  abtastyParams={abtastyParams}
                  sendTransactionDetails={this.sendTransactionDetails}
                />
              ) : (
                <Upsell11Treatment1
                  upgrade={this.upgrade}
                  {...this.props}
                  abtastyParams={abtastyParams}
                  sendTransactionDetails={this.sendTransactionDetails}
                />
              )}
            </React.Fragment>
          )}
          {upsell === 2 && (
            <React.Fragment>
              {this.props.isAuthentic.isAuthenticUser ? (
                <Upsell2Treatment2
                  upgrade={this.upgrade}
                  {...this.props}
                  abtastyParams={abtastyParams}
                  sendTransactionDetails={this.sendTransactionDetails}
                />
              ) : (
                <Upsell2Treatment1
                  upgrade={this.upgrade}
                  {...this.props}
                  abtastyParams={abtastyParams}
                  sendTransactionDetails={this.sendTransactionDetails}
                />
              )}
            </React.Fragment>
          )}
          {upsell === '2-1' && (
            <React.Fragment>
              {this.props.isAuthentic.isAuthenticUser ? (
                <Upsell21Treatment1
                  upgrade={this.upgrade}
                  {...this.props}
                  abtastyParams={abtastyParams}
                  sendTransactionDetails={this.sendTransactionDetails}
                />
              ) : (
                <Upsell21Treatment1
                  upgrade={this.upgrade}
                  {...this.props}
                  abtastyParams={abtastyParams}
                  sendTransactionDetails={this.sendTransactionDetails}
                />
              )}
            </React.Fragment>
          )}
          {this.props.submitStatus === 'submitting' && <Spinner />}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    submitStatus: state.order.addUpsellToOrderStatus,
    abtastyParams: state.auth.abtastyParams,
    isAuthentic: state.auth.isAuthentic,
  };
}

const UpsellMobileContainer = connect(mapStateToProps, { ...OrderActions })(
  withRouter(UpsellMobileContainerComponent),
);

export default UpsellMobileContainer;
