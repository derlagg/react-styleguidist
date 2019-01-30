import React from 'react';
import noop from 'lodash/noop';
import Section from '../Section';
import Sections from './Sections';
import StyledSectionsRenderer, { SectionsRenderer } from './SectionsRenderer';
var sections = [{
  name: 'Foo',
  content: [{
    type: 'code',
    content: '<button>OK</button>',
    evalInContext: noop
  }],
  components: []
}, {
  name: 'Bar',
  content: [{
    type: 'markdown',
    content: 'Hello *world*!'
  }],
  components: []
}, {
  sections: [{
    name: 'One',
    content: []
  }, {
    name: 'Two',
    content: []
  }]
}];
it('should render component renderer', function () {
  var actual = shallow(React.createElement(Sections, {
    sections: sections,
    depth: 3
  }));
  expect(actual).toMatchSnapshot();
});
it('render should render styled component', function () {
  var actual = shallow(React.createElement(StyledSectionsRenderer, {
    classes: {}
  }, React.createElement(Section, {
    key: 0,
    section: sections[0],
    depth: 3
  }), React.createElement(Section, {
    key: 1,
    section: sections[1],
    depth: 3
  }), React.createElement(Section, {
    key: 2,
    section: sections[2],
    depth: 3
  })));
  expect(actual).toMatchSnapshot();
});
it('render should render component', function () {
  var actual = shallow(React.createElement(SectionsRenderer, {
    classes: {}
  }, React.createElement(Section, {
    key: 0,
    section: sections[0],
    depth: 3
  }), React.createElement(Section, {
    key: 1,
    section: sections[1],
    depth: 3
  }), React.createElement(Section, {
    key: 2,
    section: sections[2],
    depth: 3
  })));
  expect(actual).toMatchSnapshot();
});