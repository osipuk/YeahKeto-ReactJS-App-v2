var validationUtility = {
  defaultMaskInput : [
    {
      'name': 'firstName',
      'type': 'non_numeric'
    },
    {
      'name': 'lastName',
      'type': 'non_numeric'
    },
    {
      'name': 'phoneNumber',
      'type': 'phone_number'
    },
    {
      'name': 'postalCode',
      'type': 'postal_code'
    },
    {
      'name': 'cardSecurityCode',
      'type': 'ccv'
    }
  ],
  /**
  * This function mask input fields based on the type of the input fields, based on pre determined regex
  * User shall pass array of fields with name and type as key.
  * an additional field can be passed as regex which would be used as masking pattern
  */
	applyMask : function(inputFields) {
	  if (!$.isArray(inputFields)) {
	  	inputFields = this.defaultMaskInput;
	  }
	  $.each(inputFields, (index, value) => {
      if (!value.name || !value.type) {
        throw "name and type values should be present";
      }
      switch (value.type) {
      	case 'non_numeric' :
      		$('input[name=' + value.name + ']').mask('0', { translation: { 0: { pattern: (value.regex) ? value.regex : /^[a-z\s]+$/i, recursive: true } } });
      		break;
      	case 'postal_code' :
      		$('input[name=' + value.name + ']').mask('00000', { translation: { 0: { pattern: (value.regex) ? value.regex : /[0-9]/} } });
      		break;
      	case 'phone_number' :
      		$('input[name=' + value.name + ']').mask('(000) 000-0000', { translation: { 0: { pattern: (value.regex) ? value.regex : /[0-9*]/} } });
      		break;
      	case 'ccv' :
      		$('input[name=' + value.name + ']').mask('000', { translation: { 0: { pattern: (value.regex) ? value.regex : /[0-9]/} } });
      		break;
      }
    });
	}
}