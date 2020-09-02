import React from 'react';
// import { Footer } from 'react/components/common';
import { withRouter } from 'next/router';
import { packages, getQueryString } from 'helpers';
import { FooterMobileNew } from 'react/components/common';

/**
 * @class MobileSelectPackageContainer
 * @extends {React.PureComponent}
 * @description selection of packages, comes before shipping page on mobile
 */
class MobileSelectPackageContainer extends React.PureComponent {
  selectPackage = pack => {
    const { localStorage } = window;
    window.location.assign(
      `/promo/mobile/confirm?${getQueryString()}&productId=${pack.id}`,
    );
    localStorage.setItem('pack', JSON.stringify(pack));
  };

  render() {
    return (
      <div id="container">
        <img
          src="/static/promo/mobile/images/images/top-img.jpg"
          alt="top"
          className="img-resp"
        />
        <p className="chk-toptxt1 chk-toptxt1-bdr">SELECT YOUR PACKAGE</p>
        <div className="clearall" />

        {packages.map(pack => (
          <div className="slct-box1" key={pack.id}>
            <div className="slct-mid">
              <p className="seclt-txt1">{pack.title}</p>
            </div>
            <img
              src={`/static/promo/mobile/images/images/${pack.img}`}
              alt="pack"
              className="pack1-prod"
            />
            <p className="seclt-txt2">{pack.msg}</p>
            <div className="select-mid-sec">
              <p className="seclt-reg-txt">
                REGULAR{' '}
                <span>
                  {pack.regularPrice}
                  <img
                    src="/static/promo/mobile/images/images/cut-line.png"
                    alt="pack cut"
                  />
                </span>
              </p>
              <div className="p5-pkgchk">
                <p className="prc-details-txt1">{pack.price}</p>
                <p className="prc-details-txt2">/ea</p>
              </div>
              <p className="s-mid-txt2">You Save: $139.98</p>
              <p className="s-mid-txt3">FREE SHIPPING</p>
              <div
                className="link-container-5"
                onClick={() => this.selectPackage(pack)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src="/static/promo/mobile/images/images/select-btn2.png"
                  alt="select pack"
                />
              </div>
            </div>
          </div>
        ))}
        <div className="clearboth" />
        <FooterMobileNew />
      </div>
    );
  }
}

// eslint-disable-next-line
MobileSelectPackageContainer = withRouter(MobileSelectPackageContainer);

export default MobileSelectPackageContainer;
