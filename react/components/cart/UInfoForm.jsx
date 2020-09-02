import React, { PureComponent } from 'react';
import 'styles/cart.scss';
import { UInfoInput, UInfoSelect } from './UInfoInput';

const ids = {
  cart_user_info: {
    address: 'address_1',
    address2: 'address_2',
    state: 'state',
    city: 'city',
    zip_code: 'zip_code',
    phone_number: 'phone_number',
  },
  cart_billing_info: {
    address: 'billing_cart_address_1',
    address2: 'billing_cart_address_2',
    state: 'billing_cart_state',
    city: 'billing_cart_city',
    zip_code: 'billing_cart_zip_code',
    phone_number: 'billing_cart_phone_number',
  },
};
const validators = {};
validators.firstName = value =>
  (value.length ? new RegExp('^.*[^A-zs ].*$').test(value) : false);
validators.lastName = value =>
  (value.length ? new RegExp('^.*[^A-zs ].*$').test(value) : false);
validators.email = value =>
  (value.length ? new RegExp('S+@S+.S+').test(value) : false);
validators[ids.cart_user_info.address] = value =>
  (value.length ? new RegExp("^[a-zA-Z0-9s,.'-]{3,}$ .").test(value) : false);
validators[ids.cart_user_info.address2] = value =>
  (value.length ? new RegExp("^[a-zA-Z0-9s,.'-]{3,}$ .").test(value) : false);
validators[ids.cart_billing_info.address] = value =>
  (value.length ? new RegExp("^[a-zA-Z0-9s,.'-]{3,}$ .").test(value) : false);
validators[ids.cart_billing_info.address2] = value =>
  (value.length ? new RegExp("^[a-zA-Z0-9s,.'-]{3,}$ .").test(value) : false);
validators[ids.cart_user_info.city] = value =>
  (value.length ? new RegExp('^.*[^A-zs ].*$').test(value) : false);
validators[ids.cart_billing_info.city] = value =>
  (value.length ? new RegExp('^.*[^A-zs ].*$').test(value) : false);
validators[ids.cart_user_info.zip_code] = value =>
  (value.length ? !/^\d{0,6}$/.test(value) : false);
validators[ids.cart_billing_info.zip_code] = value =>
  (value.length ? !/^\d{0,6}$/.test(value) : false);
validators[ids.cart_user_info.phone_number] = value =>
  (value.length ? !/^[\+]{0,1}[\d-]{0,35}$/.test(value) : false);
validators[ids.cart_billing_info.phone_number] = value =>
  (value.length ? !/^[\+]{0,1}[\d-]{0,35}$/.test(value) : false);
/* = value =>
  (value.length ? new RegExp("^[a-zA-Z0-9s,.'-]{3,}$ .").test(value) : false);
 = value =>
  (value.length ? new RegExp("^[a-zA-Z0-9s,.'-]{3,}$ .").test(value) : false); */

const formTop = {};
formTop.cart_user_info = (
  <React.Fragment>
    <div className="form-top">
      <img
        src="/static/assets/images/hdng-icon1.png"
        className="hdng-icon"
        alt=""
      />
      <p className="txt2-chk">Shipping Information</p>
    </div>
    <div>
      <p>
        All packages are shipped via Standard Shipping and are estimated to
        arrive within 3-5 business days from the day you place order.
      </p>
    </div>
  </React.Fragment>
);
formTop.cart_billing_info = (
  <React.Fragment>
    <div className="form-top">
      <center>
        <img alt="" src="assets/images/hdng-icon2.png" className="hdng-icon" />
      </center>
      <p className="txt2-chk">Payment Information</p>
    </div>
  </React.Fragment>
);

class UInfoForm extends PureComponent {
  constructor(props) {
    super(props);
    const newState = {
      firstName: '',
      lastName: '',
      email: '',
      [ids[this.props.fType].address]: '',
      [ids[this.props.fType].address2]: '',
      [ids[this.props.fType].state]: 'select_state',
      [ids[this.props.fType].city]: '',
      [ids[this.props.fType].zip_code]: '',
      [ids[this.props.fType].phone_number]: '',
      agreeChecked: true,
    };
    if (props.fType === 'cart_billing_info') {
      newState.card_number = '';
      newState.month = '';
      newState.year = '';
      newState.cvv = '';
    }
    this.state = Object.assign({}, newState);
    this.uInfoChangeHandler = this.uInfoChangeHandler.bind(this);
    this.switchAgree = this.switchAgree.bind(this);
    // this.geoLocate = this.geoLocate.bind(this);
  }
  uInfoChangeHandler(e) {
    if (e.target.id in validators && validators[e.target.id](e.target.value)) {
      e.preventDefault();
      return undefined;
    }
    this.setState({
      [e.target.id]: e.target.value,
    });
    if (
      this.props.fType === 'cart_user_info' &&
      e.target.id !== 'agreeChecked'
    ) {
      this.props.updater({
        [e.target.id]: e.target.value,
      });
    }
    return undefined;
  }
  switchAgree() {
    this.setState({
      agreeChecked: !this.state.agreeChecked,
    });
  }
  /* geoLocate() {
    //    console.log(this.geoLocate);
  } */
  render() {
    return (
      <form id={this.props.fType}>
        <div className="sec1crt-frmlft">
          {}
          <div>
            <p>
              All packages are shipped via Standard Shipping and are estimated
              to arrive within 3-5 business days from the day you place order.
            </p>
          </div>
          <div className="form-content">
            {/*
              TODO: might be used later when there is the case that
              billing andshipping have different addresses

              {this.props.fType === 'cart_billing_info' && (
                <React.Fragment>
                  <p className="billing-toggle-txt">
                    <input
                      type="checkbox"
                      name="agree_terms"
                      className="chkbx-chk"
                      id="billing_same"
                      value={this.props.basEnabled}
                      onChange={this.props.basSwitcher}
                    />
                    Billing Address is the same as Shipping Address
                  </p>
                </React.Fragment>
              )}
            */}
            {this.props.fType === 'cart_user_info' && (
              <React.Fragment>
                <UInfoInput
                  icon
                  field="firstName"
                  value={this.state.firstName}
                  handler={this.uInfoChangeHandler}
                />
                <UInfoInput
                  icon
                  field="lastName"
                  value={this.state.lastName}
                  handler={this.uInfoChangeHandler}
                />
                <UInfoInput
                  icon
                  field="email"
                  value={this.state.email}
                  handler={this.uInfoChangeHandler}
                />
                <UInfoInput
                  icon
                  field={ids[this.props.fType].address}
                  value={this.state[ids[this.props.fType].address]}
                  handler={this.uInfoChangeHandler}
                />
                <UInfoInput
                  icon
                  field={ids[this.props.fType].address2}
                  value={this.state[ids[this.props.fType].address2]}
                  handler={this.uInfoChangeHandler}
                />
                <UInfoSelect
                  icon
                  field={ids[this.props.fType].state}
                  value={this.state[ids[this.props.fType].state]}
                  handler={this.uInfoChangeHandler}
                >
                  <option value="select_state">Select State</option>
                  <option value="AL">Alabama (AL)</option>
                  <option value="AK">Alaska (AK)</option>
                  <option value="AS">American Samoa (AS)</option>
                  <option value="AZ">Arizona (AZ)</option>
                  <option value="AR">Arkansas (AR)</option>
                  <option value="AE-A">Armed Forces Africa (AE)</option>
                  <option value="AA">Armed Forces Americas (AA)</option>
                  <option value="AE-C">Armed Forces Canada (AE)</option>
                  <option value="AE-E">Armed Forces Europe (AE)</option>
                  <option value="AE-M">Armed Forces Middle East (AE)</option>
                  <option value="AP">Armed Forces Pacific (AP)</option>
                  <option value="CA">California (CA)</option>
                  <option value="CO">Colorado (CO)</option>
                  <option value="CT">Connecticut (CT)</option>
                  <option value="DE">Delaware (DE)</option>
                  <option value="DC">District of Columbia (DC)</option>
                  <option value="FM">
                    Federated States of Micronesia (FM)
                  </option>
                  <option value="FL">Florida (FL)</option>
                  <option value="GA">Georgia (GA)</option>
                  <option value="GU">Guam (GU)</option>
                  <option value="HI">Hawaii (HI)</option>
                  <option value="ID">Idaho (ID)</option>
                  <option value="IL">Illinois (IL)</option>
                  <option value="IN">Indiana (IN)</option>
                  <option value="IA">Iowa (IA)</option>
                  <option value="KS">Kansas (KS)</option>
                  <option value="KY">Kentucky (KY)</option>
                  <option value="LA">Louisiana (LA)</option>
                  <option value="ME">Maine (ME)</option>
                  <option value="MD">Maryland (MD)</option>
                  <option value="MA">Massachusetts (MA)</option>
                  <option value="MI">Michigan (MI)</option>
                  <option value="MN">Minnesota (MN)</option>
                  <option value="MS">Mississippi (MS)</option>
                  <option value="MO">Missouri (MO)</option>
                  <option value="MT">Montana (MT)</option>
                  <option value="NE">Nebraska (NE)</option>
                  <option value="NV">Nevada (NV)</option>
                  <option value="NH">New Hampshire (NH)</option>
                  <option value="NJ">New Jersey (NJ)</option>
                  <option value="NM">New Mexico (NM)</option>
                  <option value="NY">New York (NY)</option>
                  <option value="NC">North Carolina (NC)</option>
                  <option value="ND">North Dakota (ND)</option>
                  <option value="MP">Northern Mariana Islands (MP)</option>
                  <option value="OH">Ohio (OH)</option>
                  <option value="OK">Oklahoma (OK)</option>
                  <option value="OR">Oregon (OR)</option>
                  <option value="PA">Pennsylvania (PA)</option>
                  <option value="PR">Puerto Rico (PR)</option>
                  <option value="MH">Republic of Marshall Islands (MH)</option>
                  <option value="RI">Rhode Island (RI)</option>
                  <option value="SC">South Carolina (SC)</option>
                  <option value="SD">South Dakota (SD)</option>
                  <option value="TN">Tennessee (TN)</option>
                  <option value="TX">Texas (TX)</option>
                  <option value="UT">Utah (UT)</option>
                  <option value="VT">Vermont (VT)</option>
                  <option value="VI">Virgin Islands of the U.S. (VI)</option>
                  <option value="VA">Virginia (VA)</option>
                  <option value="WA">Washington (WA)</option>
                  <option value="WV">West Virginia (WV)</option>
                  <option value="WI">Wisconsin (WI)</option>
                  <option value="WY">Wyoming (WY)</option>
                </UInfoSelect>
                <UInfoInput
                  icon
                  field={ids[this.props.fType].city}
                  value={this.state[ids[this.props.fType].city]}
                  handler={this.uInfoChangeHandler}
                />
                <UInfoInput
                  icon
                  field={ids[this.props.fType].zip_code}
                  value={this.state[ids[this.props.fType].zip_code]}
                  handler={this.uInfoChangeHandler}
                />
                <UInfoInput
                  icon
                  field={ids[this.props.fType].phone_number}
                  value={this.state[ids[this.props.fType].phone_number]}
                  handler={this.uInfoChangeHandler}
                />
              </React.Fragment>
            )}
            {this.props.fType === 'cart_billing_info' &&
              !this.props.basEnabled && (
                <React.Fragment>
                  <UInfoInput
                    icon
                    field="firstName"
                    value={this.state.firstName}
                    handler={this.uInfoChangeHandler}
                  />
                  <UInfoInput
                    icon
                    field="lastName"
                    value={this.state.lastName}
                    handler={this.uInfoChangeHandler}
                  />
                  <UInfoInput
                    icon
                    field="email"
                    value={this.state.email}
                    handler={this.uInfoChangeHandler}
                  />
                  <UInfoInput
                    icon
                    field={ids[this.props.fType].address}
                    value={this.state[ids[this.props.fType].address]}
                    handler={this.uInfoChangeHandler}
                  />
                  <UInfoInput
                    icon
                    field={ids[this.props.fType].address2}
                    value={this.state[ids[this.props.fType].address2]}
                    handler={this.uInfoChangeHandler}
                  />
                  <UInfoSelect
                    icon
                    field={ids[this.props.fType].state}
                    value={this.state[ids[this.props.fType].state]}
                    handler={this.uInfoChangeHandler}
                  >
                    <option value="select_state">Select State</option>
                    <option value="AL">Alabama (AL)</option>
                    <option value="AK">Alaska (AK)</option>
                    <option value="AS">American Samoa (AS)</option>
                    <option value="AZ">Arizona (AZ)</option>
                    <option value="AR">Arkansas (AR)</option>
                    <option value="AE-A">Armed Forces Africa (AE)</option>
                    <option value="AA">Armed Forces Americas (AA)</option>
                    <option value="AE-C">Armed Forces Canada (AE)</option>
                    <option value="AE-E">Armed Forces Europe (AE)</option>
                    <option value="AE-M">Armed Forces Middle East (AE)</option>
                    <option value="AP">Armed Forces Pacific (AP)</option>
                    <option value="CA">California (CA)</option>
                    <option value="CO">Colorado (CO)</option>
                    <option value="CT">Connecticut (CT)</option>
                    <option value="DE">Delaware (DE)</option>
                    <option value="DC">District of Columbia (DC)</option>
                    <option value="FM">
                      Federated States of Micronesia (FM)
                    </option>
                    <option value="FL">Florida (FL)</option>
                    <option value="GA">Georgia (GA)</option>
                    <option value="GU">Guam (GU)</option>
                    <option value="HI">Hawaii (HI)</option>
                    <option value="ID">Idaho (ID)</option>
                    <option value="IL">Illinois (IL)</option>
                    <option value="IN">Indiana (IN)</option>
                    <option value="IA">Iowa (IA)</option>
                    <option value="KS">Kansas (KS)</option>
                    <option value="KY">Kentucky (KY)</option>
                    <option value="LA">Louisiana (LA)</option>
                    <option value="ME">Maine (ME)</option>
                    <option value="MD">Maryland (MD)</option>
                    <option value="MA">Massachusetts (MA)</option>
                    <option value="MI">Michigan (MI)</option>
                    <option value="MN">Minnesota (MN)</option>
                    <option value="MS">Mississippi (MS)</option>
                    <option value="MO">Missouri (MO)</option>
                    <option value="MT">Montana (MT)</option>
                    <option value="NE">Nebraska (NE)</option>
                    <option value="NV">Nevada (NV)</option>
                    <option value="NH">New Hampshire (NH)</option>
                    <option value="NJ">New Jersey (NJ)</option>
                    <option value="NM">New Mexico (NM)</option>
                    <option value="NY">New York (NY)</option>
                    <option value="NC">North Carolina (NC)</option>
                    <option value="ND">North Dakota (ND)</option>
                    <option value="MP">Northern Mariana Islands (MP)</option>
                    <option value="OH">Ohio (OH)</option>
                    <option value="OK">Oklahoma (OK)</option>
                    <option value="OR">Oregon (OR)</option>
                    <option value="PA">Pennsylvania (PA)</option>
                    <option value="PR">Puerto Rico (PR)</option>
                    <option value="MH">
                      Republic of Marshall Islands (MH)
                    </option>
                    <option value="RI">Rhode Island (RI)</option>
                    <option value="SC">South Carolina (SC)</option>
                    <option value="SD">South Dakota (SD)</option>
                    <option value="TN">Tennessee (TN)</option>
                    <option value="TX">Texas (TX)</option>
                    <option value="UT">Utah (UT)</option>
                    <option value="VT">Vermont (VT)</option>
                    <option value="VI">Virgin Islands of the U.S. (VI)</option>
                    <option value="VA">Virginia (VA)</option>
                    <option value="WA">Washington (WA)</option>
                    <option value="WV">West Virginia (WV)</option>
                    <option value="WI">Wisconsin (WI)</option>
                    <option value="WY">Wyoming (WY)</option>
                  </UInfoSelect>
                  <UInfoInput
                    icon
                    field={ids[this.props.fType].city}
                    value={this.state[ids[this.props.fType].city]}
                    handler={this.uInfoChangeHandler}
                  />
                  <UInfoInput
                    icon
                    field={ids[this.props.fType].zip_code}
                    value={this.state[ids[this.props.fType].zip_code]}
                    handler={this.uInfoChangeHandler}
                  />
                  <UInfoInput
                    icon
                    field={ids[this.props.fType].phone_number}
                    value={this.state[ids[this.props.fType].phone_number]}
                    handler={this.uInfoChangeHandler}
                  />
                </React.Fragment>
              )}
            {this.props.fType === 'cart_billing_info' && (
              <React.Fragment>
                <div className="cards">
                  <span className="card-visa">
                    <img alt="" src="/static/assets/images/card-visa.png" />
                  </span>
                  <span className="card-mastercard">
                    <img
                      alt=""
                      src="/static/assets/images/card-mastercard.png"
                    />
                  </span>
                </div>
                <UInfoInput
                  icon={false}
                  field="card_number"
                  value={this.state.card_number}
                  handler={this.uInfoChangeHandler}
                />
                <UInfoSelect
                  icon={false}
                  field="month"
                  value={this.state.month}
                  handler={this.uInfoChangeHandler}
                >
                  <option disabled="" value="--">
                    – –
                  </option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </UInfoSelect>
                <UInfoSelect
                  icon={false}
                  field="year"
                  value={this.state.year}
                  handler={this.uInfoChangeHandler}
                >
                  <option disabled="" value="--">
                    – –
                  </option>
                  <option value="2018">18</option>
                  <option value="2019">19</option>
                  <option value="2020">20</option>
                  <option value="2021">21</option>
                  <option value="2022">22</option>
                  <option value="2023">23</option>
                  <option value="2024">24</option>
                </UInfoSelect>
                <UInfoInput
                  icon={false}
                  field="cvv"
                  value={this.state.cvv}
                  handler={this.uInfoChangeHandler}
                />
                <div className="frmelements short2 mob-sort">
                  <a
                    href="cvv.html"
                    className="fancybox fancybox.iframe whats-this"
                  >
                    What is this?
                  </a>
                </div>
                <p className="billing-toggle-txt">
                  <input
                    type="checkbox"
                    name="agree_terms"
                    className="chkbx-chk"
                    id="agree_terms"
                    value={this.state.agreeChecked}
                    onChange={this.switchAgree}
                  />
                  I agree to the Terms &amp; Conditions &amp;Privacy Policy.<br />All
                  charges on your bank statement will appear as
                  &quot;AmericanScience8886016014&quot;
                </p>
                <div className="clearall" />
                <div className="frmelements btn-element">
                  <input
                    alt=""
                    type="image"
                    src="/static/assets/images/btn.png"
                    className="button-crt"
                    id="cart_submit"
                    onClick={ev => {
                      ev.preventDefault();
                      this.props.submitHandler(this.state);
                      return false;
                    }}
                  />
                </div>
                <center>
                  <img
                    alt=""
                    src="/static/assets/images/postal-crt.png"
                    className="postal-crt"
                  />
                </center>
              </React.Fragment>
            )}
          </div>
        </div>
      </form>
    );
  }
}

export { UInfoForm };
