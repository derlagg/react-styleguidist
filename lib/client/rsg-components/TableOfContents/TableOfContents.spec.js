import "core-js/modules/es6.array.find";
import React from 'react';
import noop from 'lodash/noop';
import TableOfContents from './TableOfContents';
import { TableOfContentsRenderer } from './TableOfContentsRenderer';
var components = [{
  name: 'Button',
  slug: 'button'
}, {
  name: 'Input',
  slug: 'input'
}, {
  name: 'Textarea',
  slug: 'textarea'
}];
var sections = [{
  name: 'Introduction',
  slug: 'introduction',
  content: 'intro.md'
}, {
  name: 'Buttons',
  slug: 'buttons',
  components: [{
    name: 'Button',
    slug: 'button'
  }]
}, {
  name: 'Forms',
  slug: 'forms',
  components: [{
    name: 'Input',
    slug: 'input'
  }, {
    name: 'Textarea',
    slug: 'textarea'
  }]
}];
it('should render a renderer', function () {
  var actual = shallow(React.createElement(TableOfContents, {
    sections: [{
      components: components
    }]
  }));
  expect(actual).toMatchSnapshot();
});
it('should render renderer with sections with nested components', function () {
  var actual = shallow(React.createElement(TableOfContents, {
    sections: sections
  }));
  expect(actual).toMatchSnapshot();
});
it('should filter list when search field contains a query', function () {
  var searchTerm = 'but';
  var actual = shallow(React.createElement(TableOfContents, {
    sections: [{
      components: components
    }]
  }));
  expect(actual).toMatchSnapshot();
  actual.setState({
    searchTerm: searchTerm
  });
  expect(actual).toMatchSnapshot();
});
it('should filter section names', function () {
  var searchTerm = 'frm';
  var actual = shallow(React.createElement(TableOfContents, {
    sections: sections
  }));
  expect(actual).toMatchSnapshot();
  actual.setState({
    searchTerm: searchTerm
  });
  expect(actual).toMatchSnapshot();
});
it('renderer should render table of contents', function () {
  var searchTerm = 'foo';
  var actual = shallow(React.createElement(TableOfContentsRenderer, {
    classes: {},
    items: React.createElement("div", null, "foo"),
    searchTerm: searchTerm,
    onSearchTermChange: noop
  }));
  expect(actual).toMatchSnapshot();
});
it('should call a callback when input value changed', function () {
  var onSearchTermChange = jest.fn();
  var searchTerm = 'foo';
  var newSearchTerm = 'bar';
  var actual = shallow(React.createElement(TableOfContentsRenderer, {
    classes: {},
    items: React.createElement("div", null, "foo"),
    searchTerm: searchTerm,
    onSearchTermChange: onSearchTermChange
  }));
  actual.find('input').simulate('change', {
    target: {
      value: newSearchTerm
    }
  });
  expect(onSearchTermChange).toBeCalledWith(newSearchTerm);
});