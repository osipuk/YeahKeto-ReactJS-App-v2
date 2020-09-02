import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { OrderActions } from 'redux/actions';
import moment from 'moment';
import { Footer } from 'react/components/common';

const productMapping = {
  4165: {
    imgUrl: '/static/promo/desktop/images/images/thk-prd.png',
    name: 'Yeah Keto',
    packSize: '5 Bottles',
    price: 195,
  },
  4163: {
    imgUrl: '/static/promo/desktop/images/images/thk-prd.png',
    name: 'Yeah Keto',
    packSize: '3 Bottles',
    price: 147,
  },
  4161: {
    imgUrl: '/static/promo/desktop/images/images/thk-prd.png',
    name: 'Yeah Keto',
    packSize: '1 Bottles',
    price: 69,
  },
  4168: {
    imgUrl: '/static/promo/desktop/images/images/thk-prd-2.png',
    name: 'Yeah Forskolin',
    packSize: '1 Bottles',
    price: 49.99,
  },
  4166: {
    imgUrl: '/static/promo/desktop/images/images/thk-prd-1.png',
    name: 'Yeah Caralluma',
    packSize: '1 Bottles',
    price: 49.99,
  },
  4167: {
    imgUrl: '/static/promo/desktop/images/images/thk-prd-2.png',
    name: 'Yeah Forskolin',
    packSize: '3 Bottles',
    price: 77,
  },
  4169: {
    imgUrl: '/static/promo/desktop/images/images/thk-prd-1.png',
    name: 'Yeah Caralluma',
    packSize: '3 Bottles',
    price: 77,
  },
};

/**
 * @class ThankyouDesktopComponent
 * @extends {React.Component}
 * @description Common Thankyou page between promo flow and cart flow on desktop
 */
class ThankyouDesktopComponent extends React.Component {
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
        <div className="up-top">
          <div className="inner-container">
            <p className="topbartxt">
              <span>WARNING:</span> Due to extremely high media demand, there is
              limited supply of <span>Yeah Keto</span> in stock as of{' '}
              <span>{moment().format('dddd, ll')}</span>
            </p>
          </div>
        </div>
        <div className="up-bg thnk-pg">
          <div className="inner-container">
            <img
              src="/static/promo/desktop/images/images/logo.png"
              alt="logo"
              className="up-logo"
            />
            <img
              src="/static/promo/desktop/images/images/ty-hdr.png"
              alt="thank you"
              className="up-steps"
            />
            <div className="inr-thnk">
              <p className="up-hdg grn-clr">Congratulations!</p>
              <p className="up-sub-hdg">
                You{"'"}ve taken the first step to better health and wellness.
                We are confident that <br className="for-desk" />
                you will enjoy the benefits of Yeah Keto products.
              </p>
              <div className="thnk-recpt-box">
                <p className="thk-p1">Order Reciept</p>
                <div className="thnk-lft">
                  <div className="thk-in-lft">
                    <p className="thk-p2">
                      <span>Order Placed:</span>{' '}
                      {moment(this.state.leadData.dateCreated).format('LLLL')}
                    </p>
                    <p className="thk-p2">
                      <span>Order Number:</span> {this.state.leadData.orderId}
                    </p>
                  </div>
                  <div className="thk-in-lft">
                    <p className="thk-p2">
                      <span>Estimated Delivery Date: </span>
                    </p>
                    <p className="thk-p2">
                      {moment(this.state.leadData.dateCreated)
                        .add(3, 'days')
                        .format('LLLL')}
                    </p>
                    <p className="thk-p2" />
                  </div>
                  <div className="thk-in-box">
                    <div className="thk-dtl-l">
                      <p className="thk-p3">Items Orderd</p>
                      <div className="thk-prds">
                        {items.map(item => (
                          <div className="thk-prd-row">
                            <div className="thk-prd-box">
                              <img src={item.imgUrl} alt="item" />
                            </div>
                            <p className="thk-p2">
                              <span>{item.name}</span>
                              <span className="fr">${item.price}</span>
                            </p>
                            <p className="thk-p2 gry-clr">{item.packSize} </p>
                          </div>
                        ))}
                      </div>
                      <div className="thk-total-div">
                        <div className="thk-total-inn">
                          <p className="thk-p4">
                            Sub Total: <span>${totalPrice}</span>
                          </p>
                          <p className="thk-p4 brd-tb">
                            Shipping &amp; handling:{' '}
                            <span className="grn-clr">
                              <b>FREE</b>
                            </span>
                          </p>
                          <p className="thk-p4">
                            Total: <span>${totalPrice}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="thk-dtl-r">
                  <p className="thk-p3">Shipping Info</p>
                  <ul className="user-info">
                    <li>
                      <span>First Name:</span> {this.state.leadData.firstName}
                    </li>
                    <li>
                      <span>Last Name:</span>
                      {this.state.leadData.lastName}
                    </li>
                    <li>
                      <span>Address:</span>
                      {this.state.leadData.address1},{' '}
                      {this.state.leadData.address2}
                    </li>
                    <li>
                      <span>City:</span>
                      {this.state.leadData.city}
                    </li>
                    <li>
                      <span>State:</span>
                      {this.state.leadData.state}
                    </li>
                    <li>
                      <span>Zip Code:</span>
                      {this.state.leadData.postalCode}
                    </li>
                    <li>
                      <span>Phone:</span>
                      {this.state.leadData.phoneNumber}
                    </li>
                    <li>
                      <span>Email:</span>
                      {this.state.leadData.emailAddress}
                    </li>
                  </ul>
                  <p className="thk-p3 pad-top">Billing Info</p>
                  <ul className="user-info">
                    <li>
                      <span>First Name:</span> {this.state.leadData.firstName}
                    </li>
                    <li>
                      <span>Last Name:</span>
                      {this.state.leadData.lastName}
                    </li>
                    <li>
                      <span>Address:</span>
                      {`${this.state.leadData.address1} ${
                        this.state.leadData.address2
                      }`}
                    </li>
                    <li>
                      <span>City:</span>
                      {this.state.leadData.city}
                    </li>
                    <li>
                      <span>State:</span>
                      {this.state.leadData.state}
                    </li>
                    <li>
                      <span>Zip Code:</span>
                      {this.state.leadData.postalCode}
                    </li>
                    <li>
                      <span>Phone:</span>
                      {this.state.leadData.phoneNumber}
                    </li>
                    <li>
                      <span>Email:</span>
                      {this.state.leadData.emailAddress}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    order: state.order.order,
  };
}

const ThankyouDesktop = connect(mapStateToProps, { ...OrderActions })(
  withRouter(ThankyouDesktopComponent),
);

export default ThankyouDesktop;
