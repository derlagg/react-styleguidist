import "core-js/modules/es6.object.assign";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { ArgumentsRenderer, styles } from './ArgumentsRenderer';
var props = {
  classes: classes(styles)
};
var args = [{
  name: 'Foo',
  description: 'Converts foo to bar',
  type: {
    name: 'Array'
  }
}, {
  name: 'Foo'
}];
it('renderer should render arguments', function () {
  var actual = shallow(React.createElement(ArgumentsRenderer, _extends({}, props, {
    args: args
  })));
  expect(actual).toMatchSnapshot();
});
it('renderer should render heading', function () {
  var actual = shallow(React.createElement(ArgumentsRenderer, _extends({}, props, {
    args: [args[1]],
    heading: true
  })));
  expect(actual).toMatchSnapshot();
});
it('renderer should render nothing for empty array', function () {
  var actual = shallow(React.createElement(ArgumentsRenderer, _extends({}, props, {
    args: []
  })));
  expect(actual.getElement()).toBe(null);
});