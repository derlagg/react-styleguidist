import React from 'react';
import List from './index';
describe('Markdown List', function () {
  it('should render an unordered list', function () {
    var actual = render(React.createElement(List, null, React.createElement("li", null, "First"), React.createElement("li", null, "Second")));
    expect(actual).toMatchSnapshot();
  });
  it('should render an ordered list', function () {
    var actual = render(React.createElement(List, {
      ordered: true
    }, React.createElement("li", null, "First"), React.createElement("li", null, "Second")));
    expect(actual).toMatchSnapshot();
  });
});