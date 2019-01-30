"use strict";

var _sortProps = _interopRequireDefault(require("../sortProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeProp(name, required, defaultValue, type) {
  // Default values.
  required = required === undefined ? false : required;
  type = type === undefined ? {
    name: 'string'
  } : type;
  return {
    name,
    required,
    defaultValue,
    type
  };
}

it('should sort required props', () => {
  const props = [makeProp('prop2', true), makeProp('prop1', true)];
  const result = (0, _sortProps.default)(props);
  expect(result.map(prop => prop.name)).toEqual(['prop1', 'prop2']);
});
it('should sort optional props', () => {
  const props = [makeProp('prop2', false), makeProp('prop1', false)];
  const result = (0, _sortProps.default)(props);
  expect(result.map(prop => prop.name)).toEqual(['prop1', 'prop2']);
});
it('should sort mixed props (required props should come first)', () => {
  const props = [makeProp('prop2', false), makeProp('prop1', true), makeProp('prop3', true), makeProp('prop4', false)];
  const result = (0, _sortProps.default)(props);
  expect(result.map(prop => prop.name)).toEqual(['prop1', 'prop3', 'prop2', 'prop4']);
});