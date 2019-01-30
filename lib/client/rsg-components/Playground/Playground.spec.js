import "core-js/modules/es6.array.find";
import "core-js/modules/es6.object.assign";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import Playground from './Playground';
import slots, { EXAMPLE_TAB_CODE_EDITOR } from '../slots';
import { PlaygroundRenderer, styles } from './PlaygroundRenderer';

var evalInContext = function evalInContext(a) {
  return new Function('require', 'const React = require("react");' + a).bind(null, require);
}; // eslint-disable-line no-new-func


var code = '<button>OK</button>';
var newCode = '<button>Not OK</button>';
var props = {
  index: 0,
  name: 'name',
  settings: {},
  exampleMode: 'collapse',
  evalInContext: evalInContext,
  code: code
};
var options = {
  context: {
    config: {
      previewDelay: 0
    },
    codeRevision: 0,
    slots: slots({})
  },
  childContextTypes: {
    slots: PropTypes.object.isRequired,
    codeRevision: PropTypes.number.isRequired
  }
};
it('should render component renderer', function () {
  var actual = shallow(React.createElement(Playground, props), options);
  expect(actual).toMatchSnapshot();
});
it('should update code via props', function () {
  var actual = shallow(React.createElement(Playground, props), options);
  expect(actual.state('code')).toEqual(code);
  actual.setProps({
    code: newCode
  });
  expect(actual.state('code')).toEqual(newCode);
});
it('should update code with debounce', function (done) {
  var actual = shallow(React.createElement(Playground, props), {
    context: Object.assign({}, options.context, {
      config: Object.assign({}, options.context.config, {
        previewDelay: 1
      })
    })
  });
  expect(actual.state('code')).toEqual(code);
  actual.instance().handleChange(newCode);
  expect(actual.state('code')).toEqual(code);
  setTimeout(function () {
    expect(actual.state('code')).toEqual(newCode);
    done();
  }, 3);
});
it('should open a code editor', function (done) {
  var actual = mount(React.createElement(Playground, props), options);
  expect(actual.find('textarea')).toHaveLength(0);
  actual.find("button[name=\"" + EXAMPLE_TAB_CODE_EDITOR + "\"]").simulate('click'); // setTimeout(() => {

  actual.update();
  expect(actual.find('textarea')).toHaveLength(1);
  done(); // }, 1);
});
it('should not render a code editor if noeditor option passed in example settings', function () {
  var actual = mount(React.createElement(Playground, _extends({}, props, {
    settings: {
      noeditor: true
    }
  })), options);
  expect(actual.find("button[name=\"" + EXAMPLE_TAB_CODE_EDITOR + "\"]")).toHaveLength(0);
});
it('should open a code editor by default if showcode=true option passed in example settings', function () {
  var actual = mount(React.createElement(Playground, _extends({}, props, {
    settings: {
      showcode: true
    }
  })), options);
  expect(actual.find('textarea')).toHaveLength(1);
});
it('should open a code editor by default if exampleMode="expand" option specified in style guide config', function () {
  var actual = mount(React.createElement(Playground, _extends({}, props, {
    exampleMode: "expand"
  })), {
    context: Object.assign({}, options.context, {
      config: Object.assign({}, options.context.config)
    }),
    childContextTypes: options.childContextTypes
  });
  expect(actual.find('textarea')).toHaveLength(1);
});
it('showcode option in example settings should overwrite style guide config option', function () {
  var actual = mount(React.createElement(Playground, _extends({}, props, {
    exampleMode: "expand",
    settings: {
      showcode: false
    }
  })), {
    context: Object.assign({}, options.context, {
      config: Object.assign({}, options.context.config)
    }),
    childContextTypes: options.childContextTypes
  });
  expect(actual.find('textarea')).toHaveLength(0);
});
it('renderer should render preview', function () {
  var actual = shallow(React.createElement(PlaygroundRenderer, {
    classes: classes(styles),
    name: "name",
    preview: React.createElement("div", null, "preview"),
    previewProps: {
      className: 'pizza',
      title: 'salami'
    },
    tabButtons: React.createElement("div", null, "tab buttons"),
    tabBody: React.createElement("div", null, "tab body"),
    toolbar: React.createElement("div", null, "toolbar")
  }));
  expect(actual).toMatchSnapshot();
});