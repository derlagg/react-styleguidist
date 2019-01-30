"use strict";

var _highlightCodeInMarkdown = _interopRequireDefault(require("../highlightCodeInMarkdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('should highlight code with specified language', () => {
  const text = `
The only true button.

\`\`\`html
<p>Hello React</p>
\`\`\`
`;
  const actual = (0, _highlightCodeInMarkdown.default)(text);
  expect(actual).toMatchSnapshot();
});
it('should not highlight code without language', () => {
  const text = `
The only \`true\` button.

\`\`\`
<p>Hello React</p>
\`\`\`
`;
  const actual = (0, _highlightCodeInMarkdown.default)(text);
  expect(actual).toMatchSnapshot();
});