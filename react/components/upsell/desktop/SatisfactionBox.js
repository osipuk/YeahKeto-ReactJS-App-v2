import React from 'react';

const SatisfactionBox = props => (
  <React.Fragment>
    <div className="upsell-strip">
      <h4 className="strip-txt3">
        BENEFITS OF CANNABINOID (CBD) CAPSULES INCLUDE...
      </h4>
    </div>
    <div className="clearall" />
    <div className="up-bottom-box box1">
      <img src="/static/assets/images/full-spect.jpg" alt="" />
      <p className="box-txt1">FULL SPECTRUM FORMULA</p>
      <p className="box-txt2">
        CBD Oil Capsules contains a high potency blend of 300mg - Full Spectrum
        Cannabinoids to offer maximum therapeutic benefits.
      </p>
    </div>
    <div className="up-bottom-box">
      <img src="/static/assets/images/mental-health.jpg" alt="" />
      <p className="box-txt1">SUPPORTS MENTAL HEALTH </p>
      <p className="box-txt2">
        The CBD Oil Capsules help support overall cognitive health while also
        boosting focus, mental clarity, and memory recall.
      </p>
    </div>
    <div className="up-bottom-box">
      <img src="/static/assets/images/anti-oxident.jpg" alt="" />
      <p className="box-txt1">OFFERS ANTIOXIDANT SUPPORT</p>
      <p className="box-txt2">
        CBD Oil Capsules work at a cellular level to combat free radical damage
        and boost overall immunity.{' '}
      </p>
    </div>
    <div className="bnt-sec">
      <a
        id="order-pulse-satisfaction-box-desktop"
        href="javascript:void(0)"
        onClick={props.onUpgrade}
      >
        <img
          src="/static/assets/images/ord-btn.png"
          alt=""
          className="ord-btn pulse"
          width="370"
          height="71"
        />
      </a>
      <p className="thanks-txt">
        <a
          id="skip-pulse-satisfaction-box-desktop"
          href="javascript:void(0)"
          onClick={props.onSkip}
        >
          <img
            src="/static/assets/images/cut-icon.png"
            alt=""
            className="cut-icon"
            width="15"
            height="15"
          />{' '}
          No, I don't want better results.
        </a>
      </p>
    </div>
  </React.Fragment>
);

export { SatisfactionBox };
