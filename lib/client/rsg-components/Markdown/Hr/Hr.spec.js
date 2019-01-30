import React from 'react';
import Hr from './index';
describe('Markdown Hr', function () {
  it('should render a horizontal rule', function () {
    var actual = render(React.createElement(Hr, null));
    expect(actual).toMatchSnapshot();
  });
});