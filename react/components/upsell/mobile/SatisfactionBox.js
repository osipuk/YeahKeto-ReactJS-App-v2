import React from 'react';

const SatisfactionBox = props => (
  <React.Fragment>
    <div className="up-strip" style={{ marginTop: '50px' }}>
      <h4>BENEFITS OF CANNABINOID (CBD) CAPSULES INCLUDE...</h4>
    </div>
    <div className="clearall" />
    <div className="up-bottom-box">
      <img src="/static/assets/images/up1-img1.png" alt="" />
      <p className="box-txt1">FULL SPECTRUM FORMULA</p>
      <p className="box-txt2">
        CBD Oil Capsules contains a high potency blend of 300mg - Full Spectrum
        Cannabinoids to offer maximum therapeutic benefits.
      </p>
    </div>
    <div className="up-bottom-box">
      <img src="/static/assets/images/up1-img2.png" alt="" />
      <p className="box-txt1">SUPPORTS MENTAL HEALTH </p>
      <p className="box-txt2">
        The CBD Oil Capsules help support overall cognitive health while also
        boosting focus, mental clarity, and memory recall.
      </p>
    </div>
    <div className="up-bottom-box">
      <img src="/static/assets/images/up1-img3.png" alt="" />
      <p className="box-txt1">OFFERS ANTIOXIDANT SUPPORT</p>
      <p className="box-txt2">
        CBD Oil Capsules work at a cellular level to combat free radical damage
        and boost overall immunity.{' '}
      </p>
    </div>
  </React.Fragment>
);

export { SatisfactionBox };
