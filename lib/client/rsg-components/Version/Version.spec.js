import React from 'react';
import VersionRenderer from './VersionRenderer';
it('renderer should render version', function () {
  var actual = render(React.createElement(VersionRenderer, null, "1.2.3-a"));
  expect(actual).toMatchSnapshot();
});