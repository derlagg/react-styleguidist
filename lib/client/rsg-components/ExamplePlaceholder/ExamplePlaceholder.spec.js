import "core-js/modules/es6.array.find";
import React from 'react';
import { ExamplePlaceholderRenderer } from './ExamplePlaceholderRenderer';
it('should render a link', function () {
  var actual = shallow(React.createElement(ExamplePlaceholderRenderer, {
    classes: {},
    name: "Pizza"
  }));
  expect(actual).toMatchSnapshot();
});
it('should render an example placeholder after click', function () {
  var actual = shallow(React.createElement(ExamplePlaceholderRenderer, {
    classes: {},
    name: "Pizza"
  }));
  actual.find('button').simulate('click');
  expect(actual).toMatchSnapshot();
});