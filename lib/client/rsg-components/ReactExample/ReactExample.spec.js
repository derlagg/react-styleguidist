import "core-js/modules/es6.array.find";
import React from 'react';
import noop from 'lodash/noop';
import ReactExample from '../ReactExample';

var evalInContext = function evalInContext(a) {
  return (// eslint-disable-next-line no-new-func
    new Function('require', 'state', 'setState', 'const React = require("react");' + a).bind(null, require)
  );
};

it('should render code', function () {
  var actual = shallow(React.createElement(ReactExample, {
    code: '<button>OK</button>',
    evalInContext: evalInContext,
    onError: noop
  }));
  expect(actual).toMatchSnapshot();
});
it('should wrap code in Fragment when it starts with <', function () {
  var actual = mount(React.createElement("div", null, React.createElement(ReactExample, {
    code: "<span /><span />",
    evalInContext: evalInContext,
    onError: noop
  })));
  expect(actual.html()).toMatchSnapshot();
});
it('should handle errors', function () {
  var onError = jest.fn();
  shallow(React.createElement(ReactExample, {
    code: '<invalid code',
    evalInContext: evalInContext,
    onError: onError
  }));
  expect(onError).toHaveBeenCalledTimes(1);
});
it('should set initialState before the first render', function () {
  var code = "\ninitialState = {count:1};\n<span>{state.count}</span>\n\t";
  var actual = mount(React.createElement(ReactExample, {
    code: code,
    evalInContext: evalInContext,
    onError: noop
  }));
  expect(actual.html()).toMatchSnapshot();
});
it('should update state on setState', function (done) {
  var code = "\ninitialState = {count:1};\nsetTimeout(() => state.count === 1 && setState({count:2}));\n<button>{state.count}</button>\n\t";
  var actual = mount(React.createElement(ReactExample, {
    code: code,
    evalInContext: evalInContext,
    onError: noop
  }));
  actual.find('button').simulate('click');
  setTimeout(function () {
    try {
      expect(actual.html()).toMatchSnapshot();
      done();
    } catch (err) {
      done.fail(err);
    }
  });
});