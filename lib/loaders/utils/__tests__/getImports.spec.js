"use strict";

var _getImports = _interopRequireDefault(require("../getImports"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('find calls to require() in code', () => {
  expect((0, _getImports.default)(`require('foo')`)).toEqual(['foo']);
  expect((0, _getImports.default)(`require('./foo')`)).toEqual(['./foo']);
  expect((0, _getImports.default)(`require('foo');require('bar')`)).toEqual(['foo', 'bar']);
});
test('find import statements in code', () => {
  expect((0, _getImports.default)(`import A from 'pizza';`)).toEqual(['pizza']);
  expect((0, _getImports.default)(`import A from './pizza';`)).toEqual(['./pizza']);
  expect((0, _getImports.default)(`import { A as X, B } from 'lunch';`)).toEqual(['lunch']);
  expect((0, _getImports.default)(`import A, { B as X, C } from 'lunch';`)).toEqual(['lunch']);
  expect((0, _getImports.default)(`import A from 'foo';import B from 'bar';`)).toEqual(['foo', 'bar']);
});
test('work with JSX', () => {
  expect((0, _getImports.default)(`const A = require('pizza');<Button/>`)).toEqual(['pizza']);
  expect((0, _getImports.default)(`import A from 'pizza';<Button>foo</Button>`)).toEqual(['pizza']);
});
test('allow comments', () => {
  expect((0, _getImports.default)(`
/**
 * Some important comment
 */
import A from 'dog'
/* Less important comments */
import B from 'cat'
// Absolutely not important comment
import C from 'capybara'
import D from 'hamster' // One more comment
import E from 'snake'
`)).toEqual(['dog', 'cat', 'capybara', 'hamster', 'snake']);
});
test('ignore dynamic requires', () => {
  expect((0, _getImports.default)(`require('foo' + 'bar')`)).toEqual([]);
});
test('ignore imports in comments', () => {
  expect((0, _getImports.default)(`
import A from 'pizza'
// import one from 'one';
/** import two from 'two' */
/* import three from 'three' */
/*
import four from 'four';
import five from 'five';
*/
`)).toEqual(['pizza']);
});
test('ignore imports in strings', () => {
  expect((0, _getImports.default)(`
import A from 'pizza'
const foo = "import foo from 'foo'"
const bar = 'import bar from "bar"'
const baz = \`import baz from 'baz'\`
`)).toEqual(['pizza']);
});
test('ignore imports in JSX', () => {
  expect((0, _getImports.default)(`
import A from 'pizza';
<p>import foo from 'foo'</p>
`)).toEqual(['pizza']);
});
test('ignore multiple root JSX elements', () => {
  expect((0, _getImports.default)(`<A /><B />`)).toEqual([]);
});
test('ignore syntax errors', () => {
  expect((0, _getImports.default)(`*`)).toEqual([]);
});