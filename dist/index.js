'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var on = function on(eventName, cb) {
  var handler = function handler(_ref) {
    var data = _ref.data;

    if (data === eventName) return cb();
  };
  window.addEventListener('message', handler, false);
  return function () {
    window.removeEventListener('message', handler);
  };
};

var withMessageListener = function withMessageListener(event, handler) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      timeout = _ref2.timeout,
      _ref2$once = _ref2.once,
      once = _ref2$once === undefined ? false : _ref2$once;

  return function (ComposedComponent) {
    return function (_Component) {
      _inherits(_class, _Component);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
      }

      _createClass(_class, [{
        key: 'setup',
        value: function setup() {
          var _this2 = this;

          if (event === undefined) throw new Error('event is needed for withMessageListener HOC');
          if (handler === undefined) throw new Error('handler is needed for withMessageListener HOC');
          this.dispose = on(event, function () {
            handler(_this2.props);
            if (once) {
              _this2.dispose();
            }
          });
          if (timeout) {
            var timer = setTimeout(function () {
              clearTimeout(timer);
              _this2.dispose();
            }, timeout);
          }
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.setup();
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.dispose();
        }
      }, {
        key: 'render',
        value: function render() {
          return (0, _react.createElement)(ComposedComponent, this.props);
        }
      }]);

      return _class;
    }(_react.Component);
  };
};

exports.default = withMessageListener;
