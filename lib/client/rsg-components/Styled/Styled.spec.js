import "core-js/modules/es6.function.name";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Styled from './Styled';
/* eslint-disable react/prefer-stateless-function, react/prop-types */

var styles = function styles() {
  return {
    foo: {
      color: 'red'
    }
  };
};

var Cmpnt =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Cmpnt, _Component);

  function Cmpnt() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Cmpnt.prototype;

  _proto.render = function render() {
    return React.createElement("div", {
      className: this.props.classes.foo
    });
  };

  return Cmpnt;
}(Component);

it('should wrap a component and pass classes', function () {
  var WrappedComponent = Styled(styles)(Cmpnt);
  var actual = shallow(React.createElement(WrappedComponent, {
    bar: "baz"
  }), {
    context: {
      config: {
        theme: {},
        styles: {}
      }
    }
  });
  expect(actual.name()).toBe('Cmpnt');
  expect(actual.prop('bar')).toBe('baz');
  expect(typeof actual.prop('classes')).toBe('object');
  expect(actual.prop('classes').foo).toMatch(/^rsg--foo-\d+$/);
});