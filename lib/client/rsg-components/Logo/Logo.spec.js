import React from 'react';
import LogoRenderer from './LogoRenderer';
it('renderer should render header', function () {
  var actual = render(React.createElement(LogoRenderer, null, "React Styleguidist"));
  expect(actual).toMatchSnapshot();
});