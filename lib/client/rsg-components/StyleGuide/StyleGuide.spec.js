import "core-js/modules/es6.object.assign";
import React from 'react';
import TableOfContents from '../TableOfContents';
import StyleGuide from './StyleGuide';
import { StyleGuideRenderer } from './StyleGuideRenderer';
import { DisplayModes } from '../../consts';
var sections = [{
  components: [{
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
  }]
}];
var config = {
  title: 'Hello',
  version: '1.0.0',
  showSidebar: true
};
it('should render components list', function () {
  var actual = shallow(React.createElement(StyleGuide, {
    codeRevision: 1,
    config: config,
    pagePerSection: false,
    sections: sections,
    allSections: sections,
    slots: {}
  }));
  expect(actual).toMatchSnapshot();
});
it('should render welcome screen', function () {
  var actual = shallow(React.createElement(StyleGuide, {
    codeRevision: 1,
    config: config,
    sections: [],
    allSections: [],
    slots: {},
    welcomeScreen: true
  }));
  expect(actual).toMatchSnapshot();
});
it('should render an error when componentDidCatch() is triggered', function () {
  var wrapper = shallow(React.createElement(StyleGuide, {
    codeRevision: 1,
    config: config,
    sections: [],
    allSections: [],
    slots: {}
  }));
  wrapper.instance().componentDidCatch({
    toString: function toString() {
      return 'error';
    }
  }, {
    componentStack: {
      toString: function toString() {
        return 'info';
      }
    }
  });
  wrapper.update();
  expect(wrapper).toMatchSnapshot();
});
describe('sidebar rendering', function () {
  it('renderer should have sidebar if showSidebar is not set', function () {
    var wrapper = shallow(React.createElement(StyleGuide, {
      codeRevision: 1,
      config: config,
      sections: sections,
      allSections: sections,
      slots: {}
    }));
    expect(wrapper.prop('hasSidebar')).toEqual(true);
  });
  it('renderer should not have sidebar if showSidebar is false', function () {
    var wrapper = shallow(React.createElement(StyleGuide, {
      codeRevision: 1,
      config: Object.assign({}, config, {
        showSidebar: false
      }),
      sections: sections,
      allSections: sections,
      slots: {}
    }));
    expect(wrapper.prop('hasSidebar')).toEqual(false);
  });
  it('renderer should not have sidebar in isolation mode', function () {
    var wrapper = shallow(React.createElement(StyleGuide, {
      codeRevision: 1,
      config: config,
      sections: sections,
      allSections: sections,
      slots: {},
      displayMode: DisplayModes.component
    }));
    expect(wrapper.prop('hasSidebar')).toEqual(false);
  });
  it('renderer should have sidebar if pagePerSection is true', function () {
    var wrapper = shallow(React.createElement(StyleGuide, {
      codeRevision: 1,
      config: config,
      sections: sections,
      allSections: sections,
      slots: {},
      displayMode: DisplayModes.all,
      pagePerSection: true
    }));
    expect(wrapper.prop('hasSidebar')).toEqual(true);
  });
});
it('renderer should render logo, version, table of contents, ribbon and passed children', function () {
  var actual = shallow(React.createElement(StyleGuideRenderer, {
    classes: {},
    title: config.title,
    version: config.version,
    toc: React.createElement(TableOfContents, {
      sections: sections
    }),
    homepageUrl: "http://react-styleguidist.js.org/",
    hasSidebar: true
  }, React.createElement("h1", null, "Content")));
  expect(actual).toMatchSnapshot();
});