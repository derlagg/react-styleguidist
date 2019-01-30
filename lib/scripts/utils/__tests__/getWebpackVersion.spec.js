"use strict";

var _getWebpackVersion = _interopRequireDefault(require("../getWebpackVersion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('should return version number', () => {
  const result = (0, _getWebpackVersion.default)();
  expect(result).toBeGreaterThanOrEqual(1);
});