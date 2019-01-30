"use strict";

var _path = _interopRequireDefault(require("path"));

var _identity = _interopRequireDefault(require("lodash/identity"));

var _getComponents = _interopRequireDefault(require("../getComponents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('getComponents() should return an object for components', () => {
  const result = (0, _getComponents.default)(['Foo.js', 'Bar.js'], {
    configDir: _path.default.resolve(__dirname, '../../../test'),
    getExampleFilename: _identity.default,
    getComponentPathLine: _identity.default
  });
  expect(result).toMatchSnapshot();
});