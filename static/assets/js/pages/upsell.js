/**
 * upsell page
 */
const pUpsell = (function () {
  return {
    _init() {
      this._validate();
      this._onUpsellNo();
      this._onUpsellYes();
    },

    loadSession() {
      const $parent = this;

      window.utilsInstance.initSessionIfNoCookies(() => {
        if (!UniversalStorage.cookiesEnabled) {
          window.utilsInstance.callAPI('session', null, 'GET', (response) => {
            if (response.success) {
              UniversalStorage.saveCheckoutDetails(response.data);
            }
            $parent._init();
          });
        } else {
          $parent._init();
        }
      });
    },

    _validate() {
      const MediaStorage = UniversalStorage.getCheckoutDetails();
      if (typeof MediaStorage.orderId === 'undefined') {
        window.location = 'index.html';
      }
    },

    _getNextPageUrl() {
      if (window.location.pathname.indexOf('/upsell-1') >= 0) {
        return 'upsell-2.html' + window.location.search;
      }

      return 'thankyou.html' + window.location.search;
    },

    _onUpsellNo() {
      const $parent = this;

      $('.no-upsell-link').click((e) => {
        e.preventDefault();

        $('div.js-div-loading-bar').show();
        const nextPage = $parent._getNextPageUrl();
        window.utilsInstance.storeSessionToServer(UniversalStorage.getCheckoutDetails(), () => {
          window.utilsInstance.wrapLocationChange(nextPage);
        });
      });
    },

    _onUpsellYes() {
      const $parent = this;

      $('.upsell-link').click(function (e) {
        e.preventDefault();

        const MediaStorage = UniversalStorage.getCheckoutDetails();
        const $loadingBar = $('div.js-div-loading-bar');
        const usParams = {};

        $loadingBar.show();

        usParams.orderId = MediaStorage.orderId;
        usParams.productQty = 1;
        usParams.productId = $(this).data('upsell');

        if (usParams.productId == 155 || usParams.productId == 156) {
          const nextPage = $parent._getNextPageUrl();

          window.utilsInstance.callAPI('upsell', usParams, 'POST', (e) => {
            const json = window.utilsInstance.getJson(e);

            if (json.success) {
              window.utilsInstance.storeSessionToServer(UniversalStorage.getCheckoutDetails(), () => {
                window.utilsInstance.wrapLocationChange(nextPage);
              });
            } else if (json.message) {
              let messageOut = '';

              if (json.message && json.message.data && json.message.data[0] && json.message.data[0].orderStatus === 'COMPLETE') {
                // stayed on upsell page for an hour
                const gmtStr = `${resp.message.data[0].dateUpdated} GMT-0400`;
                const orderDate = new Date(gmtStr);
                const nowDate = new Date();
                const minutesSince = (nowDate - orderDate) / 1000 / 60;

                if (minutesSince > 55) {
                  window.utilsInstance.storeSessionToServer(UniversalStorage.getCheckoutDetails(), () => {
                    window.utilsInstance.wrapLocationChange('thankyou.html');
                  });
                }
              } else if (typeof json.message === 'string') {
                // upsell already taken
                messageOut = json.message;
                if (messageOut === 'This upsell was already taken.') {
                  window.utilsInstance.storeSessionToServer(UniversalStorage.getCheckoutDetails(), () => {
                    window.utilsInstance.wrapLocationChange(nextPage);
                  });
                }
              } else {
                const messages = Object.keys(json.message).map(key => `${key}:${json.message[key]}<br/>`);
                messageOut = messages.join('');
              }

              window.utilsInstance.showModal(messageOut, 'Problem with your Addon');
            }

            $loadingBar.hide();
          });
        } else {
          // invalid upsell id
          window.utilsInstance.wrapLocationChange('index.html');
        }
      });
    },
  };
}());
pUpsell.loadSession();
