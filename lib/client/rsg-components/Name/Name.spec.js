import "core-js/modules/es6.object.assign";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { NameRenderer, styles } from './NameRenderer';
var props = {
  classes: classes(styles)
};
it('renderer should render argument name', function () {
  var actual = shallow(React.createElement(NameRenderer, props, "Foo"));
  expect(actual).toMatchSnapshot();
});
it('renderer should render deprecated argument name', function () {
  var actual = shallow(React.createElement(NameRenderer, _extends({}, props, {
    deprecated: true
  }), "Foo"));
  expect(actual).toMatchSnapshot();
});