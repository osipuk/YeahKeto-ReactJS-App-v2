/**
 * checkout page
 */
const pCheckout = (function () {
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
      this.appear = Date.now();
      this._loadSession();
      this._initializeFormsValidation();
      this._initFading();
      this._loadCachedValue();
      validationUtility.applyMask();

      if (window.utilsInstance.isMobile()) {
        this._mobileInit();
      } else {
        this._packageSelect();
        this._moreFields();
      }

      this._detectCard();
      window.utilsInstance.validate();
    },

    _loadSession() {
      window.utilsInstance.initSessionIfNoCookies(() => {
        if (!UniversalStorage.cookiesEnabled) {
          window.utilsInstance.callAPI('session', null, 'GET', (response) => {
            if (response.success) {
              UniversalStorage.saveCheckoutDetails(response.data);
            }
          });
        }
      });
    },

    _loadCachedValue() {
      // Load cached values
      const MediaStorage = UniversalStorage.getCheckoutDetails();

      $.each(checkoutFields, (index, value) => {
        const uVal = MediaStorage[value];
        if (uVal && uVal !== null && uVal !== 'null') {
          $(`[name=${value}]`).val(uVal);
          $('#form-checkout').formValidation('revalidateField', value);
        }
      });
    },

    _initTimeLogging() {
      const $parent = this;

      window.onbeforeunload = function () {
        window.utilsInstance.callAPI('session/log', {
          level: 'info',
          type: 'checkout:leave',
          ttl: (Date.now() - this.appear),
        }, 'GET', () => {}, () => {});

        $parent._saveToStorage();
      };
    },

    _saveToStorage() {
      const checkoutDetails = {};
      checkoutFields.forEach((field) => {
        checkoutDetails[field] = $(`[name=${field}]`).val();
      });

      UniversalStorage.saveCheckoutDetails(checkoutDetails);
    },

    _initializeFormsValidation() {
      const $parent = this;

      $('#form-checkout').formValidation({
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
        })
        .on('success.form.fv', (e) => {
          this._submitCheckoutForm();
          e.preventDefault();
        });

      $('#form-checkout').submit((e) => {
        e.preventDefault();
      });

      $('#form-checkout').on('change', $parent._saveToStorage);
    },

    _submitCheckoutForm() {
      const $loadingBar = $('div.js-div-loading-bar');
      $loadingBar.show();

      const MediaStorage = UniversalStorage.getCheckoutDetails();
      const orderDetails = {};
      checkoutFields.forEach((field) => {
        if ($('#billingDiv').is(':visible')) {
          orderDetails[field] = $(`[name=${field}]`).val();
        } else {
          orderDetails[field] = MediaStorage[field];
        }
      });

      orderDetails.cardNumber = $('[name=cardNumber]').val();
      orderDetails.cardMonth = $('[name=month]').val();
      orderDetails.cardYear = $('[name=year]').val();
      orderDetails.cardSecurityCode = $('[name=cardSecurityCode]').val();
      orderDetails.productId = (window.utilsInstance.isMobile() ?
        $('.package.picked').data('productid') : $('.pkg a.picked').data('productid'));
      try {
        var trackingVars = UniversalStorage.getStorageItem('trckvar');
        if (trackingVars) {
          orderDetails.tracking_vars = trackingVars;
        }
      } catch (e) {
        console.log('exception while fetching tracking values, message : ' + e.message.toString());
      }

      window.utilsInstance.callAPI('create-order', orderDetails, 'POST', (resp) => {
        $('#form-checkout .chk-submit').removeClass('pulse');

        if (resp.success) {
          if (resp.orderId) {
            UniversalStorage.saveOrderId(resp.orderId);
            UniversalStorage.saveCheckoutField('productId', orderDetails.productId);
          }

          window.utilsInstance.storeSessionToServer(UniversalStorage.getCheckoutDetails(), () => {
            window.utilsInstance.wrapLocationChange('upsell-1.html' +  window.location.search);
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
      return false; // eslint-disable-line consistent-return
    },

    _initFading() {
      $('#fades p').hide();

      function fades($div, cb) {
        $div.fadeIn(2000, () => {
          $div.fadeOut(2000, () => {
            const $next = $div.next();
            if ($next.length > 0) {
              fades($next, cb);
            } else {
              // The last element has faded away, call the callback
              cb();
            }
          });
        });
      }

      function startFading($firstDiv) {
        fades($firstDiv, () => {
          startFading($firstDiv);
        });
      }

      startFading($('#fades p:first-child'));
    },

    _packageSelect() {
      $('.fancybox').fancybox();

      $('.pkg a').click(function () {
        $('.pkg a').removeClass('picked');
        $(this).addClass('picked');

        $('#pkg-name').html($(this).find('.pkg-hding').html());
        $('#btl-prc').html(`$${$(this).find('.pkgcont-price').data('price')}`);
        $('#total').html(`$${$(this).find('.pkgcont-price').data('price')}`);
        $('.select-btn-selected').hide();
        $('.select-btn').show();
        $(this).find('.select-btn-selected').show();
        $(this).find('.select-btn').hide();
      });

      $($('.pkg a')[0]).trigger('click');
    },

    _moreFields() {
      $('#radioOne').click(() => {
        $('#billingDiv').slideUp('slow');
        $('#form-checkout').data('formValidation').disableSubmitButtons(false);
      });

      $('#radioTwo').click(() => {
        $('#billingDiv').slideDown('slow');
        $('#form-checkout').data('formValidation').disableSubmitButtons(false);
        $('#form-checkout :input').each(function () {
          if ($(this).hasClass('creditcard')) {
            return 1;
          }
          $(this).parent().addClass('fv-has-success');
          $(this).next().show();
          if ($(this).hasClass('frmElemts')) {
            $(this).next().addClass('fa');
            $(this).next().addClass('fa-check');
          }
        });
      });
    },

    /**
     * for mobile view
     */
    _mobileInit() {
      $('#checkbox').click(() => {
        $('#billingDiv').slideToggle('slow');
        $('#form-checkout').data('formValidation').disableSubmitButtons(false);
      });

      // select package
      let productId = 152;
      if (window.utilsInstance.getUrlParameter('productId') !== undefined) {
        productId = window.utilsInstance.getUrlParameter('productId');
      }

      $('.package').each((index, elem) => {
        if ($(elem).data('productid') == productId) {
          $(elem).addClass('picked');
          $(elem).removeClass('dispnone');
        }
      });

      // Set default closed
      $('.odrsmry').slideToggle();
      $('.smrhding').addClass('rotate');

      $('.smrhding').click(() => {
        $('.odrsmry').slideToggle();
        if ($('.smrhding').hasClass('rotate')) {
          $('.smrhding').removeClass('rotate');
        } else {
          $('.smrhding').addClass('rotate');
        }
      });

      $('.shpbtm a').click((e) => {
        e.preventDefault();

        $('#form-checkout').submit();
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
pCheckout.init();
