import React from 'react';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';

class PromoSectionSevenDesktopComponent extends React.PureComponent {
  render() {
    return (
      <div className={`section7 section7-${!this.props.isAuthentic.isAuthenticUser}`}>
        <div className="container position">
          <i className="s7logo sprite2 sprite-logo" />
          <i className={`s7seal sprite3 sprite-s1seal-${this.props.isAuthentic.isAuthenticUser}`} />
          <i
            className="s7hd sprite3 sprite-s1hd"
          />
          <p className="s7txt">
            Derived from organic, US-harvested hemp, lab-tested for quality.
            Clinically proven therapeutic effects.{' '}
          </p>
          <ul className="s7list">
            <li className="sprite2 sprite-s1bullet">
              {' '}
              <span>Relieves</span> Anxiety &amp; Stress{' '}
            </li>
            <li className="sprite2 sprite-s1bullet">
              <span>Eliminates</span> Chronic Pain &amp; Aches{' '}
            </li>
            <li className="sprite2 sprite-s1bullet">
              <span>Regulates</span> Mood &amp; Sleep Patterns{' '}
            </li>
            <li className="sprite2 sprite-s1bullet">
              <span>Enhances </span> Focus &amp; Clarity{' '}
            </li>
          </ul>
          <div className="clearall" />
          {/* <i className="s7bottle sprite4 sprite-s7-bottle" /> */}
          <LazyLoad height={484} offset={75}>
            <img
              src="/static/promo/desktop/images/s7-bottle.png"
              className="s7bottle"
              alt=""
            />
          </LazyLoad>
          <i className="s7-photos sprite4 sprite-s7-photos" />
          <a
            id="promo-section7-scroll-desktop"
            href="javascript:void(0)"
            onClick={() => {
              window.scroll({ top: 0, behavior: 'smooth' });
            }}
          >
            <i
              className={`s7btn pulse sprite5 sprite-submit sprite5-${
                this.props.isAuthentic.isAuthenticUser
              }`}
            />
          </a>
        </div>
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

const PromoSectionSevenDesktop = connect(mapStateToProps, null)(
  PromoSectionSevenDesktopComponent,
);

export { PromoSectionSevenDesktop };
