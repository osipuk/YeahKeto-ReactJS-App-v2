jQuery(function ($) {
	var page_product_id = 166;
	validationUtility.applyMask();
	var data = {
	    "package": [
	       {   "id" : "0", 
	           "product_name" : "6 Bottle",
	           "price": 97,
	           "offer_price": 32.83,
	           "list_price": 582,
	           "price_today": 197,
	           "you_save" : 385,
	           "offer_percent": 66,
	           "product_id": 165
	       },
	       {   "id" : "1", 
	           "product_name" : "3 Bottle",
	           "price": 97,
	           "offer_price": 39.99,
	           "list_price": 291,
	           "price_today": 119.99,
	           "you_save" : 171,
	           "offer_percent": 58,
	           "product_id": 166
	       },
	       {   "id" : "2",
	           "product_name" : "1 Bottle",
	           "price": 97,
	           "offer_price": 47,
	           "list_price": 97,
	           "price_today": 47,
	           "you_save" : 50,
	           "offer_percent": 51,
	           "product_id": 167
	       }
	   ]
	};

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    var package = getParameterByName('package');
    if (package) {
	    $(".prod_name").text(data.package[package].product_name);
	    $(".original_price").text(data.package[package].price);
	    $(".p_offer_price").text(data.package[package].offer_price);
	    $(".p_total_amt").text(data.package[package].price_today);
	    $(".prod_img").attr("src","/assets/images/bottles/"+package+".png");
	    $(".charge_main").text(data.package[package].price_today);
	    $(".charge_total").text(data.package[package].price_today);
	    page_product_id = data.package[package].product_id;
	}
    /*===== validate if shipping and billing is same or not ===*/
	$('input[name="is_shipping_same"]').change(function () {
		if ($('input[name="is_shipping_same"]:checked').val() == 'no') {
			$(".shipping_info").slideDown(300);

		} else {
			$(".shipping_info").slideUp(300);

		}

	});
	
	/*====== cradit card validate =====*/
	
	const cardNumberConfigurations = {
        amex: {
          mask: {
            pattern: '0000 000000 00000',
            config: { translation: { 0: { pattern: /[0-9]/ } } },
          },
          maxLength: '17',
        },
        defaultCC: {
          mask: {
            pattern: '0000 0000 0000 0000',
            config: { translation: { 0: { pattern: /[0-9]/ } } },
          },
          maxLength: '19',
        },
      };
		function configureCCInput(config) {
			const $inputCardNumber = $('input[name=cardNumber]');

			$inputCardNumber.mask(config.mask.pattern, config.mask.config);
			$inputCardNumber.attr('maxlength', config.maxLength);
		  }
	 function setCCActive(className) {
       $('.card_type span').removeClass('active');
       $(`.card_type span.${className}`).addClass('active');
     }
	function keyupEvent(event) {
		//alert("Test");
		 
        if (event.target.value.length >= 2) {
          numbstr = event.target.value.replace(/\s/g, '');
          let stcase = numbstr.slice(0, 2);
          stcase = parseInt(stcase, 10);

          if (stcase >= 40 && stcase <= 49) {
            if (event.target.value.length === 19) {
              return;
            }
            setCCActive('visa');
            configureCCInput(cardNumberConfigurations.defaultCC);
          } else if ((stcase > 21 && stcase < 28) || (stcase > 50 && stcase < 56)) {
            if (event.target.value.length === 19) {
              return;
            }
            setCCActive('mastercard');
            configureCCInput(cardNumberConfigurations.defaultCC);
          } else if ((stcase > 56 && stcase <= 65) || (stcase > 66 && stcase < 69) || stcase === 50) {
            if (event.target.value.length === 19) {
              return;
            }
            setCCActive('discover');
            configureCCInput(cardNumberConfigurations.defaultCC);
          } else {
            configureCCInput(cardNumberConfigurations.defaultCC);
          }
        }
      }

      $(document).on('keyup', '#cardNumber', keyupEvent);

      function submitForm(userData, Billingdata) {
      	const $loadingBar = $('div.js-div-loading-bar');
	      $loadingBar.show();

	      UniversalStorage.saveCheckoutField('firstName', Billingdata.firstName);
	      UniversalStorage.saveCheckoutField('lastName', Billingdata.lastName);
	      UniversalStorage.saveCheckoutField('address', Billingdata.address);
        UniversalStorage.saveCheckoutField('address2', Billingdata.address2);
	      UniversalStorage.saveCheckoutField('city', Billingdata.city);
	      UniversalStorage.saveCheckoutField('state', Billingdata.state);
	      UniversalStorage.saveCheckoutField('country', Billingdata.state);
	      UniversalStorage.saveCheckoutField('postalCode', Billingdata.postalCode);
	      UniversalStorage.saveCheckoutField('email', Billingdata.email);

	      window.utilsInstance.storeSessionToServer(UniversalStorage.getCheckoutDetails(), () => {
	        window.utilsInstance.callAPI('add-contact', userData, 'POST', (response) => {
	          if (response.success) {
	            createKonnectiveLead(userData, () => {
	              try {
	                var trackingVars = UniversalStorage.getStorageItem('trckvar');
	                if (trackingVars) {
	                  Billingdata.tracking_vars = trackingVars;
	                }
	              } catch (e) {
	                console.log('exception while fetching tracking values, message : ' + e.message.toString());
	              }

	              window.utilsInstance.callAPI('create-order', Billingdata, 'POST', (resp) => {
	                if (resp.success) {
	                  if (resp.orderId) {
	                    UniversalStorage.saveOrderId(resp.orderId);
	                    UniversalStorage.saveCheckoutField('productId', Billingdata.productId);
	                  }

	                  window.utilsInstance.storeSessionToServer(UniversalStorage.getCheckoutDetails(), () => {
			           window.utilsInstance.wrapLocationChange('upsell.html' +  window.location.search);
			          });
	                } else {
	                  $loadingBar.hide();

	                  let responseMessage = resp.message;
	                  if (responseMessage) {
	                    let errHead = 'Problem with your order';
	                    let errBody;
	                    if (responseMessage === 'Invalid Credit Card Number') {
	                      errHead = 'Payment validation failed:  Processor Declined.';
	                      responseMessage += '<br><br>For security reasons, you must re-enter a new card number.<br><br>';
	                    }
	                    responseMessage += '<br>Tip: you may try another card or call <a href=\'tel:+18558807233\'>(855) 880-7233</a>.';
	                    errBody = '<span style=\'font-size:20px\'>';
	                    errBody += responseMessage;
	                    errBody += '<span>';
	                    window.utilsInstance.showModal(errBody, errHead);
	                  }
	                }
	              });
	            }, () => {
	              $loadingBar.hide();
	            });
	          } else {
	            $loadingBar.hide();
	          }
	        }, (e) => {
	          $loadingBar.hide();
	        });
	      });

	      return false; // eslint-disable-line consistent-return
      }

      // Lead create/update
    function createKonnectiveLead(data, callback, err) {
      window.utilsInstance.callAPI('create-lead', data, 'POST', (resp) => {
        if (resp.success) {
          if (resp.orderId) {
            UniversalStorage.saveOrderId(resp.orderId);
          }
        }

        callback(resp.success);
      }, (textStatus) => {
        if (typeof err === 'function') {
          err(textStatus);
        }
      });
    }

    $('#order_form').formValidation({
        framework: 'pure',
        excluded: [':not(:visible)'],
        icon: {
          valid: 'fa fa-check',
          invalid: 'fa fa-times',
          validating: 'fa fa-refresh',
        },
        autoFocus: true,
        fields: {
          firstName: {
            validators: {
              notEmpty: {
                message: 'The first name is required.',
              },
            },
          },
          lastName: {
            validators: {
              notEmpty: {
                message: 'The last name is required.',
              },
            },
          },
          address: {
            validators: {
              stringLength: {
                min: 1,
                max: 100,
                message: 'The address must be less than 100 characters long.',
              },
              notEmpty: { message: 'The address is required.' },
            },
          },
          address2: {
            validators: {
              stringLength: {
                min: 1,
              },
            },
          },
          city: {
            validators: {
              stringLength: {
                max: 50,
                message: 'The city must be less than 50 characters long.',
              },
              notEmpty: {
                message: 'The city is required.',
              },
            },
          },
          state: {
            validators: {
              notEmpty: {
                message: 'The State is required.',
              },
            },
          },
          country: {
            validators: {
              notEmpty: {
                message: 'The Country is required.',
              },
            },
          },
          postalCode: {
            validators: {
              stringLength: {
                min: 5,
                message: 'The zip code must be 5 number long.',
              },
              notEmpty: { message: 'The zip code is required.' },
            },
          },
          email: {
            trigger: 'blur',
            validators: {
              notEmpty: { message: 'The email address is required.' },
              emailAddress: {
                message: 'The value is not a valid email address.',
              },
            },
          },
          cardNumber: {
            trigger: 'blur',
            validators: {
              notEmpty: { message: 'Enter the card number.' },
              creditCard: {
                message: 'Enter a valid card number.',
                // This will allow to Accept test credit card numbers
                transformer($field) {
                  const TEST_CARD_NUMBERS = [
                    '1333 3333 3333 3333',
                    '3333 2222 33332 222',
                    '3003 0008 4444 44'];
                  // We will transform those test card numbers into a valid one as below
                  const VALID_CARD_NUMBER = '4444111144441111';

                  // Get the number pr by user
                  const value = $field.val();

                  // Check if it"s one of test card numbers
                  if (value !== '' && $.inArray(value, TEST_CARD_NUMBERS) > -1) {
                    // then turn it to be a valid one defined by VALID_CARD_NUMBER
                    return VALID_CARD_NUMBER;
                  }

                  // Otherwise, just return the initial value
                  return value;
                },
              },
            },
          },
          month: {
            validators: {
              notEmpty: { message: 'The Month is required.' },
              callback: {
                message: 'Please set month more or equal current.',
                callback(value, validator, $field) {
                  const form = $field.parents('form');
                  const currentDate = new Date();
                  const year = parseInt(currentDate.getYear(), 10);
                  const yearVal = parseInt(form.find('[name=year]').val(), 10);
                  if (isNaN(yearVal) || yearVal === null || yearVal === undefined) {
                    return true;
                  }
                  const selectedYear = 100 + (parseInt(form.find('[name=year]').val(), 10) || 0);
                  const currentMonth = parseInt(value, 10) -
                                     1 >= parseInt(currentDate.getMonth(), 10);
                  if (selectedYear === year) {
                    if (currentMonth) {
                      form.find('[name=year]')
                        .parents('.form-group')
                        .removeClass('has-warning')
                        .addClass('has-success');
                      form.find('[name=year]')
                        .parents('.form-group')
                        .find('.form-control-feedback')
                        .hide();
                    } else {
                      form.find('[name=year]')
                        .parents('.form-group')
                        .removeClass('has-success')
                        .addClass('has-warning');
                      form.find('[name=year]')
                        .parents('.form-group')
                        .find('[data-fv-validator=\'callback\']')
                        .show();
                    }
                    return currentMonth;
                  }
                  form.find('[name=year]')
                    .parents('.form-group')
                    .removeClass('has-warning')
                    .addClass('has-success');
                  form.find('[name=year]')
                    .parents('.form-group')
                    .find('.form-control-feedback')
                    .hide();
                  return true;
                },
              },
            },
          },
          year: {
            validators: {
              notEmpty: { message: 'The Year is required.' },
              callback: {
                message: 'Please set year more or equal current.',
                callback(value) {
                  const currentDate = new Date();
                  const yearCondition = 100 +
                                       parseInt(value, 10) >= parseInt(currentDate.getYear(), 10);
                  $('#form-checkout').formValidation('revalidateField', 'month');
                  if ($('#form-checkout').find('[name=month]').parents('.form-group').hasClass('has-warning')) {
                    return false;
                  }
                  return yearCondition;
                },
              },
            },
          },
          cardSecurityCode: {
            validators: {
              stringLength: {
                min: 3,
                message: 'The CVV must be 3 number long.',
              },
              notEmpty: {
                message: 'The CVV is required.',
              },
            },
          },
          first_name_shipping: {
            enabled: false,
            validators: {
              notEmpty: {
                message: 'The first name is required.',
              },
            },
          },
          last_name_shipping: {
            enabled: false,
            validators: {
              notEmpty: {
                message: 'The last name is required.',
              },
            },
          },
          address_shipping: {
            enabled: false,
            validators: {
              stringLength: {
                min: 1,
                max: 100,
                message: 'The address must be less than 100 characters long.',
              },
              notEmpty: { message: 'The address is required.' },
            },
          },
          address2_shipping: {
            enabled: false,
            validators: {
              stringLength: {
                min: 1,
              },
            },
          },
          city_shipping: {
            enabled: false,
            validators: {
              stringLength: {
                max: 50,
                message: 'The city must be less than 50 characters long.',
              },
              notEmpty: {
                message: 'The city is required.',
              },
            },
          },
          state_shipping: {
            enabled: false,
            validators: {
              notEmpty: {
                message: 'The State is required.',
              },
            },
          },
          country_shipping: {
            enabled: false,
            validators: {
              notEmpty: {
                message: 'The Country is required.',
              },
            },
          },
          zip_shipping: {
            enabled: false,
            validators: {
              stringLength: {
                min: 5,
                message: 'The zip code must be 5 number long.',
              },
              notEmpty: { message: 'The zip code is required.' },
            },
          },
        },
      })
    .on('click', 'input[name="is_shipping_same"]:checked', function(e){
       fv = $('#order_form').data('formValidation');
      if ($(this).val() == 'no') {
        fv.enableFieldValidators('first_name_shipping', true).revalidateField('first_name_shipping');
        fv.enableFieldValidators('last_name_shipping', true).revalidateField('first_name_shipping');
        fv.enableFieldValidators('address_shipping', true).revalidateField('first_name_shipping');
        fv.enableFieldValidators('address2_shipping', true).revalidateField('first_name_shipping');
        fv.enableFieldValidators('city_shipping', true).revalidateField('first_name_shipping');
        fv.enableFieldValidators('state_shipping', true).revalidateField('first_name_shipping');
        fv.enableFieldValidators('country_shipping', true).revalidateField('first_name_shipping');
        fv.enableFieldValidators('zip_shipping', true).revalidateField('first_name_shipping');
      } else {
        fv.enableFieldValidators('first_name_shipping', false).revalidateField('first_name_shipping');
        fv.enableFieldValidators('last_name_shipping', false).revalidateField('first_name_shipping');
        fv.enableFieldValidators('address_shipping', false).revalidateField('first_name_shipping');
        fv.enableFieldValidators('address2_shipping', false).revalidateField('first_name_shipping');
        fv.enableFieldValidators('city_shipping', false).revalidateField('first_name_shipping');
        fv.enableFieldValidators('state_shipping', false).revalidateField('first_name_shipping');
        fv.enableFieldValidators('country_shipping', false).revalidateField('first_name_shipping');
        fv.enableFieldValidators('zip_shipping', false).revalidateField('first_name_shipping');
      }
    })
		.on('success.validator.fv', (e, data) => {
          if (data.field === 'cardNumber') {
            const $inputCardNumber = $('input[name=cardNumber]');

            if (data.validator === 'creditCard') {
              const $iconVisa = $('.cards span.card-visa');
              const $iconMasterCard = $('.cards span.card-mastercard');
              const $iconDiscover = $('.cards span.card-discover');

              $('.cards span').removeClass('active');
              switch (data.result.type) {
              case 'VISA':
                $iconVisa.addClass('active');
                $inputCardNumber.attr('maxlength', '19');
                break;
              case 'MASTERCARD':
                $iconMasterCard.addClass('active');
                $inputCardNumber.attr('maxlength', '19');
                break;
              case 'DISCOVER':
                $iconDiscover.addClass('active');
                $inputCardNumber.attr('maxlength', '19');
                break;
              default:
                $inputCardNumber.attr('maxlength', '19');
                break;
              }
            } else if (data.validator !== 'stringLength') {
              $inputCardNumber.attr('maxlength', '19');
            }
          }
        })
		.on('success.form.fv', (e) => {
			e.preventDefault();
          	var isBillingSame = ($('input[name="is_shipping_same"]:checked').val() == 'yes');
		
			var userData = {
		        firstName: $('#first_name').val().trim(),
		        lastName: $('#last_name').val().trim(),
		        address: $('#address_1').val().trim(),
            address2: $('#address_2').val().trim(),
		        city: $('#city').val().trim(),
		        state: $('#state').val().trim(),
		        country: $('#country').val().trim(),
		        postalCode: $('#zip_code').val().trim(),
		        email: $('#email').val().trim(),
		        forcbd333: true
		      };
		   	var Billingdata = {
	            firstName: isBillingSame ? userData.firstName : $('#first_name_shipping').val().trim(),
	            lastName: isBillingSame ? userData.lastName : $('#last_name_shipping').val().trim(),
	            address: isBillingSame ? userData.address : $('#address_shipping').val().trim(),
              address2: isBillingSame ? userData.address2 : $('#address_2_shipping').val().trim(),
	            city: isBillingSame ? userData.city : $('#city_shipping').val().trim(),
	            state: isBillingSame ? userData.state : $('#state_shipping').val().trim(),
	            country: isBillingSame ? userData.country : $('#country_shipping').val().trim(),
	            postalCode: isBillingSame ? userData.postalCode : $('#zip_shipping').val().trim(),
	            email: userData.email,
	            cardNumber: $("#cardNumber").val().trim(),
	            cardMonth: $('#exp_month').val().trim(),
	            cardYear: $('#exp_year').val().trim(),
	            cardSecurityCode: $('#cvv').val().trim(),
	            productId: page_product_id,
	            forcbd333: true
	          };
	          submitForm(userData, Billingdata);
        });
});