let autocomplete;
const componentForm = {
  city: 'locality',
  state: 'administrative_area_level_1',
  zip_code: 'postal_code',
  country: 'country'
};
const componentGoogle = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'short_name',
  postal_code: 'short_name',
  neighborhood: 'long_name',
};

let scopePrefix = '';

function initAutocomplete(prefix) {
  if (prefix) {
    scopePrefix = prefix;
  }
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById(`${scopePrefix}address_1`)),
    { types: ['geocode'] },
  );
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  const place = autocomplete.getPlace();

  for (var component in componentForm) {
    $(`#${scopePrefix}${component}`).val('');
  }
  if (place && place.address_components) {
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentGoogle[addressType]) {
        for (var component in componentForm) {
          if (componentForm[component] == addressType) {
            const val = place.address_components[i][componentGoogle[addressType]];
            $(`#${scopePrefix}${component}`).val(val);
            if ($(`#${scopePrefix}${component}`).parents('form').length != 0) {
              const name = $(`#${scopePrefix}${component}`).attr('name');
              $(`#${scopePrefix}${component}`).parents('form').formValidation('updateStatus', name, 'VALID');
            }
          }
        }
      }
    }
  }

  $(`#${scopePrefix}address_1`).val($(`#${scopePrefix}address_1`).val().split(',')[0]);
}

function geolocate(prefix) {
  if (prefix) {
    scopePrefix = prefix;
  } else {
    scopePrefix = '';
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy,
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
