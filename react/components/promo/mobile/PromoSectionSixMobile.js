import React from 'react';

class PromoSectionSixMobile extends React.PureComponent {
  render() {
    return (
      <div id="section-six">
        <p className="s2-hd-txt">
          <span>REAL PEOPLE. REAL RESULTS. </span>
          <br />Customer Testimonials From American Science Customers
        </p>
        <p className="s5-txt1">
          Find out how <strong>Yeah Keto Oil&#39;s</strong> therapeutic benefits
          have helped people enjoy a healthier and fuller lifestyle.{' '}
        </p>
        <div className="t-box sprite2 sprite-t-box">
          <p className="t-txt1">
            Finally, a high-performance hemp product that delivers results.{' '}
          </p>
          <p className="t-txt2">
            I was introduced to American Science’s CBD Oil by a colleague who
            spoke highly of its benefits as a safe alternative to my anxiety
            medication. I decided to give it a shot and since then have become a
            major advocate of its benefits. It helps me sleep better, wake up
            refreshed and power through my day. I’m anxiety free thanks to
            American Science.
          </p>{' '}
          <i className="t-img1 sprite3 sprite-t-img1" />{' '}
          <i className="stars sprite3 sprite-stars" />
          <p className="t-txt3">
            <span>Jim V. |</span> Los Angeles{' '}
          </p>
        </div>
        <div className="t-box sprite2 sprite-t-box">
          <p className="t-txt1">
            CBD Oil has helped me eliminate my chronic pains &amp; aches!{' '}
          </p>
          <p className="t-txt2">
            My physical therapist recommended I give CBD Oil a try to combat the
            joint pain that has plagued me for years. After roughly 1 month
            using the CBD oil, there’s been a significant difference in my
            mobility. The best news? My joint pain is gone, and I can finally
            enjoy walks and a more active lifestyle again!{' '}
          </p>{' '}
          <i className="t-img1 sprite3 sprite-t-img2" />
          <i className="stars sprite3 sprite-stars" />
          <p className="t-txt3">
            <span>Erica J. | </span>South Carolina{' '}
          </p>
        </div>
        <p className="clearall" />
        <div
          className="strip sprite3 sprite-strip-bg"
          style={{ 'margin-top': '40px' }}
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

export { PromoSectionSixMobile };
