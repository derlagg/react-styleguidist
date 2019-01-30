import React from 'react';
import { html } from 'cheerio';
import MarkdownHeading from './index';
describe('Markdown Heading', function () {
  it('should render a heading with a wrapper that provides margin and an id', function () {
    var actual = render(React.createElement(MarkdownHeading, {
      id: "the-markdown-heading",
      level: 2
    }, "The markdown heading"));
    expect(html(actual)).toMatchSnapshot();
  });
});