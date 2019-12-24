import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.function.name";
import "core-js/modules/es6.regexp.replace";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createStyleSheet from '../../styles/createStyleSheet';
export default (function (styles) {
  return function (WrappedComponent) {
    var _class, _temp;

    var componentName = WrappedComponent.name.replace(/Renderer$/, '');
    return _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(_class, _Component);

      function _class(props, context) {
        var _this;

        _this = _Component.call(this, props, context) || this;
        _this.sheet = createStyleSheet(styles, context.config || {}, componentName);

        _this.sheet.update(props).attach();

        return _this;
      }

      var _proto = _class.prototype;

      _proto.componentDidUpdate = function componentDidUpdate(nextProps) {
        this.sheet.update(nextProps);
      };

      _proto.render = function render() {
        return React.createElement(WrappedComponent, _extends({}, this.props, {
          classes: this.sheet.classes
        }));
      };

      return _class;
    }(Component), _defineProperty(_class, "displayName", "Styled(" + componentName + ")"), _defineProperty(_class, "contextTypes", {
      config: PropTypes.object
    }), _temp;
  };
});