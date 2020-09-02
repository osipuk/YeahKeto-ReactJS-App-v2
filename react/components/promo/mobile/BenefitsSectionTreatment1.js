import React, { Component } from 'react';
import Head from 'next/head';

class BenefitsSectionTreatment1 extends Component {
  render() {
    return (
      <React.Fragment>
        <p className="s2-hd-txt">
          <span>
            BENEFITS OF<br />Yeah Keto
          </span>
          <br />Supports Neurological, <br />Physical &amp; Mental Health{' '}
        </p>
        <p className="clearall" />
        <ul className="s4-list1">
          <li>
            {' '}
            <i className="sprite3 sprite-s4-icon1" /> Calm
          </li>
          <li>
            {' '}
            <i className="sprite3 sprite-s4-icon2" /> Health
          </li>
          <li>
            {' '}
            <i className="sprite3 sprite-s4-icon3" /> Energy
          </li>
        </ul>
        <p className="clearall" />
        <p className="s2-txt1">
          <strong>American Science Hemp Oil</strong> positively modulates the
          ECS system, improving mental clarity, sleep cycles, healthy
          inflammatory response, cognitive function &amp; more.
        </p>
        <p className="clearall" />
        <ul className="s4-list2">
          <li>
            <img
              src="/static/assets/images/s4-icon4.png"
              alt=""
              className="s4-icons"
            />
            <span>BOOSTS COGNITIVE FUNCTION </span>
            <br />Hemp Oil supports optimal brain function, improving focus,
            mental clarity, and memory recall. It also helps slow down the
            age-related decline in cognitive health.{' '}
          </li>

          <li>
            <img
              src="/static/assets/images/s4-icon5.png"
              alt=""
              className="s4-icons"
            />
            <span>SUPPORTS JOINT HEALTH </span>
            <br />Hemp Oil lubricates the joints to support improved flexibility
            and mobility. It also helps deliver essential cannabinoids to treat
            chronic aches and pains.{' '}
          </li>

          <li>
            <img
              src="/static/assets/images/s4-icon6.png"
              alt=""
              className="s4-icons"
            />
            <span>REDUCES ANXIETY &amp; STRESS </span>
            <br />Hemp Oil has a positive impact on mood patterns and sleep
            cycles. This helps promote a feeling of calm and relaxation to
            combat stress and anxiety.
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default BenefitsSectionTreatment1;
