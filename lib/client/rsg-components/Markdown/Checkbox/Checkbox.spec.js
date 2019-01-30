import React from 'react';
import Checkbox from './index';
describe('Markdown Checkbox', function () {
  it('should render a checkbox input', function () {
    var actual = render(React.createElement(Checkbox, null));
    expect(actual).toMatchSnapshot();
  });
});