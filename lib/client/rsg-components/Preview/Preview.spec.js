import "core-js/modules/es6.object.assign";
import React from 'react';
import Preview from '../Preview';
/* eslint-disable no-console */

var evalInContext = function evalInContext(a) {
  return (// eslint-disable-next-line no-new-func
    new Function('require', 'state', 'setState', 'const React = require("react");' + a).bind(null, require)
  );
};

var code = '<button>OK</button>';
var newCode = '<button>Cancel</button>';
var options = {
  context: {
    config: {
      compilerConfig: {}
    },
    codeRevision: 0
  }
};
var console$error = console.error;
var console$clear = console.clear;
afterEach(function () {
  console.error = console$error;
  console.clear = console$clear;
});
it('should unmount Wrapper component', function () {
  var actual = mount(React.createElement(Preview, {
    code: code,
    evalInContext: evalInContext
  }), options);
  var node = actual.instance().mountNode;
  expect(node.innerHTML).toMatch('<button');
  actual.unmount();
  expect(node.innerHTML).toBe('');
});
it('should not not fail when Wrapper wasn’t mounted', function () {
  console.error = jest.fn();
  var actual = mount(React.createElement(Preview, {
    code: "pizza",
    evalInContext: evalInContext
  }), options);
  var node = actual.instance().mountNode;
  expect(console.error).toHaveBeenCalled();
  expect(node.innerHTML).toBe('');
  actual.unmount();
  expect(node.innerHTML).toBe('');
});
it('should wrap code in Fragment when it starts with <', function () {
  console.error = jest.fn();
  var actual = mount(React.createElement(Preview, {
    code: "<span /><span />",
    evalInContext: evalInContext
  }), options); // If two spans weren't wrapped in a Fragment, we'd see an error in console

  expect(console.error).not.toHaveBeenCalled();
  expect(actual.html()).toMatchSnapshot();
});
it('should render component renderer', function () {
  console.error = jest.fn();
  var actual = shallow(React.createElement(Preview, {
    code: code,
    evalInContext: evalInContext
  }), Object.assign({}, options, {
    disableLifecycleMethods: true
  }));
  expect(actual).toMatchSnapshot();
});
it('should update', function () {
  var actual = mount(React.createElement(Preview, {
    code: code,
    evalInContext: evalInContext
  }), options);
  actual.setProps({
    code: newCode
  });
  expect(actual.html()).toMatchSnapshot();
});
it('should handle no code', function () {
  var actual = mount(React.createElement(Preview, {
    code: "",
    evalInContext: evalInContext
  }), options);
  expect(actual.html()).toMatchSnapshot();
});
it('should handle errors', function () {
  console.error = jest.fn();
  var actual = shallow(React.createElement(Preview, {
    code: '<invalid code',
    evalInContext: evalInContext
  }), options);
  expect(actual).toMatchSnapshot();
  expect(console.error).toHaveBeenCalledTimes(1);
});
it('should not clear console on initial mount', function () {
  console.clear = jest.fn();
  mount(React.createElement(Preview, {
    code: code,
    evalInContext: evalInContext
  }), options);
  expect(console.clear).toHaveBeenCalledTimes(0);
});
it('should clear console on second mount', function () {
  console.clear = jest.fn();
  mount(React.createElement(Preview, {
    code: code,
    evalInContext: evalInContext
  }), {
    context: Object.assign({}, options.context, {
      codeRevision: 1
    })
  });
  expect(console.clear).toHaveBeenCalledTimes(1);
});