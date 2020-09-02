import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

class PromoStripComponent extends React.PureComponent {
  scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

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
            id={this.props.tagID}
            href="javascript:void(0)"
            onClick={() => {
              this.scrollToTop();
            }}
          >
            {' '}
            <i
              className={`stripbtn pulse sprite5 sprite-submit sprite5-${
                this.props.isAuthentic.isAuthenticUser
              }`}
              id="rush-my-order-scroll-clicks"
            />
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthentic: state.auth.isAuthentic,
  };
}

const PromoStrip = connect(mapStateToProps)(withRouter(PromoStripComponent));

export { PromoStrip };
