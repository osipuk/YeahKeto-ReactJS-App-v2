import React from 'react';
import { connect } from 'react-redux';
// import { PromoContactMobile } from 'react/containers';

class PromoSectionOneMobileComponent extends React.PureComponent {
  render() {
    const variation317679 = this.props.isAuthentic.isAuthenticUser
      ? '418317'
      : '418318';
    const variation317677 = this.props.isAuthentic.isAuthenticUser
      ? '418314'
      : '418313';
    return (
      <div
        id="section-one"
        className="sprite2 sprite-sec1"
        style={{
          backgroundPosition: this.props.isAuthentic.isAuthenticUser
            ? '-654px -899px'
            : '-2350px -866px',
        }}
      >
        <i className={`s1-logo sprite3 sprite-s1-logo-${variation317679}`} />
        <i
          className={`s1-hd sprite3 sprite3-${
            this.props.isAuthentic.isAuthenticUser ? '414125' : '414126'
          } sprite-s1-hd`}
        />
        {this.props.isAuthentic.isAuthenticUser ? (
          <p className="s1-txt4">
            Derived from organic, US-harvested hemp, lab-tested for quality.
            Clinically proven therapeutic effects.
          </p>
        ) : null}
        {!this.props.isAuthentic.isAuthenticUser ? (
          <p className="s1-txt4">
            For a limited, receive a FREE bottle of our FDA Approved CBD Oil on
            your first order (no prescription required).
          </p>
        ) : null}
        <p className="clearall" />
        {!this.props.isAuthentic.isAuthenticUser ? (
          <ul className="s1-list">
            <li>
              <i className="sprite3 sprite-s1-tick" />
              <span>Relieves</span>
              <br /> Anxiety &amp; Stress
            </li>
            <li>
              <i className="sprite3 sprite-s1-tick" />
              <span>Eliminates</span>
              <br /> Chronic Pain &amp; Aches
            </li>
            <li>
              <i className="sprite3 sprite-s1-tick" />
              <span>Promotes</span>
              <br /> Mood &amp; Sleep Patterns
            </li>
            <li>
              <i className="sprite3 sprite-s1-tick" />
              <span>Enhances </span>
              <br /> Focus &amp; Clarity
            </li>
          </ul>
        ) : null}
        {this.props.isAuthentic.isAuthenticUser ? (
          <ul className="s1-list">
            <li>
              <i className="sprite3 sprite-s1-tick" />
              <span>Relieves</span>
              <br /> Chronic Pain &amp; Arthritis
            </li>
            <li>
              <i className="sprite3 sprite-s1-tick" />
              <span>Alleviates</span>
              <br /> Anxiety &amp; Stress
            </li>
            <li>
              <i className="sprite3 sprite-s1-tick" />
              <span>Lowers</span>
              <br /> Blood Sugar
            </li>
            <li>
              <i className="sprite3 sprite-s1-tick" />
              <span>Improves </span>
              <br /> Mood &amp; Concentration
            </li>
          </ul>
        ) : null}
        <p className="clearall" />{' '}
        <i className={`as-seen sprite1 sprite-as-seen-${variation317677}`} />
        {/* <i className="s1-bottle sprite3 sprite-s1-bottle" /> */}
        <img
          src="/static/promo/mobile/images/s1-bottle.png"
          className="s1-bottle"
          alt=""
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    abtastyParams: state.auth.abtastyParams,
    isAuthentic: state.auth.isAuthentic,
  };
}

const PromoSectionOneMobile = connect(mapStateToProps, {})(
  PromoSectionOneMobileComponent,
);

export { PromoSectionOneMobile };
