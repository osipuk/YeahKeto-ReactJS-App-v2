
/**
 * index page
 */
const pIndex = (function () {
  return {
    init() {
      this.appear = Date.now();
      this._loadSession();
      this._initTimeLogging();
      this._initializeFormsValidation();
      validationUtility.applyMask();
    },

    _loadSession() {
      window.utilsInstance.initSessionIfNoCookies(() => {});
    },

    _initTimeLogging() {
      window.onbeforeunload = () => { // log how many seconds user is on site
        window.utilsInstance.callAPI('session/log', {
          level: 'info',
          type: 'index:leave',
          ttl: (Date.now() - this.appear),
        }, 'GET', () => {}, () => {});
      };
    },

    _initializeFormsValidation() {
      // mobile submit button
      $('.shpbtm a').click((e) => {
        e.preventDefault();
        $('#form-contact').submit();
      });
      
      $('#form-contact').formValidation({
        framework: 'pure',
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
            validators: {
              notEmpty: { message: 'The email address is required.' },
              callback: {
                message: 'The value is not a valid email address.',
                callback() {
                  const email = $('[name=email]').val().trim();
                  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                  return (re.test(email));
                }
              },
            },
          },
        },
      })
        .on('success.form.fv', (e) => {
          this._submitContactForm();
          e.preventDefault();
        });

      $('#form-contact').submit((e) => {
        e.preventDefault();
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

    _submitContactForm() {
      const data = {
        firstName: $('[name=firstName]').val(),
        lastName: $('[name=lastName]').val(),
        address: $('[name=address]').val(),
        address2: $('[name=address2]').val(),
        city: $('[name=city]').val(),
        state: $('[name=state]').val(),
        postalCode: $('[name=postalCode]').val(),
        phoneNumber: $('[name=phoneNumber]').val(),
        email: $('[name=email]').val().trim(),
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
            try {
              var trackingVars = UniversalStorage.getStorageItem('trckvar');
              if (trackingVars) {
               data.tracking_vars = trackingVars;
              }
            } catch (e) {
              console.log('exception while fetching tracking values, message : ' + e.message.toString());
            }
            this._createKonnectiveLead(data, () => {
              window.utilsInstance.wrapLocationChange($('#form-contact').attr('action') +  window.location.search);
            }, () => {
              $loadingBar.hide();
            });
          } else {
            $loadingBar.hide();
          }
        }, () => {
          $loadingBar.hide();
        });
      });
    }
  };
}());
pIndex.init();
