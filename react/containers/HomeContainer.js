import React, { PureComponent } from 'react';
import { Header, Footer } from 'react/components/common';

const Strip = () => (
  <div className="strip-sec">
    <div className="container">
      <ul className="strip-list">
        <li>
          <img src="/static/assets/images/strip-lst-img2.png" alt="" />
          <p>
            <span>All Natural</span>
            <br />Safe &amp; Effective
          </p>
        </li>
        <li>
          <img src="/static/assets/images/strip-lst-img3.png" alt="" />
          <p>
            <span>Made In USA</span>
            <br />Premium Quality
          </p>
        </li>
        <li>
          <img src="/static/assets/images/strip-lst-img4.png" alt="" />
          <p>
            <span>Customer Support</span>
            <br />24x7 via Email / Phone
          </p>
        </li>
        <li>
          <img src="/static/assets/images/strip-lst-img1.png" alt="" />
          <p>
            <span>Quick Shipping</span>
            <br />Within 1 - 2 days
          </p>
        </li>
      </ul>
    </div>
  </div>
);

const Frame = props => (
  <div className={props.sec}>
    <div className="container">{props.children}</div>
  </div>
);

class HomeContainer extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="bnr-sec">
          <div className="container">
            <div className="bnr-lft">
              <p className="bnr-txt1">
                Dietary Health &amp; Wellness Supplements
              </p>
              <span>Enriched With Cannabidiol Extract</span>
              <img
                src="/static/assets/images/bnr-img-btm.png"
                alt=""
                className="bnr-img-btm"
              />
              <img
                src="/static/assets/images/bnr-prd.png"
                alt=""
                className="bnr-prd for-mob"
              />
              <p className="comn-txt for-desk for-tab">
                American Science supplements are infused with Cannabidiol
                extract that is enriched with over 80 cannabinoids that offer a
                wide range of therapeutic health benefits.{' '}
              </p>
              <a href="/hemp-oil">
                <img
                  src="/static/assets/images/btn.png"
                  alt=""
                  className="bnr-btn"
                />
              </a>
            </div>
            <div className="bnr-rgt for-desk for-tab mob-hide">
              <img src="/static/assets/images/bnr-prd.png" alt="" />
            </div>
          </div>
        </div>
        <Strip />
        <Frame sec="sec1">
          <p className="comn-hdg">Welcome to American Science</p>
          <p className="comn-sub-hdg">
            Premium Quality Cannabidiol Extract Products
          </p>
          <img src="/static/assets/images/comn-hdg-img.png" alt="" />
          <p className="comn-txt">
            American Science is a leading brand of Cannabidiol extract dietary
            supplements that offer a wide range of physical, psychological and
            neurological therapeutic benefits. Our range of products includes
            Cannabidiol enriched oil, Cannabidiol extract capsules, and a
            nootropic formula. All our products are third-party tested to
            maintain uncompromising Cannabidiol extract quality & purity
            standards.
            <br />
            <br />
            <strong className="comn-txt">
              Get ready to experience the benefits of safe & effective American
              Science CBD products & join the leading health & wellness
              revolution.
            </strong>
          </p>
          <ul className="sec1-list">
            <li>
              <img src="/static/assets/images/sec1-list-img3.png" alt="" />
              <span>100% ORGANIC & NATURAL</span>
              <p className="comn-txt">
                American Science products are formulated with Cannabidiol
                extract that is organically grown and harvested in the USA to
                meet and exceed industry standards.
              </p>
            </li>
            <li>
              <img src="/static/assets/images/sec1-list-img2.png" alt="" />
              <span>ZERO THC GUARANTEE</span>
              <p className="comn-txt">
                American Science products are made with Cannabidiol extract
                derived using CO2 extraction, which filters out the high-causing
                compound called THC from the Cannabidiol extract.
              </p>
            </li>
            <li>
              <img src="/static/assets/images/sec1-list-img1.png" alt="" />
              <span>MULTIPLE LIFESTYLE BENEFITS</span>
              <p className="comn-txt">
                Cannabidiol Extract supplements help reduce anxiety & stress,
                support joint health to alleviate pain & aches and improve
                overall cognitive function & health.
              </p>
            </li>
          </ul>
        </Frame>
        <div className="parlx-sec">
          <div className="container">
            <span>
              Experience Holistic Health & Wellness With American Science
            </span>
            <p className="comn-txt">
              Our Cannabidiol enriched supplements include full spectrum
              cannabinoids (CBD) that help with quicker absorption, faster
              action, and excellent results!
            </p>
            <a href="/hemp-oil">
              <img src="/static/assets/images/btn.png" alt="" className="btn" />
            </a>
          </div>
        </div>
        <Frame sec="sec2">
          <p className="comn-hdg">OUR PRODUCT RANGE</p>
          <p className="comn-sub-hdg">
            Explore American Science&#8217;s Custom Formulations
          </p>
          <img src="/static/assets/images/comn-hdg-img.png" alt="" />
          <p className="comn-txt">&nbsp;</p>
          <ul className="sec2-list">
            <li>
              <img
                src="/static/assets/images/sec2-prd1.png"
                alt=""
                className="sec2-prd"
              />
              <div className="prd-details">
                <p className="prd-txt1">American Science</p>
                <p className="prd-txt2">CBD Oil</p>
                <p className="prd-txt3">Pure Cannabidiol complex</p>
                <p className="prd-txt4 comn-txt">
                  CBD oil may help reduce pains &amp; aches while improving mood
                  patterns &amp; relaxation.
                </p>
                <a href="/hemp-oil">
                  <img
                    src="/static/assets/images/btn.png"
                    alt=""
                    className="btn"
                  />
                </a>
              </div>
            </li>
            <li>
              <img
                src="/static/assets/images/sec2-prd2.png"
                alt=""
                className="sec2-prd"
              />
              <div className="prd-details">
                <p className="prd-txt1">American Science</p>
                <p className="prd-txt2">CBD capsules</p>
                <p className="prd-txt3">Pure Cannabidiol complex</p>
                <p className="prd-txt4 comn-txt">
                  CBD Capsules may help support joint health &amp; may promote
                  better sleep quality.
                </p>
                <a href="/hemp-capsule">
                  <img
                    src="/static/assets/images/btn.png"
                    alt=""
                    className="btn"
                  />
                </a>
              </div>
            </li>
            <li>
              <img
                src="/static/assets/images/sec2-prd3.png"
                alt=""
                className="sec2-prd"
              />
              <div className="prd-details">
                <p className="prd-txt1">American Science</p>
                <p className="prd-txt2">Warming balm</p>
                <p className="prd-txt3">Premium Cognitive Function</p>
                <p className="prd-txt4 comn-txt">
                  Warming balm may help support relief from problems like
                  soreness, inflammation, and irritated skin.
                </p>
                <a href="/warming_balm">
                  <img
                    src="/static/assets/images/btn.png"
                    alt=""
                    className="btn"
                  />
                </a>
              </div>
            </li>
          </ul>
        </Frame>
        <Footer />
      </React.Fragment>
    );
  }
}

export default HomeContainer;
