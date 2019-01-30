"use strict";

var _remark = _interopRequireDefault(require("remark"));

var _noAutoLinkRemarkPlugin = _interopRequireDefault(require("../noAutoLinkRemarkPlugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transform = markdown => (0, _remark.default)().use(_noAutoLinkRemarkPlugin.default).processSync(markdown).toString();

it('should not convert URLs to auto links', () => {
  const markdown = 'http://example.com';
  const result = transform(markdown);
  expect(result.trim()).toBe('[http://example.com](http://example.com "http&#x3A;//example.com")');
});
it('should keep full inks as is', () => {
  const markdown = '[Pizza](http://example.com)';
  const result = transform(markdown);
  expect(result.trim()).toBe(markdown);
});