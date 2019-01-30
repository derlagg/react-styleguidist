import "core-js/modules/es6.object.assign";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Ribbon from './Ribbon';
import { RibbonRenderer, styles } from './RibbonRenderer';
var props = {
  classes: classes(styles)
};
describe('Ribbon', function () {
  it('should render ribbon if the ribbon is present in the config', function () {
    var actual = shallow(React.createElement(Ribbon, null), {
      context: {
        config: {
          ribbon: {
            url: 'foo.bar'
          }
        }
      }
    });
    expect(actual).toMatchSnapshot();
  });
  it('should return null if the ribbon is not present in the config', function () {
    var actual = shallow(React.createElement(Ribbon, null), {
      context: {
        config: {}
      }
    });
    expect(actual.type()).toBeNull();
  });
});
describe('RibbonRenderer', function () {
  it('should render ribbon with url', function () {
    var actual = shallow(React.createElement(RibbonRenderer, _extends({}, props, {
      url: "http://example.com"
    })));
    expect(actual).toMatchSnapshot();
  });
  it('should render ribbon with a text', function () {
    var actual = shallow(React.createElement(RibbonRenderer, _extends({}, props, {
      url: "http://example.com",
      text: "Share the repo"
    })));
    expect(actual).toMatchSnapshot();
  });
});