import React from 'react';
import { connect } from 'react-redux';

class PromoSectionSevenMobileComponent extends React.PureComponent {
  render() {
    const variation316547 = this.props.isAuthentic.isAuthenticUser
      ? '416840'
      : '416841';
    const variation314728 = this.props.isAuthentic.isAuthenticUser
      ? '414509'
      : '414507';

    return (
      <div
        id={`section-seven-${variation314728}`}
        className="sprite2 sprite-sec7"
      >
        <i className={`s7-logo sprite3 sprite-s7-logo-${variation316547}`} />{' '}
        <i
          className={`s1-hd sprite3 ${
            this.props.isAuthentic.isAuthenticUser ? '414125' : '414126'
          } sprite-s1-hd`}
        />
        <p className="s1-txt4">
          Derived from organic, US-harvested hemp, lab-tested for quality.
          Clinically proven therapeutic effects.{' '}
        </p>
        <p className="clearall" />
        <ul className="s1-list">
          <li>
            <span>Relieves</span>
            <br /> Anxiety & Stress{' '}
          </li>
          <li>
            <span>Eliminates</span>
            <br />Chronic Pain & Aches{' '}
          </li>
          <li>
            <span>Regulates</span>
            <br /> Mood & Sleep Patterns{' '}
          </li>
          <li>
            <span>Enhances </span>
            <br /> Focus & Clarity{' '}
          </li>
        </ul>
        <p className="clearall" />{' '}
        <i className="s7-photos sprite3 sprite-s7-photos" />{' '}
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

const PromoSectionSevenMobile = connect(mapStateToProps, {})(
  PromoSectionSevenMobileComponent,
);

export { PromoSectionSevenMobile };
