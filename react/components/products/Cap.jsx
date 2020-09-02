import React from 'react';

class CapSlider extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <p className="prd-sec1-txt1">American science</p>
        <p className="prd-sec1-txt2">CBD hemp Capsules</p>
        <p className="prd-sec-1txt3">Pure Cannabidiol complex</p>
        <p className="comn-txt prd-sec1-txt5">
          Formulated with high-potency 300MG Hemp Extract, American
          Science&#8217;s Hemp Capsule is rich in a wide range of cannabinoids
          (CBD) which has been proven to support mood patterns, joint health,
          and mental clarity.
        </p>
        <ul className="prd-sec1-list">
          <li>Available in an easy-to-take capsule form</li>
          <li>Free from THC, harmful chemicals, pesticides, and synthetics</li>
          <li>
            Made from hemp extract that is organically grown &amp; extracted in
            the USA
          </li>
        </ul>
        <div style={{ float: 'left', width: '100%' }}>
          <p className="prd-sec1-txt6">$77.00</p>
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

class CapIngredients extends React.PureComponent {
  render() {
    return (
      <div className="just ingr">
        Ingredients: Hemp Powder, CBD Isolate, Vegetable Capsule
      </div>
    );
  }
}

class CapHowToUse extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <li>
          <span>
            Step<br />1
          </span>
          <p>
            Take one capsule of American Science Hemp Capsule daily with a glass
            of water.{' '}
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
            maximum benefits.
          </p>
        </li>
      </React.Fragment>
    );
  }
}

class CapSquare extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <p className="prd-txt1">American Science</p>
        <p className="prd-txt2">CBD hemp capsules</p>
        <p className="prd-txt3">Pure Cannabidiol complex</p>
        <p className="prd-txt4 comn-txt">
          Hemp capsules may help support joint health &amp; may promote better
          sleep quality.
        </p>
      </React.Fragment>
    );
  }
}

export { CapSlider, CapHowToUse, CapSquare, CapIngredients };
