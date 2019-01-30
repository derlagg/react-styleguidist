"use strict";

var _getComponentPatternsFromSections = _interopRequireDefault(require("../getComponentPatternsFromSections"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sections = [{
  name: 'Readme',
  content: 'Readme.md'
}, {
  name: 'Components',
  components: 'components/**/B*.js'
}, {
  name: 'Nesting',
  sections: [{
    name: 'Nested',
    components: 'components/**/P*.js'
  }]
}];
it('should return a list of patterns', () => {
  const result = (0, _getComponentPatternsFromSections.default)(sections);
  expect(result).toEqual(['components/**/B*.js', 'components/**/P*.js']);
});