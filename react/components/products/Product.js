import React, { PureComponent } from 'react';
import { products, recommendedProducts } from 'helpers';
import Link from 'next/link';

const Slider = props => (
  <React.Fragment>
    <div className="prd-sec1-lft">
      <div className="prd-sec1-inr-lft slider-nav-thumbnails slick-initialized slick-slider">
        <div className="slick-list draggable">
          <div className="slick-track">
            <div
              className="slick-slide slick-current slick-active"
              data-slick-index="0"
              aria-hidden="false"
            >
              <div>
                <div
                  className="smll-sec"
                  onClick={() => props.sliderClick('0%')}
                >
                  <img
                    src={`/static/assets/images/cbd-${props.type}-side1.png`}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="slick-slide">
              <div>
                <div
                  className="smll-sec"
                  onClick={() => props.sliderClick('33.33%')}
                >
                  <img
                    src={`/static/assets/images/cbd-${props.type}-side2.png`}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="slick-slide">
              <div>
                <div
                  className="smll-sec"
                  onClick={() => props.sliderClick('66.66%')}
                >
                  <img
                    src={`/static/assets/images/cbd-${props.type}-side3.png`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="slider slick-initialized slick-slider">
        <div className="slick-list draggable">
          <div
            className="slick-track"
            style={{
              width: '300%',
              transition: '0.5s',
              transform: `translate3d(-${props.translate3d}, 0px, 0px)`,
            }}
          >
            <div className="slick-slide" style={{ width: '33.333%' }}>
              <div>
                <div
                  className="prd-sec1-inr-rgt"
                  style={{ width: '100%', display: 'inline-block' }}
                >
                  <img
                    src={`/static/assets/images/cbd-${props.type}-side1.png`}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="slick-slide" style={{ width: '33.333%' }}>
              <div>
                <div
                  className="prd-sec1-inr-rgt"
                  style={{ width: '100%', display: 'inline-block' }}
                >
                  <img
                    src={`/static/assets/images/cbd-${props.type}-side2.png`}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="slick-slide" style={{ width: '33.333%' }}>
              <div>
                <div
                  className="prd-sec1-inr-rgt"
                  style={{ width: '100%', display: 'inline-block' }}
                >
                  <img
                    src={`/static/assets/images/cbd-${props.type}-side3.png`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slider: { translate3d: '0%' },
    };
  }

  sliderClick = e => {
    this.setState({ slider: { translate3d: e } });
  };

  render() {
    const active_product = products[this.props.product];
    const {
      type,
      header,
      title,
      sub_title,
      description,
      bullets,
      price,
      ingredients,
      supplement,
      recommended_products,
    } = active_product;
    const { translate3d } = this.state.slider;

    return (
      <React.Fragment>
        <div className="inner-bg">
          <div className="container">
            <div className="inner-txt">
              <span>our products</span>
              <p className="comn-txt">
                Find out more about American Science&apos;s range of Cannabidiol
                extract enriched dietary supplements.{' '}
              </p>
            </div>
            <img
              src="/static/assets/images/bnr-prd.png"
              className="inner-prd for-desk for-tab"
              alt=""
            />
          </div>
        </div>

        <div className="prd-sec1">
          <div className="container">
            <Slider
              type={type}
              sliderClick={this.sliderClick}
              translate3d={translate3d}
            />

            <div className="prd-sec1-rgt">
              <p className="prd-sec1-txt1">{header}</p>
              <p className="prd-sec1-txt2">{title}</p>
              <p className="prd-sec-1txt3">{sub_title}</p>
              <p className="comn-txt prd-sec1-txt5">{description}</p>
              <ul className="prd-sec1-list">
                {bullets.map((b, i) => <li key={`b-${i}`}>{b}</li>)}
              </ul>
              <div style={{ float: 'left', width: '100%' }}>
                <p className="prd-sec1-txt6">${price.toFixed(2)}</p>
                <Link href="/cart">
                  <a className="prd-sec1-btn">
                    <img src="/static/assets/images/btn.png" alt="" />
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="container inline-bl">
            <div className="prd-sec1-lft">
              <div className="slider slick-initialized slick-slider">
                <div className="slick-list draggable">
                  <div className="slick-track" style={{ width: '100%' }}>
                    <div
                      className="slick-slide slick-current slick-active"
                      data-slick-index="0"
                      aria-hidden="false"
                    >
                      <div>
                        <div className="just ingr">{ingredients}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="prd-sec1-rgt" />
          </div>
        </div>

        <div className="prd-sec2">
          <div className="container">
            <p className="comn-hdg">Supplement Facts &amp; Directions Of Use</p>
            <p className="comn-sub-hdg">
              Find out what&apos;s inside our Cannabidiol supplements and how to
              use them for best results.
            </p>
            <img src="/static/assets/images/comn-hdg-img.png" alt="" />
            <div className="clearall" />
            <img src={supplement.image} className="cbd-label-img" alt="" />
            <div className="howtouse">
              <h3>How to use</h3>
              <ul>
                <li>
                  <span>
                    Step<br />1
                  </span>
                  <p>{supplement.how_to_use[1]}</p>
                </li>
                <li>
                  <span>
                    Step<br />2
                  </span>
                  <p>{supplement.how_to_use[2]}</p>
                </li>
                <li>
                  <span>
                    Step<br />3
                  </span>
                  <p>{supplement.how_to_use[3]}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="prd-sec3">
          <div className="container">
            <RecommendedProducts products={recommended_products} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class RecommendedProducts extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <p className="comn-hdg">Recommended Products</p>
        <p className="comn-sub-hdg">
          Complete Your American Science Supplement Stack
        </p>
        <img src="/static/assets/images/comn-hdg-img.png" alt="" />
        <ul className="prd-sec3-list">
          {this.props.products.map(key => {
            const recommendedProduct = recommendedProducts[key];
            return (
              <li key={recommendedProduct.title}>
                <img
                  src={recommendedProduct.image}
                  className="sec2-prd"
                  alt=""
                />
                <div className="prd-details">
                  <p className="prd-txt1">American Science</p>
                  <p className="prd-txt2">{recommendedProduct.title}</p>
                  <p className="prd-txt3">{recommendedProduct.sub_title}</p>
                  <p className="prd-txt4 comn-txt">
                    {recommendedProduct.description}
                  </p>
                  <a href={recommendedProduct.link}>
                    <img
                      src="/static/assets/images/btn.png"
                      className="btn"
                      alt=""
                    />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export { Product };
