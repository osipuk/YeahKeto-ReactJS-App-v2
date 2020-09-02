import React from 'react';
import Collapsible from 'react-collapsible';
import { Header, Footer } from 'react/components/common';

class Faq extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      openIndex: 0,
    };
  }

  onOpening = index => {
    this.setState({ openIndex: index });
  };

  onClosing = () => {
    this.setState({ openIndex: null });
  };

  render() {
    const SingleCollapsible = props => (
      <Collapsible
        onOpening={() => this.onOpening(props.index)}
        onClosing={this.onClosing}
        trigger={props.trigger}
        open={this.state.openIndex === props.index}
        triggerClassName="accordion-close"
        triggerOpenedClassName="accordion-open"
      >
        {props.children}
      </Collapsible>
    );
    return (
      <React.Fragment>
        <Header />
        <div className="inner-bg">
          <div className="container">
            <div className="inner-txt">
              <span>faq’s</span>
              <p className="comn-txt">
                Here are some of the questions we hear most often, with
                responses we hope you find helpful! include this where the
                filler text is.
              </p>
            </div>
            <img
              src="/static/assets/images/bnr-prd.png"
              className="inner-prd for-desk"
              alt=""
            />
          </div>
        </div>
        <div className="container">
          <div className="accordion-container">
            <SingleCollapsible trigger="Why Choose American Science?" index={0}>
              <p className="txt1">
                Receive a wide range of therapeutic and health benefits by
                purchasing the Cannabidiol extract dietary supplements American
                Science offers. The supplements we offer are infused with
                Cannabidiol extract enriched with over 80 cannabinoids.
              </p>
              <br />
              <p className="txt1">
                You can also avoid the hassle people typically have to deal with
                when buying CBD or medical marijuana. You don’t need a
                prescription, don’t need to import it, or be part of a domestic
                Cannabidiol program.
              </p>
            </SingleCollapsible>
            <SingleCollapsible
              trigger="What is CBD also known as Cannabidiol?"
              index={1}
            >
              <p className="txt1">
                Our cannabidiol is extracted from Cannabis leaf, which is its
                most abundant component. A major benefit of CBD is that it
                offers numerous benefits and is safe to consume without causing
                the
                {"'high'"} effect.
              </p>
            </SingleCollapsible>
            <SingleCollapsible
              trigger="Are the products you offer high-quality?"
              index={2}
            >
              <p className="txt1">
                Of course! However, we would say they are of GREAT quality, and
                we would never offer them to you otherwise! We take great pride
                in our standard of purity, potency, and quality, which is second
                to none! Our products meet the highest standards in our
                industry.
              </p>
            </SingleCollapsible>
            <SingleCollapsible
              trigger="Do you test your products for safety and quality?"
              index={3}
            >
              <p className="txt1">
                All of our products have been thoroughly tested for quality and
                safety while being free from pesticides, fertilizers, and
                herbicides.
              </p>
            </SingleCollapsible>
            <SingleCollapsible
              trigger="Will I get high using your products with CBD?"
              index={4}
            >
              <p className="txt1">
                CBD is non-psychoactive, therefore, you will not experience a
                “high.” All of our products contain zero THC.
              </p>
            </SingleCollapsible>
            <SingleCollapsible
              trigger="I have a drug test coming up, will I fail it if I use CBD products?"
              index={5}
            >
              <p className="txt1">
                Rest assured, all our products are free from THC and are in
                complete compliance with all applicable regulations. Also, CBD
                is undetectable in urine and saliva tests.
              </p>
            </SingleCollapsible>
            <SingleCollapsible
              trigger="What is the Legal status of CBD?"
              index={6}
            >
              <p className="txt1">
                The CBD in our products comes from industrial hemp that is legal
                in all 50 states. CBD is a natural component of the cannabis
                leaf and is therefore legal to be used as a food supplement.
              </p>
            </SingleCollapsible>
            <SingleCollapsible
              trigger="CBD and THC, what is the difference?"
              index={7}
            >
              <p className="txt1">
                Though hemp contains both THC and CBD, THC is a psychoactive
                component, while CBD is non-psychoactive.
              </p>
            </SingleCollapsible>
            <SingleCollapsible
              trigger="Does CBD interact with other medicines I might use?"
              index={8}
            >
              <p className="txt1">
                We recommend you consult with your physician before taking any
                supplements, such as CBD.
              </p>
            </SingleCollapsible>
            <SingleCollapsible
              trigger="Where does your hemp come from?"
              index={9}
            >
              <p className="txt1">
                Our hemp is grown and derived from natural organic, non-GMO, and
                pesticide-free farms within the United States.
              </p>
            </SingleCollapsible>
            <SingleCollapsible
              trigger="Will I require a medical card to purchase your products?"
              index={10}
            >
              <p className="txt1">
                A medical card is not required to purchase CBD based products.
              </p>
            </SingleCollapsible>
            <SingleCollapsible
              trigger="How much CBD should I consume?"
              index={11}
            >
              <p className="txt1">
                The recommended dosage is listed on each bottle. Please consult
                your physician for any specific questions.
              </p>
            </SingleCollapsible>
            <SingleCollapsible
              trigger="Can I use CBD to treat my condition/illness or sickness?"
              index={12}
            >
              <p className="txt1">
                Please know that our products and CBD are not intended to
                prevent, diagnose, treat or cure any condition/illness or
                sickness or disease. Several researchers and studies indicate
                the benefits of using CBD. However, the FDA has not approved any
                of our products that contain CBD to aid in the prevention,
                diagnosis, treatment or cure of any condition/illness, sickness
                or disease.
              </p>
              <br />
              <p className="txt1">
                We highly advise you to consult your physician before using any
                CBD based products.
              </p>
            </SingleCollapsible>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export { Faq };
