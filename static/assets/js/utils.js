/**
 * jquery.mask.js
 * @version: v1.14.13
 * @author: Igor Escobar
 *
 * Created by Igor Escobar on 2012-03-10. Please report any bug at github.com/igorescobar/jQuery-Mask-Plugin
 *
 * Copyright (c) 2012 Igor Escobar http://igorescobar.com
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/* jshint laxbreak: true */
/* jshint maxcomplexity:17 */
/* global define */

// UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere.
// https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
(function (factory, jQuery, Zepto) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery || Zepto);
  }
}(($) => {
  const Mask = function (el, mask, options) {
    var p = {
      invalid: [],
      getCaret() {
        try {
          let sel,
            pos = 0,
            ctrl = el.get(0),
            dSel = document.selection,
            cSelStart = ctrl.selectionStart;

          // IE Support
          if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
            sel = dSel.createRange();
            sel.moveStart('character', -p.val().length);
            pos = sel.text.length;
          }
          // Firefox support
          else if (cSelStart || cSelStart === '0') {
            pos = cSelStart;
          }

          return pos;
        } catch (e) {}
      },
      setCaret(pos) {
        try {
          if (el.is(':focus')) {
            let range,
              ctrl = el.get(0);

            // Firefox, WebKit, etc..
            if (ctrl.setSelectionRange) {
              ctrl.setSelectionRange(pos, pos);
            } else { // IE
              range = ctrl.createTextRange();
              range.collapse(true);
              range.moveEnd('character', pos);
              range.moveStart('character', pos);
              range.select();
            }
          }
        } catch (e) {}
      },
      events() {
        el
          .on('keydown.mask', (e) => {
            el.data('mask-keycode', e.keyCode || e.which);
            el.data('mask-previus-value', el.val());
            el.data('mask-previus-caret-pos', p.getCaret());
            p.maskDigitPosMapOld = p.maskDigitPosMap;
          })
          .on($.jMaskGlobals.useInput ? 'input.mask' : 'keyup.mask', p.behaviour)
          .on('paste.mask drop.mask', () => {
            setTimeout(() => {
              el.keydown().keyup();
            }, 100);
          })
          .on('change.mask', () => {
            el.data('changed', true);
          })
          .on('blur.mask', () => {
            if (oldValue !== p.val() && !el.data('changed')) {
              el.trigger('change');
            }
            el.data('changed', false);
          })
        // it's very important that this callback remains in this position
        // otherwhise oldValue it's going to work buggy
          .on('blur.mask', () => {
            oldValue = p.val();
          })
        // select all text on focus
          .on('focus.mask', (e) => {
            if (options.selectOnFocus === true) {
              $(e.target).select();
            }
          })
        // clear the value if it not complete the mask
          .on('focusout.mask', () => {
            if (options.clearIfNotMatch && !regexMask.test(p.val())) {
              p.val('');
            }
          });
      },
      getRegexMask() {
        let maskChunks = [],
          translation,
          pattern,
          optional,
          recursive,
          oRecursive,
          r;

        for (let i = 0; i < mask.length; i++) {
          translation = jMask.translation[mask.charAt(i)];

          if (translation) {
            pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
            optional = translation.optional;
            recursive = translation.recursive;

            if (recursive) {
              maskChunks.push(mask.charAt(i));
              oRecursive = { digit: mask.charAt(i), pattern };
            } else {
              maskChunks.push(!optional && !recursive ? pattern : (`${pattern}?`));
            }
          } else {
            maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
          }
        }

        r = maskChunks.join('');

        if (oRecursive) {
          r = r.replace(new RegExp(`(${oRecursive.digit}(.*${oRecursive.digit})?)`), '($1)?')
            .replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
        }

        return new RegExp(r);
      },
      destroyEvents() {
        el.off(['input', 'keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', ''].join('.mask '));
      },
      val(v) {
        let isInput = el.is('input'),
          method = isInput ? 'val' : 'text',
          r;

        if (arguments.length > 0) {
          if (el[method]() !== v) {
            el[method](v);
          }
          r = el;
        } else {
          r = el[method]();
        }

        return r;
      },
      calculateCaretPosition() {
        let oldVal = el.data('mask-previus-value') || '',
          newVal = p.getMasked(),
          caretPosNew = p.getCaret();
        if (oldVal !== newVal) {
          let caretPosOld = el.data('mask-previus-caret-pos') || 0,
            newValL = newVal.length,
            oldValL = oldVal.length,
            maskDigitsBeforeCaret = 0,
            maskDigitsAfterCaret = 0,
            maskDigitsBeforeCaretAll = 0,
            maskDigitsBeforeCaretAllOld = 0,
            i = 0;

          for (i = caretPosNew; i < newValL; i++) {
            if (!p.maskDigitPosMap[i]) {
              break;
            }
            maskDigitsAfterCaret++;
          }

          for (i = caretPosNew - 1; i >= 0; i--) {
            if (!p.maskDigitPosMap[i]) {
              break;
            }
            maskDigitsBeforeCaret++;
          }

          for (i = caretPosNew - 1; i >= 0; i--) {
            if (p.maskDigitPosMap[i]) {
              maskDigitsBeforeCaretAll++;
            }
          }

          for (i = caretPosOld - 1; i >= 0; i--) {
            if (p.maskDigitPosMapOld[i]) {
              maskDigitsBeforeCaretAllOld++;
            }
          }

          // if the cursor is at the end keep it there
          if (caretPosNew > oldValL) {
            caretPosNew = newValL * 10;
          } else if (caretPosOld >= caretPosNew && caretPosOld !== oldValL) {
            if (!p.maskDigitPosMapOld[caretPosNew]) {
              const caretPos = caretPosNew;
              caretPosNew -= maskDigitsBeforeCaretAllOld - maskDigitsBeforeCaretAll;
              caretPosNew -= maskDigitsBeforeCaret;
              if (p.maskDigitPosMap[caretPosNew]) {
                caretPosNew = caretPos;
              }
            }
          } else if (caretPosNew > caretPosOld) {
            caretPosNew += maskDigitsBeforeCaretAll - maskDigitsBeforeCaretAllOld;
            caretPosNew += maskDigitsAfterCaret;
          }
        }
        return caretPosNew;
      },
      behaviour(e) {
        e = e || window.event;
        p.invalid = [];

        const keyCode = el.data('mask-keycode');

        if ($.inArray(keyCode, jMask.byPassKeys) === -1) {
          let newVal = p.getMasked(),
            caretPos = p.getCaret();

          // this is a compensation to devices/browsers that don't compensate
          // caret positioning the right way
          setTimeout(() => {
            p.setCaret(p.calculateCaretPosition());
          }, 10);

          p.val(newVal);
          p.setCaret(caretPos);
          return p.callbacks(e);
        }
      },
      getMasked(skipMaskChars, val) {
        let buf = [],
          value = val === undefined ? p.val() : `${val}`,
          m = 0,
          maskLen = mask.length,
          v = 0,
          valLen = value.length,
          offset = 1,
          addMethod = 'push',
          resetPos = -1,
          maskDigitCount = 0,
          maskDigitPosArr = [],
          lastMaskChar,
          check;

        if (options.reverse) {
          addMethod = 'unshift';
          offset = -1;
          lastMaskChar = 0;
          m = maskLen - 1;
          v = valLen - 1;
          check = function () {
            return m > -1 && v > -1;
          };
        } else {
          lastMaskChar = maskLen - 1;
          check = function () {
            return m < maskLen && v < valLen;
          };
        }

        let lastUntranslatedMaskChar;
        while (check()) {
          let maskDigit = mask.charAt(m),
            valDigit = value.charAt(v),
            translation = jMask.translation[maskDigit];

          if (translation) {
            if (valDigit.match(translation.pattern)) {
              buf[addMethod](valDigit);
              if (translation.recursive) {
                if (resetPos === -1) {
                  resetPos = m;
                } else if (m === lastMaskChar && m !== resetPos) {
                  m = resetPos - offset;
                }

                if (lastMaskChar === resetPos) {
                  m -= offset;
                }
              }
              m += offset;
            } else if (valDigit === lastUntranslatedMaskChar) {
              // matched the last untranslated (raw) mask character that we encountered
              // likely an insert offset the mask character from the last entry; fall
              // through and only increment v
              maskDigitCount--;
              lastUntranslatedMaskChar = undefined;
            } else if (translation.optional) {
              m += offset;
              v -= offset;
            } else if (translation.fallback) {
              buf[addMethod](translation.fallback);
              m += offset;
              v -= offset;
            } else {
              p.invalid.push({ p: v, v: valDigit, e: translation.pattern });
            }
            v += offset;
          } else {
            if (!skipMaskChars) {
              buf[addMethod](maskDigit);
            }

            if (valDigit === maskDigit) {
              maskDigitPosArr.push(v);
              v += offset;
            } else {
              lastUntranslatedMaskChar = maskDigit;
              maskDigitPosArr.push(v + maskDigitCount);
              maskDigitCount++;
            }

            m += offset;
          }
        }

        const lastMaskCharDigit = mask.charAt(lastMaskChar);
        if (maskLen === valLen + 1 && !jMask.translation[lastMaskCharDigit]) {
          buf.push(lastMaskCharDigit);
        }

        const newVal = buf.join('');
        p.mapMaskdigitPositions(newVal, maskDigitPosArr, valLen);
        return newVal;
      },
      mapMaskdigitPositions(newVal, maskDigitPosArr, valLen) {
        const maskDiff = options.reverse ? newVal.length - valLen : 0;
        p.maskDigitPosMap = {};
        for (let i = 0; i < maskDigitPosArr.length; i++) {
          p.maskDigitPosMap[maskDigitPosArr[i] + maskDiff] = 1;
        }
      },
      callbacks(e) {
        let val = p.val(),
          changed = val !== oldValue,
          defaultArgs = [val, e, el, options],
          callback = function (name, criteria, args) {
            if (typeof options[name] === 'function' && criteria) {
              options[name].apply(this, args);
            }
          };

        callback('onChange', changed === true, defaultArgs);
        callback('onKeyPress', changed === true, defaultArgs);
        callback('onComplete', val.length === mask.length, defaultArgs);
        callback('onInvalid', p.invalid.length > 0, [val, e, el, p.invalid, options]);
      },
    };

    el = $(el);
    var jMask = this,
      oldValue = p.val(),
      regexMask;

    mask = typeof mask === 'function' ? mask(p.val(), undefined, el, options) : mask;

    // public methods
    jMask.mask = mask;
    jMask.options = options;
    jMask.remove = function () {
      const caret = p.getCaret();
      p.destroyEvents();
      p.val(jMask.getCleanVal());
      p.setCaret(caret);
      return el;
    };

    // get value without mask
    jMask.getCleanVal = function () {
      return p.getMasked(true);
    };

    // get masked value without the value being in the input or element
    jMask.getMaskedVal = function (val) {
      return p.getMasked(false, val);
    };

    jMask.init = function (onlyMask) {
      onlyMask = onlyMask || false;
      options = options || {};

      jMask.clearIfNotMatch = $.jMaskGlobals.clearIfNotMatch;
      jMask.byPassKeys = $.jMaskGlobals.byPassKeys;
      jMask.translation = $.extend({}, $.jMaskGlobals.translation, options.translation);

      jMask = $.extend(true, {}, jMask, options);

      regexMask = p.getRegexMask();

      if (onlyMask) {
        p.events();
        p.val(p.getMasked());
      } else {
        if (options.placeholder) {
          el.attr('placeholder', options.placeholder);
        }

        // this is necessary, otherwise if the user submit the form
        // and then press the "back" button, the autocomplete will erase
        // the data. Works fine on IE9+, FF, Opera, Safari.
        if (el.data('mask')) {
          el.attr('autocomplete', 'off');
        }

        // detect if is necessary let the user type freely.
        // for is a lot faster than forEach.
        for (var i = 0, maxlength = true; i < mask.length; i++) {
          const translation = jMask.translation[mask.charAt(i)];
          if (translation && translation.recursive) {
            maxlength = false;
            break;
          }
        }

        if (maxlength) {
          el.attr('maxlength', mask.length);
        }

        p.destroyEvents();
        p.events();

        const caret = p.getCaret();
        p.val(p.getMasked());
        p.setCaret(caret);
      }
    };

    jMask.init(!el.is('input'));
  };

  $.maskWatchers = {};
  var HTMLAttributes = function () {
      let input = $(this),
        options = {},
        prefix = 'data-mask-',
        mask = input.attr('data-mask');

      if (input.attr(`${prefix}reverse`)) {
        options.reverse = true;
      }

      if (input.attr(`${prefix}clearifnotmatch`)) {
        options.clearIfNotMatch = true;
      }

      if (input.attr(`${prefix}selectonfocus`) === 'true') {
        options.selectOnFocus = true;
      }

      if (notSameMaskObject(input, mask, options)) {
        return input.data('mask', new Mask(this, mask, options));
      }
    },
    notSameMaskObject = function (field, mask, options) {
      options = options || {};
      let maskObject = $(field).data('mask'),
        stringify = JSON.stringify,
        value = $(field).val() || $(field).text();
      try {
        if (typeof mask === 'function') {
          mask = mask(value);
        }
        return typeof maskObject !== 'object' || stringify(maskObject.options) !== stringify(options) || maskObject.mask !== mask;
      } catch (e) {}
    },
    eventSupported = function (eventName) {
      let el = document.createElement('div'),
        isSupported;

      eventName = `on${eventName}`;
      isSupported = (eventName in el);

      if (!isSupported) {
        el.setAttribute(eventName, 'return;');
        isSupported = typeof el[eventName] === 'function';
      }
      el = null;

      return isSupported;
    };

  $.fn.mask = function (mask, options) {
    options = options || {};
    let selector = this.selector,
      globals = $.jMaskGlobals,
      interval = globals.watchInterval,
      watchInputs = options.watchInputs || globals.watchInputs,
      maskFunction = function () {
        if (notSameMaskObject(this, mask, options)) {
          return $(this).data('mask', new Mask(this, mask, options));
        }
      };

    $(this).each(maskFunction);

    if (selector && selector !== '' && watchInputs) {
      clearInterval($.maskWatchers[selector]);
      $.maskWatchers[selector] = setInterval(() => {
        $(document).find(selector).each(maskFunction);
      }, interval);
    }
    return this;
  };

  $.fn.masked = function (val) {
    return this.data('mask').getMaskedVal(val);
  };

  $.fn.unmask = function () {
    clearInterval($.maskWatchers[this.selector]);
    delete $.maskWatchers[this.selector];
    return this.each(function () {
      const dataMask = $(this).data('mask');
      if (dataMask) {
        dataMask.remove().removeData('mask');
      }
    });
  };

  $.fn.cleanVal = function () {
    return this.data('mask').getCleanVal();
  };

  $.applyDataMask = function (selector) {
    selector = selector || $.jMaskGlobals.maskElements;
    const $selector = (selector instanceof $) ? selector : $(selector);
    $selector.filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
  };

  let globals = {
    maskElements: 'input,td,span,div',
    dataMaskAttr: '*[data-mask]',
    dataMask: true,
    watchInterval: 300,
    watchInputs: true,
    // old versions of chrome dont work great with input event
    useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && eventSupported('input'),
    watchDataMask: false,
    byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
    translation: {
      0: { pattern: /\d/ },
      9: { pattern: /\d/, optional: true },
      '#': { pattern: /\d/, recursive: true },
      A: { pattern: /[a-zA-Z0-9]/ },
      S: { pattern: /[a-zA-Z]/ },
    },
  };

  $.jMaskGlobals = $.jMaskGlobals || {};
  globals = $.jMaskGlobals = $.extend(true, {}, globals, $.jMaskGlobals);

  // looking for inputs with data-mask attribute
  if (globals.dataMask) {
    $.applyDataMask();
  }

  setInterval(() => {
    if ($.jMaskGlobals.watchDataMask) {
      $.applyDataMask();
    }
  }, globals.watchInterval);
}, window.jQuery, window.Zepto));

/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
  let registeredInModuleLoader = false;
  if (typeof define === 'function' && define.amd) {
    define(factory);
    registeredInModuleLoader = true;
  }
  if (typeof exports === 'object') {
    module.exports = factory();
    registeredInModuleLoader = true;
  }
  if (!registeredInModuleLoader) {
    const OldCookies = window.Cookies;
    const api = window.Cookies = factory();
    api.noConflict = function () {
      window.Cookies = OldCookies;
      return api;
    };
  }
}(() => {
  function extend() {
    let i = 0;
    const result = {};
    for (; i < arguments.length; i++) {
      const attributes = arguments[i];
      for (const key in attributes) {
        result[key] = attributes[key];
      }
    }
    return result;
  }

  function init(converter) {
    function api(key, value, attributes) {
      let result;
      if (typeof document === 'undefined') {
        return;
      }

      // Write

      if (arguments.length > 1) {
        attributes = extend({
          path: '/',
        }, api.defaults, attributes);

        if (typeof attributes.expires === 'number') {
          const expires = new Date();
          expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
          attributes.expires = expires;
        }

        // We're using "expires" because "max-age" is not supported by IE
        attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

        try {
          result = JSON.stringify(value);
          if (/^[\{\[]/.test(result)) {
            value = result;
          }
        } catch (e) {}

        if (!converter.write) {
          value = encodeURIComponent(String(value))
            .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        } else {
          value = converter.write(value, key);
        }

        key = encodeURIComponent(String(key));
        key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
        key = key.replace(/[\(\)]/g, escape);

        let stringifiedAttributes = '';

        for (const attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue;
          }
          stringifiedAttributes += `; ${attributeName}`;
          if (attributes[attributeName] === true) {
            continue;
          }
          stringifiedAttributes += `=${attributes[attributeName]}`;
        }
        return (document.cookie = `${key}=${value}${stringifiedAttributes}`);
      }

      // Read

      if (!key) {
        result = {};
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all. Also prevents odd result when
      // calling "get()"
      const cookies = document.cookie ? document.cookie.split('; ') : [];
      const rdecode = /(%[0-9A-Z]{2})+/g;
      let i = 0;

      for (; i < cookies.length; i++) {
        const parts = cookies[i].split('=');
        let cookie = parts.slice(1).join('=');

        if (!this.json && cookie.charAt(0) === '"') {
          cookie = cookie.slice(1, -1);
        }

        try {
          const name = parts[0].replace(rdecode, decodeURIComponent);
          cookie = converter.read ?
            converter.read(cookie, name) : converter(cookie, name) ||
            cookie.replace(rdecode, decodeURIComponent);

          if (this.json) {
            try {
              cookie = JSON.parse(cookie);
            } catch (e) {}
          }

          if (key === name) {
            result = cookie;
            break;
          }

          if (!key) {
            result[name] = cookie;
          }
        } catch (e) {}
      }

      return result;
    }

    api.set = api;
    api.get = function (key) {
      return api.call(api, key);
    };
    api.getJSON = function () {
      return api.apply({
        json: true,
      }, [].slice.call(arguments));
    };
    api.defaults = {};

    api.remove = function (key, attributes) {
      api(key, '', extend(attributes, {
        expires: -1,
      }));
    };

    api.withConverter = init;

    return api;
  }

  return init(() => {});
}));

/* global store, Cookies */
/**
 * The storage wrapper.
 * @type {Object}
 */
const UniversalStorage = {
  cookiesAreEnabled() {
    let cookiesEnabled = window.navigator.cookieEnabled;
    if (typeof window.navigator.cookieEnabled === 'undefined' && !cookiesEnabled) {
      document.cookie = 'testcookie';
      cookiesEnabled = document.cookie.indexOf('testcookie') !== -1;
    }
    return cookiesEnabled;
  },

  cookiesEnabled: true,
  /**
   * The key for checkout details on storage.
   * @type {String}
   */
  storageKey: 'checkout',
  /**
   * [storageKeyForOrderId description]
   * @type {String}
   */
  storageKeyForOrderId: 'orderId',
  /**
   * List of fields allowed on checkout form.
   * @type {Array}
   */
  whiteList: [
    'orderId',
    'firstName',
    'lastName',
    'address',
    'address2',
    'city',
    'state',
    'postalCode',
    'phoneNumber',
    'email',
    'productId',
  ],
  /**
   * Initialize the storage.
   * @return {[type]} [description]
   */
  initializeStorage() {
    UniversalStorage.cookiesEnabled = UniversalStorage.cookiesAreEnabled();
    if (!UniversalStorage.cookiesEnabled && typeof store !== 'undefined') {
      const checkout = store.get(UniversalStorage.storageKey);
      if (!checkout) {
        store.set(UniversalStorage.storageKey, {});
      }
    } else {
      const checkout = Cookies.get(UniversalStorage.storageKey);
      if (!checkout) {
        Cookies.set(UniversalStorage.storageKey, {});
      }
    }
  },
  /**
   * Save item to storage.
   * @param  {[type]} key   [description]
   * @param  {[type]} value [description]
   */
  saveStorageItem(key, value) {
    if (UniversalStorage.cookiesEnabled) {
      Cookies.set(key, value);
    } else if (typeof store !== 'undefined') {
      store.set(key, value);
      store.get(key);
    }
  },
  /**
   * Retrieve saved item from storage.
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  getStorageItem(key) {
    if (UniversalStorage.cookiesEnabled) {
      return Cookies.get(key);
    } else if (typeof store !== 'undefined') {
      return store.get(key);
    }
    return null;
  },

  /**
   * Retrieve XSRF Token
   * @return Token
   */
  getToken() {
    return UniversalStorage.getStorageItem('XSRF-TOKEN');
  },
  /**
   * Save checkout details to storage.
   * @param {Object} checkoutDetails The dictionary of checkout details.
   */
  saveCheckoutDetails(checkoutDetails) { // eslint-disable-line no-unused-vars
    Object.keys(checkoutDetails).forEach((field) => {
      if (UniversalStorage.whiteList.indexOf(field) === -1 || typeof checkoutDetails[field] === 'undefined') {
        return;
      }
      UniversalStorage.saveCheckoutField(field, checkoutDetails[field]);
    });
  },

  initServerSession(data) { // eslint-disable-line no-unused-vars
    Object.keys(data).forEach((field) => {
      if (UniversalStorage.whiteList.indexOf(field) > -1 && typeof data[field] !== 'undefined') {
        UniversalStorage.saveCheckoutField(field, data[field]);
      } else {
        UniversalStorage.saveStorageItem(field, data[field]);
      }
    });
  },
  /**
   * Wrapper which convert from json to object if cookies are enabled.
   * @return {Object}
   */
  toObjectIfCookies(obj) {
    if (UniversalStorage.cookiesEnabled) {
      return JSON.parse(obj);
    }
    return obj;
  },
  /**
   * Retrieve checkout details saved to storage.
   * @return {Object}
   */
  getCheckoutDetails() { // eslint-disable-line no-unused-vars
    // Retrieve item from storage.
    const value = UniversalStorage.toObjectIfCookies(UniversalStorage.getStorageItem(UniversalStorage.storageKey));
    const details = {};
    UniversalStorage.whiteList.forEach((key) => {
      details[key] = value[key];
    });
    return details;
  },
  /**
   * Save an individual field on checkout form.
   * @param  {String} field
   * @param  {Mixed} value
   */
  saveCheckoutField(field, value) {
    if (UniversalStorage.whiteList.indexOf(field) === -1) {
      return;
    }

    // Retrieve item from storage.
    const details = UniversalStorage.toObjectIfCookies(UniversalStorage.getStorageItem(UniversalStorage.storageKey));
    details[field] = value;
    // Save to storage.
    UniversalStorage.saveStorageItem(UniversalStorage.storageKey, details);
  },
  /**
   * [saveOrderId description]
   * @param  {[type]} orderId [description]
   */
  saveOrderId(orderId) {
    UniversalStorage.saveCheckoutField(UniversalStorage.storageKeyForOrderId, orderId);
  },
  /**
   * Return the current active order ID if available.
   * @return {String}
   */
  getOrderId() {
    // Retrieve item from storage.
    const value = UniversalStorage.toObjectIfCookies(UniversalStorage.getStorageItem(UniversalStorage.storageKey));
    return value[UniversalStorage.storageKeyForOrderId];
  },
};
UniversalStorage.initializeStorage();

window.utilsInstance = (function () {
  function getJson(e) { // eslint-disable-line no-unused-vars
    let obj;
    if (typeof e === 'object') {
      return e;
    }
    try {
      obj = JSON.parse(e);
    } catch (ex) {
      obj = {};
    }
    return obj;
  }

  function getUrlParameter(sParam) {
    const sPageURL = decodeURIComponent(window.location.search.substring(1));
    const sURLVariables = sPageURL.split('&');
    let sParameterName;

    for (const urlItem of sURLVariables) {
      sParameterName = urlItem.split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }

    return null;
  }

  function initSessionIfNoCookies(cb) { // eslint-disable-line no-unused-vars
    if (!UniversalStorage.cookiesEnabled) {
      const sessId = getUrlParameter('PHPSESSID');

      jQuery.ajax({
        type: 'GET',
        url: '/robots.txt',
        complete: (request) => {
          if (sessId) {
            UniversalStorage.saveStorageItem('PHPSESSID', sessId);
          } else {
            UniversalStorage.saveStorageItem('PHPSESSID', request.getResponseHeader('phpsessid'));
          }

          UniversalStorage.saveStorageItem('XSRF-TOKEN', request.getResponseHeader('xsrf-token'));
          if (cb) {
            cb();
          }
        },
      });
    } else if (cb) {
      cb();
    }
  }

  // call API
  function callAPI(endpoint, data, method, callback, err) {
    const $loadingBar = $('div.js-div-loading-bar');
    $loadingBar.show();
    let params = data;
    let ApiUrl = `/api/v2/${endpoint}/`;
    let headers = {};
    const httpMethod = method || 'POST';

    // if data is an array pass as post,
    // otherwise the string is a simple get and needs to append to the end of the uri
    if (params && params.constructor !== Object) {
      ApiUrl += params;
      params = null;
    }

    if (!UniversalStorage.cookiesEnabled) {
      if (endpoint === 'session' && httpMethod === 'GET') {
        headers = {
          PHPSESSID: UniversalStorage.getStorageItem('PHPSESSID'),
        // 'XSRF-TOKEN': UniversalStorage.getStorageItem('XSRF-TOKEN'),
        };
      } else {
        headers = {
          PHPSESSID: UniversalStorage.getStorageItem('PHPSESSID'),
        // 'XSRF-TOKEN': UniversalStorage.getStorageItem('XSRF-TOKEN'),
        };
      }
    }

    if (['PUT', 'POST', 'PATCH', 'DELETE'].indexOf(httpMethod) !== -1) {
      params._csrf = UniversalStorage.getStorageItem('XSRF-TOKEN'); // eslint-disable-line no-underscore-dangle
    }

    $.ajax({
      method: httpMethod,
      url: ApiUrl,
      headers,
      data: params,
      complete: (request) => {
        if (!UniversalStorage.cookiesEnabled) {
          const csrfTokenValue = request.getResponseHeader('XSRF-TOKEN');
          if (csrfTokenValue) {
            UniversalStorage.saveStorageItem('XSRF-TOKEN', csrfTokenValue);
          }
        }
      },
      beforeSend(xhr) { xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); },
    }).done((msg/* , textStatus , request */) => {
      if (typeof callback === 'function') {
        $loadingBar.hide();
        callback(msg);
      }
    }).fail((jqXHR, textStatus/* , request */) => {
      if (typeof err === 'function') {
        $loadingBar.hide();
        err(textStatus);
      }
    });
  }

  function storeSessionToServer(data, cb) { // eslint-disable-line no-unused-vars
    if (!UniversalStorage.cookiesEnabled) {
      callAPI('session', data, 'POST', (response) => { // eslint-disable-line no-unused-vars
        cb();
      }, () => {});
    } else {
      cb();
    }
  }

  function wrapLocationChange(route) { // eslint-disable-line no-unused-vars
    if (!UniversalStorage.cookiesEnabled) {
      if (route.indexOf('?') === -1) {
        window.location = `${route}?PHPSESSID=${UniversalStorage.getStorageItem('PHPSESSID')}`;
      } else {
        window.location = `${route}&PHPSESSID=${UniversalStorage.getStorageItem('PHPSESSID')}`;
      }
    } else {
      window.location = route;
    }
  }

  function formatDate(date) {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${monthNames[monthIndex]} ${day}, ${year}`;
  }

  function showModal(body, title) {
    $('#popupModal .modal-header .modal-title').html(title);
    $('#popupModal .modal-body').html(body);

    $('#popupModal .close').click((e) => {
      e.preventDefault();
      $('#popupModal').hide();
    });

    $('#popupModal').click((e) => {
      e.stopPropagation();
      if (!$(e.target).parents('.modal-content').length) {
        $('#popupModal').hide();
      }
    });

    $('#popupModal').show();
    $('#popupModal').scrollTop(0);
  }

  function isMobile() {
    return (window.location.pathname.indexOf('/mobile') >= 0);
  }

  function popPage(pageURL, title) {
    $.ajax({
      method: 'GET',
      url: `/promo/common/popup-contents/${pageURL}.html`,
    }).done((msg) => {
      showModal(msg, title);
    });
  }

  function initPopupLinks() {
    // Init popup links
    $('.popup-link').click(function (e) {
      e.preventDefault();

      popPage($(this).data('html'), $(this).html());
    });

    $('body').on('keydown', (e) => {
      if (e.keyCode && e.keyCode == 27) {
        $('#popupModal').hide();
      }
    });
  }

  function validate() {

  }

  function ravenStart() {
    if (typeof Raven !== 'undefined' && window.location.hostname === 'americansciencecbd.com') {
      Raven.config('https://30b971029d594608bb765ea6e46298f0@sentry.io/1207214').install()
    }
  }

  function getProductPrices() {
    return {
      'cbd-oil': 69.00,
      'cbd-capsules': 77.00,
      'cbd-balm': 87.00,
    };
  }

  return {
    getJson,
    getUrlParameter,
    initSessionIfNoCookies,
    callAPI,
    storeSessionToServer,
    wrapLocationChange,
    formatDate,
    showModal,
    isMobile,
    popPage,
    initPopupLinks,
    validate,
    ravenStart,
    getProductPrices,
  };
}());
window.utilsInstance.initPopupLinks();
window.utilsInstance.ravenStart();

