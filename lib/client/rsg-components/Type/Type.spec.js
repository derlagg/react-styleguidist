import React from 'react';
import { TypeRenderer, styles } from './TypeRenderer';
var props = {
  classes: classes(styles)
};
it('renderer should render type', function () {
  var actual = shallow(React.createElement(TypeRenderer, props, "Array"));
  expect(actual).toMatchSnapshot();
});