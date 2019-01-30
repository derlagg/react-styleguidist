"use strict";

var _removeDoclets = _interopRequireDefault(require("../removeDoclets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable quotes */
it('should find calls to require in code', () => {
  const text = `
Component is described here.

@example ./extra.examples.md
@foo bar
`;
  const expected = `
Component is described here.


`;
  const actual = (0, _removeDoclets.default)(text);
  expect(actual).toBe(expected);
});