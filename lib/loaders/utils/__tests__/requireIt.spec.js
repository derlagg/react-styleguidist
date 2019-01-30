"use strict";

var _escodegen = require("escodegen");

var _requireIt = _interopRequireDefault(require("../requireIt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('requireIt() should return an AST for require statement', () => {
  const result = (0, _requireIt.default)('foo');
  expect(result).toBeTruthy();
  expect(typeof result.toAST).toBe('function');
  expect((0, _escodegen.generate)(result.toAST())).toBe("require('foo')");
});