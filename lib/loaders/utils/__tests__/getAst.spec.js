"use strict";

var _acornJsx = _interopRequireDefault(require("acorn-jsx"));

var _getAst = _interopRequireDefault(require("../getAst"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getAst', () => {
  test('return AST', () => {
    const result = (0, _getAst.default)(`42`);
    expect(result).toMatchSnapshot();
  });
  test('accept Acorn plugins', () => {
    const result = (0, _getAst.default)(`<X />`, [(0, _acornJsx.default)()]);
    expect(result).toMatchSnapshot();
  });
});