import React from 'react';

class PromoSectionThreeDesktop extends React.PureComponent {
  render() {
    return (
      <div className="section3">
        <div className="container">
          <p className="s3hding">
            <span>Why Yeah Keto Oil </span>
            <br /> Triple Filtration Technology For High Potency{' '}
          </p>{' '}
          <i className="s3hdimg sprite3 sprite-s2hd" />
          <p className="sec3txt bdfont">
            <strong>Yeah Keto Oil</strong> is made with the purest Cannabidiol
            extract at a certified facility to meet and exceed industry
            standards.{' '}
          </p>
          <ul className="s3list">
            <li>
              {' '}
              <i className="sprite4 sprite-s3img1" />
              <p className="s3lhding">
                Cold Press <span>&amp; Unrefined</span>
              </p>
              <p className="s3ltxt bdfont">
                Cold-pressed oil extraction to ensure full retention of
                therapeutic properties. Fully organic, no chemicals.{' '}
              </p>
            </li>
            <li>
              {' '}
              <i className="sprite4 sprite-s3img2" />
              <p className="s3lhding">
                <span>CO2</span> CBD EXTRACTION- Zero THC
              </p>
              <p className="s3ltxt bdfont">
                We use the cleanest, safest extraction method to preserve
                essential cannabinoids (CBD) and filter out the psychoactive
                compound (THC){' '}
              </p>
            </li>
            <li>
              {' '}
              <i className="sprite4 sprite-s3img3" />
              <p className="s3lhding">
                <span>Organic</span>, AMERICAN-MADE
              </p>
              <p className="s3ltxt bdfont">
                Derived from organic, Colorado grown cannabis. Certified-free of
                any synthetics, pesticides or herbicides.{' '}
              </p>
            </li>
            <li>
              {' '}
              <i className="sprite4 sprite-s3img4" />
              <p className="s3lhding">
                <span>Sublingual</span> Delivery System
              </p>
              <p className="s3ltxt bdfont">
                Designed for sublingual delivery, ensuring that our CBD Oil is
                absorbed directly into the bloodstream for rapid action &amp;
                relief.{' '}
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export { PromoSectionThreeDesktop };
