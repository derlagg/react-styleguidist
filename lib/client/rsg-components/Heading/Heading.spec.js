import "core-js/modules/es6.function.name";
import React from 'react';
import { html } from 'cheerio';
import Heading from './index';
describe('Heading', function () {
  it('should render a heading according to the level', function () {
    var actual = shallow(React.createElement(Heading, {
      level: 3
    }, "The heading"));
    expect(actual.dive().name()).toBe('h3');
    actual = shallow(React.createElement(Heading, {
      level: 5
    }, "The heading"));
    expect(actual.dive().name()).toBe('h5');
  });
  it('should render a heading', function () {
    var actual = render(React.createElement(Heading, {
      level: 2
    }, "The heading"));
    expect(html(actual)).toMatchSnapshot();
  });
});