"use strict";

var _glogg = _interopRequireDefault(require("glogg"));

var _highlightCode = _interopRequireDefault(require("../highlightCode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _glogg.default)('rsg');
const code = '<p>Hello React</p>';
it('should highlight code with specified language', () => {
  const actual = (0, _highlightCode.default)(code, 'html');
  expect(actual).toMatchSnapshot();
});
it('should warn when language not found', () => {
  const warn = jest.fn();
  logger.once('warn', warn);
  const actual = (0, _highlightCode.default)(code, 'pizza');
  expect(actual).toBe(code);
  expect(warn).toBeCalledWith('Syntax highlighting for “pizza” isn’t supported. Supported languages are: clike, markup, xml, html, mathml, svg, markdown, css, scss, javascript, js, flow, typescript, ts, jsx, tsx, graphql, json, jsonp, bash, shell, diff.');
});
it('should not highlight code without language', () => {
  const actual = (0, _highlightCode.default)(code);
  expect(actual).toBe(code);
});