import "core-js/modules/es6.function.name";
import "core-js/modules/es6.object.assign";
import React from 'react';
import noop from 'lodash/noop';
import Examples from '../Examples';
import Components from '../Components';
import Sections from '../Sections';
import Section from './Section';
import { SectionRenderer } from './SectionRenderer';
import { DisplayModes } from '../../consts';
var options = {
  context: {
    displayMode: DisplayModes.all,
    config: {
      pagePerSection: false
    }
  }
};
var section = {
  name: 'Foo',
  slug: 'foo',
  exampleMode: 'collapse',
  usageMode: 'collapse',
  description: 'This is a description',
  content: [{
    type: 'code',
    content: '<button>OK</button>',
    evalInContext: noop
  }, {
    type: 'markdown',
    content: 'Hello *world*!'
  }],
  components: [],
  sections: []
};
it('should render section renderer', function () {
  var actual = shallow(React.createElement(Section, {
    section: section,
    depth: 3
  }), options);
  expect(actual).toMatchSnapshot();
});
it('should render components list', function () {
  var actual = shallow(React.createElement(Section, {
    section: {
      name: 'Components',
      slug: 'components',
      usageMode: 'collapse',
      exampleMode: 'collapse',
      components: []
    },
    depth: 3
  }), options);
  expect(actual).toMatchSnapshot();
});
it('should not render components list if not defined', function () {
  var actual = shallow(React.createElement(Section, {
    section: {
      name: 'No components',
      slug: 'no-components',
      usageMode: 'collapse',
      exampleMode: 'collapse'
    },
    depth: 3
  }), options);
  expect(actual).toMatchSnapshot();
});
it('should render sections if defined', function () {
  var actual = shallow(React.createElement(Section, {
    section: {
      name: 'Nested sections',
      slug: 'nested-sections',
      usageMode: 'collapse',
      exampleMode: 'collapse',
      sections: []
    },
    depth: 3
  }), options);
  expect(actual).toMatchSnapshot();
});
it('should not render sections if not defined', function () {
  var actual = shallow(React.createElement(Section, {
    section: {
      name: 'No sections',
      slug: 'no-sections',
      usageMode: 'collapse',
      exampleMode: 'collapse'
    },
    depth: 3
  }), options);
  expect(actual).toMatchSnapshot();
});
test('should not render section in isolation mode by default', function () {
  var actual = shallow(React.createElement(Section, {
    section: {
      name: 'A',
      slug: 'a',
      usageMode: 'collapse',
      exampleMode: 'collapse'
    },
    depth: 3
  }), options);
  expect(actual.prop('isolated')).toBeFalsy();
});
test('should render section in isolation mode', function () {
  var actual = shallow(React.createElement(Section, {
    section: {
      name: 'A',
      slug: 'a',
      usageMode: 'collapse',
      exampleMode: 'collapse'
    },
    depth: 3
  }), {
    context: Object.assign({}, options.context, {
      displayMode: DisplayModes.section
    })
  });
  expect(actual.prop('isolated')).toBeTruthy();
});
it('render should render section', function () {
  var actual = shallow(React.createElement(SectionRenderer, {
    classes: {},
    name: section.name,
    slug: section.slug,
    content: React.createElement(Examples, {
      name: section.name,
      examples: section.content,
      exampleMode: section.exampleMode
    }),
    components: React.createElement(Components, {
      components: [],
      depth: 3,
      usageMode: section.usageMode,
      exampleMode: section.exampleMode
    }),
    sections: React.createElement(Sections, {
      sections: [],
      depth: 3
    }),
    depth: 3
  }), options);
  expect(actual).toMatchSnapshot();
});
it('render should not render title if name is not set', function () {
  var actual = shallow(React.createElement(SectionRenderer, {
    classes: {},
    depth: 3
  }), options);
  expect(actual).toMatchSnapshot();
});
it('render should render title if name is set', function () {
  var actual = shallow(React.createElement(SectionRenderer, {
    classes: {},
    name: "test",
    slug: "test",
    depth: 3
  }), options);
  expect(actual).toMatchSnapshot();
});