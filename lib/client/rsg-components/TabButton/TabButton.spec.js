import "core-js/modules/es6.object.assign";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { TabButtonRenderer, styles } from './TabButtonRenderer';
var props = {
  classes: classes(styles),
  onClick: function onClick() {}
};
it('should render a button', function () {
  var actual = shallow(React.createElement(TabButtonRenderer, props, "pizza"));
  expect(actual).toMatchSnapshot();
});
it('should render active styles', function () {
  var actual = shallow(React.createElement(TabButtonRenderer, _extends({}, props, {
    active: true
  }), "pizza"));
  expect(actual).toMatchSnapshot();
});
it('should pass a class name to a button', function () {
  var actual = shallow(React.createElement(TabButtonRenderer, _extends({}, props, {
    onClick: function onClick() {},
    className: "foo-class"
  }), "pizza"));
  expect(actual).toMatchSnapshot();
});