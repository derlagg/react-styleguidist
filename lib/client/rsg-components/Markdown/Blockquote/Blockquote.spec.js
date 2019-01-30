import React from 'react';
import Blockquote from './index';
describe('Markdown Blockquote', function () {
  it('should render a blockquote', function () {
    var actual = render(React.createElement(Blockquote, null, "To be, or not to be: that is the question"));
    expect(actual).toMatchSnapshot();
  });
  it('should preserve custom css class', function () {
    var actual = render(React.createElement(Blockquote, {
      className: "test-class"
    }, "To be, or not to be: that is the question"));
    expect(actual).toMatchSnapshot();
  });
});