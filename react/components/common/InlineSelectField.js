import React from 'react';

const InlineSelectField = props => {
  const hasError = props.meta.submitFailed && props.meta.error;
  return (
    <React.Fragment>
      <select {...props.input} className="sprite5 sprite-select-arrow" disabled={props.disabled}>
        <option value={null}>{props.placeholder}</option>
        {Object.keys(props.options).map(val => (
          <option key={val} value={val}>
            {props.options[val]}
          </option>
        ))}
      </select>
      {hasError && <small className="fv-help-block">{props.meta.error}</small>}
    </React.Fragment>
  );
};

export { InlineSelectField };
