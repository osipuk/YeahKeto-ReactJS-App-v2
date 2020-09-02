import React, { PureComponent } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { createNewSession } from 'redux/actions/authActions';
import { ChooseProductsForm } from './ChooseProductsForm';
import { CartFormContainer } from './CartForm';
import { Spinner, PromoSession } from '../common';
import { OrderActions } from '../../../redux/actions';

/**
 * @class
 * @description Cart Component for both mobile and desktop <br />
 * Renders ChooseProductsForm and CartFormContainer
 * @extends {PureComponent}
 */
class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
    };
  }

  /**
   * @memberof Cart
   * @function
   * @description call create session saga and start clear local storage
   */
  componentDidMount() {
    const { localStorage } = window;
    this.props.createNewSession();
    localStorage.clear();
  }

  /**
   * @memberof Cart
   * @function
   * @description calls two sagas: submitLeadsForm and placeOrder
   */
  submit = values => {
    if (this.isProductsEmpty()) {
      window.scrollTo(0, 0);
      return;
    }
    const { products } = this.state;
    const orderPayload = {};
    Object.values(products).forEach(item => {
      if (item.quantity > 0) {
        orderPayload[`${item.label}id`] = item.product.id;
        orderPayload[`${item.label}qty`] = item.quantity;
      }
    });
    values.order = { ...values.order, ...orderPayload };
    values.process_sync = 'true';
    const valuesCopy = values;
    valuesCopy.cart = true;
    this.props.submitLeadsForm({
      values,
      cart: true,
      nextUrl: '',
      router: this.props.router,
    });

    this.props.placeOrder({
      values: valuesCopy,
      pack: this.state.selected,
      router: this.props.router,
      nextUrl: 'thankyou',
    });
  };

  /**
   * @memberof Cart
   * @function
   * @description updates products or quantities in the cart
   */
  updateProducts = details => {
    const { index, product, quantity } = details;
    const products = { ...this.state.products };
    products[product.id] = {
      product,
      quantity,
      label: `product${index + 1}_`,
    };
    this.setState({ products });
  };

  /**
   * @memberof Cart
   * @function
   * @returns {boolean} true if cart is empty
   */
  isProductsEmpty = () => {
    const { products } = this.state;
    const productSelected =
      Object.values(products).filter(product => product.quantity > 0).length >
      0;
    return !productSelected;
  };

  render() {
    return (
      <React.Fragment>
        <Head>
          <script type="text/javascript" src="/static/assets/js/geoSearch.js" />
        </Head>
        <div className="inner-bg">
          <div className="container">
            <div className="inner-txt">
              <span>CART</span>
              <p className="comn-txt">
                Congratulations! You&#8217;re one step closer to better health.{' '}
                <br className="for-desk" />Use our secure checkout to complete
                your order.
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
          <div className="sec1-cartin">
            <table
              border="0"
              cellSpacing="0"
              cellPadding="0"
              width="100%"
              className="tbl1"
            >
              <tbody>
                <tr>
                  <td className="row1" style={{ paddingLeft: '8%' }}>
                    Product
                  </td>
                  <td className="row1 c2">QTY.</td>
                  <td className="row1 c3">Price</td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <ChooseProductsForm
                      update={this.updateProducts}
                      cart={this.state.products}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="clearall">
              <div className="sec1crt-frm" id="select_cart_form">
                <div className="confidence">
                  <p className="txtconfi">Shop With Confidence</p>
                  <img
                    alt=""
                    src="/static/assets/images/confidence.jpg"
                    className="confi-img"
                  />
                </div>
                <CartFormContainer onSubmit={this.submit} />
              </div>
            </div>
          </div>
        </div>
        {this.props.sessionId && <PromoSession pageType="leadPage" />}
        {this.props.submitStatus === 'submitting' && <Spinner />}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    sessionId: state.auth && state.auth.sessionId,
    submitStatus: state.order.submitLeadsFormStatus,
  };
}

const CartPage = connect(mapStateToProps, {
  ...OrderActions,
  createNewSession,
})(withRouter(Cart));

export { CartPage };
