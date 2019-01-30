"use strict";

var _deabsdeep = _interopRequireDefault(require("deabsdeep"));

var _getExamples = _interopRequireDefault(require("../getExamples"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const file = '../pizza.js';
const displayName = 'Pizza';
const examplesFile = './Pizza.md';
const defaultExample = './Default.md';
test('require an example file if component has example file', () => {
  const result = (0, _getExamples.default)(file, displayName, examplesFile);
  expect((0, _deabsdeep.default)(result).require).toMatchInlineSnapshot(`"!!~/src/loaders/examples-loader.js?displayName=Pizza&file=.%2F..%2Fpizza.js&shouldShowDefaultExample=false!./Pizza.md"`);
});
test('require default example has no example file', () => {
  const result = (0, _getExamples.default)(file, displayName, false, defaultExample);
  expect((0, _deabsdeep.default)(result).require).toMatchInlineSnapshot(`"!!~/src/loaders/examples-loader.js?displayName=Pizza&file=.%2F..%2Fpizza.js&shouldShowDefaultExample=true!./Default.md"`);
});
test('return null if component has no example file or default example', () => {
  const result = (0, _getExamples.default)(file, displayName);
  expect(result).toEqual(null);
});