import React from 'react';
import Wrapper from './Wrapper';
it('should render children', function () {
  var children = React.createElement("span", null, "Hello");
  var actual = shallow(React.createElement(Wrapper, {
    onError: function onError() {}
  }, children));
  expect(actual).toMatchSnapshot();
});
it('should call onError handler when React invokes error handler', function () {
  var onError = jest.fn();
  var actual = shallow(React.createElement(Wrapper, {
    onError: onError
  }, "blah")); // faux error

  actual.instance().componentDidCatch('err');
  expect(onError).toHaveBeenCalledTimes(1);
  expect(onError).toHaveBeenCalledWith('err');
});