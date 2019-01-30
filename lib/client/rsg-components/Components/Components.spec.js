import React from 'react';
import ReactComponent from '../ReactComponent';
import Components from './Components';
import ComponentsRenderer from './ComponentsRenderer';
import { ExampleModes, UsageModes } from '../../consts';
var exampleMode = ExampleModes.collapse;
var usageMode = UsageModes.collapse;
var components = [{
  name: 'Foo',
  pathLine: 'components/foo.js',
  filepath: 'components/foo.js',
  props: {
    description: 'Foo foo'
  }
}, {
  name: 'Bar',
  pathLine: 'components/bar.js',
  filepath: 'components/bar.js',
  props: {
    description: 'Bar bar'
  }
}];
it('should render components list', function () {
  var actual = shallow(React.createElement(Components, {
    components: components,
    exampleMode: exampleMode,
    usageMode: usageMode,
    depth: 3
  }));
  expect(actual).toMatchSnapshot();
});
it('renderer should render components list layout', function () {
  var actual = shallow(React.createElement(ComponentsRenderer, null, React.createElement(ReactComponent, {
    key: 0,
    component: components[0],
    exampleMode: exampleMode,
    usageMode: usageMode,
    depth: 3
  }), React.createElement(ReactComponent, {
    key: 1,
    component: components[1],
    exampleMode: exampleMode,
    usageMode: usageMode,
    depth: 3
  })));
  expect(actual).toMatchSnapshot();
});