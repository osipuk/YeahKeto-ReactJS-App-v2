import React, { PureComponent } from 'react';
import { products, getTyProductImage } from 'helpers';

/**
 * @class
 * @description renders products for the user to select
 * @extends {PureComponent}
 */
class ChooseProductsForm extends PureComponent {
  /**
   * @memberof ChooseProductsForm
   * @function
   * @description calculate total of prices of the products in the cart
   */
  getTotal = () => {
    const { cart } = this.props;
    let total = 0;
    Object.keys(cart).forEach(productId => {
      total += cart[productId].product.price * cart[productId].quantity;
    });
    return total.toFixed(2);
  };

  /**
   * @memberof ChooseProductsForm
   * @function
   * @description calculates price for the selected quantity of a product
   */
  getSubTotal = product => {
    const { cart } = this.props;
    const productId = product.id;
    if (cart[productId]) {
      return (cart[productId].product.price * cart[productId].quantity).toFixed(
        2,
      );
    }
    return (0).toFixed(2);
  };

  /**
   * @memberof ChooseProductsForm
   * @function
   * @description updates the cart
   */
  selectProduct = (e, product, index) => {
    this.props.update({
      index,
      product,
      quantity: e.target.value,
    });
  };

  render() {
    return (
      <form id="product_select">
        <table
          border="0"
          cellSpacing="0"
          cellPadding="0"
          width="97%"
          className="tbl2"
        >
          <tbody>
            {Object.values(products).map((product, index) => (
              <tr key={product.name}>
                <td className="row2 txt1-cart midc1">
                  <img
                    alt=""
                    src={getTyProductImage(product)}
                    className="procrt"
                  />
                  <p className="txt3-crt">
                    {product.header}
                    <br />
                    <span>{product.title}</span>
                  </p>
                </td>
                <td className="row2 txt1-cart midc2">
                  <select
                    className="drop"
                    onChange={e => {
                      this.selectProduct(e, product, index);
                    }}
                    defaultValue="0"
                  >
                    {[0, 1, 2, 3, 4, 5].map(count => (
                      <option key={count} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                </td>
                <td
                  className="row2 txt1-cart midc3 pinktxt1"
                  id="cbd-oil-price"
                >
                  ${this.getSubTotal(product)}
                </td>
              </tr>
            ))}
            <tr>
              <td>&nbsp;</td>
              <td colSpan="2">
                <table border="0" cellSpacing="0" cellPadding="0" width="100%">
                  <tbody>
                    <tr>
                      <td className="sec1crt-row4td-l">Total</td>
                      <td className="sec1crt-row4td-r" id="product-total">
                        ${this.getTotal()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td colSpan="2">
                <table border="0" cellSpacing="0" cellPadding="0" width="100%">
                  <tbody>
                    <tr>
                      <td className="sec1crt-row4td-l">Shipping</td>
                      <td className="sec1crt-row4td-r">FREE</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td style={{ float: 'left' }} />
              <td colSpan="2">
                <table border="0" cellSpacing="0" cellPadding="0" width="100%">
                  <tbody>
                    <tr>
                      <td className="sec1crt-row4td-l grand">Grand Total</td>
                      <td
                        className="sec1crt-row4td-r grand"
                        id="product-grand-total"
                      >
                        ${this.getTotal()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}

export { ChooseProductsForm };
