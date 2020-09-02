/**
 * thankyou page
 */
const pThankyou = (function () {
  return {
    _init() {
      this._validate();
      this._loadOrderData();
    },

    loadSession() {
      const $parent = this;

      window.utilsInstance.initSessionIfNoCookies(() => {
        if (!UniversalStorage.cookiesEnabled) {
          window.utilsInstance.callAPI('session', null, 'GET', (response) => {
            if (response.success) {
              UniversalStorage.saveCheckoutDetails(response.data);
              $parent._init();
            }
          });
        } else {
          $parent._init();
        }
      });
    },

    _validate() {
      const orderID = UniversalStorage.getOrderId();

      if (typeof orderID === 'undefined' || orderID === null) {
        window.location = 'index.html';
      }
    },

    _loadOrderData() {
      const $parent = this;
      const orderID = UniversalStorage.getOrderId();
      const $loadingBar = $('div.js-div-loading-bar');

      $loadingBar.show();
      window.utilsInstance.callAPI(`get-lead/${orderID}`, null, 'GET', (resp) => {
        //$loadingBar.hide();

        if (resp.success) {
          $parent._populateThanksPage(resp.data);
        } else if (resp.message) {
          window.location = 'index.html';
        }
      });
    },

    _populateThanksPage(data) {
      let total = 0,
        chosenProducts = [];

      $('#order_id').html(data[0].orderId);
      $('#total_amount').html(data[0].totalAmount);
      $('#date_of_order').html(new Date().toDateString());
    },
  };
}());
pThankyou.loadSession();
