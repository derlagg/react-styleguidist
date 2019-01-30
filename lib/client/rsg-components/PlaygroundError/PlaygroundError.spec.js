import React from 'react';
import { PlaygroundErrorRenderer } from './PlaygroundErrorRenderer';
it('renderer should render message', function () {
  var message = 'Hello *world*!';
  var actual = shallow(React.createElement(PlaygroundErrorRenderer, {
    classes: {},
    message: message
  }));
  expect(actual).toMatchSnapshot();
});