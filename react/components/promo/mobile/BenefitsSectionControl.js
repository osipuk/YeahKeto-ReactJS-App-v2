import React, { Component } from 'react';

class BenefitsSectionControl extends Component {
  render() {
    return (
      <React.Fragment>
        <p className="s2-hd-txt">
          <span>BENEFITS OF Yeah Keto</span>
          <br />Supports Neurological, Physical & Mental Health{' '}
        </p>
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
          <strong>Yeah Keto Oil</strong> positively modulates the ECS system,
          improving mental clarity, sleep cycles, healthy inflammatory response,
          cognitive function & more.{' '}
        </p>
        <p className="clearall" />
        <ul className="s4-list2">
          <li>
            <i className="s4-icons sprite3 sprite-s4-icon4" />{' '}
            <span>Boosts Cognitive Function </span>
            <br />CBD Oil supports optimal brain function, improving focus,
            mental clarity, and memory recall. It also helps slow down the
            age-related decline in cognitive health.{' '}
          </li>
          <li>
            <i className="s4-icons sprite3 sprite-s4-icon5" />{' '}
            <span>Supports Joint Health </span>
            <br />CBD Oil lubricates the joints to support improved flexibility
            and mobility. It also helps deliver essential cannabinoids to treat
            chronic aches and pains.{' '}
          </li>
          <li>
            <i className="s4-icons sprite3 sprite-s4-icon6" />{' '}
            <span>Reduces Anxiety & Stress </span>
            <br />CBD Oil has a positive impact on mood patterns and sleep
            cycles. This helps promote a feeling of calm and relaxation to
            combat stress and anxiety.
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default BenefitsSectionControl;
