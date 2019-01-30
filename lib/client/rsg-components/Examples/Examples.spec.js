import "core-js/modules/es7.array.includes";
import "core-js/modules/es6.string.includes";
import "core-js/modules/es6.array.find";
import React from 'react';
import noop from 'lodash/noop';
import Examples from '../Examples';
import { DisplayModes } from '../../consts';
var examples = [{
  type: 'code',
  content: '<button>OK</button>',
  evalInContext: noop
}, {
  type: 'markdown',
  content: 'Hello *world*!'
}];
it('should render examples', function () {
  var actual = shallow(React.createElement(Examples, {
    examples: examples,
    name: "button",
    exampleMode: "collapse"
  }), {
    context: {
      codeRevision: 1,
      displayMode: DisplayModes.example
    }
  });
  expect(actual).toMatchSnapshot();
});
it('should not render a example with unknown type', function () {
  var faultyExample = [{
    type: 'unknown',
    content: 'FooBar'
  }];
  var actual = mount(React.createElement(Examples, {
    examples: faultyExample,
    name: "button",
    exampleMode: "collapse"
  }), {
    context: {
      codeRevision: 1
    }
  });
  var article = actual.find('article');
  expect(article.length).toEqual(1);
  expect(article.text().includes('FooBar')).toEqual(false);
});