import React from 'react';

class Coupon extends React.PureComponent {
  render() {
    const discount = '43%';
    const price = '$39.00';
    const discount_line =
      'That’s an incredible $180.00 off our regular price! ';

    return (
      <div className="s1-doteed-sec">
        <div className="s1-dot-left">
          <img
            src="/static/desktop/images/up-btl1.png"
            className="up-btl1"
            alt=""
          />
          <br />
          {this.props.showSeal && (
            <div className="save-seal">
              save<br />
              <span>{discount}</span>
            </div>
          )}
          <img
            src="/static/desktop/images/free-ship.png"
            className="free-ship"
            alt="Free Shipping"
          />
        </div>
        <div className="s1-dot-right">
          <p className="dot-rgt-txt1">
            Purchase 6 additional bottles of our CBD Oil at an astounding{' '}
          </p>
          <p className="dot-rgt-txt2">{discount} discount off retail </p>
          <p className="dot-rgt-txt3">
            Only <span>{price}</span>/ Bottle{' '}
          </p>
          <p className="dot-rgt-txt1 txt4-fnt-sz">{discount_line}</p>
          <p className="dot-rgt-txt4">
            This page is your only opportunity to purchase at such a low price.
            Our offer is limited to our new customers and to our inventory on
            hand.
            <br />
            <br />
            This offer is promotional and will not last. Act now to enjoy this
            discount!
          </p>
          <a
            id="coupon-upgrade-desktop"
            href="javascript:void(0)"
            onClick={this.props.onUpgrade}
          >
            <img
              src="/static/desktop/images/button.png"
              className="button"
              alt="Upgrade My Order"
            />
          </a>
        </div>
      </div>
    );
  }
}

export { Coupon };
