import React from 'react';

import { getMonths, getYears } from './Utils';

/**
 * @class CardExpiryField
 * @extends {React.PureComponent}
 * @description Card Expiry field used in desktop version ( Expiry month and year) <br />
 * Different from mobile because of UI and validation differences
 */
class CardExpiryField extends React.PureComponent {
  /**
   * @memberof CardExpiryField
   * @function
   */
  onBlur = () => {
    this.props.input.onBlur({
      cardYear: this.props.input.value.cardYear,
      cardMonth: this.props.input.value.cardMonth,
    });
  };
  updateMonth = e => {
    this.props.input.onChange({
      cardYear: this.props.input.value.cardYear,
      cardMonth: e.target.value,
    });
  };
  updateYear = e => {
    this.props.input.onChange({
      cardYear: e.target.value,
      cardMonth: this.props.input.value.cardMonth,
    });
  };

  render() {
    const { props } = this;
    const { value } = props.input;
    const hasError = props.meta.touched && props.meta.error;
    const valid = props.input.value && props.meta.valid;
    return (
      <React.Fragment>
        <div className="frmElemts exp-label">
          <label>&nbsp;</label>
          <label>(MM/YY)</label>
        </div>
        <div
          className={`pure-control-group ${
            props.large ? 'frmelements' : 'frmElemts'
          } fv-has-feedback ${hasError && 'fv-has-error'} ${valid &&
            'fv-has-success'}`}
        >
          <label>
            Expiry Date<span>*</span>:
          </label>
          <span>
            <select
              name="cardMonth"
              className="short"
              value={value.cardMonth}
              onChange={this.updateMonth}
              onBlur={this.onBlur}
            >
              <option value="">– –</option>
              {getMonths().map(month => (
                <option key={month} value={parseInt(month, 10)}>
                  {month}
                </option>
              ))}
            </select>
          </span>
          <span>
            <select
              name="cardYear"
              className="short2"
              value={value.cardYear}
              onChange={this.updateYear}
              onBlur={this.onBlur}
            >
              <option value="">– –</option>
              {getYears().map(year => (
                <option key={year} value={`20${year}`}>
                  {year}
                </option>
              ))}
            </select>
          </span>
          <div className="clearall" />
          {hasError && (
            <small className="fv-help-block">{props.meta.error}</small>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export { CardExpiryField };
