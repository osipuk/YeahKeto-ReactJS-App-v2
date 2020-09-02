/**
 * contact page
 */
const pContact = (function () {
  return {
    init() {
      $('.smobitrigger').smplmnu();
      this._setupForm();
      this._initializeFormsValidation();
      validationUtility.applyMask([
        {
          "name" : "name",
          "type" : "non_numeric"
        },
        {
          "name" : "phoneNumber",
          "type" : "phone_number"
        }
      ]);
    },

    _initializeFormsValidation() {
      const $parent = this;

      $('#contact_main').formValidation({
        framework: 'pure',
        excluded: [':not(:visible)'],
        icon: {
          valid: 'fa fa-check',
          invalid: 'fa fa-times',
          validating: 'fa fa-refresh',
        },
        autoFocus: true,
        fields: {
          name: {
            validators: {
              notEmpty: {
                message: 'The first name is required.',
              },
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
        },
      });
    },

    _setupForm() {
      $('#contact_submit').on('click', (e) => {
        e.preventDefault();
        $('#contact_main').formValidation('validate');

        if (!$('#contact_main').data('formValidation').isValid()) {
          return;
        }

        const $loading = $('.js-div-loading-bar');
        $loading.show();

        const mailContent = {};
        mailContent.from = $('input[name=email]').val();
        mailContent.to = 'support@americansciencecbd.com';
        mailContent.subject = 'From Contact Us';
        mailContent.content = `<div>
                              <div>
                                <strong>Name: </strong> <span>${$('input[name=name]').val()}</span>
                              </div>
                              <div>
                                <strong>Phone Number: </strong> <span>${$('input[name=phone_number]').val()}</span>
                              </div>
                              <div>
                                <strong>Question: </strong> <span>${$('select[name=question]').val()}</span>
                              </div>
                              <div>
                                <strong>Comment: </strong> <span>${$('textarea[name=textarea]').html()}</span>
                              </div>
                            </div>`;
        utilsInstance.callAPI('send-email', mailContent, 'POST', (resp) => {
          $loading.hide();

          if (resp.success) {
            utilsInstance.showModal('<p>We have received your message successfully.<br/>Thank you.</p><br/><br/>', 'Submission successful!');
          } else {
            const responseMessage = resp.message;

            if (responseMessage) {
              utilsInstance.showModal(`<p>${responseMessage}</p><br/><br/>`, 'Error');
            }
          }
        });
      });
    },
  };
}());
pContact.init();
