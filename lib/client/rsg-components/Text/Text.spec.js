import "core-js/modules/es6.object.assign";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { TextRenderer, styles } from './TextRenderer';
var props = {
  classes: classes(styles)
};
describe('Text', function () {
  it('should render text', function () {
    var actual = shallow(React.createElement(TextRenderer, props, "Pizza"));
    expect(actual).toMatchSnapshot();
  });
  it('should render underlined text', function () {
    var actual = shallow(React.createElement(TextRenderer, _extends({}, props, {
      underlined: true
    }), "Pizza"));
    expect(actual).toMatchSnapshot();
  });
  it('should render sized text', function () {
    var actual = shallow(React.createElement(TextRenderer, _extends({}, props, {
      size: "small"
    }), "Pizza"));
    expect(actual).toMatchSnapshot();
  });
  it('should render colored text', function () {
    var actual = shallow(React.createElement(TextRenderer, _extends({}, props, {
      color: "light"
    }), "Pizza"));
    expect(actual).toMatchSnapshot();
  });
  it('should render text with a semantic tag and styles', function () {
    var actual = shallow(React.createElement(TextRenderer, _extends({}, props, {
      semantic: "strong"
    }), "Pizza"));
    expect(actual).toMatchSnapshot();
  });
  it('should render text with a title', function () {
    var actual = shallow(React.createElement(TextRenderer, _extends({}, props, {
      title: "Pasta"
    }), "Pizza"));
    expect(actual).toMatchSnapshot();
  });
});