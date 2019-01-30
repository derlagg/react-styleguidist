"use strict";

var _path = _interopRequireDefault(require("path"));

var _deabsdeep = _interopRequireDefault(require("deabsdeep"));

var _getComponentFilesFromSections = _interopRequireDefault(require("../getComponentFilesFromSections"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configDir = _path.default.resolve(__dirname, '../../../../test');

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

const deabs = x => (0, _deabsdeep.default)(x, {
  root: configDir
});

it('getComponentFilesFromSections() should return a list of files', () => {
  const result = (0, _getComponentFilesFromSections.default)(sections, configDir);
  expect(deabs(result)).toEqual(['~/components/Button/Button.js', '~/components/Placeholder/Placeholder.js', '~/components/Price/Price.js']);
});
it('getComponentFilesFromSections() should ignore specified patterns', () => {
  const result = (0, _getComponentFilesFromSections.default)(sections, configDir, ['**/*Button*']);
  expect(deabs(result)).toEqual(['~/components/Placeholder/Placeholder.js', '~/components/Price/Price.js']);
});