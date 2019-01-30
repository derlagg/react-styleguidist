import "core-js/modules/es6.object.assign";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { ParaRenderer, styles } from './ParaRenderer';
var props = {
  classes: classes(styles)
};
it('should render paragraph as a <div>', function () {
  var actual = shallow(React.createElement(ParaRenderer, props, "Pizza"));
  expect(actual).toMatchSnapshot();
});
it('should render paragraph as a <p>', function () {
  var actual = shallow(React.createElement(ParaRenderer, _extends({}, props, {
    semantic: "p"
  }), "Pizza"));
  expect(actual).toMatchSnapshot();
});