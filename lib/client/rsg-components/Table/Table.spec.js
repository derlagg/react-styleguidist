import "core-js/modules/es6.object.assign";
import "core-js/modules/es6.function.name";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { TableRenderer, styles } from './TableRenderer';
var columns = [{
  caption: 'Name',
  // eslint-disable-next-line react/prop-types
  render: function render(_ref) {
    var name = _ref.name;
    return React.createElement("span", null, "name: ", name);
  }
}, {
  caption: 'Type',
  // eslint-disable-next-line react/prop-types
  render: function render(_ref2) {
    var type = _ref2.type;
    return React.createElement("span", null, "type: ", type);
  }
}];
var rows = [{
  name: 'Quattro formaggi',
  type: 'pizza'
}, {
  name: 'Tiramisu',
  type: 'desert'
}, {
  name: 'Unicorn',
  type: 'animal'
}];
var props = {
  classes: classes(styles),
  getRowKey: function getRowKey(row) {
    return row.name;
  }
};
it('should render a table', function () {
  var actual = shallow(React.createElement(TableRenderer, _extends({}, props, {
    columns: columns,
    rows: rows
  })));
  expect(actual).toMatchSnapshot();
});