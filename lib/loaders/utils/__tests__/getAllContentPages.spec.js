"use strict";

var _getAllContentPages = _interopRequireDefault(require("../getAllContentPages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sections = [{
  name: 'Readme',
  content: 'Readme.md',
  components: [],
  sections: []
}, {
  name: 'Components',
  components: [],
  sections: []
}, {
  name: 'Nesting',
  components: [],
  sections: [{
    name: 'Nested',
    components: [],
    sections: []
  }, {
    name: 'Nested 2',
    content: 'Nested.md',
    components: [],
    sections: []
  }]
}];
it('should return all content pages', () => {
  const result = (0, _getAllContentPages.default)(sections);
  expect(result).toEqual(['Readme.md', 'Nested.md']);
});