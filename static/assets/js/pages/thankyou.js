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
        $loadingBar.hide();

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

      $('#orderId').html(data[0].orderId);

      /**
       * items ordered
       * data.items
       */
      for (const prop in data[0].items) {
        if (data[0].items.hasOwnProperty(prop)) {
          const product = data[0].items[prop];

          chosenProducts.push(parseInt(product.productId));
          if (parseInt(product.productId) >= 152 && parseInt(product.productId) <= 158) {
            total += parseFloat(product.price);
          }
        }
      }

      $('.package').each(function () {
        const $this = $(this);

        if (chosenProducts.indexOf(parseInt($this.data('productid'))) > -1) {
          $(this).show();
          $(this).find('.qty').html(data[0].items[$this.data('productid')].qty);
          $this.find('.price').html(data[0].items[$this.data('productid')].price);
        }
      });

      $('#upsell-price').html(`$${total.toFixed(2)}`);
    },
  };
}());
pThankyou.loadSession();
