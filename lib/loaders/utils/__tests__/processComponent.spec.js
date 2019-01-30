"use strict";

var _path = _interopRequireDefault(require("path"));

var _processComponent = _interopRequireDefault(require("../processComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = {
  configDir: __dirname,
  getExampleFilename: componentpath => _path.default.join(_path.default.dirname(componentpath), 'Readme.md'),
  getComponentPathLine: componentpath => componentpath
};
it('processComponent() should return an object for section with content', () => {
  const result = (0, _processComponent.default)('pizza.js', config);
  expect(result).toMatchSnapshot();
});