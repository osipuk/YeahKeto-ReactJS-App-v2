/**
 * cart page
 */
const pCart = (function () {
  const checkoutFields = [
    'firstName',
    'lastName',
    'address',
    'address2',
    'city',
    'state',
    'postalCode',
    'phoneNumber',
    'email',
  ];
  return {
    init() {
      const $parent = this;

      this._initializeFormsValidation();
      validationUtility.applyMask();
      this._handleCartSubmit();
      this._detectCard();

      $('.smobitrigger').smplmnu();
      $('.fancybox').fancybox();
      $('.chkbx-chk').click((e) => {
        $('#billingflds').slideToggle();
        initAutocomplete('billing_cart_');
      });

      $('select').on('change', () => {
        $parent._calcPricing();
      });
    },

    _initializeFormsValidation() {
      const $parent = this;

      $('#cart_user_info').formValidation({
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
            excluded: true,
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
          postalCode: {
            trigger: 'blur',
            validators: {
              stringLength: {
                min: 5,
                message: 'The zip code must be 5 number long.',
              },
              notEmpty: { message: 'The zip code is required.' },
            },
          },
          phoneNumber: {
            trigger: 'blur',
            validators: {
              notEmpty: { message: 'Please enter your phone number.' },
              callback: {
                message: 'Not a valid 10-digit US phone number (must not include spaces or special characters).',
                callback() {
                  const phoneNumber = $('#phone_number').val().replace(/[^0-9]/g, '');

                  return (phoneNumber.length == 10 || phoneNumber.length == 0);
                },
              },
            },
          },
          email: {
            validators: {
              notEmpty: { message: 'The email address is required.' },
              emailAddress: {
                message: 'The value is not a valid email address.',
              },
            },
          },
        },
      });

      $('#cart_billing_info').formValidation({
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
            excluded: true,
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
          postalCode: {
            trigger: 'blur',
            validators: {
              stringLength: {
                min: 5,
                message: 'The zip code must be 5 number long.',
              },
              notEmpty: { message: 'The zip code is required.' },
            },
          },
          phoneNumber: {
            trigger: 'blur',
            validators: {
              notEmpty: { message: 'Please enter your phone number.' },
              callback: {
                message: 'Not a valid 10-digit US phone number (must not include spaces or special characters).',
                callback() {
                  const phoneNumber = $('#billing_cart_phone_number').val().replace(/[^0-9]/g, '');

                  return (phoneNumber.length == 10);
                },
              },
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
        },
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
        });
    },

    _submitCheckoutForm() {
      const productInfo = {
        product1: {
          id: $('#product_select').find('[name=product1_id]').val(),
          qty: $('#product1_qty').val(),
        },
        product2: {
          id: $('#product_select').find('[name=product2_id]').val(),
          qty: $('#product2_qty').val(),
        },
        product3: {
          id: $('#product_select').find('[name=product3_id]').val(),
          qty: $('#product3_qty').val(),
        },
      };
      let anyProductOrdered = false;
      for (const i in productInfo) {
        if (parseInt(productInfo[i].qty) > 0) {
          anyProductOrdered = true;
          break;
        }
      }
      if (!anyProductOrdered) {
        const errHead = 'Problem with your order';
        let errBody = '<span style=\'font-size:20px\'>';
        errBody += 'Please select atleast one product';
        errBody += '<span>';
        window.utilsInstance.showModal(errBody, errHead);
        return;
      }
      const data = {
        firstName: $('#cart_user_info').find('[name=firstName]').val(),
        lastName: $('#cart_user_info').find('[name=lastName]').val(),
        address: $('#cart_user_info').find('[name=address]').val(),
        address2: $('#cart_user_info').find('[name=address2]').val(),
        city: $('#cart_user_info').find('[name=city]').val(),
        state: $('#cart_user_info').find('[name=state]').val(),
        postalCode: $('#cart_user_info').find('[name=postalCode]').val(),
        phoneNumber: $('#cart_user_info').find('[name=phoneNumber]').val().replace(/[^0-9]/g, ''),
        email: $('#cart_user_info').find('[name=email]').val(),
      };

      UniversalStorage.saveCheckoutField('firstName', data.firstName);
      UniversalStorage.saveCheckoutField('lastName', data.lastName);
      UniversalStorage.saveCheckoutField('address', data.address);
      UniversalStorage.saveCheckoutField('address2', data.address2);
      UniversalStorage.saveCheckoutField('city', data.city);
      UniversalStorage.saveCheckoutField('state', data.state);
      UniversalStorage.saveCheckoutField('postalCode', data.postalCode);
      UniversalStorage.saveCheckoutField('phoneNumber', data.phoneNumber);
      UniversalStorage.saveCheckoutField('email', data.email);

      window.utilsInstance.storeSessionToServer(UniversalStorage.getCheckoutDetails(), () => {
        const $loadingBar = $('div.js-div-loading-bar');
        $loadingBar.show();

        window.utilsInstance.callAPI('add-contact', data, 'POST', (response) => {
          if (response.success) {
            this._createKonnectiveLead(data, () => {
              const MediaStorage = UniversalStorage.getCheckoutDetails();
              const Billingdata = {
                firstName: $('#cart_billing_info').find('[name=firstName]').val(),
                lastName: $('#cart_billing_info').find('[name=lastName]').val(),
                address: $('#cart_billing_info').find('[name=address]').val(),
                address2: $('#cart_billing_info').find('[name=address2]').val(),
                city: $('#cart_billing_info').find('[name=city]').val(),
                state: $('#cart_billing_info').find('[name=state]').val(),
                postalCode: $('#cart_billing_info').find('[name=postalCode]').val(),
                phoneNumber: $('#cart_billing_info').find('[name=phoneNumber]').val().replace(/[^0-9]/g, ''),
                email: $('#cart_billing_info').find('[name=email]').val(),
                orderId: MediaStorage.orderId,
                cardNumber: $('#cart_billing_info').find('[name=cardNumber]').val(),
                cardMonth: $('#cart_billing_info').find('[name=month]').val(),
                cardYear: $('#cart_billing_info').find('[name=year]').val(),
                cardSecurityCode: $('#cart_billing_info').find('[name=cardSecurityCode]').val(),
              };
              let count = 1;
              for (const i in productInfo) {
                if (parseInt(productInfo[i].qty) > 0) {
                  Billingdata[`product${count}_id`] = productInfo[i].id;
                  Billingdata[`product${count}_qty`] = productInfo[i].qty;
                  count++;
                }
              }

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
                    let navigation = '/promo/desktop/thankyou.html' + window.location.search;
                    if (/Mobi/.test(navigator.userAgent)) {
                      navigation = '/promo/mobile/thankyou.html' + window.location.search;
                    }
                    window.utilsInstance.wrapLocationChange(navigation);
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
    },

    // Lead create/update
    _createKonnectiveLead(data, callback, err) {
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
    },

    _calcPricing() {
      const $total = $('#product-total');
      const $grandTotal = $('#product-grand-total');
      const PRODUCT_MAPPING = window.utilsInstance.getProductPrices();

      let total = 0;
      for (const prop in PRODUCT_MAPPING) {
        if (PRODUCT_MAPPING.hasOwnProperty(prop)) {
          const price = parseFloat(PRODUCT_MAPPING[prop]) * parseFloat($(`select[name=${prop}]`).val());
          total += price;
          $(`#${prop}-price`).html(`$${price.toFixed(2)}`);
        }
      }

      $total.html(`$${total.toFixed(2)}`);
      $grandTotal.html(`$${total.toFixed(2)}`);
    },

    _handleCartSubmit() {
      const $parent = this;
      $('#cart_submit').click((e) => {
        $('#cart_user_info').formValidation('validate');
        if (!$('#cart_user_info').data('formValidation').isValid()) {
          return;
        }
        $('.address-2').parent().children('.fv-help-block').hide();
        $('.address-2').parent().addClass('fv-has-success');
        if ($('#billing_same').is(':checked')) {
          checkoutFields.forEach((field) => {
            $('#cart_billing_info').find(`[name=${field}]`).val($('#cart_user_info').find(`[name=${field}]`).val());
          });
        }
        $('#cart_billing_info').formValidation('validate');
        if (!$('#cart_billing_info').data('formValidation').isValid()) {
          return;
        }
        $parent._submitCheckoutForm();
        e.preventDefault();
      });
    },

    _detectCard() {
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

      function setCCActive(className) {
        $('.cards span').removeClass('active');
        $(`.cards span.${className}`).addClass('active');
      }

      function configureCCInput(config) {
        const $inputCardNumber = $('input[name=cardNumber]');

        $inputCardNumber.mask(config.mask.pattern, config.mask.config);
        $inputCardNumber.attr('maxlength', config.maxLength);
      }

      function keyupEvent(event) {
        if (event.target.value.length >= 2) {
          numbstr = event.target.value.replace(/\s/g, '');
          let stcase = numbstr.slice(0, 2);
          stcase = parseInt(stcase, 10);

          if (stcase >= 40 && stcase <= 49) {
            if (event.target.value.length === 19) {
              return;
            }
            setCCActive('card-visa');
            configureCCInput(cardNumberConfigurations.defaultCC);
          } else if ((stcase > 21 && stcase < 28) || (stcase > 50 && stcase < 56)) {
            if (event.target.value.length === 19) {
              return;
            }
            setCCActive('card-mastercard');
            configureCCInput(cardNumberConfigurations.defaultCC);
          } else if ((stcase > 56 && stcase <= 65) || (stcase > 66 && stcase < 69) || stcase === 50) {
            if (event.target.value.length === 19) {
              return;
            }
            setCCActive('card-discover');
            configureCCInput(cardNumberConfigurations.defaultCC);
          } else {
            configureCCInput(cardNumberConfigurations.defaultCC);
          }
        }
      }

      $(document).on('keyup', '.creditcard', keyupEvent);
    },
  };
}());
pCart.init();
