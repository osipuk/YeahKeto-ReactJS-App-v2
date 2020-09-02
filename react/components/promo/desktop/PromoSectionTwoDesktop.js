import React from 'react';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';

class PromoSectionTwoDesktopComponent extends React.PureComponent {
  render() {
    const variation317682 = this.props.isAuthentic.isAuthenticUser
      ? '418324'
      : '418323';
    return (
      <div className="section2">
        <div className="container position">
          <p className="s2hding">
            <span>Yeah Keto OIL </span>
            <br /> Enriched with Cannabidiol Extract (CBD){' '}
          </p>{' '}
          <i className="s2hdimg sprite3 sprite-s2hd" />
          <p className="sec2txt bdfont">
            Cannabidiol, part of a family of molecules called cannabinoids, is
            non-psychoactive and has been clinically proven to offer a wide
            range of therapeutic health benefits. <strong>Yeah Keto Oil</strong> is
            formulated with organic hemp, grown &amp; harvested in the US, and
            is patented (under Patent #6,630,507) to support our bodies as we
            age.
            <br />
            <br />
            <b>
              When used as directed, Yeah Keto Oil regulates mood patterns and
              sleep cycle, mitigates inflammatory response, and boosts cognitive
              performance.{' '}
            </b>{' '}
          </p>
          <p className="s2subhd1">All Natural Organic CBD Extract </p>
          {this.props.isAuthentic.isAuthenticUser ? (
            <p className="s2subhd2-T">
              Quick Absorption &amp; Fast Action Formula{' '}
            </p>
          ) : (
            <p className="s2subhd2">
              Quick Absorption, Extended Release Formula{' '}
            </p>
          )}
          {variation317682 === '418323' && (
            <ul className="s2list">
              <li>
                {' '}
                <i className="s2limg sprite4 sprite-s2limg1" />
                <p className="s2ltxt">
                  <span>Legal</span>
                  <br /> In All 50
                  <br />US States{' '}
                </p>
                <i className="s5limg2 sprite4 sprite-s2line" />
              </li>
              <li>
                {' '}
                <i className="s2limg sprite4 sprite-s2limg2" />
                <p className="s2ltxt">
                  <span>100%</span>
                  <br /> THC Free
                  <br />&amp; No High
                </p>{' '}
                <i className="s5limg2 sprite4 sprite-s2line" />{' '}
              </li>
              <li>
                {' '}
                <i className="s2limg sprite4 sprite-s2limg3" />
                <p className="s2ltxt">
                  <span>Doesn&#39;t</span>
                  <br /> Show On
                  <br /> Drug test{' '}
                </p>{' '}
                <i className="s5limg2 sprite4 sprite-s2line" />{' '}
              </li>
              <li>
                {' '}
                <i className="s2limg sprite4 sprite-s2limg4" />
                <p className="s2ltxt">
                  <span>Available</span>
                  <br /> Without Prescription{' '}
                </p>{' '}
                <i className="s5limg2 sprite4 sprite-s2line" />{' '}
              </li>
            </ul>
          )}{' '}
          {variation317682 === '418324' && (
            <ul className="s2list">
              <li>
                <img
                  alt=""
                  className="sprite4 sprite4-variation317682-418324"
                />
              </li>
            </ul>
          )}{' '}
          {/* <i className="s2bottle sprite3 sprite-s2bottle" />{' '} */}
          <LazyLoad height={484} offset={75}>
            <img
              src="/static/promo/desktop/images/s2bottle.png"
              className="s2bottle"
              alt=""
            />
          </LazyLoad>
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

const PromoSectionTwoDesktop = connect(mapStateToProps, {})(
  PromoSectionTwoDesktopComponent,
);

export { PromoSectionTwoDesktop };
