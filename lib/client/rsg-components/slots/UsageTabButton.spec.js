import "core-js/modules/es6.object.assign";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import UsageTabButton from './UsageTabButton';
var props = {
  name: 'Pizza',
  onClick: function onClick() {}
};
it('should renderer a button', function () {
  var actual = shallow(React.createElement(UsageTabButton, _extends({}, props, {
    props: {
      props: [{
        name: 'foo'
      }]
    }
  })));
  expect(actual).toMatchSnapshot();
});
it('should renderer null if there are not props or methods', function () {
  var actual = shallow(React.createElement(UsageTabButton, _extends({}, props, {
    props: {}
  })));
  expect(actual.getElement()).toBeFalsy();
});