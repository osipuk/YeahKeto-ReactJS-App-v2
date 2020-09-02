import React from 'react';

const TextField = props => {
  const hasError = props.meta.touched && props.meta.error;
  const valid = props.input.value && props.meta.valid;
  console.log(valid,hasError,'ggg');
  return (
    <div
      className={`${props.containerClass} pure-control-group ${
        props.large ? 'frmelements' : 'frmElemts'
      } fv-has-feedback ${hasError && 'fv-has-error'} ${valid &&
        'fv-has-success'}`}
    >
      {
        props.label ? <label>
          {props.label}
          {props.required && <span>*</span>}
        </label> : null
      }
      {!props.large ? (
        <React.Fragment>
          <input {...props} {...props.input} />
          <i
            style={{ display: hasError || valid }}
            className={`fv-control-feedback ${hasError &&
              'fa fa-times'} ${valid && 'fa fa-check'}`}
          />
        </React.Fragment>
      ) : (
        <div className={`field ${!props.icon && 'no-icon'}`}>
          {props.icon && (
            <div className="icon-box">
              <center>
                <img src={props.icon} alt="input-icon" />
              </center>
            </div>
          )}
          <input
            {...props}
            {...props.input}
            className={`ft-input ${props.className}`}
          />
        </div>
      )}
      {hasError && <small className="fv-help-block">{props.meta.error}</small>}
    </div>
  );
};

const CVVField = props => {
  const hasError = props.meta.touched && props.meta.error;
  const valid = props.input.value && props.meta.valid;
  return (
    <div
      className={`${
        props.containerClass
      } pure-control-group frmElemts fv-has-feedback ${hasError &&
        'fv-has-error'} ${valid && 'fv-has-success'}`}
    >
      <label>
        {props.label}
        {props.required && <span>*</span>}
      </label>
      <input
        className={props.className}
        placeholder={props.placeholder}
        autoFocus={props.autofocus}
        type={props.type}
        {...props.input}
        maxLength={props.maxLength}
        disabled={props.disabled}
      />
      <i
        style={{ display: hasError || valid }}
        className={`fv-control-feedback ${hasError && 'fa fa-times'} ${valid &&
          'fa fa-check'}`}
      />
      <a
        href=""
        onClick={props.cvvClick}
        className="fancybox fancybox.iframe what"
      >
        What is This?
      </a>
      {hasError && <small className="fv-help-block">{props.meta.error}</small>}
    </div>
  );
};

export { TextField, CVVField };
