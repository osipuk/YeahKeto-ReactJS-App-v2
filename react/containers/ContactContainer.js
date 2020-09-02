import React from 'react';
import ContactUs from './../components/common/ContactUs';
import { Header } from './../components/common/Header';
import { Footer } from './../components/common/Footer';

class ContactContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <ContactUs />
        <Footer />
      </React.Fragment>
    );
  }
}

export default ContactContainer;
