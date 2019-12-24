import "core-js/modules/es6.function.name";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { polyfill } from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Preview from 'rsg-components/Preview';
import Para from 'rsg-components/Para';
import Slot from 'rsg-components/Slot';
import PlaygroundRenderer from 'rsg-components/Playground/PlaygroundRenderer';
import { EXAMPLE_TAB_CODE_EDITOR } from '../slots';
import { DisplayModes, ExampleModes } from '../../consts';

var Playground =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Playground, _Component);

  function Playground(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;
    var code = props.code,
        settings = props.settings,
        exampleMode = props.exampleMode;
    var config = context.config;
    var expandCode = exampleMode === ExampleModes.expand;
    var activeTab = settings.showcode !== undefined ? settings.showcode : expandCode;
    _this.state = {
      code: code,
      prevCode: code,
      activeTab: activeTab ? EXAMPLE_TAB_CODE_EDITOR : undefined
    };
    _this.handleTabChange = _this.handleTabChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleChange = debounce(_this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this))), config.previewDelay);
    return _this;
  }

  Playground.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var code = nextProps.code;

    if (prevState.prevCode !== code) {
      return {
        prevCode: code,
        code: code
      };
    }

    return null;
  };

  var _proto = Playground.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    // Clear pending changes
    this.handleChange.cancel();
  };

  _proto.handleChange = function handleChange(code) {
    this.setState({
      code: code
    });
  };

  _proto.handleTabChange = function handleTabChange(name) {
    this.setState(function (state) {
      return {
        activeTab: state.activeTab !== name ? name : undefined
      };
    });
  };

  _proto.render = function render() {
    var _this$state = this.state,
        code = _this$state.code,
        activeTab = _this$state.activeTab;
    var _this$props = this.props,
        evalInContext = _this$props.evalInContext,
        index = _this$props.index,
        name = _this$props.name,
        settings = _this$props.settings,
        exampleMode = _this$props.exampleMode;
    var displayMode = this.context.displayMode;
    var isExampleHidden = exampleMode === ExampleModes.hide;
    var isEditorHidden = settings.noeditor || isExampleHidden;
    var preview = React.createElement(Preview, {
      code: code,
      evalInContext: evalInContext
    });
    return isEditorHidden ? React.createElement(Para, null, preview) : React.createElement(PlaygroundRenderer, {
      name: name,
      preview: preview,
      previewProps: settings.props || {},
      tabButtons: React.createElement(Slot, {
        name: "exampleTabButtons",
        active: activeTab,
        props: {
          onClick: this.handleTabChange
        }
      }),
      tabBody: React.createElement(Slot, {
        name: "exampleTabs",
        active: activeTab,
        onlyActive: true // evalInContext passed through to support custom slots that eval code
        ,
        props: {
          code: code,
          onChange: this.handleChange,
          evalInContext: evalInContext
        }
      }),
      toolbar: React.createElement(Slot, {
        name: "exampleToolbar",
        props: {
          name: name,
          isolated: displayMode === DisplayModes.example,
          example: index
        }
      })
    });
  };

  return Playground;
}(Component);

_defineProperty(Playground, "propTypes", {
  code: PropTypes.string.isRequired,
  evalInContext: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  exampleMode: PropTypes.string.isRequired,
  settings: PropTypes.object
});

_defineProperty(Playground, "contextTypes", {
  config: PropTypes.object.isRequired,
  displayMode: PropTypes.string
});

export default polyfill(Playground);