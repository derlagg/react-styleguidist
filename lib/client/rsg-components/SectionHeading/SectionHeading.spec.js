import "core-js/modules/es6.array.find";
import React from 'react';
import SectionHeading from './index';
import SectionHeadingRenderer from './SectionHeadingRenderer';
describe('SectionHeading', function () {
  var FakeToolbar = function FakeToolbar() {
    return React.createElement("div", null, "Fake toolbar");
  };

  test('should forward slot properties to the toolbar', function () {
    var actual = shallow(React.createElement(SectionHeading, {
      id: "section",
      slotName: "slot",
      slotProps: {
        foo: 1,
        bar: 'baz'
      },
      depth: 2
    }, "A Section"));
    expect(actual).toMatchSnapshot();
  });
  test('render a section heading', function () {
    var actual = mount(React.createElement(SectionHeadingRenderer, {
      id: "section",
      href: "/section",
      depth: 2,
      toolbar: React.createElement(FakeToolbar, null)
    }, "A Section"));
    expect(actual.find('h2')).toMatchSnapshot();
  });
  test('render a deprecated section heading', function () {
    var actual = mount(React.createElement(SectionHeadingRenderer, {
      id: "section",
      href: "/section",
      depth: 2,
      toolbar: React.createElement(FakeToolbar, null),
      deprecated: true
    }, "A Section"));
    expect(actual.find('h2')).toMatchSnapshot();
  });
  test('prevent the heading level from exceeding the maximum allowed by the Heading component', function () {
    var actual = mount(React.createElement(SectionHeadingRenderer, {
      id: "section",
      href: "/section",
      depth: 7,
      toolbar: React.createElement(FakeToolbar, null)
    }, "A Section"));
    expect(actual.find('h6')).toHaveLength(1);
  });
  test('the href have id=section query parameter ', function () {
    var actual = shallow(React.createElement(SectionHeading, {
      id: "section",
      pagePerSection: true,
      slotName: "slot",
      slotProps: {
        foo: 1,
        bar: 'baz'
      },
      depth: 2
    }, "A Section"));
    expect(actual.prop('href')).toEqual('/?id=section');
  });
});