"use strict";

var _path = _interopRequireDefault(require("path"));

var _getNameFromFilePath = _interopRequireDefault(require("../getNameFromFilePath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('should return the file name without extension', () => {
  expect((0, _getNameFromFilePath.default)(_path.default.join('an', 'absolute', 'path', 'to', 'YourComponent.js'))).toEqual('YourComponent');
});
it('should use the directory name if the file name is index.js', () => {
  expect((0, _getNameFromFilePath.default)(_path.default.join('an', 'absolute', 'path', 'to', 'YourComponent', 'index.js'))).toEqual('YourComponent');
});
it('should capitalize the display name', () => {
  expect((0, _getNameFromFilePath.default)(_path.default.join('an', 'absolute', 'path', 'to', 'yourComponent.js'))).toEqual('YourComponent');
  expect((0, _getNameFromFilePath.default)(_path.default.join('an', 'absolute', 'path', 'to', 'your-component', 'index.js'))).toEqual('YourComponent');
});