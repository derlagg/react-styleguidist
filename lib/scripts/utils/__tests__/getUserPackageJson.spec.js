"use strict";

var _getUserPackageJson = _interopRequireDefault(require("../getUserPackageJson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();
afterEach(() => {
  process.chdir(cwd);
});
it('should return object with package.json contents', () => {
  process.chdir('test/apps/cra');
  const result = (0, _getUserPackageJson.default)();
  expect(result).toBeTruthy();
  expect(result.name).toBe('pizza-cra');
});