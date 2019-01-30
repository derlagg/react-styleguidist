"use strict";

var _path = _interopRequireDefault(require("path"));

var _findFileCaseInsensitive = _interopRequireDefault(require("../findFileCaseInsensitive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('should return a file path with the correct case if a file exists', () => {
  const result = (0, _findFileCaseInsensitive.default)(_path.default.join(__dirname, 'Findfilecaseinsensitive.Spec.JS'));
  expect(result).toMatch(__filename);
});
it('should return undefined if a file doesn’t exist', () => {
  const result = (0, _findFileCaseInsensitive.default)(_path.default.join(__dirname, 'pizza.js'));
  expect(result).toBeFalsy();
});
it('cache clean function shouldn’t throw', () => {
  const fn = () => _findFileCaseInsensitive.default.clearCache();

  expect(fn).not.toThrowError();
});