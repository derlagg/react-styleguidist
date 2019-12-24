function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableOfContents from 'rsg-components/TableOfContents';
import StyleGuideRenderer from 'rsg-components/StyleGuide/StyleGuideRenderer';
import Sections from 'rsg-components/Sections';
import Welcome from 'rsg-components/Welcome';
import Error from 'rsg-components/Error';
import NotFound from 'rsg-components/NotFound';
import { HOMEPAGE } from '../../../scripts/consts';
import { DisplayModes } from '../../consts';
/**
 * This function will return true, if the sidebar should be visible and false otherwise.
 *
 * These sorted conditions (highest precedence first) define the visibility
 * state of the sidebar.
 *
 * - Sidebar is hidden for isolated example views
 * - Sidebar is always visible when pagePerSection
 * - Sidebar is hidden when showSidebar is set to false
 * - Sidebar is visible when showSidebar is set to true for non-isolated views
 *
 * @param {boolean} displayMode
 * @param {boolean} showSidebar
 * @param {boolean} pagePerSection
 * @returns {boolean}
 */

function hasSidebar(displayMode, showSidebar) {
  return displayMode === DisplayModes.notFound || showSidebar && displayMode === DisplayModes.all;
}

var StyleGuide =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(StyleGuide, _Component);

  function StyleGuide() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      error: false,
      info: null
    });

    return _this;
  }

  var _proto = StyleGuide.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      codeRevision: this.props.codeRevision,
      config: this.props.config,
      slots: this.props.slots,
      displayMode: this.props.displayMode
    };
  };

  _proto.componentDidCatch = function componentDidCatch(error, info) {
    this.setState({
      error: error,
      info: info
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        config = _this$props.config,
        sections = _this$props.sections,
        welcomeScreen = _this$props.welcomeScreen,
        patterns = _this$props.patterns,
        displayMode = _this$props.displayMode,
        allSections = _this$props.allSections,
        pagePerSection = _this$props.pagePerSection;

    if (this.state.error) {
      return React.createElement(Error, {
        error: this.state.error,
        info: this.state.info
      });
    }

    if (welcomeScreen) {
      return React.createElement(Welcome, {
        patterns: patterns
      });
    }

    return React.createElement(StyleGuideRenderer, {
      title: config.title,
      version: config.version,
      homepageUrl: HOMEPAGE,
      toc: React.createElement(TableOfContents, {
        sections: allSections,
        useRouterLinks: pagePerSection
      }),
      hasSidebar: hasSidebar(displayMode, config.showSidebar)
    }, sections.length ? React.createElement(Sections, {
      sections: sections,
      depth: 1
    }) : React.createElement(NotFound, null));
  };

  return StyleGuide;
}(Component);

_defineProperty(StyleGuide, "propTypes", {
  codeRevision: PropTypes.number.isRequired,
  config: PropTypes.object.isRequired,
  slots: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired,
  welcomeScreen: PropTypes.bool,
  patterns: PropTypes.array,
  displayMode: PropTypes.string,
  allSections: PropTypes.array.isRequired,
  pagePerSection: PropTypes.bool
});

_defineProperty(StyleGuide, "childContextTypes", {
  codeRevision: PropTypes.number.isRequired,
  config: PropTypes.object.isRequired,
  slots: PropTypes.object.isRequired,
  displayMode: PropTypes.string
});

_defineProperty(StyleGuide, "defaultProps", {
  displayMode: DisplayModes.all
});

export { StyleGuide as default };