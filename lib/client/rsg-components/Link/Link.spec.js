import "core-js/modules/es6.array.find";
import React from 'react';
import { LinkRenderer } from './LinkRenderer';
var href = '/foo';
var children = 'Foo';
it('renderer should render link', function () {
  var actual = shallow(React.createElement(LinkRenderer, {
    href: href,
    classes: {}
  }, children));
  expect(actual).toMatchSnapshot();
});
it('should compose passed class names', function () {
  var actual = shallow(React.createElement(LinkRenderer, {
    classes: {
      link: 'baseLinkClass'
    },
    href: href,
    className: "customClass"
  }, children));
  expect(actual.find('a').prop('className')).toBe('baseLinkClass customClass');
});
it('should properly pass the target attribute', function () {
  var actual = shallow(React.createElement(LinkRenderer, {
    href: href,
    target: "_blank",
    classes: {}
  }, children));
  expect(actual.find('a').prop('target')).toBe('_blank');
});