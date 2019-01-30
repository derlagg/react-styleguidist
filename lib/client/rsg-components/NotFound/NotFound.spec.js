import React from 'react';
import { NotFoundRenderer } from './NotFoundRenderer';
it('renderer should render not found message', function () {
  var actual = shallow(React.createElement(NotFoundRenderer, {
    classes: {}
  }));
  expect(actual).toMatchSnapshot();
});