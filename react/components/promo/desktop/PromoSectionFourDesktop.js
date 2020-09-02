import React from 'react';
import LazyLoad from 'react-lazyload';

class PromoSectionFourDesktop extends React.PureComponent {
  render() {
    return (
      <div className="section4">
        <div className="container position">
          <p className="s4hding">
            <span>Benefits of Yeah Keto </span>
            <br /> Supports Neurological, Physical &amp; Mental Health{' '}
          </p>{' '}
          <i className="s2hdimg sprite3 sprite-s2hd" />
          <p className="clearall" aria-hidden="true" />
          <ul className="s4-list1">
            <li>
              <i className="sprite4 sprite-s4-icon1" />Calm
            </li>
            <li>
              <i className="sprite4 sprite-s4-icon2" />Health
            </li>
            <li>
              <i className="sprite4 sprite-s4-icon3" />Energy
            </li>
          </ul>
          <p className="clearall" aria-hidden="true" />
          <p className="s4-txt1 bdfont">
            <strong>Yeah Keto Oil</strong> positively modulates the ECS system,
            improving mental clarity, sleep cycles, healthy inflammatory
            response, cognitive function &amp; more.{' '}
          </p>
          <p className="clearall" aria-hidden="true" />
          <ul className="s4-list2">
            <li>
              <i className="sprite4 sprite-s4-icon4" />
              <span>Boosts Cognitive Function </span>
              <br />CBD Oil supports optimal brain function, improving focus,
              mental clarity, and memory recall. It also helps slow down the
              age-related decline in cognitive health.{' '}
            </li>
            <li>
              <i className="sprite4 sprite-s4-icon5" />
              <span>Supports Joint Health </span>
              <br />CBD Oil lubricates the joints to support improved
              flexibility and mobility. It also helps deliver essential
              cannabinoids to treat chronic aches and pains.{' '}
            </li>
            <li>
              <i className="sprite4 sprite-s4-icon6" />
              <span>Reduces Anxiety &amp; Stress </span>
              <br />CBD Oil has a positive impact on mood patterns and sleep
              cycles. This helps promote a feeling of calm and relaxation to
              combat stress and anxiety.
            </li>
          </ul>
          <p className="clearall" aria-hidden="true" />
          <div className="s4-img-bg sprite4 sprite-s4-bg1">
            <p className="s4-img-bg-txt1">
              <span>FULL SPECTRUM </span>
              <br />CBD OIL{' '}
            </p>
            <p className="s4-img-bg-txt2">
              All-Natural, Organic &amp; High Potency Cannabidiol Blend
            </p>
          </div>{' '}
          {/* <i className="s4-bottle sprite4 sprite-s4-bottle" />{' '} */}
          <LazyLoad height={484} offset={75}>
            <img
              src="/static/promo/desktop/images/s4-bottle.png"
              className="s4-bottle"
              alt=""
            />
          </LazyLoad>
        </div>
      </div>
    );
  }
}

export { PromoSectionFourDesktop };
