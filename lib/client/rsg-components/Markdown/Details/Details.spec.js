import React from 'react';
import { Details, DetailsSummary } from './index';
describe('Markdown Details', function () {
  it('should render a Details', function () {
    var actual = render(React.createElement(Details, null, React.createElement(DetailsSummary, null, "Solution"), "This is a hidden text."));
    expect(actual).toMatchSnapshot();
  });
});