import 'core-js/modules/es.function.name.js';
import 'core-js/modules/es.array.concat.js';
import 'core-js/modules/es.string.trim.js';
import 'core-js/modules/es.number.constructor.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.string.replace.js';
import 'core-js/modules/es.array.slice.js';
import 'core-js/modules/es.array.map.js';
import 'core-js/modules/es.string.split.js';

/**
 * @module reload
 */
function isUpToDate(hash) {
  return hash === __webpack_hash__;
}

function update(hash, onUpdated) {
  module.hot.check(true).then(function (updated) {
    if (!updated) {
      window.location.reload();
    } else if (!isUpToDate(hash)) {
      update(hash, onUpdated);
    } else if (onUpdated) {
      onUpdated();
    }
  }).catch(function () {
    var status = module.hot.status();

    if (status === 'abort' || status === 'fail') {
      window.location.reload();
    }
  });
}

function reload(hash, _ref) {
  var hmr = _ref.hmr,
      onUpdated = _ref.onUpdated;

  if (!isUpToDate(hash)) {
    if (hmr && module.hot) {
      if (module.hot.status() === 'idle') {
        update(hash, onUpdated);
      }
    } else {
      window.location.reload();
    }
  } else if (onUpdated) {
    onUpdated();
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/**
 * @module utils
 */
function injectCSS(css) {
  var style = document.createElement('style');

  if (css.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  document.head.appendChild(style);
}
function appendHTML(html, parent) {
  var nodes = [];
  var parser = new DOMParser();
  var stage = parent || document.body;

  var _parser$parseFromStri = parser.parseFromString(html.trim(), 'text/html'),
      body = _parser$parseFromStri.body;

  while (body.firstChild) {
    nodes.push(stage.appendChild(body.firstChild));
  }

  return nodes;
}

var ns$1 = 'wds-overlay';
var css$1 = "\n  .".concat(ns$1, " {\n    top:0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    opacity: 0;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    position: fixed;\n    font-size: 16px;\n    overflow: hidden;\n    font-style: normal;\n    font-weight: normal;\n    z-index: 2147483644;\n    transform: scale(0);\n    flex-direction: column;\n    font-family: monospace;\n    box-sizing: border-box;\n    background: rgba(0, 0, 0, .85);\n  }\n  @keyframes ").concat(ns$1, "-show {\n    0% {\n      opacity: 0;\n      transform: scale(0);\n    }\n    100% {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n  @keyframes ").concat(ns$1, "-hide {\n    0% {\n      opacity: 1;\n      transform: scale(1);\n    }\n    100% {\n      opacity: 0;\n      transform: scale(0);\n    }\n  }\n  .").concat(ns$1, "-show {\n    animation: ").concat(ns$1, "-show .3s ease-out forwards;\n  }\n  .").concat(ns$1, "-hide {\n    animation: ").concat(ns$1, "-hide .3s ease-out forwards;\n  }\n  .").concat(ns$1, "-nav {\n    right: 0;\n    padding: 1em;\n    line-height: 1em;\n    position: absolute;\n    transition: transform .3s ease-in-out;\n  }\n  .").concat(ns$1, "-nav:hover {\n    transform: rotate(180deg);\n  }\n  .").concat(ns$1, "-close {\n    width: 1em;\n    height: 1em;\n    color: #fff;\n    cursor: pointer;\n    font-style: normal;\n    text-align: center;\n    border-radius: 1em;\n    font-weight: normal;\n    background: #ff5f58;\n    display: inline-block;\n  }\n  .").concat(ns$1, "-title {\n    margin: 0;\n    color: #fff;\n    width: 100%;\n    padding: 1em 0;\n    line-height: 1em;\n    text-align: center;\n    background: #282d35;\n  }\n  .").concat(ns$1, "-name {\n    font-weight: bold;\n    font-style: normal;\n    text-transform: uppercase;\n  }\n  .").concat(ns$1, "-errors-title,\n  .").concat(ns$1, "-warnings-title {\n    color: #ff5f58;\n    padding-left: .5em;\n  }\n  .").concat(ns$1, "-warnings-title {\n    color: #ffbd2e;\n  }\n  .").concat(ns$1, "-problems {\n    padding: 0 1em;\n    overflow-y: auto;\n    scrollbar-width: none;\n    -ms-overflow-style: none;\n    -webkit-overflow-scrolling: touch;\n  }\n  .").concat(ns$1, "-problems::-webkit-scrollbar {\n    display: none;\n  }\n  .").concat(ns$1, "-errors,\n  .").concat(ns$1, "-warnings {\n    color: #ddd;\n    margin: 1em 0;\n    display: block;\n    background: #282d35;\n    border-radius: .3em;\n    white-space: pre-wrap;\n    font-family: monospace;\n  }\n  .").concat(ns$1, "-errors > div,\n  .").concat(ns$1, "-warnings > div {\n    padding: 1em 1em 0;\n  }\n  .").concat(ns$1, "-errors > div > em,\n  .").concat(ns$1, "-warnings > div > em {\n    color: #641e16;\n    line-height: 1.5em;\n    font-style: normal;\n    padding: .1em .5em;\n    font-weight: normal;\n    background: #ff5f58;\n    border-radius: .3em;\n    text-transform: uppercase;\n  }\n  .").concat(ns$1, "-warnings > div > em {\n    color: #3e2723;\n    background: #ffbd2e;\n  }\n  .").concat(ns$1, "-errors > div > div,\n  .").concat(ns$1, "-warnings > div > div {\n    padding: .5em 0 1em 2em;\n  }\n");
var html$1 = "\n  <aside class=\"".concat(ns$1, "\">\n    <nav class=\"").concat(ns$1, "-nav\">\n      <i class=\"").concat(ns$1, "-close\">\xD7</i>\n    </nav>\n    <div class=\"").concat(ns$1, "-title\">\n      <em class=\"").concat(ns$1, "-name\">Webpack</em>\n      <em class=\"").concat(ns$1, "-errors-title\"></em>\n      <em class=\"").concat(ns$1, "-warnings-title\"></em>\n    </div>\n    <article class=\"").concat(ns$1, "-problems\">\n      <pre class=\"").concat(ns$1, "-errors\"></pre>\n      <pre class=\"").concat(ns$1, "-warnings\"></pre>\n    </article>\n  </aside>\n");

var Overlay = /*#__PURE__*/function () {
  function Overlay() {
    _classCallCheck(this, Overlay);

    this.init();
  }

  _createClass(Overlay, [{
    key: "init",
    value: function init() {
      var _this = this;

      injectCSS(css$1);

      var _appendHTML = appendHTML(html$1);

      var _appendHTML2 = _slicedToArray(_appendHTML, 1);

      this.aside = _appendHTML2[0];
      this.name = this.aside.querySelector(".".concat(ns$1, "-name"));
      this.close = this.aside.querySelector(".".concat(ns$1, "-close"));
      this.errorsList = this.aside.querySelector(".".concat(ns$1, "-errors"));
      this.warningsList = this.aside.querySelector(".".concat(ns$1, "-warnings"));
      this.errorsTitle = this.aside.querySelector(".".concat(ns$1, "-errors-title"));
      this.warningsTitle = this.aside.querySelector(".".concat(ns$1, "-warnings-title"));
      this.close.addEventListener('click', function () {
        _this.hide();
      });
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this.name.innerHTML = name || 'Webpack';
    }
  }, {
    key: "addErrors",
    value: function addErrors(errors) {
      var length = errors.length;
      var errorsTitle = this.errorsTitle,
          errorsList = this.errorsList;
      errorsList.innerHTML = '';
      errorsTitle.innerText = '';

      if (length) {
        var _iterator = _createForOfIteratorHelper(errors),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _step.value,
                moduleName = _step$value.moduleName,
                message = _step$value.message;
            appendHTML("<div><em>Error</em> in ".concat(moduleName, "<div>").concat(message, "</div></div>"), errorsList);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        errorsTitle.innerText = "".concat(length, " Error(s)");
      }
    }
  }, {
    key: "addWarnings",
    value: function addWarnings(warnings) {
      var length = warnings.length;
      var warningsTitle = this.warningsTitle,
          warningsList = this.warningsList;
      warningsList.innerHTML = '';
      warningsTitle.innerText = '';

      if (length) {
        var _iterator2 = _createForOfIteratorHelper(warnings),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = _step2.value,
                moduleName = _step2$value.moduleName,
                message = _step2$value.message;
            appendHTML("<div><em>Warning</em> in ".concat(moduleName, "<div>").concat(message, "</div></div>"), warningsList);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        warningsTitle.innerText = "".concat(length, " Warning(s)");
      }
    }
  }, {
    key: "show",
    value: function show(_ref) {
      var errors = _ref.errors,
          warnings = _ref.warnings;
      var show = "".concat(ns$1, "-show");
      var classList = this.aside.classList;
      this.addErrors(errors);
      this.addWarnings(warnings);

      if (!classList.contains(show)) {
        classList.remove("".concat(ns$1, "-hide"));
        classList.add(show);
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var aside = this.aside;
      var show = "".concat(ns$1, "-show");
      var classList = aside.classList;

      if (classList.contains(show)) {
        classList.remove(show);
        classList.add("".concat(ns$1, "-hide"));
      }
    }
  }]);

  return Overlay;
}();

/**
 * @module effects
 */
// 默认样式
var styles = document.documentElement.style; // Animation 映射表

var ANIMATION_MAPS = [['animation', 'animationend'], ['WebkitAnimation', 'webkitAnimationEnd'], ['MozAnimation', 'mozAnimationEnd'], ['OAnimation', 'oAnimationEnd'], ['msAnimation', 'MSAnimationEnd'], ['KhtmlAnimation', 'khtmlAnimationEnd']]; // Transition 映射表

var TRANSITION_MAPS = [['transition', 'transitionend'], ['WebkitTransition', 'webkitTransitionEnd'], ['MozTransition', 'mozTransitionEnd'], ['OTransition', 'oTransitionEnd'], ['msTransition', 'MSTransitionEnd'], ['KhtmlTransition', 'khtmlTransitionEnd']];
/**
 * @function detect
 * @param {object} maps
 */

function detect(maps) {
  var _iterator = _createForOfIteratorHelper(maps),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          prop = _step$value[0],
          event = _step$value[1];

      if (prop in styles) {
        return [prop, event];
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
} // Animation


var _detect = detect(ANIMATION_MAPS),
    _detect2 = _slicedToArray(_detect, 2),
    ANIMATION = _detect2[0],
    ANIMATION_END = _detect2[1]; // Transition


var _detect3 = detect(TRANSITION_MAPS),
    _detect4 = _slicedToArray(_detect3, 2),
    TRANSITION = _detect4[0],
    TRANSITION_END = _detect4[1];
/**
 * @function toMs
 * @param {string} value
 */


function toMs(value) {
  return Number(value.slice(0, -1).replace(',', '.')) * 1000;
}
/**
 * @function calcTimeout
 * @param {Array} delays
 * @param {Array} durations
 */


function calcTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  var times = durations.map(function (duration, index) {
    return toMs(duration) + toMs(delays[index]);
  }); // 获取最大时长

  return Math.max.apply(null, times);
}
/**
 * @function toArray
 * @param {any} value
 */


function toArray(value) {
  return value ? value.split(', ') : [];
}
/**
 * @function calcEffects
 * @param {HTMLElement} node
 */


function calcEffects(node) {
  var styles = window.getComputedStyle(node);
  var transitioneDelays = toArray(styles.getPropertyValue(TRANSITION + '-delay'));
  var transitionDurations = toArray(styles.getPropertyValue(TRANSITION + '-duration'));
  var transitionTimeout = calcTimeout(transitioneDelays, transitionDurations);
  var animationDelays = toArray(styles.getPropertyValue(ANIMATION + '-delay'));
  var animationDurations = toArray(styles.getPropertyValue(ANIMATION + '-duration'));
  var animationTimeout = calcTimeout(animationDelays, animationDurations);
  var timeout = Math.max(transitionTimeout, animationTimeout);
  var effect = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
  var count = effect ? effect === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  return {
    effect: effect,
    count: count,
    timeout: timeout
  };
}
/**
 * @function onEffectsEnd
 * @param {HTMLElement} node
 * @param {Function} callback
 * @see https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/transition-util.js
 */


function onEffectsEnd(node, callback) {
  // 不支持动画
  if (!ANIMATION && !TRANSITION) return callback();

  var _calcEffects = calcEffects(node),
      count = _calcEffects.count,
      effect = _calcEffects.effect,
      timeout = _calcEffects.timeout; // 没有动画


  if (!effect) return callback();
  var ended = 0; // 防止有些动画没有触发结束事件

  var timer = setTimeout(function () {
    if (ended < count) {
      end();
    }
  }, timeout + 1);
  var event = effect === TRANSITION ? TRANSITION_END : ANIMATION_END;

  var end = function end() {
    clearTimeout(timer);
    node.removeEventListener(event, onEnd);
    callback();
  };

  var onEnd = function onEnd(e) {
    if (e.target === node) {
      if (++ended >= count) {
        end();
      }
    }
  }; // 监听动画完成事件


  node.addEventListener(event, onEnd);
}

var ns = 'wds-progress';
var perimeter = 219.99078369140625;
var css = "\n  .".concat(ns, " {\n    opacity: 0;\n    right: 1em;\n    bottom: 1em;\n    width: 48px;\n    height: 48px;\n    font-size: 16px;\n    position: fixed;\n    cursor: default;\n    user-select: none;\n    font-style: normal;\n    font-weight: normal;\n    transform: scale(0);\n    z-index: 2147483645;\n  }\n  @keyframes ").concat(ns, "-show {\n    0% {\n      opacity: 0;\n      transform: scale(0);\n    }\n    100% {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n  @keyframes ").concat(ns, "-hide {\n    0% {\n      opacity: 1;\n      transform: scale(1);\n    }\n    100% {\n      opacity: 0;\n      transform: scale(0);\n    }\n  }\n  .").concat(ns, "-show {\n    animation: ").concat(ns, "-show .3s ease-out forwards;\n  }\n  .").concat(ns, "-hide {\n    animation: ").concat(ns, "-hide .3s ease-out forwards;\n  }\n  .").concat(ns, "-bg {\n    fill: #282d35;\n  }\n  .").concat(ns, "-track {\n    stroke-width: 10;\n    fill: rgba(0, 0, 0, 0);\n    stroke: rgb(186, 223, 172);\n    stroke-dasharray: ").concat(perimeter, ";\n    stroke-dashoffset: -").concat(perimeter, ";\n    transition: stroke-dashoffset .3s ease-out;\n    transform: rotate(90deg) translate(0, -80px);\n  }\n  .").concat(ns, "-value {\n    fill: #ffffff;\n    font-size: 1em;\n    text-anchor: middle;\n    font-family: monospace;\n    dominant-baseline: middle;\n  }\n");
var html = "\n  <svg class=\"".concat(ns, "\" x=\"0\" y=\"0\" viewBox=\"0 0 80 80\">\n    <circle class=\"").concat(ns, "-bg\" cx=\"50%\" cy=\"50%\" r=\"35\" />\n    <path class=\"").concat(ns, "-track\" d=\"M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0\" />\n    <text class=\"").concat(ns, "-value\" x=\"50%\" y=\"52%\">0%</text>\n  </svg>\n");

var Progress = /*#__PURE__*/function () {
  function Progress() {
    _classCallCheck(this, Progress);

    this.init();
  }

  _createClass(Progress, [{
    key: "init",
    value: function init() {
      injectCSS(css);

      var _appendHTML = appendHTML(html);

      var _appendHTML2 = _slicedToArray(_appendHTML, 1);

      this.svg = _appendHTML2[0];
      this.track = this.svg.querySelector(".".concat(ns, "-track"));
      this.value = this.svg.querySelector(".".concat(ns, "-value"));
    }
  }, {
    key: "update",
    value: function update(value) {
      this.value.innerHTML = "".concat(value, "%");
      var offset = (100 - value) / 100 * -perimeter;
      this.track.setAttribute('style', "stroke-dashoffset: ".concat(offset));
    }
  }, {
    key: "show",
    value: function show() {
      var show = "".concat(ns, "-show");
      var classList = this.svg.classList;

      if (!classList.contains(show)) {
        classList.remove("".concat(ns, "-hide"));
        classList.add(show);
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this = this;

      onEffectsEnd(this.track, function () {
        var show = "".concat(ns, "-show");
        var classList = _this.svg.classList;

        if (classList.contains(show)) {
          classList.remove(show);
          classList.add("".concat(ns, "-hide"));
        }

        onEffectsEnd(_this.svg, function () {
          if (!classList.contains(show)) {
            _this.update(0);
          }
        });
      });
    }
  }]);

  return Progress;
}();

function parseMessage(message) {
  try {
    return JSON.parse(message.data);
  } catch (_unused) {
    return {};
  }
}

function createWebSocket(url, protocols) {
  var options = {};
  var overlay = new Overlay();
  var progress = new Progress();
  var ws = new WebSocket(url, protocols);

  ws.onmessage = function (message) {
    var _parseMessage = parseMessage(message),
        action = _parseMessage.action,
        payload = _parseMessage.payload;

    switch (action) {
      case 'init':
        options = payload.options;
        overlay.setName(payload.name);
        break;

      case 'progress':
        if (options.progress) {
          var percent = payload.value;
          percent === 0 && progress.show();
          progress.update(percent);
          percent === 100 && progress.hide();
        }

        break;

      case 'problems':
        reload(payload.hash, {
          hmr: true,
          onUpdated: function onUpdated() {
            if (options.errors || options.warnings) {
              overlay.show(payload);
            }
          }
        });
        break;

      case 'ok':
        overlay.hide();
        progress.hide();
        reload(payload.hash, {
          hmr: true
        });
        break;
    }

    window.postMessage({
      action: "webpack-hot-".concat(action),
      payload: payload
    }, '*');
  };

  ws.onclose = function (event) {
    console.log(event);
  };
}

createWebSocket('ws://127.0.0.1:8000/hmr');