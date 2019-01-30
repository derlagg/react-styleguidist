import "core-js/modules/es6.object.assign";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { ArgumentRenderer, styles } from './ArgumentRenderer';
var name = 'Foo';
var type = {
  name: 'Array'
};
var description = 'Converts foo to bar';
var props = {
  classes: classes(styles)
};
it('should render argument', function () {
  var actual = shallow(React.createElement(ArgumentRenderer, _extends({}, props, {
    name: name,
    type: type,
    description: description
  })));
  expect(actual).toMatchSnapshot();
});
it('should render argument without type', function () {
  var actual = shallow(React.createElement(ArgumentRenderer, _extends({}, props, {
    name: name,
    description: description
  })));
  expect(actual).toMatchSnapshot();
});
it('should render optional argument', function () {
  var actual = shallow(React.createElement(ArgumentRenderer, _extends({}, props, {
    type: {
      type: 'OptionalType',
      expression: {
        name: 'Array'
      }
    },
    description: description
  })));
  expect(actual).toMatchSnapshot();
});
it('should render default value of argument', function () {
  var actual = shallow(React.createElement(ArgumentRenderer, _extends({}, props, {
    type: {
      name: 'String'
    },
    default: "bar",
    description: description
  })));
  expect(actual).toMatchSnapshot();
});
it('should render default value of optional argument', function () {
  var actual = shallow(React.createElement(ArgumentRenderer, _extends({}, props, {
    type: {
      type: 'OptionalType',
      expression: {
        name: 'Boolean'
      }
    },
    default: "true",
    description: description
  })));
  expect(actual).toMatchSnapshot();
});
it('should render argument without description', function () {
  var actual = shallow(React.createElement(ArgumentRenderer, _extends({}, props, {
    name: name,
    type: type
  })));
  expect(actual).toMatchSnapshot();
});
it('should render return value', function () {
  var actual = shallow(React.createElement(ArgumentRenderer, _extends({}, props, {
    type: type,
    description: description,
    returns: true
  })));
  expect(actual).toMatchSnapshot();
});
it('should render with block styles', function () {
  var actual = shallow(React.createElement(ArgumentRenderer, _extends({}, props, {
    block: true
  })));
  expect(actual).toMatchSnapshot();
});