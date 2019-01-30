import "core-js/modules/es6.array.find";
import React from 'react';
import { html } from 'cheerio';
import Markdown from './Markdown';
describe('Markdown', function () {
  var expectSnapshotToMatch = function expectSnapshotToMatch(markdown) {
    var actual = render(React.createElement(Markdown, {
      text: markdown
    }));
    expect(html(actual)).toMatchSnapshot();
  };

  it('should forward DOM attributes onto resulting HTML', function () {
    var markdown = '<a href="test.com" id="preserve-my-id" class="preserve-my-class">Something</a>';
    var actual = mount(React.createElement(Markdown, {
      text: markdown
    }));
    expect(actual.find('a').props().id).toEqual('preserve-my-id');
    expect(actual.find('a').props().className).toContain('preserve-my-class');
  });
  it('should render links', function () {
    expectSnapshotToMatch('a [link](http://test.com)');
  });
  it('should render headings with generated ids', function () {
    expectSnapshotToMatch("\n# one\n## two\n### three\n#### four\n##### five\n###### six\n");
  });
  it('should render paragraphs', function () {
    expectSnapshotToMatch("\na paragraph\n\nanother paragraph\n\t\t");
  });
  it('should render emphasis and strong text', function () {
    expectSnapshotToMatch("\nthis text is **strong**\n\nand this is _emphasized_\n\t\t");
  });
  it('should render unordered lists', function () {
    expectSnapshotToMatch("\n* list\n* item\n* three\n");
  });
  it('should render ordered lists', function () {
    expectSnapshotToMatch("\n1. list\n1. item\n1. three\n");
  });
  it('should render mixed nested lists', function () {
    expectSnapshotToMatch("\n* list 1\n* list 2\n  1. Sub-list\n  1. Sub-list\n  1. Sub-list\n* list 3\n");
  });
  it('should render check-lists', function () {
    expectSnapshotToMatch("\n* [ ] to do 1\n* [ ] to do 2\n* [x] to do 3\n");
  });
  it('should render a blockquote', function () {
    expectSnapshotToMatch("\n> This is a blockquote.\n> And this is a second line.\n");
  });
  it('should render pre-formatted text', function () {
    expectSnapshotToMatch("\n    this is preformatted\n    so is this\n");
  });
  it('should render code blocks without escaping', function () {
    expectSnapshotToMatch("\n```html\n<foo></foo>\n```\n");
  });
  it('should render inline code with escaping', function () {
    expectSnapshotToMatch('Foo `<bar>` baz');
  });
  it('should render a horizontal rule', function () {
    expectSnapshotToMatch("---");
  });
  it('should render a table', function () {
    expectSnapshotToMatch("\n| heading 1 | heading 2 |\n| --------- | --------- |\n| foo\t\t| bar\t\t|\n| more foo\t| more bar\t|\n");
  });
});
describe('Markdown inline', function () {
  var expectSnapshotToMatch = function expectSnapshotToMatch(markdown) {
    var actual = render(React.createElement(Markdown, {
      text: markdown,
      inline: true
    }));
    expect(html(actual)).toMatchSnapshot();
  };

  it('should render text in a span', function () {
    expectSnapshotToMatch('Hello world!');
  });
});