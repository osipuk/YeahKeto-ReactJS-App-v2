import React from 'react';
import 'styles/cart.scss';

const topClassName = {
  firstName: 'frmelements pure-control-group',
  lastName: 'frmelements pure-control-group',
  email: 'frmelements pure-control-group',
  address_1: 'frmelements pure-control-group',
  billing_cart_address_1: 'frmelements pure-control-group',
  address_2: 'frmelements pure-control-group',
  billing_cart_address_2: 'frmelements pure-control-group',
  state: 'frmelements short1 pure-control-group',
  billing_cart_state: 'frmelements short1 pure-control-group',
  city: 'frmelements short2 pure-control-group',
  billing_cart_city: 'frmelements short2 pure-control-group',
  zip_code: 'frmelements short1 pure-control-group',
  billing_cart_zip_code: 'frmelements short1 pure-control-group',
  phone_number: 'frmelements short2 pure-control-group',
  billing_cart_phone_number: 'frmelements short2 pure-control-group',
  card_number: 'frmelements pure-control-group',
  month: 'frmelements short1 pure-control-group',
  year: 'frmelements short2 pure-control-group',
  cvv: 'frmelements short1 mob-sort pure-control-group',
};
const fieldClassName = {
  firstName: 'field',
  lastName: 'field',
  email: 'field',
  address_1: 'field',
  billing_cart_address_1: 'field',
  address_2: 'field address-2',
  billing_cart_address_2: 'field address-2',
  state: 'field',
  billing_cart_state: 'field',
  city: 'field',
  billing_cart_city: 'field',
  zip_code: 'field',
  billing_cart_zip_code: 'field',
  phone_number: 'field',
  billing_cart_phone_number: 'field',
};
const label = {
  firstName: (
    <React.Fragment>
      First Name<span>*</span>
    </React.Fragment>
  ),
  lastName: (
    <React.Fragment>
      Last Name<span>*</span>
    </React.Fragment>
  ),
  email: (
    <React.Fragment>
      Email<span>*</span>
    </React.Fragment>
  ),
  address_1: (
    <React.Fragment>
      Address Line 1<span>*</span>
    </React.Fragment>
  ),
  billing_cart_address_1: (
    <React.Fragment>
      Address Line 1<span>*</span>
    </React.Fragment>
  ),
  address_2: <React.Fragment>Address Line 2</React.Fragment>,
  billing_cart_address_2: <React.Fragment>Address Line 2</React.Fragment>,
  state: (
    <React.Fragment>
      State<span>*</span>
    </React.Fragment>
  ),
  billing_cart_state: (
    <React.Fragment>
      State<span>*</span>
    </React.Fragment>
  ),
  city: (
    <React.Fragment>
      City<span>*</span>
    </React.Fragment>
  ),
  billing_cart_city: (
    <React.Fragment>
      City<span>*</span>
    </React.Fragment>
  ),
  zip_code: (
    <React.Fragment>
      Zip Code <span>*</span>
    </React.Fragment>
  ),
  billing_cart_zip_code: (
    <React.Fragment>
      Zip Code <span>*</span>
    </React.Fragment>
  ),
  phone_number: (
    <React.Fragment>
      Phone Number<span>*</span>
    </React.Fragment>
  ),
  billing_cart_phone_number: (
    <React.Fragment>
      Phone Number<span>*</span>
    </React.Fragment>
  ),
  card_number: (
    <React.Fragment>
      Card Number<span>*</span>
    </React.Fragment>
  ),
  month: (
    <React.Fragment>
      Expiration Month<span>*</span>
    </React.Fragment>
  ),
  year: (
    <React.Fragment>
      Expiration Year<span>*</span>
    </React.Fragment>
  ),
  cvv: (
    <React.Fragment>
      CVV<span>*</span>
    </React.Fragment>
  ),
};
const imgSrc = {
  firstName: '/static/assets/images/frmicon1.png',
  lastName: '/static/assets/images/frmicon1.png',
  email: '/static/assets/images/frmicon3.png',
  address_1: '/static/assets/images/frmicon5.png',
  billing_cart_address_1: '/static/assets/images/frmicon5.png',
  address_2: '/static/assets/images/frmicon5.png',
  billing_cart_address_2: '/static/assets/images/frmicon5.png',
  state: '/static/assets/images/frmicon7.png',
  billing_cart_state: '/static/assets/images/frmicon7.png',
  city: '/static/assets/images/frmicon6.png',
  billing_cart_city: '/static/assets/images/frmicon6.png',
  zip_code: '/static/assets/images/frmicon8.png',
  billing_cart_zip_code: '/static/assets/images/frmicon8.png',
  phone_number: '/static/assets/images/frmicon4.png',
  billing_cart_phone_number: '/static/assets/images/frmicon4.png',
};
const inputProps = {};
inputProps.firstName = {
  type: 'text',
  name: 'firstName',
  className: 'ft-input',
  required: true,
  autoComplete: 'off',
  placeholder: 'First name',
};
inputProps.lastName = Object.assign({}, inputProps.firstName, {
  name: 'lastName',
  placeholder: 'Last name',
});
inputProps.email = {
  type: 'email',
  name: 'email',
  className: 'ft-input',
  required: true,
  autoComplete: 'off',
  placeholder: 'Example: email@somewhere.com',
};
inputProps.address_1 = {
  type: 'text',
  name: 'address',
  className: 'ft-input',
  required: true,
  autoComplete: 'off',
  placeholder: 'Street and number, P.O. box, c/o.',
};
inputProps.billing_cart_address_1 = Object.assign({}, inputProps.address_1);
inputProps.address_2 = Object.assign({}, inputProps.address_1, {
  name: 'address2',
  required: false,
  placeholder: 'Apartment, suite, unit, building, floor, etc.',
});
inputProps.billing_cart_address_2 = Object.assign({}, inputProps.address_2);
inputProps.state = {
  name: 'state',
  className: 'ft-input',
};
inputProps.billing_cart_state = Object.assign({}, inputProps.state);
inputProps.city = {
  type: 'text',
  name: 'city',
  className: 'ft-input',
  required: true,
  autoComplete: 'off',
  placeholder: 'Your City',
};
inputProps.billing_cart_city = Object.assign({}, inputProps.city);
inputProps.zip_code = {
  type: 'tel',
  name: 'postalCode',
  className: 'ft-input',
  required: true,
  autoComplete: 'off',
  placeholder: 'Post Code',
};
inputProps.billing_cart_zip_code = Object.assign({}, inputProps.zip_code);
inputProps.phone_number = {
  type: 'tel',
  name: 'phoneNumber',
  className: 'ft-input',
  required: true,
  autoComplete: 'off',
  placeholder: 'Example: (123) 555-6789',
};
inputProps.billing_cart_phone_number = Object.assign(
  {},
  inputProps.phone_number,
);
inputProps.card_number = {
  type: 'tel',
  name: 'cardNumber',
  className: 'ft-input noicon creditcard',
  maxLength: '19',
  placeholder: '•••• •••• •••• ••••',
};
inputProps.month = {
  name: 'month',
  className: 'ft-input noicon',
};
inputProps.year = {
  name: 'year',
  className: 'ft-input noicon',
};
inputProps.cvv = {
  type: 'tel',
  name: 'cardSecurityCode',
  pattern: 'd*',
  className: 'ft-input noicon',
  maxLength: '3',
  placeholder: '123',
};

const UInfoInput = props => (
  <div className={topClassName[props.field]}>
    <label>{label[props.field]}</label>
    <div className={props.icon ? fieldClassName[props.field] : 'field no-icon'}>
      {props.icon && (
        <div className="icon-box">
          <center>
            <img src={imgSrc[props.field]} alt="" />
          </center>
        </div>
      )}
      <input
        {...inputProps[props.field]}
        id={props.field}
        value={props.value}
        onChange={props.handler}
      />
    </div>
  </div>
);

const UInfoSelect = props => (
  <div className={topClassName[props.field]}>
    <label>{label[props.field]}</label>
    <div className={props.icon ? fieldClassName[props.field] : 'field no-icon'}>
      {props.icon && (
        <div className="icon-box">
          <center>
            <img src={imgSrc[props.field]} alt="" />
          </center>
        </div>
      )}
      <select
        {...inputProps[props.field]}
        id={props.field}
        value={props.value}
        onChange={props.handler}
      >
        {props.children}
      </select>
    </div>
  </div>
);

export { UInfoInput, UInfoSelect };
