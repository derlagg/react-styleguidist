import React from 'react';
import { ErrorRenderer } from './ErrorRenderer';
it('renderer should render error message', function () {
  var error = {
    toString: function toString() {
      return 'error';
    }
  };
  var info = {
    componentStack: {
      toString: function toString() {
        return 'info';
      }
    }
  };
  var actual = shallow(React.createElement(ErrorRenderer, {
    classes: {},
    error: error,
    info: info
  }));
  expect(actual).toMatchSnapshot();
});