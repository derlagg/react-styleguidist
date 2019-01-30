import React from 'react';
import { MessageRenderer } from './MessageRenderer';
it('renderer should render message', function () {
  var message = 'Hello *world*!';
  var actual = shallow(React.createElement(MessageRenderer, {
    classes: {}
  }, message));
  expect(actual).toMatchSnapshot();
});
it('renderer should render message for array', function () {
  var messages = ['Hello *world*!', 'Foo _bar_'];
  var actual = shallow(React.createElement(MessageRenderer, {
    classes: {}
  }, messages));
  expect(actual).toMatchSnapshot();
});