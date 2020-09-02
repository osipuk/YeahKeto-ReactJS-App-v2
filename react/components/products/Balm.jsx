import React from 'react';

class BalmSlider extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <p className="prd-sec1-txt1">American science</p>
        <p className="prd-sec1-txt2">Warming balm</p>
        <p className="prd-sec-1txt3">Premium Cognitive Function</p>
        <p className="comn-txt prd-sec1-txt5">
          Formulated with a range of brain health-supporting ingredients,
          American Science&#8217;s Warming balm may help support relief from
          problems like soreness, inflammation, and irritated skin.
        </p>
        <ul className="prd-sec1-list">
          <li>Reduces age-related decline in cognitive health</li>
          <li>
            Supports mental clarity & agility with higher focus & concentration
          </li>
          <li>Improves information retention & memory recall</li>
        </ul>
        <div style={{ float: 'left', width: '100%' }}>
          <p className="prd-sec1-txt6">$87.00</p>
          <a
            className="prd-sec1-btn"
            onClick={ev => {
              ev.preventDefault();
              this.props.switcher('cart');
            }}
          >
            <img src="/static/assets/images/btn.png" alt="" />
          </a>
        </div>
      </React.Fragment>
    );
  }
}

class BalmIngredients extends React.PureComponent {
  render() {
    return (
      <div className="just ingr">
        Ingredient List: Grapeseed Oil, Beeswax, Cocoa Butter, Menthol Crystals,
        Camphor Essential Oil, Cinnamon Leaf Essential Oil, Coconut Oil,
        Peppermint Essential Oil, Ravensara Wild Essential Oil, Rosemary
        Essential Oil, Fennel Sweet Essential Oil, Cypress Essential Oil, 15 %
        CBD Hemp Extract
      </div>
    );
  }
}

class BalmHowToUse extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <li>
          <span>
            Step<br />1
          </span>
          <p>
            Take two capsules of American Science Warming Balm daily with a
            glass of water.{' '}
          </p>
        </li>
        <li>
          <span>
            Step<br />2
          </span>
          <p>
            Follow a healthy lifestyle along with a balanced diet &amp; regular
            exercise.{' '}
          </p>
        </li>
        <li>
          <span>
            Step<br />3
          </span>
          <p>
            Follow the supplementation &amp; use daily for best results and
            maximum benefits.{' '}
          </p>
        </li>
      </React.Fragment>
    );
  }
}

class BalmSquare extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <p className="prd-txt1">American Science</p>
        <p className="prd-txt2">Warming balm</p>
        <p className="prd-txt3">Premium Cognitive Function</p>
        <p className="prd-txt4 comn-txt">
          Warming balm may help support relief from problems like soreness,
          inflammation, and irritated skin.
        </p>
      </React.Fragment>
    );
  }
}

export { BalmSlider, BalmHowToUse, BalmSquare, BalmIngredients };
