import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.array.find";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Editor } from './Editor';
var code = '<button>MyAwesomeCode</button>';
var newCode = '<button>MyNewAwesomeCode</button>';
var props = {
  classes: {},
  onChange: function onChange() {},
  code: code
};
describe('Editor', function () {
  it('should renderer and editor', function () {
    var actual = shallow(React.createElement(Editor, props));
    expect(actual).toMatchSnapshot();
  });
  it('should update code', function () {
    var actual = mount(React.createElement(Editor, props));
    actual.setProps({
      code: newCode
    });
    expect(actual.text()).toMatch(newCode);
  });
  it('should call onChange when textarea value changes', function () {
    var onChange = jest.fn();
    var actual = mount(React.createElement(Editor, _extends({}, props, {
      onChange: onChange
    })));
    expect(actual.text()).toMatch(code); // Set new value

    actual.find('textarea').simulate('change', {
      target: {
        value: newCode
      }
    });
    expect(onChange).toBeCalledWith(newCode);
  });
});