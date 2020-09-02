import React from 'react';

class PromoSectionThreeMobile extends React.PureComponent {
  render() {
    return (
      <div id="section-three">
        <p className="s2-hd-txt">
          <span>WHY Yeah Keto OIL </span>
          <br />Triple Filtration Technology For High Potency
        </p>{' '}
        {/* <i className="s2-img sprite1 sprite-s3-img" /> */}
        <img
          src="/static/promo/mobile/images/s3-img.jpg"
          className="s2-img"
          alt=""
        />
        <p className="s2-txt1">
          <strong>Yeah Keto oil</strong> is made with the purest Cannabidiol
          extract at a certified facility to meet and exceed industry standards.{' '}
        </p>
        <p className="clearall" />
        <ul className="s3-list">
          <li>
            {' '}
            <i className="s3-icons sprite3 sprite-s3-icon1" />{' '}
            <span>Cold Press </span>
            <b>& Unrefined</b>
            <p className="s3-list-txt">
              Cold-pressed oil extraction to ensure full retention of
              therapeutic properties. Fully organic, no chemicals.
            </p>
          </li>
          <li>
            {' '}
            <i className="s3-icons sprite3 sprite-s3-icon2" /> <span>CO2</span>
            <b> CBD EXTRACTION- Zero THC</b>
            <p className="s3-list-txt">
              We use the cleanest, safest extraction method to preserve
              essential cannabinoids (CBD) and filter out the psychoactive
              compound (THC)
            </p>
          </li>
          <li>
            {' '}
            <i className="s3-icons sprite3 sprite-s3-icon3" />{' '}
            <span>Organic </span>
            <b>, AMERICAN-MADE</b>
            <p className="s3-list-txt">
              Derived from organic, Colorado grown cannabis. Certified-free of
              any synthetics, pesticides or herbicides.
            </p>
          </li>
          <li>
            {' '}
            <i className="s3-icons sprite3 sprite-s3-icon4" />{' '}
            <span>Sublingual </span>
            <b>Delivery System</b>
            <p className="s3-list-txt">
              Designed for sublingual delivery, ensuring that our CBD Oil is
              absorbed directly into the bloodstream for rapid action &amp;
              relief.{' '}
            </p>
          </li>
        </ul>
        <p className="clearall" />
        <div
          className="strip sprite3 sprite-strip-bg"
          style={{ 'margin-top': '50px' }}
        >
          <p className="strip-txt">
            <b>ORDER YOUR BOTTLE OF</b> <span>CBD OIL</span> <b>TODAY!</b>
            <br />Limited Time Offer - Get Free Bottles
            <br />On Select Packages
          </p>
        </div>
      </div>
    );
  }
}

export { PromoSectionThreeMobile };
