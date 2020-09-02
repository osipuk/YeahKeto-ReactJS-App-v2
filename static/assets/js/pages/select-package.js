/**
 * select-package page
 */
const pSelectPackage = (function () {
  return {
    init() {
      this.appear = Date.now();
      this._loadSession();
      this._initTimeLogging();
      this._selectPackage();
    },

    _loadSession() {
      window.utilsInstance.initSessionIfNoCookies(() => {
        if (!UniversalStorage.cookiesEnabled) {
          window.utilsInstance.callAPI('session', null, 'GET', response => {
            if (response.success) {
              UniversalStorage.saveCheckoutDetails(response.data);
            }
          });
        }
      });
    },

    _initTimeLogging() {
      window.onbeforeunload = function () {
        window.utilsInstance.callAPI(
          'session/log',
          {
            level: 'info',
            type: 'shipping:leave',
            ttl: Date.now() - this.appear,
          },
          'GET',
          () => {},
          () => {},
        );
      };
    },

    _selectPackage() {
      $('.link-container-3').click(function () {
        const query =
          `${window.location.search ? `${window.location.search}&` : '?'
          }productId=${
            $(this).data('productid')}`;
        window.utilsInstance.wrapLocationChange(`confirm.html${query}`);
      });
    },
  };
}());
pSelectPackage.init();
