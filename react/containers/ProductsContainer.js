import React from 'react';
import { Header, Footer } from 'react/components/common';
import { Product } from 'react/components/products';

class ProductsContainer extends React.PureComponent {
  render() {
    const { product } = this.props.query;
    return (
      <React.Fragment>
        <Header />
        <Product product={product} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default ProductsContainer;
