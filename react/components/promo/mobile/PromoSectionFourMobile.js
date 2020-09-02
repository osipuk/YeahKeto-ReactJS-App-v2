import React from 'react';
import { connect } from 'react-redux';
import BenefitsSectionControl from './BenefitsSectionControl';
import BenefitsSectionTreatment1 from './BenefitsSectionTreatment1';
import BenefitsSectionTreatment2 from './BenefitsSectionTreatment2';

class PromoSectionFourMobileComponent extends React.PureComponent {
  render() {
    const variation314431 = this.props.isAuthentic.isAuthenticUser
      ? '414150'
      : '414149';
    let returnJSX =
      !variation314431 || variation314431 === '414149' ? (
        <BenefitsSectionControl />
      ) : null;
    if (variation314431 === '414150') {
      returnJSX = <BenefitsSectionTreatment1 />;
    }
    if (variation314431 === '414151') {
      returnJSX = <BenefitsSectionTreatment2 />;
    }

    return (
      <div id="section-four">
        {returnJSX}
        <p className="clearall" />
        <div
          className="strip sprite3 sprite-strip-bg"
          style={{ 'margin-top': '50px' }}
        >
          <p className="strip-txt">
            <b>ORDER YOUR BOTTLE OF</b> <span>CBD OIL</span> <b>TODAY!</b>
            <br />Limited Time Offer - Get Free Bottles
            <br />On Select Packages
          </p>
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

const PromoSectionFourMobile = connect(mapStateToProps, {})(
  PromoSectionFourMobileComponent,
);

export { PromoSectionFourMobile };
