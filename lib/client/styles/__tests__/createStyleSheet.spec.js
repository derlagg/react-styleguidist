var _testComponentName, _styles;

import * as theme from '../theme';
import createStyleSheet from '../createStyleSheet';
var customThemeColor = '#123456';
var customThemeBorderColor = '#654321';
var customThemeMaxWidth = 9999;
var customStyleBorderColor = '#ABCDEF';
var testComponentName = 'TestComponentName';
var testRuleName = 'testRule';

var styles = function styles(theme) {
  var _ref;

  return _ref = {}, _ref[testRuleName] = {
    color: theme.color.base,
    backgroundColor: theme.color.baseBackground,
    borderColor: theme.color.border,
    borderRadius: theme.borderRadius,
    maxWidth: theme.maxWidth
  }, _ref;
};

var config = {
  theme: {
    color: {
      base: customThemeColor,
      border: customThemeBorderColor
    },
    maxWidth: customThemeMaxWidth
  },
  styles: (_styles = {}, _styles[testComponentName] = (_testComponentName = {}, _testComponentName[testRuleName] = {
    borderColor: customStyleBorderColor
  }, _testComponentName), _styles)
};
describe('createStyleSheet', function () {
  it('should use theme variables', function () {
    var styleSheet = createStyleSheet(styles, config, testComponentName);
    var style = styleSheet.getRule(testRuleName).style;
    expect(style['background-color']).toBe(theme.color.baseBackground);
    expect(style['border-radius']).toBe(theme.borderRadius + "px");
  });
  it('should override theme variables with config theme', function () {
    var styleSheet = createStyleSheet(styles, config, testComponentName);
    var style = styleSheet.getRule(testRuleName).style;
    expect(style.color).toBe(customThemeColor);
    expect(style['max-width']).toBe(customThemeMaxWidth + "px");
  });
  it('should override config theme variables with config styles', function () {
    var styleSheet = createStyleSheet(styles, config, testComponentName);
    var style = styleSheet.getRule(testRuleName).style;
    expect(style['border-color']).toBe(customStyleBorderColor);
  });
});