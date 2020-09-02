import React, { PropTypes } from 'react';

const Control_411715 = (props) => (
  <div className="s5-left-wrapper">
    <div className="s5left">
      <i className="vdo-arw sprite5 sprite-vdo-arw" />
      <div
        className="wistia_responsive_padding"
        style={{ padding: '56.25% 0 0 0', position: 'relative' }}
      >
        <div
          className="wistia_responsive_wrapper"
          style={{
              height: '277px',
              left: 0,
              position: 'absolute',
              top: 0,
              width: '490px',
            }}
        >
          <iframe
            src="https://fast.wistia.net/embed/iframe/qny03evham?videoFoam=true"
            title="Wistia video player"
            allowTransparency="true"
            frameBorder="0"
            scrolling="no"
            className="wistia_embed"
            name="wistia_embed"
            allowFullScreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            oallowfullscreen="true"
            msallowfullscreen="true"
            width="490px"
            height="277px"
          />
        </div>
      </div>
      <p className="limited-offer">HURRY! Limited Time Offer</p>
      <div id="clockdiv">
        <div>
          <span className="hours">{props.hours}</span>
          <p>HOUR</p>
        </div>
        <p className="colon">:</p>
        <div>
          <span className="minutes">{props.minutes}</span>
          <p>Minute</p>
        </div>
        <p className="colon">:</p>
        <div>
          <span className="seconds">{props.seconds}</span>
          <p>SECONDS</p>
        </div>
      </div>
    </div>
    <div className="s5right">
      <p className="s5-txt5">
        <span>BENEFITS OF CBD </span>
        <br />HAVE BEEN SEEN ON{' '}
      </p>
      <i className="s5-logos sprite4 sprite-s5-logos" />
    </div>
  </div>
);

Control_411715.displayName = 'Control_411715';

export default Control_411715;
