import React from 'react';
import JsDoc, { getMarkdown } from './JsDoc';
var tags = {
  deprecated: [{
    title: 'description',
    description: 'Use *another* method'
  }],
  version: [{
    title: 'version',
    description: '2.0.0'
  }],
  since: [{
    title: 'since',
    description: '1.0.0'
  }],
  author: [{
    title: 'author',
    description: '[Author 1](#TestLink)'
  }, {
    title: 'author',
    description: '[Author 2](#TestLink2)'
  }],
  see: [{
    title: 'see',
    description: '[See 1](#TestLink)'
  }, {
    title: 'see',
    description: '[See 2](#TestLink2)'
  }],
  link: [{
    title: 'link',
    description: '[Link 1](#TestLink)'
  }]
};
describe('getMarkdown', function () {
  it('should return Markdown for all tags', function () {
    var result = getMarkdown(tags);
    expect(result).toMatchSnapshot();
  });
  it('should return Markdown for one author', function () {
    var result = getMarkdown({
      author: [tags.author[0]]
    });
    expect(result).toMatchSnapshot();
  });
  it('should return Markdown for multiple authors', function () {
    var result = getMarkdown({
      author: tags.author
    });
    expect(result).toMatchSnapshot();
  });
});
describe('JsDoc', function () {
  it('should render Markdown', function () {
    var actual = shallow(React.createElement(JsDoc, tags));
    expect(actual).toMatchSnapshot();
  });
  it('should render null for empty tags', function () {
    var actual = shallow(React.createElement(JsDoc, null));
    expect(actual.getElement()).toBe(null);
  });
});