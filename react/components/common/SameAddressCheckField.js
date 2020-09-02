import React from 'react';

const SameAddressCheckField = props => (
  <div className="sameas">
    Is your billing address the same as
    <br />your shipping address?<br />
    <span>
      <input
        className="chkbx"
        type="radio"
        value="Yes"
        checked={props.input.value === 'Yes'}
        onChange={props.input.onChange}
      />&nbsp;Yes
      <input
        className="chkbx"
        type="radio"
        value="No"
        checked={props.input.value === 'No'}
        onChange={props.input.onChange}
      />&nbsp;No
    </span>
  </div>
);

export { SameAddressCheckField };
