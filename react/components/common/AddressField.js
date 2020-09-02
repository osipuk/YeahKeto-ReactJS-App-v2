import React from 'react';
import idx from 'idx';

/**
 * @class AddressField
 * @extends {React.PureComponent}
 * @description AddressField with dropdown populated with geoplaces and autocomplete
 */
class AddressField extends React.PureComponent {
  constructor() {
    super();
    this.autocompleteRef = React.createRef();
  }

  /**
   * @memberof AddressField
   * @function
   * @description initialise geoplaces script and add eventHandlers
   */
  componentDidMount() {
    if (this.props.input.value) {
      this.autocompleteRef.current.focus();
      this.autocompleteRef.current.blur();
    }
    const placesScript = document.createElement('script');
    placesScript.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDkEIdHmcCCKXbjuk5jqel_oaRXdXx9bF0&libraries=places';
    placesScript.async = true;
    placesScript.addEventListener('load', () => {
      this.initialiseAutoComplete();
    });
    document.body.appendChild(placesScript);
  }

  /**
   * @memberof AddressField
   * @function
   * @description changes the value of the address fields inside redux form state
   */
  fillInAddress = () => {
    const place = this.autocomplete.getPlace();
    let city =
      place.address_components &&
      place.address_components.find(c => c.types.indexOf('locality') >= 0);
    city = idx(city, _ => _.long_name);
    let state =
      place.address_components &&
      place.address_components.find(
        c => c.types.indexOf('administrative_area_level_1') >= 0,
      );
    state = idx(state, _ => _.short_name);
    let postalCode =
      place.address_components &&
      place.address_components.find(c => c.types.indexOf('postal_code') >= 0);
    postalCode = idx(postalCode, _ => _.short_name);
    setImmediate(() => {
      this.props.changeField(
        'Address1',
        this.autocompleteRef.current.value.split(',')[0],
      );
      this.props.changeField('City', city);
      this.props.changeField('State', state);
      this.props.changeField('ZipCode', postalCode);
    });
  };

  /**
   * @memberof AddressField
   * @function
   */
  initialiseAutoComplete = () => {
    const { google } = window;
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteRef.current,
      {
        types: ['geocode'],
      },
    );
    this.autocomplete.addListener('place_changed', this.fillInAddress);
  };

  /**
   * @memberof AddressField
   * @function
   * @description trigger geo location
   */
  geolocate = () => {
    const { google } = window;
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy,
        });
        this.autocomplete.setBounds(circle.getBounds());
      });
    }
  };

  render() {
    const { props } = this;
    const hasError = props.meta.touched && props.meta.error;
    const valid = props.meta.touched && props.meta.valid;
    return (
      <React.Fragment>
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
            <input
              onFocus={this.geolocate}
              ref={this.autocompleteRef}
              {...props}
              {...props.input}
            />
          ) : (
            <div className="field">
              <div className="icon-box">
                <center>
                  <img src={props.icon} alt="" />
                </center>
              </div>
              <input
                className="ft-input"
                onFocus={this.geolocate}
                ref={this.autocompleteRef}
                {...props}
                {...props.input}
              />
            </div>
          )}
          <i
            style={{ display: hasError || valid }}
            className={`fv-control-feedback ${hasError &&
              'fa fa-times'} ${valid && 'fa fa-check'}`}
          />
          {hasError && (
            <small className="fv-help-block">{props.meta.error}</small>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export { AddressField };
