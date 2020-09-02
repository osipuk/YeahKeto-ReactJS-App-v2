import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { OrderActions } from 'redux/actions';
import moment from 'moment';
import { FooterMobileNew } from 'react/components/common';

const productMapping = {
  4165: {
    imgUrl: '/static/promo/mobile/images/images/thk-prd.png',
    name: 'Yeah Keto',
    packSize: '5 Bottles',
    price: 195,
  },
  4163: {
    imgUrl: '/static/promo/mobile/images/images/thk-prd.png',
    name: 'Yeah Keto',
    packSize: '3 Bottles',
    price: 147,
  },
  4161: {
    imgUrl: '/static/promo/mobile/images/images/thk-prd.png',
    name: 'Yeah Keto',
    packSize: '1 Bottles',
    price: 69,
  },
  4168: {
    imgUrl: '/static/promo/mobile/images/images/thk-prd-2.png',
    name: 'Yeah Forskolin',
    packSize: '1 Bottles',
    price: 49.99,
  },
  4166: {
    imgUrl: '/static/promo/mobile/images/images/thk-prd-1.png',
    name: 'Yeah Caralluma',
    packSize: '1 Bottles',
    price: 49.99,
  },
};

/**
 * @class ThankyouMobileComponent
 * @extends {React.PureComponent}
 * @description Common Thankyou page between promo flow and cart flow on mobile
 */
class ThankyouMobileComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    const { localStorage } = window;
    this.state = {
      leadData: JSON.parse(localStorage.getItem('leadData')),
    };
  }

  render() {
    const { localStorage } = window;
    const products = JSON.parse(localStorage.getItem('pdcts'));
    const items = [];
    let totalPrice = 0;
    products.forEach(prod => {
      totalPrice += productMapping[prod.productId].price;
      items.push(productMapping[prod.productId]);
    });
    totalPrice = totalPrice.toFixed(2);

    return (
      <div className="container">
        <div className="upsell-hdr" style={{ padding: '17px 0 10px' }}>
          <img src="/static/promo/mobile/images/images/logo.png" alt="logo" />
        </div>
        <div className="upsell-midbd dsplay">
          <p className="thnk-hding">THANK YOU FOR YOUR PURCHASE</p>
          <p className="thnk-txt">
            We hope you enjoy the benefits of <b>Yeah Keto</b>
            <br />
            Your order is scheduled to arrive by<br />
            <span>
              {moment(this.state.leadData.dateCreated)
                .add(3, 'days')
                .format('dddd, LL')}
            </span>
            <span />
          </p>
          <p className="odr-rcpt">ORDER RECEIPT</p>
          <p className="odr-rcpt-txt">
            Order Placed:{' '}
            {moment(this.state.leadData.dateCreated).format('dddd, LL')} <br />
            Order Number: {this.state.leadData.orderId}
            <br />
            Items Ordered:
          </p>

          {items.map(item => (
            <div>
              <p className="order-name">{item.name}</p>
              <p className="order-dtl">
                {item.packSize}{' '}
                <span className="span1 span2">${item.price}</span>
              </p>
              <div className="updvdr" />
              <p className="order-dtl">
                Shipping &amp; Handling: <span className="span1">$0.00</span>
              </p>
            </div>
          ))}

          <p className="order-total">
            Total <span className="span1">${totalPrice}</span>
          </p>
        </div>
        <div className="info-box dsplay">
          <p className="info-hding1">Shipping Info</p>
          <ul className="info-list">
            <li>
              <span className="span1">First Name:</span>{' '}
              {this.state.leadData.firstName}
            </li>
            <li>
              <span className="span1">Last Name:</span>
              {this.state.leadData.lastName}
            </li>
            <li>
              <span className="span1">Address:</span>
              {this.state.leadData.address1}, {this.state.leadData.address2}
            </li>
            <li>
              <span className="span1">City:</span>
              {this.state.leadData.city}
            </li>
            <li>
              <span className="span1">State:</span>
              {this.state.leadData.state}
            </li>
            <li>
              <span className="span1">Zip Code:</span>
              {this.state.leadData.postalCode}
            </li>
            <li>
              <span className="span1">Phone:</span>
              {this.state.leadData.phoneNumber}
            </li>
            <li>
              <span className="span1">Email:</span>
              {this.state.leadData.emailAddress}
            </li>
          </ul>
          <div className="clearall" />
          <p className="info-hding2">Billing Info</p>
          <ul className="info-list">
            <li>
              <span className="span1">First Name:</span>{' '}
              {this.state.leadData.firstName}
            </li>
            <li>
              <span className="span1">Last Name:</span>
              {this.state.leadData.lastName}
            </li>
            <li>
              <span className="span1">Address:</span>
              {`${this.state.leadData.address1} ${
                this.state.leadData.address2
              }`}
            </li>
            <li>
              <span className="span1">City:</span>
              {this.state.leadData.city}
            </li>
            <li>
              <span className="span1">State:</span>
              {this.state.leadData.state}
            </li>
            <li>
              <span className="span1">Zip Code:</span>
              {this.state.leadData.postalCode}
            </li>
            <li>
              <span className="span1">Phone:</span>
              {this.state.leadData.phoneNumber}
            </li>
            <li>
              <span className="span1">Email:</span>
              {this.state.leadData.emailAddress}
            </li>
          </ul>
        </div>
        <FooterMobileNew />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    order: state.order.order,
  };
}

const ThankyouMobile = connect(mapStateToProps, { ...OrderActions })(
  withRouter(ThankyouMobileComponent),
);

export default ThankyouMobile;
