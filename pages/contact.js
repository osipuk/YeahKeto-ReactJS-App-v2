import React from 'react';
import Head from 'next/head';
import { ContactContainer } from 'react/containers';

class Contact extends React.PureComponent {
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
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/formvalidation/formValidation.min.css"
          />
        </Head>
        <ContactContainer />
      </React.Fragment>
    );
  }
}

export default Contact;
