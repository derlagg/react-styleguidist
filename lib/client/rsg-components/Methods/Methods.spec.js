import React from 'react';
import { parse } from 'react-docgen';
import MethodsRenderer, { columns } from './MethodsRenderer'; // Test renderers with clean readable snapshot diffs
// eslint-disable-next-line react/prop-types

export default function ColumnsRenderer(_ref) {
  var methods = _ref.methods;
  return React.createElement("ul", null, methods.map(function (row, rowIdx) {
    return React.createElement("li", {
      key: rowIdx
    }, columns.map(function (_ref2, colIdx) {
      var render = _ref2.render;
      return React.createElement("div", {
        key: colIdx
      }, render(row));
    }));
  }));
}

function render(methods) {
  var parsed = parse("\n\t\timport { Component } from 'react';\n\t\texport default class Cmpnt extends Component {\n\t\t\t" + methods.join('\n') + "\n\t\t\trender() {\n\t\t\t}\n\t\t}\n\t");
  return shallow(React.createElement(ColumnsRenderer, {
    methods: parsed.methods
  }));
}

describe('MethodsRenderer', function () {
  it('should render a table', function () {
    var actual = shallow(React.createElement(MethodsRenderer, {
      methods: [{
        name: 'method',
        modifiers: [],
        params: [],
        description: 'Public'
      }]
    }));
    expect(actual).toMatchSnapshot();
  });
});
describe('PropsRenderer', function () {
  it('should render public method', function () {
    var actual = render(['/**\n * Public\n * @public\n */\nmethod() {}']);
    expect(actual).toMatchSnapshot();
  });
  it('should render parameters', function () {
    var actual = render(['/**\n * Public\n * @public\n * @param {Number} value - Description\n */\nmethod(value) {}']);
    expect(actual).toMatchSnapshot();
  });
  it('should render returns', function () {
    var actual = render(['/**\n * @public\n * @returns {Number} - Description\n */\nmethod() {}']);
    expect(actual).toMatchSnapshot();
  });
  it('should render JsDoc tags', function () {
    var actual = shallow(React.createElement(ColumnsRenderer, {
      methods: [{
        name: 'Foo',
        tags: {
          since: [{
            title: 'since',
            description: '1.0.0'
          }]
        }
      }]
    }));
    expect(actual).toMatchSnapshot();
  });
  it('should render deprecated JsDoc tags', function () {
    var actual = shallow(React.createElement(ColumnsRenderer, {
      methods: [{
        name: 'Foo',
        tags: {
          deprecated: [{
            title: 'description',
            description: 'Use *another* method'
          }]
        }
      }]
    }));
    expect(actual).toMatchSnapshot();
  });
});