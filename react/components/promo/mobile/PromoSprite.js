import React from 'react';

class PromoSprite extends React.PureComponent {
  render() {
    return (
      <div className="strip dsplay sprite5 sprite-strip">
        <div className="container position">
          <p className="striptxt1">
            ORDER YOUR BOTTLE OF<span> CBD OIL</span> TODAY!{' '}
          </p>
          <p className="striptxt2">
            Limited Time Offer - Get Free Bottles On Select Packages
          </p>
          <a
            id="promo-sprite-scroll-desktop"
            href="javascript:bookmarkscroll.scrollTo('topfrm')"
          >
            {' '}
            <i className="stripbtn pulse sprite5 sprite-submit" />
          </a>
        </div>
      </div>
    );
  }
}

export { PromoSprite };
