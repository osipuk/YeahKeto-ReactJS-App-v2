import React, { PureComponent } from 'react';
import { ActiveLink } from 'react/components/common';
import Head from 'next/head';
import { withRouter } from 'next/router';

const Menu = withRouter(props => (
  <React.Fragment>
    <li>
      <ActiveLink href="/">Home</ActiveLink>
    </li>
    <li>
      <a
        href="/hemp-oil"
        className={props.router.pathname === '/products' ? 'active' : ''}
      >
        Products
      </a>
    </li>
    <li>
      <ActiveLink href="/faqs">FAQ`s</ActiveLink>
    </li>
    <li>
      <ActiveLink href="/cart">Cart</ActiveLink>
    </li>
    <li>
      <ActiveLink href="/contact">Contact</ActiveLink>
    </li>
  </React.Fragment>
));

/**
 * @class Header
 * @extends {PureComponent}
 * @description Header Component made of common component ActiveLink
 */
class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeMobileMenu: false,
    };
  }

  toggleClass = () => {
    this.setState({ activeMobileMenu: !this.state.activeMobileMenu });
  };

  render() {
    return (
      <React.Fragment>
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/simpleMobileMenu.css"
          />
        </Head>
        <div
          className={
            this.state.activeMobileMenu ? 'overally ovrActv' : 'overally'
          }
          onClick={this.toggleClass}
        />
        <div className="top-sec">
          <div className="container">
            <a href="/">
              <img
                className="logo"
                src="/static/assets/images/logo.png"
                alt="Logo"
              />
            </a>
            <div className="light-menu for-mob for-tab">
              <div className="navwrp">
                <a
                  href="javascript:void(0)"
                  className="smobitrigger mob-mnu inrwrpr"
                  onClick={this.toggleClass}
                >
                  <img src="/static/assets/images/mob-menu-btn.png" alt="" />
                </a>
                <ul
                  className={
                    this.state.activeMobileMenu
                      ? 'mobimenu inrwrp mnuopn'
                      : 'mobimenu inrwrp'
                  }
                >
                  <a
                    href="javascript:void(0)"
                    className="mnuclose"
                    onClick={this.toggleClass}
                  >
                    X
                  </a>
                  <Menu />
                </ul>
              </div>
            </div>
            <ul className="menu-list for-desk">
              <Menu />
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export { Header };
