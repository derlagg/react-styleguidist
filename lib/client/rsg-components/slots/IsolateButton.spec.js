import React from 'react';
import IsolateButton from './IsolateButton';
it('should renderer a link to isolated mode', function () {
  var actual = shallow(React.createElement(IsolateButton, {
    name: "Pizza"
  }));
  expect(actual).toMatchSnapshot();
});
it('should renderer a link to example isolated mode', function () {
  var actual = shallow(React.createElement(IsolateButton, {
    name: "Pizza",
    example: 3
  }));
  expect(actual).toMatchSnapshot();
});
it('should renderer a link home in isolated mode', function () {
  var actual = shallow(React.createElement(IsolateButton, {
    name: "Pizza",
    isolated: true
  }));
  expect(actual).toMatchSnapshot();
});