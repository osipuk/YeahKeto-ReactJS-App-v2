/* eslint-disable */
import React from "react";
import idx from "idx";
import { connect } from "react-redux";
import { post } from "helpers";

function setCookie(cname, cvalue) {
  document.cookie = `${cname}=${cvalue};path=/`;
}

export function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

class PromoSessionComponent extends React.PureComponent {
  async componentDidMount() {
    const existingCookie = getCookie('ascbd_promo_session');
    if (!existingCookie || this.props.pageType === 'leadPage') {
      const apiResponse = await post(
        '/v1/konnektive/session',
        {
          pageType: this.props.pageType,
          requestUri: window.location.href,
        },
        this.props.sessionId,
      );
      const ascbd_promo_session = idx(
        apiResponse,
        _ => _.response.data.data.sessionId,
      );
      setCookie('ascbd_promo_session', ascbd_promo_session);
    } else {
      await post(
        '/v1/konnektive/session',
        {
          pageType: this.props.pageType,
          sessionId: existingCookie,
          requestUri: window.location.href,
        },
        this.props.sessionId,
      );
    }
  }
  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    sessionId: state.auth && state.auth.sessionId
  };
}

const PromoSession = connect(mapStateToProps, {})(PromoSessionComponent);

export { PromoSession };
