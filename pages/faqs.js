import React from 'react';
import Head from 'next/head';
import { Faq } from 'react/components/faq';

class FAQs extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Yeah Keto - FAQs</title>
          <meta name="viewport" content="width=640, user-scalable=0" />
          <meta
            name="description"
            content="Premium Quality Hemp Extract Products, Organic and Natural"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/simpleMobileMenu.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/fonts/font-raleway.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/style.css"
          />
        </Head>
        <Faq />
      </React.Fragment>
    );
  }
}

export default FAQs;
